var pointsValueInject = (function() {
	//#region node_modules/wxt/dist/utils/define-unlisted-script.mjs
	function defineUnlistedScript(arg) {
		if (arg == null || typeof arg === "function") return { main: arg };
		return arg;
	}
	//#endregion
	//#region extension/entrypoints/points-value--inject.ts
	var points_value__inject_default = defineUnlistedScript(() => {
		window.initializeTooltip(".tt-points-value", "white-tooltip");
	});
	//#endregion
	//#region \0virtual:wxt-unlisted-script-entrypoint?/Users/zachwozniak/Desktop/torntools_extension/extension/entrypoints/points-value--inject.ts
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
			result = points_value__inject_default.main();
			if (result instanceof Promise) result = result.catch((err) => {
				logger.error(`The unlisted script "points-value--inject" crashed on startup!`, err);
				throw err;
			});
		} catch (err) {
			logger.error(`The unlisted script "points-value--inject" crashed on startup!`, err);
			throw err;
		}
		return result;
	})();
})();

pointsValueInject;
//# sourceMappingURL=points-value--inject.js.map