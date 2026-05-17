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

    /// Fire a one-off test notification immediately, bypassing all threshold logic.
    /// Used by the App's "Test notification" button to verify the OS notification
    /// pipeline (permissions, delegate, willPresent) is wired up.
    static func fireTest() async {
        let content = UNMutableNotificationContent()
        content.title = "TornTools test"
        content.body = "If you see this, native notifications are working."
        content.sound = .default
        let request = UNNotificationRequest(identifier: "tt.test.\(Int(Date().timeIntervalSince1970))",
                                            content: content, trigger: nil)
        do {
            try await UNUserNotificationCenter.current().add(request)
            NSLog("TornTools test notification scheduled")
            var history = SharedStorage.history
            history.append(NotificationRecord(title: "TornTools test",
                                              body: "If you see this, native notifications are working.",
                                              date: Date()))
            SharedStorage.history = history
        } catch {
            NSLog("TornTools test notification FAILED: %@", error.localizedDescription)
        }
    }

    /// Evaluate stats against thresholds and schedule any new notifications.
    @discardableResult
    static func evaluateAndSchedule(stats: Stats, thresholds: Thresholds) async -> Int {
        var lastFired = SharedStorage.lastFired
        var history = SharedStorage.history
        var lastBarPct = SharedStorage.lastBarPct
        var lastCooldownActive = SharedStorage.lastCooldownActive
        var fired = 0

        let center = UNUserNotificationCenter.current()

        // Lightweight log for the App's diagnostics drawer.
        var log: [String] = []
        log.append("eval @ \(Date())")
        for (label, bar) in [("Energy", stats.energy), ("Nerve", stats.nerve), ("Happy", stats.happy), ("Life", stats.life)] {
            if let b = bar {
                let pct = b.maximum > 0 ? Double(b.current) / Double(b.maximum) * 100.0 : 0.0
                let prev = lastBarPct[label] ?? 0.0
                let thrList: [String]
                switch label {
                case "Energy": thrList = thresholds.energy
                case "Nerve": thrList = thresholds.nerve
                case "Happy": thrList = thresholds.happy
                case "Life": thrList = thresholds.life
                default: thrList = []
                }
                log.append("  \(label): prev=\(Int(prev))%, cur=\(Int(pct))%, thresholds=\(thrList)")
            }
        }
        log.append("  cooldowns: drug=\(stats.cooldownDrug ?? -1) medical=\(stats.cooldownMedical ?? -1) booster=\(stats.cooldownBooster ?? -1)")
        log.append("  messages=\(stats.newMessages ?? -1) (lastAlerted=\(SharedStorage.lastAlertedMessageCount))")
        log.append("  events=\(stats.newEvents ?? -1) (lastAlerted=\(SharedStorage.lastAlertedEventCount))")
        defer {
            log.append("  fired=\(fired)")
            SharedStorage.schedulerLog = log.joined(separator: "\n")
        }

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

        // Schedule future local notifications for predictable events. iOS will
        // fire these at the exact times we ask, even with the app closed and
        // the phone locked. We cancel + re-schedule on every refresh so the
        // most recent stats win (e.g. user buys an energy refill -> reschedule).
        await scheduleFutureNotifications(stats: stats, thresholds: thresholds)

        return fired
    }

    // MARK: - Future-event scheduling

    /// Identifiers of all future notifications we manage. Used to cancel
    /// stale ones before re-scheduling.
    private static let futureIdentifiers = [
        "tt.future.energy.100",
        "tt.future.nerve.100",
        "tt.future.happy.100",
        "tt.future.life.100",
        "tt.future.cd.drug",
        "tt.future.cd.medical",
        "tt.future.cd.booster",
        "tt.future.travel.landing",
    ]

    private static func scheduleFutureNotifications(stats: Stats, thresholds: Thresholds) async {
        let center = UNUserNotificationCenter.current()
        // Wipe any previously-queued future notifications; we always re-derive from fresh stats.
        center.removePendingNotificationRequests(withIdentifiers: futureIdentifiers)

        let nowSec = Date().timeIntervalSince1970

        func schedule(id: String, title: String, body: String, fireAt: TimeInterval) async {
            // Skip past or imminent (<5s) targets — those should have been handled by
            // the edge-trigger pass on this same refresh.
            let delay = fireAt - nowSec
            guard delay > 5 else { return }
            let content = UNMutableNotificationContent()
            content.title = title
            content.body = body
            content.sound = soundFor(thresholds.sound)
            let trigger = UNTimeIntervalNotificationTrigger(timeInterval: delay, repeats: false)
            let request = UNNotificationRequest(identifier: id, content: content, trigger: trigger)
            do {
                try await center.add(request)
            } catch {
                NSLog("TornTools schedule future failed (%@): %@", id, error.localizedDescription)
            }
        }

        // --- Bars at 100% ---
        // Only schedule for thresholds that include "100%" (the only predictable
        // bar threshold — Torn's `fulltime` predicts when the bar will reach max).
        if thresholds.energy.contains("100%"), let full = stats.energy?.fullTime {
            await schedule(id: "tt.future.energy.100", title: "Energy full", body: "Energy reached 100%.", fireAt: full)
        }
        if thresholds.nerve.contains("100%"), let full = stats.nerve?.fullTime {
            await schedule(id: "tt.future.nerve.100", title: "Nerve full", body: "Nerve reached 100%.", fireAt: full)
        }
        if thresholds.happy.contains("100%"), let full = stats.happy?.fullTime {
            await schedule(id: "tt.future.happy.100", title: "Happy full", body: "Happy reached 100%.", fireAt: full)
        }
        if thresholds.life.contains("100%"), let full = stats.life?.fullTime {
            await schedule(id: "tt.future.life.100", title: "Life full", body: "Life reached 100%.", fireAt: full)
        }

        // --- Cooldowns ending ---
        if thresholds.alertOnDrugCooldownEnd, let cd = stats.cooldownDrug, cd > 0 {
            await schedule(id: "tt.future.cd.drug", title: "Drug cooldown over",
                           body: "Drug cooldown is up — you can take another.",
                           fireAt: nowSec + Double(cd))
        }
        if thresholds.alertOnMedicalCooldownEnd, let cd = stats.cooldownMedical, cd > 0 {
            await schedule(id: "tt.future.cd.medical", title: "Medical cooldown over",
                           body: "Medical cooldown is up — medical items are available.",
                           fireAt: nowSec + Double(cd))
        }
        if thresholds.alertOnBoosterCooldownEnd, let cd = stats.cooldownBooster, cd > 0 {
            await schedule(id: "tt.future.cd.booster", title: "Booster cooldown over",
                           body: "Booster cooldown is up — you can use boosters.",
                           fireAt: nowSec + Double(cd))
        }

        // --- Travel landing ---
        if thresholds.alertOnLanding, let trip = stats.traveling {
            await schedule(id: "tt.future.travel.landing", title: "Landing soon",
                           body: "Arriving in \(trip.destination).",
                           fireAt: trip.arrivalAt)
        }
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
