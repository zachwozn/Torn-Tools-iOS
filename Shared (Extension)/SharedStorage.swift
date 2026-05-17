//
//  SharedStorage.swift
//  TornTools
//
//  Shared App-Group-backed storage used by both the main app (for the
//  status UI + BGAppRefreshTask) and the Safari extension (which pushes
//  Torn data into this store on every refresh via sendNativeMessage).
//
//  The store lives in a UserDefaults suite whose name matches the
//  app-group identifier configured in both .entitlements files.
//

import Foundation

enum SharedStorage {
    static let appGroupID = "group.com.zachwozn.TornTools"

    private static let defaults = UserDefaults(suiteName: appGroupID)

    /// True if the App Group entitlement is actually wired up at runtime.
    /// `UserDefaults(suiteName:)` returns nil if the suite name happens to
    /// equal the bundle id or "NSGlobalDomain"; on a misconfigured App Group,
    /// it can return a non-nil instance that's not actually shared. We also
    /// probe by writing/reading a magic key to detect the latter case.
    static var diagnostics: String {
        var lines: [String] = []
        lines.append("appGroupID = \(appGroupID)")
        if defaults == nil {
            lines.append("UserDefaults(suiteName:) returned nil — suite name is reserved or invalid.")
            return lines.joined(separator: "\n")
        }
        let probeKey = "tt.diag.probe"
        let probeValue = "ok-\(UUID().uuidString)"
        defaults?.set(probeValue, forKey: probeKey)
        defaults?.synchronize()
        let readBack = defaults?.string(forKey: probeKey)
        lines.append(readBack == probeValue
            ? "write/read probe SUCCEEDED in this process."
            : "write/read probe FAILED — wrote \(probeValue), read \(readBack ?? "nil"). App Group entitlement is likely not active.")
        let containerURL = FileManager.default.containerURL(forSecurityApplicationGroupIdentifier: appGroupID)
        lines.append(containerURL.map { "container URL = \($0.path)" } ?? "containerURL(forSecurityApplicationGroup:) returned nil — entitlement not honored.")
        return lines.joined(separator: "\n")
    }

    private enum Key {
        static let apiKey = "tt.apiKey"
        static let lastStats = "tt.lastStats"           // JSON-encoded Stats
        static let lastSyncDate = "tt.lastSyncDate"     // Date
        static let thresholds = "tt.thresholds"         // JSON-encoded Thresholds
        static let history = "tt.history"               // JSON array of NotificationRecord
        static let lastFired = "tt.lastFired"           // JSON dict of [String:Date]
        static let extensionHeartbeat = "tt.extHeartbeat" // ISO-8601 date the extension last wrote
        static let extensionLastMessage = "tt.extLastMessage" // The most recent message type the extension processed
        // Edge-triggered alert state
        static let lastBarPct = "tt.lastBarPct"         // JSON [String: Double] — previous % per bar
        static let lastCooldownActive = "tt.lastCdActive" // JSON [String: Bool] — was cooldown active last check
        static let lastAlertedMessages = "tt.lastAlertedMsg" // Int — last alerted message count
        static let lastAlertedEvents = "tt.lastAlertedEv"   // Int — last alerted event count
    }

    /// Set by the extension's native handler each time it receives a message.
    /// If the App can read this, App-Group sharing actually works across processes.
    static var extensionHeartbeat: Date? {
        get { defaults?.object(forKey: Key.extensionHeartbeat) as? Date }
        set { defaults?.set(newValue, forKey: Key.extensionHeartbeat) }
    }

    static var extensionLastMessage: String? {
        get { defaults?.string(forKey: Key.extensionLastMessage) }
        set { defaults?.set(newValue, forKey: Key.extensionLastMessage) }
    }

    // MARK: - API key

    static var apiKey: String? {
        get { defaults?.string(forKey: Key.apiKey) }
        set { defaults?.set(newValue, forKey: Key.apiKey) }
    }

    // MARK: - Stats snapshot

    static var stats: Stats? {
        get {
            guard let data = defaults?.data(forKey: Key.lastStats) else { return nil }
            return try? JSONDecoder().decode(Stats.self, from: data)
        }
        set {
            let encoded = newValue.flatMap { try? JSONEncoder().encode($0) }
            defaults?.set(encoded, forKey: Key.lastStats)
            defaults?.set(Date(), forKey: Key.lastSyncDate)
        }
    }

    static var lastSyncDate: Date? {
        defaults?.object(forKey: Key.lastSyncDate) as? Date
    }

    // MARK: - Thresholds

    static var thresholds: Thresholds {
        get {
            guard let data = defaults?.data(forKey: Key.thresholds),
                  let decoded = try? JSONDecoder().decode(Thresholds.self, from: data) else {
                // Bootstrap with reasonable defaults so notifications fire out of the box.
                return Thresholds.bootstrap
            }
            return decoded
        }
        set {
            if let encoded = try? JSONEncoder().encode(newValue) {
                defaults?.set(encoded, forKey: Key.thresholds)
            }
        }
    }

    // MARK: - Notification history

    static var history: [NotificationRecord] {
        get {
            guard let data = defaults?.data(forKey: Key.history) else { return [] }
            return (try? JSONDecoder().decode([NotificationRecord].self, from: data)) ?? []
        }
        set {
            // Cap to most recent 50 to avoid runaway storage.
            let capped = Array(newValue.suffix(50))
            if let encoded = try? JSONEncoder().encode(capped) {
                defaults?.set(encoded, forKey: Key.history)
            }
        }
    }

    static func appendHistory(_ record: NotificationRecord) {
        var h = history
        h.append(record)
        history = h
    }

    // MARK: - Last-fired tracking (debounce repeated alerts)

    static var lastFired: [String: Date] {
        get {
            guard let data = defaults?.data(forKey: Key.lastFired) else { return [:] }
            return (try? JSONDecoder().decode([String: Date].self, from: data)) ?? [:]
        }
        set {
            if let encoded = try? JSONEncoder().encode(newValue) {
                defaults?.set(encoded, forKey: Key.lastFired)
            }
        }
    }

    // MARK: - Edge-trigger state (per-bar, per-cooldown, per-inbox-count)

    /// Previous percentage we saw for each bar. Edge-triggered alerts fire
    /// only when current pct rises across a threshold from below.
    static var lastBarPct: [String: Double] {
        get {
            guard let data = defaults?.data(forKey: Key.lastBarPct) else { return [:] }
            return (try? JSONDecoder().decode([String: Double].self, from: data)) ?? [:]
        }
        set {
            if let encoded = try? JSONEncoder().encode(newValue) {
                defaults?.set(encoded, forKey: Key.lastBarPct)
            }
        }
    }

    /// Was each cooldown active (>0) last time we checked? Edge-triggered:
    /// fire only on transition from active → 0.
    static var lastCooldownActive: [String: Bool] {
        get {
            guard let data = defaults?.data(forKey: Key.lastCooldownActive) else { return [:] }
            return (try? JSONDecoder().decode([String: Bool].self, from: data)) ?? [:]
        }
        set {
            if let encoded = try? JSONEncoder().encode(newValue) {
                defaults?.set(encoded, forKey: Key.lastCooldownActive)
            }
        }
    }

    /// Count of messages at the time of the most recent message alert. Fire
    /// when current count > this value (count went up since last alert).
    static var lastAlertedMessageCount: Int {
        get { defaults?.integer(forKey: Key.lastAlertedMessages) ?? 0 }
        set { defaults?.set(newValue, forKey: Key.lastAlertedMessages) }
    }

    static var lastAlertedEventCount: Int {
        get { defaults?.integer(forKey: Key.lastAlertedEvents) ?? 0 }
        set { defaults?.set(newValue, forKey: Key.lastAlertedEvents) }
    }

    /// A short text dump of what NotificationScheduler did on its most recent run.
    /// Shown in the App's Diagnostics drawer to make debugging visible without
    /// needing Console.app or Web Inspector.
    static var schedulerLog: String {
        get { defaults?.string(forKey: "tt.schedulerLog") ?? "" }
        set { defaults?.set(newValue, forKey: "tt.schedulerLog") }
    }
}

// MARK: - Models

struct Stats: Codable, Equatable {
    var energy: Bar?
    var nerve: Bar?
    var happy: Bar?
    var life: Bar?
    var chain: Bar?
    var traveling: TravelInfo?
    var cooldownDrug: Int?         // seconds remaining
    var cooldownMedical: Int?
    var cooldownBooster: Int?
    var newMessages: Int?
    var newEvents: Int?
}

struct Bar: Codable, Equatable {
    var current: Int
    var maximum: Int
    var fullTime: TimeInterval?    // unix seconds when bar fills, if relevant
}

struct TravelInfo: Codable, Equatable {
    var destination: String
    var arrivalAt: TimeInterval    // unix seconds
}

struct Thresholds: Codable, Equatable {
    /// Each entry is e.g. "100%", "75%", or "+50" (absolute count). Empty = disabled.
    var energy: [String] = ["100%"]
    var nerve: [String] = ["100%"]
    var happy: [String] = []
    var life: [String] = []
    /// Chain timer warnings in seconds, e.g. [60, 90, 120].
    var chainTimer: [Int] = []
    var alertOnLanding: Bool = true
    var alertOnDrugCooldownEnd: Bool = true
    var alertOnMedicalCooldownEnd: Bool = true
    var alertOnBoosterCooldownEnd: Bool = true
    var alertOnNewMessages: Bool = true
    var alertOnNewEvents: Bool = true
    /// Default sound choice (mirrors TT: "1"-"5", "default", "mute").
    var sound: String = "default"

    /// Reasonable defaults to bootstrap a user who hasn't configured anything yet.
    static let bootstrap = Thresholds(
        energy: ["100%"],
        nerve: ["100%"],
        happy: ["100%"],
        life: ["100%"],
        alertOnLanding: true,
        alertOnDrugCooldownEnd: true,
        alertOnMedicalCooldownEnd: true,
        alertOnBoosterCooldownEnd: true,
        alertOnNewMessages: true,
        alertOnNewEvents: true,
        sound: "default"
    )
}

struct NotificationRecord: Codable {
    var title: String
    var body: String
    var date: Date
}
