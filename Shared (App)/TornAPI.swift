//
//  TornAPI.swift
//  TornTools
//
//  Minimal native client for api.torn.com. Used by:
//    - the iOS BGAppRefreshTask (polling when Safari is closed)
//    - the App UI's manual "Refresh now" button
//

import Foundation

enum TornAPI {

    enum APIError: Error {
        case noAPIKey
        case badStatus(Int)
        case invalidResponse
        case server(String)
    }

    /// Fetches the user's status bars, cooldowns, travel, and inbox counts.
    /// Selections kept tight to keep the response small and respect API rate-limits.
    static func fetchUser() async throws -> Stats {
        guard let key = SharedStorage.apiKey, !key.isEmpty else {
            throw APIError.noAPIKey
        }

        // selections: bars, cooldowns, travel, newmessages, newevents
        var components = URLComponents(string: "https://api.torn.com/user/")!
        components.queryItems = [
            URLQueryItem(name: "selections", value: "bars,cooldowns,travel,newmessages,newevents"),
            URLQueryItem(name: "key", value: key),
            URLQueryItem(name: "comment", value: "TornToolsNative"),
        ]
        guard let url = components.url else { throw APIError.invalidResponse }

        var request = URLRequest(url: url, timeoutInterval: 20)
        request.httpMethod = "GET"

        let (data, response) = try await URLSession.shared.data(for: request)
        guard let http = response as? HTTPURLResponse else { throw APIError.invalidResponse }
        guard (200..<300).contains(http.statusCode) else { throw APIError.badStatus(http.statusCode) }

        // The Torn API returns either the requested fields or an `error` envelope, both 200 OK.
        if let envelope = try? JSONDecoder().decode(ErrorEnvelope.self, from: data),
           let err = envelope.error {
            throw APIError.server(err.error)
        }

        let raw = try JSONDecoder().decode(RawUser.self, from: data)
        return raw.toStats()
    }

    // MARK: - Wire format

    private struct ErrorEnvelope: Decodable {
        let error: ErrorBody?
        struct ErrorBody: Decodable { let code: Int; let error: String }
    }

    private struct RawUser: Decodable {
        // bars
        let energy: RawBar?
        let nerve: RawBar?
        let happy: RawBar?
        let life: RawBar?
        let chain: RawBar?
        // cooldowns
        let cooldowns: RawCooldowns?
        // travel
        let travel: RawTravel?
        // counts
        let messages: Int?
        let events: Int?

        enum CodingKeys: String, CodingKey {
            case energy, nerve, happy, life, chain, cooldowns, travel
            case messages = "messages"  // newmessages returns `messages`
            case events = "events"      // newevents returns `events`
        }

        func toStats() -> Stats {
            Stats(
                energy: energy?.toBar(),
                nerve: nerve?.toBar(),
                happy: happy?.toBar(),
                life: life?.toBar(),
                chain: chain?.toBar(),
                traveling: travel?.toTravel(),
                cooldownDrug: cooldowns?.drug,
                cooldownMedical: cooldowns?.medical,
                cooldownBooster: cooldowns?.booster,
                newMessages: messages,
                newEvents: events
            )
        }
    }

    private struct RawBar: Decodable {
        let current: Int
        let maximum: Int
        let fulltime: Int?
        let timestamp: Int?

        func toBar() -> Bar {
            // Torn's `fulltime` is seconds-from-`timestamp` until full.
            let full: TimeInterval?
            if let ft = fulltime, ft > 0, let ts = timestamp {
                full = TimeInterval(ts + ft)
            } else {
                full = nil
            }
            return Bar(current: current, maximum: maximum, fullTime: full)
        }
    }

    private struct RawCooldowns: Decodable {
        let drug: Int
        let medical: Int
        let booster: Int
    }

    private struct RawTravel: Decodable {
        let destination: String?
        let time_left: Int?
        let timestamp: Int?

        func toTravel() -> TravelInfo? {
            guard let dest = destination, !dest.isEmpty, dest != "Torn",
                  let timeLeft = time_left, timeLeft > 0,
                  let ts = timestamp else {
                return nil
            }
            return TravelInfo(destination: dest, arrivalAt: TimeInterval(ts + timeLeft))
        }
    }
}
