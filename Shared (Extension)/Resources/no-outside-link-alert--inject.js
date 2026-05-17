var noOutsideLinkAlertInject = (function() {
	//#region node_modules/wxt/dist/utils/define-unlisted-script.mjs
	function defineUnlistedScript(arg) {
		if (arg == null || typeof arg === "function") return { main: arg };
		return arg;
	}
	//#endregion
	//#region extension/entrypoints/no-outside-link-alert--inject.ts
	var no_outside_link_alert__inject_default = defineUnlistedScript(() => {
		const originalConfirm = window.confirm;
		window.confirm = (message) => {
			if (!message || message.includes("This link leads outside")) return true;
			return originalConfirm(message);
		};
	});
	//#endregion
	//#region \0virtual:wxt-unlisted-script-entrypoint?/Users/zachwozniak/Desktop/torntools_extension/extension/entrypoints/no-outside-link-alert--inject.ts
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
			result = no_outside_link_alert__inject_default.main();
			if (result instanceof Promise) result = result.catch((err) => {
				logger.error(`The unlisted script "no-outside-link-alert--inject" crashed on startup!`, err);
				throw err;
			});
		} catch (err) {
			logger.error(`The unlisted script "no-outside-link-alert--inject" crashed on startup!`, err);
			throw err;
		}
		return result;
	})();
})();

noOutsideLinkAlertInject;
//# sourceMappingURL=no-outside-link-alert--inject.js.map