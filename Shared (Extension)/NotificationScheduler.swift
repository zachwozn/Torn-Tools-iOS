//
//  NotificationScheduler.swift
//  TornTools
//
//  Translates a Stats snapshot + a Thresholds config into UNUserNotifications.
//
//  Trigger rules (per category):
//
//  - Bars (energy/nerve/happy/life): EDGE-triggered. Fires only when the
//    current percentage crosses a configured threshold from below. Sitting
//    at 100% does not re-fire on every poll; the bar must drop and come back
//    up to alert again.
//
//  - Cooldowns (drug/medical/booster): EDGE-triggered. Fires when the
//    cooldown transitions from active (>0s) to ready (0s).
//
//  - New messages / new events: COUNT-tracked. Fires whenever the current
//    count exceeds `lastAlertedCount`. So a fresh message that bumps the
//    unread total from 3 → 4 alerts even if a 3-unread alert fired earlier.
//
//  - Travel landing: time-window. Fires once within the last 5 minutes
//    before the arrival timestamp, keyed by arrival so each trip is unique.
//
//  State is persisted in SharedStorage so behavior is consistent across
//  manual refreshes, foreground auto-polls, and BGAppRefreshTask invocations.
//

import Foundation
import UserNotifications

enum NotificationScheduler {

    /// Travel-landing window: alert if we're within this many seconds of arrival.
    private static let travelWindowSeconds: TimeInterval = 5 * 60

    /// Evaluate stats against thresholds and schedule any new notifications.
    @discardableResult
    static func evaluateAndSchedule(stats: Stats, thresholds: Thresholds) async -> Int {
        var lastFired = SharedStorage.lastFired
        var history = SharedStorage.history
        var lastBarPct = SharedStorage.lastBarPct
        var lastCooldownActive = SharedStorage.lastCooldownActive
        var fired = 0

        let center = UNUserNotificationCenter.current()

        func fire(key: String, title: String, body: String) async {
            let content = UNMutableNotificationContent()
            content.title = title
            content.body = body
            content.sound = soundFor(thresholds.sound)

            let request = UNNotificationRequest(
                identifier: "tt.\(key).\(Int(Date().timeIntervalSince1970))",
                content: content,
                trigger: nil
            )
            do {
                try await center.add(request)
                lastFired[key] = Date()
                history.append(NotificationRecord(title: title, body: body, date: Date()))
                fired += 1
            } catch {
                NSLog("TornTools NotificationScheduler: failed to add request: %@", error.localizedDescription)
            }
        }

        // --- Bar thresholds: edge-triggered ---
        await evaluateBarEdge(stats.energy, label: "Energy", thresholds: thresholds.energy,
                              lastPctMap: &lastBarPct, fire: fire)
        await evaluateBarEdge(stats.nerve, label: "Nerve", thresholds: thresholds.nerve,
                              lastPctMap: &lastBarPct, fire: fire)
        await evaluateBarEdge(stats.happy, label: "Happy", thresholds: thresholds.happy,
                              lastPctMap: &lastBarPct, fire: fire)
        await evaluateBarEdge(stats.life, label: "Life", thresholds: thresholds.life,
                              lastPctMap: &lastBarPct, fire: fire)

        // --- Cooldowns: edge-triggered (active → ready) ---
        await evaluateCooldownEdge(seconds: stats.cooldownDrug, label: "drug",
                                   title: "Drug cooldown over",
                                   body: "Drug cooldown is up — you can take another.",
                                   enabled: thresholds.alertOnDrugCooldownEnd,
                                   lastActiveMap: &lastCooldownActive, fire: fire)
        await evaluateCooldownEdge(seconds: stats.cooldownMedical, label: "medical",
                                   title: "Medical cooldown over",
                                   body: "Medical cooldown is up — medical items are available.",
                                   enabled: thresholds.alertOnMedicalCooldownEnd,
                                   lastActiveMap: &lastCooldownActive, fire: fire)
        await evaluateCooldownEdge(seconds: stats.cooldownBooster, label: "booster",
                                   title: "Booster cooldown over",
                                   body: "Booster cooldown is up — you can use boosters.",
                                   enabled: thresholds.alertOnBoosterCooldownEnd,
                                   lastActiveMap: &lastCooldownActive, fire: fire)

        // --- Travel landing: alert within ~5 minutes of arrival, once per trip ---
        if thresholds.alertOnLanding, let trip = stats.traveling {
            let now = Date().timeIntervalSince1970
            let secondsUntilLanding = trip.arrivalAt - now
            if secondsUntilLanding > 0, secondsUntilLanding < travelWindowSeconds {
                let key = "travel.\(Int(trip.arrivalAt))"
                // travel uses per-trip keys; lastFired prevents same-trip double-alerts.
                if lastFired[key] == nil {
                    await fire(key: key,
                               title: "Landing soon",
                               body: "Arriving in \(trip.destination) in \(Int(secondsUntilLanding/60)) min.")
                }
            }
        }

        // --- Messages: count-tracked. Fire when current count > last alerted count. ---
        if thresholds.alertOnNewMessages, let n = stats.newMessages, n > 0 {
            if n > SharedStorage.lastAlertedMessageCount {
                await fire(key: "inbox.messages",
                           title: "New messages",
                           body: "\(n) unread message\(n == 1 ? "" : "s") on Torn.")
                SharedStorage.lastAlertedMessageCount = n
            }
        }
        // If user reads all messages, reset our high-water so the next message re-alerts.
        if (stats.newMessages ?? 0) == 0 { SharedStorage.lastAlertedMessageCount = 0 }

        // --- Events: count-tracked. Same model as messages. ---
        if thresholds.alertOnNewEvents, let n = stats.newEvents, n > 0 {
            if n > SharedStorage.lastAlertedEventCount {
                await fire(key: "inbox.events",
                           title: "New events",
                           body: "\(n) new event\(n == 1 ? "" : "s") on Torn.")
                SharedStorage.lastAlertedEventCount = n
            }
        }
        if (stats.newEvents ?? 0) == 0 { SharedStorage.lastAlertedEventCount = 0 }

        SharedStorage.lastFired = lastFired
        SharedStorage.history = history
        SharedStorage.lastBarPct = lastBarPct
        SharedStorage.lastCooldownActive = lastCooldownActive
        return fired
    }

    // MARK: - Helpers

    /// Edge-triggered bar evaluator. Fires for each configured threshold only
    /// when the current percentage rises across it from below (or this is the
    /// first observation).
    private static func evaluateBarEdge(_ bar: Bar?, label: String, thresholds: [String],
                                        lastPctMap: inout [String: Double],
                                        fire: (String, String, String) async -> Void) async {
        guard let bar, bar.maximum > 0, !thresholds.isEmpty else { return }
        let pct = (Double(bar.current) / Double(bar.maximum)) * 100.0
        // Treat missing previous reading as 0 so first-run state at/above a
        // threshold still produces an alert.
        let prevPct = lastPctMap[label] ?? 0.0

        for threshold in thresholds {
            let trimmed = threshold.replacingOccurrences(of: "%", with: "").trimmingCharacters(in: .whitespaces)
            guard let target = Double(trimmed) else { continue }
            let wasAbove = prevPct >= target
            let isAbove = pct >= target
            if isAbove && !wasAbove {
                await fire("\(label.lowercased()).\(threshold)",
                           "\(label) at \(threshold)",
                           "\(label) reached \(threshold) — \(bar.current)/\(bar.maximum).")
            }
        }

        lastPctMap[label] = pct
    }

    /// Edge-triggered cooldown evaluator. Fires on transition active → 0.
    private static func evaluateCooldownEdge(seconds: Int?, label: String,
                                             title: String, body: String,
                                             enabled: Bool,
                                             lastActiveMap: inout [String: Bool],
                                             fire: (String, String, String) async -> Void) async {
        guard enabled, let s = seconds else { return }
        let isActive = s > 0
        // Treat missing previous reading as "was active" so first observation of
        // a ready cooldown still alerts.
        let wasActive = lastActiveMap[label] ?? true

        if wasActive && !isActive {
            await fire("cd.\(label)", title, body)
        }
        lastActiveMap[label] = isActive
    }

    private static func soundFor(_ choice: String) -> UNNotificationSound {
        switch choice {
        case "mute":
            return UNNotificationSound.default
        case "1", "2", "3", "4", "5":
            return UNNotificationSound(named: UNNotificationSoundName(rawValue: "audio/notification\(choice).wav"))
        default:
            return .default
        }
    }
}
