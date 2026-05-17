var serviceWorker = (function() {
	//#region node_modules/wxt/dist/utils/define-unlisted-script.mjs
	function defineUnlistedScript(arg) {
		if (arg == null || typeof arg === "function") return { main: arg };
		return arg;
	}
	//#endregion
	//#region extension/entrypoints/service-worker.ts
	var service_worker_default = defineUnlistedScript(() => {
		const worker = self;
		worker.addEventListener("notificationclick", (event) => {
			event.notification.close();
			if (event.notification.data?.link) {
				const url = event.notification.data.link;
				worker.clients.openWindow(url).then((windowClient) => windowClient?.focus());
			}
		});
	});
	//#endregion
	//#region \0virtual:wxt-unlisted-script-entrypoint?/Users/zachwozniak/Desktop/torntools_extension/extension/entrypoints/service-worker.ts
	function print(method, ...args) {}
	/** Wrapper around `console` with a "[wxt]" prefix */
	var logger = {
		debug: (...args) => print(console.debug, ...args),
		log: (...args) => print(console.log, ...args),
		warn: (...args) => print(console.warn, ...args),
		error: (...args) => print(console.error, ...args)
	};
	//#endregion
	return (() => {
		let result;
		try {
			result = service_worker_default.main();
			if (result instanceof Promise) result = result.catch((err) => {
				logger.error(`The unlisted script "service-worker" crashed on startup!`, err);
				throw err;
			});
		} catch (err) {
			logger.error(`The unlisted script "service-worker" crashed on startup!`, err);
			throw err;
		}
		return result;
	})();
})();

serviceWorker;
//# sourceMappingURL=service-worker.js.map