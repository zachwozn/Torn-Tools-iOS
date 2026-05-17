//
//  NotificationScheduler.swift
//  TornTools
//
//  Translates a Stats snapshot + a Thresholds config into UNUserNotifications.
//  Mirrors the matrix that TornTools exposes in its options page: per-bar
//  percentage triggers, cooldown-end alerts, travel landing, and new
//  messages/events. Each alert is debounced via SharedStorage.lastFired
//  so we don't spam the user across repeated BGAppRefreshTask invocations.
//

import Foundation
import UserNotifications

enum NotificationScheduler {

    /// Minimum interval between re-firing the same alert key (seconds).
    private static let debounceInterval: TimeInterval = 60 * 60 * 2

    /// Evaluate stats against thresholds and schedule any new notifications.
    /// Records each fired notification into SharedStorage.history.
    @discardableResult
    static func evaluateAndSchedule(stats: Stats, thresholds: Thresholds) async -> Int {
        var lastFired = SharedStorage.lastFired
        var history = SharedStorage.history
        var fired = 0

        let center = UNUserNotificationCenter.current()

        func shouldFire(_ key: String) -> Bool {
            if let last = lastFired[key], Date().timeIntervalSince(last) < debounceInterval {
                return false
            }
            return true
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

        // --- Bar thresholds: percent strings like "100%" / "75%" ---
        await evaluateBar(stats.energy, label: "Energy", thresholds: thresholds.energy,
                          fireIf: shouldFire, fire: { await fire(key: "energy.\($0)", title: "Energy \($0)", body: $1) })
        await evaluateBar(stats.nerve, label: "Nerve", thresholds: thresholds.nerve,
                          fireIf: shouldFire, fire: { await fire(key: "nerve.\($0)", title: "Nerve \($0)", body: $1) })
        await evaluateBar(stats.happy, label: "Happy", thresholds: thresholds.happy,
                          fireIf: shouldFire, fire: { await fire(key: "happy.\($0)", title: "Happy \($0)", body: $1) })
        await evaluateBar(stats.life, label: "Life", thresholds: thresholds.life,
                          fireIf: shouldFire, fire: { await fire(key: "life.\($0)", title: "Life \($0)", body: $1) })

        // --- Travel landing ---
        if thresholds.alertOnLanding, let trip = stats.traveling {
            let now = Date().timeIntervalSince1970
            let secondsUntilLanding = trip.arrivalAt - now
            // Fire once within ~5 minutes of landing.
            if secondsUntilLanding > 0, secondsUntilLanding < 5 * 60 {
                let key = "travel.\(Int(trip.arrivalAt))"
                if shouldFire(key) {
                    await fire(key: key, title: "Landing soon", body: "Arriving in \(trip.destination) in \(Int(secondsUntilLanding/60)) min.")
                }
            }
        }

        // --- Cooldown endings ---
        if thresholds.alertOnDrugCooldownEnd, let d = stats.cooldownDrug, d == 0, shouldFire("cd.drug") {
            await fire(key: "cd.drug", title: "Drug cooldown over", body: "You can use drugs again.")
        }
        if thresholds.alertOnMedicalCooldownEnd, let m = stats.cooldownMedical, m == 0, shouldFire("cd.medical") {
            await fire(key: "cd.medical", title: "Medical cooldown over", body: "Medical items are available again.")
        }
        if thresholds.alertOnBoosterCooldownEnd, let b = stats.cooldownBooster, b == 0, shouldFire("cd.booster") {
            await fire(key: "cd.booster", title: "Booster cooldown over", body: "You can use boosters again.")
        }

        // --- Inbox & events ---
        if thresholds.alertOnNewMessages, let n = stats.newMessages, n > 0, shouldFire("inbox.messages") {
            await fire(key: "inbox.messages", title: "New messages", body: "\(n) unread message\(n == 1 ? "" : "s") on Torn.")
        }
        if thresholds.alertOnNewEvents, let n = stats.newEvents, n > 0, shouldFire("inbox.events") {
            await fire(key: "inbox.events", title: "New events", body: "\(n) new event\(n == 1 ? "" : "s") on Torn.")
        }

        SharedStorage.lastFired = lastFired
        SharedStorage.history = history
        return fired
    }

    // MARK: - Helpers

    private static func evaluateBar(_ bar: Bar?, label: String, thresholds: [String],
                                    fireIf shouldFire: (String) -> Bool,
                                    fire: (String, String) async -> Void) async {
        guard let bar, bar.maximum > 0, !thresholds.isEmpty else { return }
        let pct = (Double(bar.current) / Double(bar.maximum)) * 100.0

        for threshold in thresholds {
            // Parse "100%", "75%", etc. Bare ints also accepted.
            let trimmed = threshold.replacingOccurrences(of: "%", with: "").trimmingCharacters(in: .whitespaces)
            guard let target = Double(trimmed) else { continue }
            if pct >= target && shouldFire("\(label).\(threshold)") {
                await fire(threshold, "\(label) at \(threshold) — \(bar.current)/\(bar.maximum).")
            }
        }
    }

    private static func soundFor(_ choice: String) -> UNNotificationSound {
        switch choice {
        case "mute":
            return UNNotificationSound.default  // closest substitute; iOS requires *some* sound or .silent.
        case "1", "2", "3", "4", "5":
            return UNNotificationSound(named: UNNotificationSoundName(rawValue: "audio/notification\(choice).wav"))
        default:
            return .default
        }
    }
}
