var apiKeyFocusInject = (function() {
	//#region node_modules/wxt/dist/utils/define-unlisted-script.mjs
	function defineUnlistedScript(arg) {
		if (arg == null || typeof arg === "function") return { main: arg };
		return arg;
	}
	//#endregion
	//#region extension/entrypoints/api-key-focus--inject.ts
	var api_key_focus__inject_default = defineUnlistedScript(() => {
		$("#api_key").focusout();
	});
	//#endregion
	//#region \0virtual:wxt-unlisted-script-entrypoint?/Users/zachwozniak/Desktop/torntools_extension/extension/entrypoints/api-key-focus--inject.ts
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
			result = api_key_focus__inject_default.main();
			if (result instanceof Promise) result = result.catch((err) => {
				logger.error(`The unlisted script "api-key-focus--inject" crashed on startup!`, err);
				throw err;
			});
		} catch (err) {
			logger.error(`The unlisted script "api-key-focus--inject" crashed on startup!`, err);
			throw err;
		}
		return result;
	})();
})();

apiKeyFocusInject;
//# sourceMappingURL=api-key-focus--inject.js.map