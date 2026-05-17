var itemNoConfirmInject = (function() {
	//#region node_modules/wxt/dist/utils/define-unlisted-script.mjs
	function defineUnlistedScript(arg) {
		if (arg == null || typeof arg === "function") return { main: arg };
		return arg;
	}
	//#endregion
	//#region extension/entrypoints/item-no-confirm--inject.ts
	var item_no_confirm__inject_default = defineUnlistedScript(() => {
		if (typeof window.xhrSendAdjustments === "undefined") window.xhrSendAdjustments = {};
		function getParams(body) {
			const params = {};
			for (const param of body.split("&")) {
				const split = param.split("=");
				params[split[0]] = split[1];
			}
			return params;
		}
		function paramsToBody(params) {
			const _params = [];
			for (const key in params) _params.push(`${key}=${params[key]}`);
			return _params.join("&");
		}
		window.xhrSendAdjustments.noconfirm_items = (_xhr, body) => {
			if (!body) return body;
			const { step, action, confirm } = getParams(body);
			if (step !== "actionForm" || action !== "equip" || confirm === "1") return body;
			return paramsToBody({
				...getParams(body),
				confirm: 1
			});
		};
	});
	//#endregion
	//#region \0virtual:wxt-unlisted-script-entrypoint?/Users/zachwozniak/Desktop/torntools_extension/extension/entrypoints/item-no-confirm--inject.ts
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
			result = item_no_confirm__inject_default.main();
			if (result instanceof Promise) result = result.catch((err) => {
				logger.error(`The unlisted script "item-no-confirm--inject" crashed on startup!`, err);
				throw err;
			});
		} catch (err) {
			logger.error(`The unlisted script "item-no-confirm--inject" crashed on startup!`, err);
			throw err;
		}
		return result;
	})();
})();

itemNoConfirmInject;
//# sourceMappingURL=item-no-confirm--inject.js.map