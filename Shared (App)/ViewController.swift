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

    override func viewDidLoad() {
        super.viewDidLoad()

        self.webView.navigationDelegate = self

#if os(iOS)
        self.webView.scrollView.isScrollEnabled = true
#endif

        self.webView.configuration.userContentController.add(self, name: "controller")

        self.webView.loadFileURL(Bundle.main.url(forResource: "Main", withExtension: "html")!, allowingReadAccessTo: Bundle.main.resourceURL!)
    }

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
        default:
            break
        }
#endif
    }

#if os(iOS)
    /// Push the current shared-state snapshot to the HTML UI.
    func pushState() {
        let payload = buildStatePayload()
        guard let data = try? JSONSerialization.data(withJSONObject: payload),
              let json = String(data: data, encoding: .utf8) else { return }
        let js = "window.__ttState && window.__ttState(\(json))"
        webView.evaluateJavaScript(js, completionHandler: nil)
    }

    /// User tapped "Refresh now": fetch from Torn API natively, then update UI.
    func refreshNow() async {
        do {
            let stats = try await TornAPI.fetchUser()
            SharedStorage.stats = stats
            let thresholds = SharedStorage.thresholds
            _ = await NotificationScheduler.evaluateAndSchedule(stats: stats, thresholds: thresholds)
        } catch {
            NSLog("TornTools manual refresh failed: %@", error.localizedDescription)
        }
        pushState()
    }

    private func buildStatePayload() -> [String: Any] {
        var out: [String: Any] = [:]
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
