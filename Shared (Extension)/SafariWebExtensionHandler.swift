//
//  SafariWebExtensionHandler.swift
//  Shared (Extension)
//
//  Created by Zach Wozniak on 4/26/24.
//

import SafariServices
import UserNotifications
import os.log

class SafariWebExtensionHandler: NSObject, NSExtensionRequestHandling {

    func beginRequest(with context: NSExtensionContext) {
        let request = context.inputItems.first as? NSExtensionItem

        let profile: UUID?
        if #available(iOS 17.0, macOS 14.0, *) {
            profile = request?.userInfo?[SFExtensionProfileKey] as? UUID
        } else {
            profile = request?.userInfo?["profile"] as? UUID
        }

        let message: Any?
        if #available(iOS 17.0, macOS 14.0, *) {
            message = request?.userInfo?[SFExtensionMessageKey]
        } else {
            message = request?.userInfo?["message"]
        }

        os_log(.default, "Received message from browser.runtime.sendNativeMessage: %@ (profile: %@)", String(describing: message), profile?.uuidString ?? "none")

        // Heartbeat: stamp the App Group so the App-side UI can verify that
        // the extension's process can actually write to the shared container.
        SharedStorage.extensionHeartbeat = Date()

        guard let dict = message as? [String: Any], let type = dict["type"] as? String else {
            SharedStorage.extensionLastMessage = "(untyped)"
            respond(context: context, payload: [ "echo": message as Any, "extDiag": SharedStorage.diagnostics ])
            return
        }
        SharedStorage.extensionLastMessage = type

        switch type {
        case "notify":
            scheduleNotification(payload: dict) { reply in
                var enriched = reply
                enriched["extDiag"] = SharedStorage.diagnostics
                self.respond(context: context, payload: enriched)
            }
        case "sync-stats":
            handleSyncStats(payload: dict)
            respond(context: context, payload: [ "ok": true, "extDiag": SharedStorage.diagnostics ])
        case "sync-settings":
            handleSyncSettings(payload: dict)
            respond(context: context, payload: [ "ok": true, "extDiag": SharedStorage.diagnostics ])
        case "get-state":
            var snap = snapshotState()
            snap["extDiag"] = SharedStorage.diagnostics
            respond(context: context, payload: snap)
        default:
            respond(context: context, payload: [ "echo": message as Any, "extDiag": SharedStorage.diagnostics ])
        }
    }

    // MARK: - Helpers

    private func respond(context: NSExtensionContext, payload: [String: Any]) {
        let response = NSExtensionItem()
        response.userInfo = [ SFExtensionMessageKey: payload ]
        context.completeRequest(returningItems: [ response ], completionHandler: nil)
    }

    private func scheduleNotification(payload: [String: Any], completion: @escaping ([String: Any]) -> Void) {
        let title = payload["title"] as? String ?? ""
        let body = payload["body"] as? String ?? ""
        let soundName = payload["sound"] as? String ?? "default"
        let id = (payload["id"] as? String) ?? UUID().uuidString

        let content = UNMutableNotificationContent()
        content.title = title
        content.body = body
        switch soundName {
        case "mute":
            break
        case "default":
            content.sound = .default
        default:
            content.sound = UNNotificationSound(named: UNNotificationSoundName(rawValue: soundName))
        }

        let request = UNNotificationRequest(identifier: id, content: content, trigger: nil)
        UNUserNotificationCenter.current().add(request) { error in
            if let error = error {
                os_log(.error, "Failed to schedule notification: %@", error.localizedDescription)
                completion([ "ok": false, "error": error.localizedDescription ])
            } else {
                // Also record into shared history so the App UI can show it.
                SharedStorage.appendHistory(NotificationRecord(title: title, body: body, date: Date()))
                completion([ "ok": true, "id": id ])
            }
        }
    }

    // MARK: - Stats / settings sync (from safari-bridge.js)

    private func handleSyncStats(payload: [String: Any]) {
        let stats = payload["stats"] as? [String: Any] ?? [:]

        func bar(_ key: String) -> Bar? {
            guard let dict = stats[key] as? [String: Any],
                  let current = dict["current"] as? Int,
                  let maximum = dict["maximum"] as? Int else { return nil }
            let fullTime = dict["fullTime"] as? TimeInterval
            return Bar(current: current, maximum: maximum, fullTime: fullTime)
        }

        var travel: TravelInfo?
        if let t = stats["traveling"] as? [String: Any],
           let dest = t["destination"] as? String,
           let arrival = t["arrivalAt"] as? TimeInterval {
            travel = TravelInfo(destination: dest, arrivalAt: arrival)
        }

        SharedStorage.stats = Stats(
            energy: bar("energy"),
            nerve: bar("nerve"),
            happy: bar("happy"),
            life: bar("life"),
            chain: bar("chain"),
            traveling: travel,
            cooldownDrug: stats["cooldownDrug"] as? Int,
            cooldownMedical: stats["cooldownMedical"] as? Int,
            cooldownBooster: stats["cooldownBooster"] as? Int,
            newMessages: stats["newMessages"] as? Int,
            newEvents: stats["newEvents"] as? Int
        )
    }

    private func handleSyncSettings(payload: [String: Any]) {
        var t = SharedStorage.thresholds
        if let apiKey = payload["apiKey"] as? String { SharedStorage.apiKey = apiKey }
        if let arr = payload["energy"] as? [String] { t.energy = arr }
        if let arr = payload["nerve"] as? [String] { t.nerve = arr }
        if let arr = payload["happy"] as? [String] { t.happy = arr }
        if let arr = payload["life"] as? [String] { t.life = arr }
        if let arr = payload["chainTimer"] as? [Int] { t.chainTimer = arr }
        if let v = payload["alertOnLanding"] as? Bool { t.alertOnLanding = v }
        if let v = payload["alertOnDrugCooldownEnd"] as? Bool { t.alertOnDrugCooldownEnd = v }
        if let v = payload["alertOnMedicalCooldownEnd"] as? Bool { t.alertOnMedicalCooldownEnd = v }
        if let v = payload["alertOnBoosterCooldownEnd"] as? Bool { t.alertOnBoosterCooldownEnd = v }
        if let v = payload["alertOnNewMessages"] as? Bool { t.alertOnNewMessages = v }
        if let v = payload["alertOnNewEvents"] as? Bool { t.alertOnNewEvents = v }
        if let sound = payload["sound"] as? String { t.sound = sound }
        SharedStorage.thresholds = t
    }

    private func snapshotState() -> [String: Any] {
        var out: [String: Any] = [:]
        if let stats = SharedStorage.stats, let data = try? JSONEncoder().encode(stats),
           let dict = try? JSONSerialization.jsonObject(with: data) as? [String: Any] {
            out["stats"] = dict
        }
        if let sync = SharedStorage.lastSyncDate {
            out["lastSyncDate"] = sync.timeIntervalSince1970
        }
        out["history"] = SharedStorage.history.map { rec -> [String: Any] in
            [ "title": rec.title, "body": rec.body, "date": rec.date.timeIntervalSince1970 ]
        }
        return out
    }

}
