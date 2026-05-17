//
//  AppDelegate.swift
//  iOS (App)
//
//  Created by Zach Wozniak on 4/26/24.
//

import BackgroundTasks
import UIKit
import UserNotifications

@main
class AppDelegate: UIResponder, UIApplicationDelegate, UNUserNotificationCenterDelegate {

    static let refreshTaskID = "com.zachwozn.TornTools.refresh"

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .sound, .badge]) { _, _ in }
        // Receive willPresent so we can show banners even when the app is foregrounded.
        UNUserNotificationCenter.current().delegate = self

        // Register the iOS background-refresh task. iOS decides when this fires
        // (typically based on usage patterns), so notifications via this path
        // are best-effort and not guaranteed within any specific window.
        BGTaskScheduler.shared.register(forTaskWithIdentifier: AppDelegate.refreshTaskID, using: nil) { task in
            guard let refreshTask = task as? BGAppRefreshTask else {
                task.setTaskCompleted(success: false)
                return
            }
            self.handleAppRefresh(task: refreshTask)
        }

        return true
    }

    func applicationDidEnterBackground(_ application: UIApplication) {
        scheduleAppRefresh()
    }

    func application(_ application: UIApplication, configurationForConnecting connectingSceneSession: UISceneSession, options: UIScene.ConnectionOptions) -> UISceneConfiguration {
        return UISceneConfiguration(name: "Default Configuration", sessionRole: connectingSceneSession.role)
    }

    // MARK: - UNUserNotificationCenterDelegate

    /// Show banners and play sound even when the app is foregrounded.
    func userNotificationCenter(_ center: UNUserNotificationCenter,
                                willPresent notification: UNNotification,
                                withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
        if #available(iOS 14.0, *) {
            completionHandler([.banner, .list, .sound, .badge])
        } else {
            completionHandler([.alert, .sound, .badge])
        }
    }

    // MARK: - Background refresh

    private func scheduleAppRefresh() {
        let request = BGAppRefreshTaskRequest(identifier: AppDelegate.refreshTaskID)
        // Hint to iOS: don't run sooner than 15 minutes from now. iOS may delay much longer.
        request.earliestBeginDate = Date(timeIntervalSinceNow: 15 * 60)
        do {
            try BGTaskScheduler.shared.submit(request)
        } catch {
            NSLog("TornTools: failed to submit BGAppRefreshTaskRequest: %@", error.localizedDescription)
        }
    }

    private func handleAppRefresh(task: BGAppRefreshTask) {
        // Always reschedule before we do work so we keep a future window queued.
        scheduleAppRefresh()

        let work = Task {
            do {
                let stats = try await TornAPI.fetchUser()
                SharedStorage.stats = stats
                let thresholds = SharedStorage.thresholds
                _ = await NotificationScheduler.evaluateAndSchedule(stats: stats, thresholds: thresholds)
                task.setTaskCompleted(success: true)
            } catch {
                NSLog("TornTools BG refresh failed: %@", error.localizedDescription)
                task.setTaskCompleted(success: false)
            }
        }

        task.expirationHandler = {
            work.cancel()
        }
    }
}
