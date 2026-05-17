var xhrInject = (function() {
	//#region node_modules/wxt/dist/utils/define-unlisted-script.mjs
	function defineUnlistedScript(arg) {
		if (arg == null || typeof arg === "function") return { main: arg };
		return arg;
	}
	//#endregion
	//#region extension/entrypoints/xhr--inject.ts
	var xhr__inject_default = defineUnlistedScript(() => {
		interceptXHR("tt-xhr");
		console.log("Script Injected - XHR Interception");
		function interceptXHR(channel) {
			const oldXHROpen = window.XMLHttpRequest.prototype.open;
			const oldXHRSend = window.XMLHttpRequest.prototype.send;
			window.XMLHttpRequest.prototype.open = function(method, url) {
				let params = this["params"] ?? {};
				if ("xhrOpenAdjustments" in window && typeof window.xhrOpenAdjustments === "object") for (const key in window.xhrOpenAdjustments) {
					if (typeof window.xhrOpenAdjustments[key] !== "function") continue;
					const adjustments = window.xhrOpenAdjustments[key]({ ...this }, method, url);
					method = adjustments.method;
					url = adjustments.url;
					params = {
						...params,
						...adjustments.params || {}
					};
				}
				this["method"] = method;
				this["url"] = url;
				this["params"] = params;
				this.addEventListener("readystatechange", function() {
					if (this.readyState > 3 && this.status === 200) {
						const page = this.responseURL.substring(this.responseURL.indexOf("torn.com/") + 9, this.responseURL.indexOf(".php"));
						let json, uri;
						if (isJsonString(this.response)) json = JSON.parse(this.response);
						else uri = getUrlParams(this.responseURL);
						window.dispatchEvent(new CustomEvent(channel, { detail: {
							page,
							json,
							uri,
							xhr: {
								requestBody: this["requestBody"],
								response: this.response,
								responseText: this.responseText,
								responseURL: this.responseURL
							}
						} }));
					}
				});
				arguments[0] = method;
				arguments[1] = url;
				return oldXHROpen.apply(this, arguments);
			};
			window.XMLHttpRequest.prototype.send = function(body) {
				this["params"] = this["params"] ?? {};
				if ("xhrSendAdjustments" in window && typeof window.xhrSendAdjustments === "object") for (const key in window.xhrSendAdjustments) {
					if (typeof window.xhrSendAdjustments[key] !== "function") continue;
					body = window.xhrSendAdjustments[key]({ ...this }, body);
				}
				this["requestBody"] = body;
				arguments[0] = body;
				return oldXHRSend.apply(this, arguments);
			};
			function getUrlParams(url, prop) {
				if (!url) url = location.href;
				const definitions = decodeURIComponent(url.slice(url.indexOf("?") + 1)).split("&");
				const params = {};
				definitions.forEach((val) => {
					const parts = val.split("=", 2);
					params[parts[0]] = parts[1];
				});
				return prop && prop in params ? params[prop] : params;
			}
			function isJsonString(str) {
				if (!str || str === "") return false;
				try {
					JSON.parse(str);
				} catch {
					return false;
				}
				return true;
			}
		}
	});
	//#endregion
	//#region \0virtual:wxt-unlisted-script-entrypoint?/Users/zachwozniak/Desktop/torntools_extension/extension/entrypoints/xhr--inject.ts
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
			result = xhr__inject_default.main();
			if (result instanceof Promise) result = result.catch((err) => {
				logger.error(`The unlisted script "xhr--inject" crashed on startup!`, err);
				throw err;
			});
		} catch (err) {
			logger.error(`The unlisted script "xhr--inject" crashed on startup!`, err);
			throw err;
		}
		return result;
	})();
})();

xhrInject;
//# sourceMappingURL=xhr--inject.js.map