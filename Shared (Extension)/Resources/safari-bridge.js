/**
 * Safari iOS native bridge for TornTools.
 *
 * Loaded in the background event-page (via manifest.background.scripts) AND
 * injected at the top of options.html / popup.html / targets.html / tos.html
 * by the safari-patch build step.
 *
 * Three patches:
 *   1. Stubs browser.offscreen so upstream setup code resolves on Safari iOS.
 *   2. Intercepts browser.notifications.create() in the background page and
 *      routes to the native SafariWebExtensionHandler so iOS shows a real
 *      UNUserNotification (sound, lock-screen, banner).
 *   3. Intercepts browser.permissions.request() in the options page so the
 *      grant buttons don't silently fail — instead show a clear alert telling
 *      the user where to grant host access in iOS Settings.
 *
 * Inert on Chrome because:
 *   - offscreen stub only runs if .offscreen is missing (Chrome has it).
 *   - notifications/permissions patches only fall back to the alert/native
 *     path on Safari iOS conditions (real API still tried first).
 */
(() => {
	"use strict";

	const api = globalThis.browser?.runtime?.id ? globalThis.browser : globalThis.chrome;
	if (!api?.runtime) return;

	const isExtensionPage = typeof window !== "undefined" && typeof document !== "undefined";

	// --- offscreen API stub: no-op on Safari iOS so upstream setup code resolves ---
	if (!api.offscreen) {
		api.offscreen = {
			createDocument: () => Promise.resolve(),
			closeDocument: () => Promise.resolve(),
			hasDocument: () => Promise.resolve(false),
		};
	}
	// browser.runtime.getContexts can also be missing on Safari; stub to empty.
	if (api.runtime && !api.runtime.getContexts) {
		api.runtime.getContexts = () => Promise.resolve([]);
	}

	// --- permissions.request: Safari iOS can't grant host permissions at runtime.
	// Replace the silent-failure with an instructional alert.
	if (isExtensionPage && api.permissions?.request) {
		const originalRequest = api.permissions.request.bind(api.permissions);
		api.permissions.request = function (perms, callback) {
			const run = async () => {
				try {
					const granted = await originalRequest(perms);
					if (granted) return true;
				} catch {
					// fall through to alert
				}
				const origins = (perms && perms.origins) || [];
				const hostList = origins.length ? origins.join("\n  • ") : "this host";
				window.alert(
					"TornTools needs permission to access:\n\n  • " +
						hostList +
						"\n\n" +
						"Safari on iOS doesn't allow extensions to grant this from within the app. " +
						"To enable it, open the iOS Settings app and go to:\n\n" +
						"  Settings → Apps → Safari → Extensions → TornTools → Permissions\n\n" +
						"then add the host above to the allowed list.",
				);
				return false;
			};
			// Support both callback and Promise styles.
			if (typeof callback === "function") {
				run().then(callback, () => callback(false));
				return undefined;
			}
			return run();
		};
	}

	async function resolveSoundName() {
		try {
			const result = await api.storage.local.get("settings");
			const choice = result?.settings?.notifications?.sound;
			switch (choice) {
				case "1":
				case "2":
				case "3":
				case "4":
				case "5":
					// Subfolder path because the wavs live at <bundle>/audio/notificationN.wav
					// inside the extension's appex (folder-ref auto-included from Shared (Extension)/Resources/audio).
					return `audio/notification${choice}.wav`;
				case "mute":
					return "mute";
				default:
					return "default";
			}
		} catch {
			return "default";
		}
	}

	if (!api.notifications?.create) return;
	const originalCreate = api.notifications.create.bind(api.notifications);

	api.notifications.create = function (...args) {
		// signature variants: create(options), create(id, options)
		const options = typeof args[0] === "string" ? args[1] : args[0];
		const explicitId = typeof args[0] === "string" ? args[0] : undefined;

		const run = async () => {
			const soundName = await resolveSoundName();
			let response;
			try {
				response = await api.runtime.sendNativeMessage("Application", {
					type: "notify",
					id: explicitId,
					title: options?.title ?? "",
					body: options?.message ?? "",
					sound: soundName,
				});
			} catch {
				response = undefined;
			}
			if (response && response.ok && response.id) return response.id;
			return originalCreate(...args);
		};

		// Match the original API shape: returns a Promise<string> in MV3.
		return run();
	};

	// --- Periodic sync to the native App Group so the iOS app + BGAppRefreshTask
	// can show stats and fire notifications when Safari is closed.
	//
	// We run this in every extension context (background page, options, popup, etc.).
	// On Safari iOS the background uses background.scripts (an event page), so
	// `window` and `document` are defined there too — there is no reliable
	// "am I the background?" check. Storage changes fire in every context, the
	// native side is idempotent, so duplicated syncs are harmless.
	{
		// Wrap sendNativeMessage so any rejection (e.g. Safari's "No response"
		// when the native handler isn't reachable from this context) doesn't
		// surface as an unhandled promise rejection. .catch alone produces
		// spurious "Unhandled Promise Rejection" logs on Safari for reasons
		// I don't fully understand; an async function with try/catch is cleaner.
		async function sendNative(msg) {
			try {
				return await api.runtime.sendNativeMessage("Application", msg);
			} catch {
				return undefined;
			}
		}

		async function syncStatsToNative() {
			try {
				const { userdata } = await api.storage.local.get("userdata");
				if (!userdata) {
					console.log("[safari-bridge] syncStatsToNative: no userdata in storage yet");
					return;
				}
				const ts = (userdata.timestamp ?? Math.floor(Date.now() / 1000));
				function bar(b) {
					if (!b) return undefined;
					return {
						current: b.current,
						maximum: b.maximum,
						fullTime: b.fulltime ? (ts + b.fulltime) : undefined,
					};
				}
				function travel(t) {
					if (!t || !t.destination || t.destination === "Torn" || !t.time_left) return undefined;
					return { destination: t.destination, arrivalAt: ts + t.time_left };
				}
				const payload = {
					type: "sync-stats",
					stats: {
						energy: bar(userdata.energy),
						nerve: bar(userdata.nerve),
						happy: bar(userdata.happy),
						life: bar(userdata.life),
						chain: bar(userdata.chain),
						traveling: travel(userdata.travel),
						cooldownDrug: userdata.cooldowns?.drug,
						cooldownMedical: userdata.cooldowns?.medical,
						cooldownBooster: userdata.cooldowns?.booster,
						newMessages: userdata.messages,
						newEvents: userdata.events,
					},
				};
				const reply = await sendNative(payload);
				console.log("[safari-bridge] syncStatsToNative -> native reply:", reply);
				if (reply && reply.extDiag) console.log("[safari-bridge] extension-process app-group diagnostics:\n" + reply.extDiag);
			} catch (err) {
				console.warn("[safari-bridge] syncStatsToNative failed", err);
			}
		}

		async function syncSettingsToNative() {
			try {
				const { settings, api: apiData } = await api.storage.local.get(["settings", "api"]);
				if (!settings && !apiData) {
					console.log("[safari-bridge] syncSettingsToNative: no settings/api in storage yet");
					return;
				}
				const n = settings?.notifications ?? {};
				const types = n.types ?? {};
				const payload = {
					type: "sync-settings",
					apiKey: apiData?.torn?.key,
					energy: Array.isArray(types.energy) ? types.energy : [],
					nerve: Array.isArray(types.nerve) ? types.nerve : [],
					happy: Array.isArray(types.happy) ? types.happy : [],
					life: Array.isArray(types.life) ? types.life : [],
					chainTimer: Array.isArray(types.chainTimer) ? types.chainTimer : [],
					alertOnLanding: Array.isArray(types.landing) ? types.landing.length > 0 : !!types.landing,
					alertOnDrugCooldownEnd: Array.isArray(types.cooldownDrug) ? types.cooldownDrug.length > 0 : !!types.cooldownDrug,
					alertOnMedicalCooldownEnd: Array.isArray(types.cooldownMedical) ? types.cooldownMedical.length > 0 : !!types.cooldownMedical,
					alertOnBoosterCooldownEnd: Array.isArray(types.cooldownBooster) ? types.cooldownBooster.length > 0 : !!types.cooldownBooster,
					alertOnNewMessages: !!types.messages,
					alertOnNewEvents: !!types.events,
					sound: n.sound ?? "default",
				};
				const reply = await sendNative(payload);
				console.log("[safari-bridge] syncSettingsToNative -> native reply:", reply);
			} catch (err) {
				console.warn("[safari-bridge] syncSettingsToNative failed", err);
			}
		}

		// Push on storage changes (extension updates user data on every poll cycle).
		if (api.storage?.onChanged?.addListener) {
			api.storage.onChanged.addListener((changes, area) => {
				if (area !== "local") return;
				if ("userdata" in changes) void syncStatsToNative();
				if ("settings" in changes || "api" in changes) void syncSettingsToNative();
			});
		}
		// Initial push on any context load.
		void syncStatsToNative();
		void syncSettingsToNative();
	}
})();
