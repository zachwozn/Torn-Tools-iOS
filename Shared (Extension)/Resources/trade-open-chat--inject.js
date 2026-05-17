var tradeOpenChatInject = (function() {
	//#region node_modules/wxt/dist/utils/define-unlisted-script.mjs
	function defineUnlistedScript(arg) {
		if (arg == null || typeof arg === "function") return { main: arg };
		return arg;
	}
	//#endregion
	//#region extension/entrypoints/trade-open-chat--inject.ts
	var trade_open_chat__inject_default = defineUnlistedScript(async () => {
		const playerID = (await cookieStore.get("uid")).value;
		const traderID = $(`#trade-container .log > li .desc a:not([href*="${playerID}"])`).attr("href").match(/XID=(\d*)/i)[1];
		if (window.chat && typeof window.chat === "object") window.chat.r(traderID);
		else window.dispatchEvent(new CustomEvent("chat.openChannel", { detail: { userId: String(traderID) } }));
	});
	//#endregion
	//#region \0virtual:wxt-unlisted-script-entrypoint?/Users/zachwozniak/Desktop/torntools_extension/extension/entrypoints/trade-open-chat--inject.ts
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
			result = trade_open_chat__inject_default.main();
			if (result instanceof Promise) result = result.catch((err) => {
				logger.error(`The unlisted script "trade-open-chat--inject" crashed on startup!`, err);
				throw err;
			});
		} catch (err) {
			logger.error(`The unlisted script "trade-open-chat--inject" crashed on startup!`, err);
			throw err;
		}
		return result;
	})();
})();

tradeOpenChatInject;
//# sourceMappingURL=trade-open-chat--inject.js.map