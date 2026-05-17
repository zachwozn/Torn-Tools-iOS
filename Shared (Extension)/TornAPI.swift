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
        NSLog("TornTools TornAPI.fetchUser: starting")

        guard let key = SharedStorage.apiKey, !key.isEmpty else {
            NSLog("TornTools TornAPI.fetchUser: no API key in SharedStorage")
            throw APIError.noAPIKey
        }
        NSLog("TornTools TornAPI.fetchUser: have API key length=%d", key.count)

        // selections: bars, cooldowns, travel, newmessages, newevents.
        // The "new*" selections return dicts of message/event objects, not ints;
        // we count entries to get the unread/new totals.
        var components = URLComponents(string: "https://api.torn.com/user/")!
        components.queryItems = [
            URLQueryItem(name: "selections", value: "bars,cooldowns,travel,newmessages,newevents"),
            URLQueryItem(name: "key", value: key),
            URLQueryItem(name: "comment", value: "TornToolsNative"),
        ]
        guard let url = components.url else {
            NSLog("TornTools TornAPI.fetchUser: components.url is nil — bad URL construction")
            throw APIError.invalidResponse
        }
        NSLog("TornTools TornAPI.fetchUser: URL = %@", url.absoluteString)

        var request = URLRequest(url: url, timeoutInterval: 20)
        request.httpMethod = "GET"

        let data: Data
        let response: URLResponse
        do {
            (data, response) = try await URLSession.shared.data(for: request)
        } catch {
            NSLog("TornTools TornAPI.fetchUser: URLSession.data threw: %@ (code=%ld)", error.localizedDescription, (error as NSError).code)
            throw error
        }
        NSLog("TornTools TornAPI.fetchUser: received %d bytes", data.count)

        guard let http = response as? HTTPURLResponse else {
            NSLog("TornTools TornAPI.fetchUser: response is not HTTPURLResponse: %@", String(describing: response))
            throw APIError.invalidResponse
        }
        NSLog("TornTools TornAPI.fetchUser: HTTP status = %d", http.statusCode)

        guard (200..<300).contains(http.statusCode) else { throw APIError.badStatus(http.statusCode) }

        // The Torn API returns either the requested fields or an `error` envelope, both 200 OK.
        if let envelope = try? JSONDecoder().decode(ErrorEnvelope.self, from: data),
           let err = envelope.error {
            NSLog("TornTools TornAPI.fetchUser: server error: %@", err.error)
            throw APIError.server(err.error)
        }

        do {
            let raw = try JSONDecoder().decode(RawUser.self, from: data)
            NSLog("TornTools TornAPI.fetchUser: decoded successfully")
            return raw.toStats()
        } catch {
            let preview = String(data: data.prefix(800), encoding: .utf8) ?? "(non-utf8)"
            NSLog("TornTools TornAPI.fetchUser: JSON decode failed (%@). Response body preview: %@",
                  error.localizedDescription, preview)
            throw error
        }
    }

    // MARK: - Wire format

    private struct ErrorEnvelope: Decodable {
        let error: ErrorBody?
        struct ErrorBody: Decodable { let code: Int; let error: String }
    }

    private struct RawUser: Decodable {
        let energy: RawBar?
        let nerve: RawBar?
        let happy: RawBar?
        let life: RawBar?
        let chain: RawBar?
        let cooldowns: RawCooldowns?
        let travel: RawTravel?
        // Torn returns `messages` / `events` as objects keyed by id when using
        // the `newmessages` / `newevents` selections. Decode into dicts and count.
        let messages: [String: RawMessage]?
        let events: [String: RawEvent]?

        func toStats() -> Stats {
            // newmessages already only returns unread messages, but be defensive:
            // count entries where read == 0 if the flag is present.
            let unreadMessages = messages.map { dict in
                dict.values.filter { ($0.read ?? 0) == 0 }.count
            } ?? messages?.count

            // newevents returns recent events; count entries where seen == 0.
            let unseenEvents = events.map { dict in
                dict.values.filter { ($0.seen ?? 0) == 0 }.count
            } ?? events?.count

            return Stats(
                energy: energy?.toBar(),
                nerve: nerve?.toBar(),
                happy: happy?.toBar(),
                life: life?.toBar(),
                chain: chain?.toBar(),
                traveling: travel?.toTravel(),
                cooldownDrug: cooldowns?.drug,
                cooldownMedical: cooldowns?.medical,
                cooldownBooster: cooldowns?.booster,
                newMessages: unreadMessages,
                newEvents: unseenEvents
            )
        }
    }

    private struct RawMessage: Decodable {
        let read: Int?
        let seen: Int?
    }

    private struct RawEvent: Decodable {
        let seen: Int?
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
        let drug: Int?
        let medical: Int?
        let booster: Int?
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
