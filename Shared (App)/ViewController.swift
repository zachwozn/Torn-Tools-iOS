//
//  ViewController.swift
//  Shared (App)
//
//  Created by Zach Wozniak on 4/26/24.
//

import WebKit

#if os(iOS)
import UIKit
typealias PlatformViewController = UIViewController
#elseif os(macOS)
import Cocoa
import SafariServices
typealias PlatformViewController = NSViewController
#endif

let extensionBundleIdentifier = "zachwozn.Test.Extension"

class ViewController: PlatformViewController, WKNavigationDelegate, WKScriptMessageHandler {

    @IBOutlet var webView: WKWebView!

#if os(iOS)
    /// Auto-poll Torn while the app is in the foreground so the user gets a
    /// near-live feed without tapping Refresh. Paused when backgrounded so we
    /// don't burn battery or API quota when nothing is watching.
    private var autoRefreshTimer: Timer?
    private static let autoRefreshInterval: TimeInterval = 60   // seconds
#endif

    override func viewDidLoad() {
        super.viewDidLoad()

        self.webView.navigationDelegate = self

#if os(iOS)
        self.webView.scrollView.isScrollEnabled = true
        // Subscribe to foreground/background notifications so we can start/stop the timer.
        NotificationCenter.default.addObserver(self, selector: #selector(appDidBecomeActive),
                                               name: UIApplication.didBecomeActiveNotification, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(appWillResignActive),
                                               name: UIApplication.willResignActiveNotification, object: nil)
#endif

        self.webView.configuration.userContentController.add(self, name: "controller")

        self.webView.loadFileURL(Bundle.main.url(forResource: "Main", withExtension: "html")!, allowingReadAccessTo: Bundle.main.resourceURL!)
    }

#if os(iOS)
    @objc private func appDidBecomeActive() {
        startAutoRefresh()
    }

    @objc private func appWillResignActive() {
        stopAutoRefresh()
    }

    private func startAutoRefresh() {
        stopAutoRefresh()
        // Fire one immediate refresh, then a recurring one.
        Task { await self.refreshNow() }
        autoRefreshTimer = Timer.scheduledTimer(withTimeInterval: Self.autoRefreshInterval, repeats: true) { [weak self] _ in
            guard let self else { return }
            Task { await self.refreshNow() }
        }
    }

    private func stopAutoRefresh() {
        autoRefreshTimer?.invalidate()
        autoRefreshTimer = nil
    }

    deinit {
        NotificationCenter.default.removeObserver(self)
    }
#endif

    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
#if os(iOS)
        webView.evaluateJavaScript("show('ios')")
        pushState()
#elseif os(macOS)
        webView.evaluateJavaScript("show('mac')")

        SFSafariExtensionManager.getStateOfSafariExtension(withIdentifier: extensionBundleIdentifier) { (state, error) in
            guard let state = state, error == nil else {
                // Insert code to inform the user that something went wrong.
                return
            }

            DispatchQueue.main.async {
                if #available(macOS 13, *) {
                    webView.evaluateJavaScript("show('mac', \(state.isEnabled), true)")
                } else {
                    webView.evaluateJavaScript("show('mac', \(state.isEnabled), false)")
                }
            }
        }
#endif
    }

    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        guard let body = message.body as? String else { return }

#if os(macOS)
        if body == "open-preferences" {
            SFSafariApplication.showPreferencesForExtension(withIdentifier: extensionBundleIdentifier) { error in
                guard error == nil else { return }
                DispatchQueue.main.async { NSApp.terminate(self) }
            }
            return
        }
#endif

#if os(iOS)
        switch body {
        case "refresh-now":
            Task { await self.refreshNow() }
        case "test-notification":
            Task {
                await NotificationScheduler.fireTest()
                self.pushState()
            }
        default:
            if body.hasPrefix("set-api-key:") {
                let key = String(body.dropFirst("set-api-key:".count))
                SharedStorage.apiKey = key.isEmpty ? nil : key
                pushState()
            } else if body.hasPrefix("set-thresholds:") {
                let json = String(body.dropFirst("set-thresholds:".count))
                if let data = json.data(using: .utf8),
                   let decoded = try? JSONDecoder().decode(Thresholds.self, from: data) {
                    SharedStorage.thresholds = decoded
                    // Re-evaluate now so any pending future notifications get rescheduled
                    // against the latest thresholds (and any newly-enabled alerts fire if applicable).
                    Task {
                        if let stats = SharedStorage.stats {
                            _ = await NotificationScheduler.evaluateAndSchedule(stats: stats, thresholds: decoded)
                        }
                        self.pushState()
                    }
                } else {
                    NSLog("TornTools: failed to decode set-thresholds payload: %@", json)
                }
            }
        }
#endif
    }

#if os(iOS)
    /// Push the current shared-state snapshot to the HTML UI.
    func pushState(extraError: String? = nil) {
        var payload = buildStatePayload()
        if let extraError { payload["error"] = extraError }
        guard let data = try? JSONSerialization.data(withJSONObject: payload),
              let json = String(data: data, encoding: .utf8) else { return }
        let js = "window.__ttState && window.__ttState(\(json))"
        webView.evaluateJavaScript(js, completionHandler: nil)
    }

    /// User tapped "Refresh now": fetch from Torn API natively, then update UI.
    func refreshNow() async {
        var lastError: String?
        do {
            let stats = try await TornAPI.fetchUser()
            SharedStorage.stats = stats
            let thresholds = SharedStorage.thresholds
            _ = await NotificationScheduler.evaluateAndSchedule(stats: stats, thresholds: thresholds)
        } catch let e as TornAPI.APIError {
            switch e {
            case .noAPIKey: lastError = "No API key in shared storage. Open Safari + torn.com so the extension syncs the key."
            case .invalidResponse: lastError = "Invalid response from api.torn.com (URL construction or HTTP cast failed)."
            case .badStatus(let s): lastError = "api.torn.com returned HTTP \(s)."
            case .server(let msg): lastError = "Torn API error: \(msg)"
            }
        } catch {
            let nsErr = error as NSError
            lastError = "Network/system error: \(error.localizedDescription) [\(nsErr.domain) code=\(nsErr.code)]"
        }
        if let lastError {
            NSLog("TornTools manual refresh failed: %@", lastError)
        }
        pushState(extraError: lastError)
    }

    private func buildStatePayload() -> [String: Any] {
        var out: [String: Any] = [:]
        out["hasApiKey"] = (SharedStorage.apiKey?.isEmpty == false)
        let schedLog = SharedStorage.schedulerLog
        if !schedLog.isEmpty { out["schedulerLog"] = schedLog }
        // Serialize current thresholds so the UI can populate its controls.
        if let data = try? JSONEncoder().encode(SharedStorage.thresholds),
           let dict = try? JSONSerialization.jsonObject(with: data) as? [String: Any] {
            out["thresholds"] = dict
        }
        var diag = SharedStorage.diagnostics
        if let hb = SharedStorage.extensionHeartbeat {
            let ago = Int(Date().timeIntervalSince(hb))
            diag += "\nextension heartbeat = \(hb) (\(ago)s ago)"
            if let last = SharedStorage.extensionLastMessage {
                diag += "\nextension last message type = \(last)"
            }
        } else {
            diag += "\nextension heartbeat = NEVER (extension hasn't written to this App Group from its process)"
        }
        out["diagnostics"] = diag
        if let stats = SharedStorage.stats,
           let data = try? JSONEncoder().encode(stats),
           let dict = try? JSONSerialization.jsonObject(with: data) as? [String: Any] {
            out["stats"] = dict
        }
        if let date = SharedStorage.lastSyncDate {
            out["lastSyncDate"] = date.timeIntervalSince1970
        }
        out["history"] = SharedStorage.history.map { rec -> [String: Any] in
            [ "title": rec.title, "body": rec.body, "date": rec.date.timeIntervalSince1970 ]
        }
        return out
    }
#endif

}
