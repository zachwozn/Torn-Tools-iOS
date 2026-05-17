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

    private enum Key {
        static let apiKey = "tt.apiKey"
        static let lastStats = "tt.lastStats"           // JSON-encoded Stats
        static let lastSyncDate = "tt.lastSyncDate"     // Date
        static let thresholds = "tt.thresholds"         // JSON-encoded Thresholds
        static let history = "tt.history"               // JSON array of NotificationRecord
        static let lastFired = "tt.lastFired"           // JSON dict of [String:Date]
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
                return Thresholds()
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
    var energy: [String] = []
    var nerve: [String] = []
    var happy: [String] = []
    var life: [String] = []
    /// Chain timer warnings in seconds, e.g. [60, 90, 120].
    var chainTimer: [Int] = []
    var alertOnLanding: Bool = false
    var alertOnDrugCooldownEnd: Bool = false
    var alertOnMedicalCooldownEnd: Bool = false
    var alertOnBoosterCooldownEnd: Bool = false
    var alertOnNewMessages: Bool = false
    var alertOnNewEvents: Bool = false
    /// Default sound choice (mirrors TT: "1"-"5", "default", "mute").
    var sound: String = "default"

    /// Reasonable defaults to bootstrap a user who hasn't configured anything yet.
    static let bootstrap = Thresholds(
        energy: ["100%"],
        nerve: ["100%"],
        happy: ["100%"],
        life: ["100%"],
        alertOnLanding: true,
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
