var efficientRehabInject = (function() {
	//#region node_modules/wxt/dist/utils/define-unlisted-script.mjs
	function defineUnlistedScript(arg) {
		if (arg == null || typeof arg === "function") return { main: arg };
		return arg;
	}
	//#endregion
	//#region extension/entrypoints/efficient-rehab--inject.ts
	var efficient_rehab__inject_default = defineUnlistedScript(() => {
		window.addEventListener("tt-efficient-rehab", (event) => {
			const $slider = $("#rehub-progress .ui-slider");
			const rehabPercentages = JSON.parse($slider.attr("data-percentages")) || [];
			const { ticks } = event.detail;
			if (!(ticks in rehabPercentages)) {
				console.warn("TornTools - Failed to update the rehab amount due to it being an invalid amount of ticks");
				return;
			}
			const percentage = rehabPercentages[ticks];
			$slider.slider("value", percentage).slider("option", "slide")({}, { value: $slider.slider("value") });
		});
		window.dispatchEvent(new CustomEvent("tt-injected--efficient-rehab"));
	});
	//#endregion
	//#region \0virtual:wxt-unlisted-script-entrypoint?/Users/zachwozniak/Desktop/torntools_extension/extension/entrypoints/efficient-rehab--inject.ts
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
			result = efficient_rehab__inject_default.main();
			if (result instanceof Promise) result = result.catch((err) => {
				logger.error(`The unlisted script "efficient-rehab--inject" crashed on startup!`, err);
				throw err;
			});
		} catch (err) {
			logger.error(`The unlisted script "efficient-rehab--inject" crashed on startup!`, err);
			throw err;
		}
		return result;
	})();
})();

efficientRehabInject;
//# sourceMappingURL=efficient-rehab--inject.js.map