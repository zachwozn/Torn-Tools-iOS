var background = (function() {
	//#region \0rolldown/runtime.js
	var __create = Object.create;
	var __defProp$2 = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __getProtoOf = Object.getPrototypeOf;
	var __hasOwnProp$2 = Object.prototype.hasOwnProperty;
	var __commonJSMin = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
			key = keys[i];
			if (!__hasOwnProp$2.call(to, key) && key !== except) __defProp$2(to, key, {
				get: ((k) => from[k]).bind(null, key),
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp$2(target, "default", {
		value: mod,
		enumerable: true
	}) : target, mod));
	//#endregion
	//#region node_modules/wxt/dist/browser.mjs
	/**
	* Contains the `browser` export which you should use to access the extension
	* APIs in your project:
	*
	* ```ts
	* import { browser } from 'wxt/browser';
	*
	* browser.runtime.onInstalled.addListener(() => {
	*   // ...
	* });
	* ```
	*
	* @module wxt/browser
	*/
	var browser$1 = globalThis.browser?.runtime?.id ? globalThis.browser : globalThis.chrome;
	//#endregion
	//#region node_modules/wxt/dist/utils/define-background.mjs
	function defineBackground(arg) {
		if (arg == null || typeof arg === "function") return { main: arg };
		return arg;
	}
	//#endregion
	//#region node_modules/serialize-error/error-constructors.js
	var list = [
		EvalError,
		RangeError,
		ReferenceError,
		SyntaxError,
		TypeError,
		URIError,
		globalThis.DOMException,
		globalThis.AssertionError,
		globalThis.SystemError
	].filter(Boolean).map((constructor) => [constructor.name, constructor]);
	var errorConstructors = new Map(list);
	//#endregion
	//#region node_modules/serialize-error/index.js
	var NonError = class NonError extends Error {
		name = "NonError";
		constructor(message) {
			super(NonError._prepareSuperMessage(message));
		}
		static _prepareSuperMessage(message) {
			try {
				return JSON.stringify(message);
			} catch {
				return String(message);
			}
		}
	};
	var commonProperties = [
		{
			property: "name",
			enumerable: false
		},
		{
			property: "message",
			enumerable: false
		},
		{
			property: "stack",
			enumerable: false
		},
		{
			property: "code",
			enumerable: true
		},
		{
			property: "cause",
			enumerable: false
		}
	];
	var toJsonWasCalled = /* @__PURE__ */ new WeakSet();
	var toJSON = (from) => {
		toJsonWasCalled.add(from);
		const json = from.toJSON();
		toJsonWasCalled.delete(from);
		return json;
	};
	var getErrorConstructor = (name) => errorConstructors.get(name) ?? Error;
	var destroyCircular = ({ from, seen, to, forceEnumerable, maxDepth, depth, useToJSON, serialize }) => {
		if (!to) if (Array.isArray(from)) to = [];
		else if (!serialize && isErrorLike(from)) to = new (getErrorConstructor(from.name))();
		else to = {};
		seen.push(from);
		if (depth >= maxDepth) return to;
		if (useToJSON && typeof from.toJSON === "function" && !toJsonWasCalled.has(from)) return toJSON(from);
		const continueDestroyCircular = (value) => destroyCircular({
			from: value,
			seen: [...seen],
			forceEnumerable,
			maxDepth,
			depth,
			useToJSON,
			serialize
		});
		for (const [key, value] of Object.entries(from)) {
			if (value && value instanceof Uint8Array && value.constructor.name === "Buffer") {
				to[key] = "[object Buffer]";
				continue;
			}
			if (value !== null && typeof value === "object" && typeof value.pipe === "function") {
				to[key] = "[object Stream]";
				continue;
			}
			if (typeof value === "function") continue;
			if (!value || typeof value !== "object") {
				try {
					to[key] = value;
				} catch {}
				continue;
			}
			if (!seen.includes(from[key])) {
				depth++;
				to[key] = continueDestroyCircular(from[key]);
				continue;
			}
			to[key] = "[Circular]";
		}
		for (const { property, enumerable } of commonProperties) if (typeof from[property] !== "undefined" && from[property] !== null) Object.defineProperty(to, property, {
			value: isErrorLike(from[property]) ? continueDestroyCircular(from[property]) : from[property],
			enumerable: forceEnumerable ? true : enumerable,
			configurable: true,
			writable: true
		});
		return to;
	};
	function serializeError(value, options = {}) {
		const { maxDepth = Number.POSITIVE_INFINITY, useToJSON = true } = options;
		if (typeof value === "object" && value !== null) return destroyCircular({
			from: value,
			seen: [],
			forceEnumerable: true,
			maxDepth,
			depth: 0,
			useToJSON,
			serialize: true
		});
		if (typeof value === "function") return `[Function: ${value.name || "anonymous"}]`;
		return value;
	}
	function deserializeError(value, options = {}) {
		const { maxDepth = Number.POSITIVE_INFINITY } = options;
		if (value instanceof Error) return value;
		if (isMinimumViableSerializedError(value)) return destroyCircular({
			from: value,
			seen: [],
			to: new (getErrorConstructor(value.name))(),
			maxDepth,
			depth: 0,
			serialize: false
		});
		return new NonError(value);
	}
	function isErrorLike(value) {
		return Boolean(value) && typeof value === "object" && "name" in value && "message" in value && "stack" in value;
	}
	function isMinimumViableSerializedError(value) {
		return Boolean(value) && typeof value === "object" && "message" in value && !Array.isArray(value);
	}
	//#endregion
	//#region node_modules/@webext-core/messaging/lib/chunk-BQLFSFFZ.js
	var __defProp$1 = Object.defineProperty;
	var __defProps = Object.defineProperties;
	var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
	var __getOwnPropSymbols$1 = Object.getOwnPropertySymbols;
	var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
	var __propIsEnum$1 = Object.prototype.propertyIsEnumerable;
	var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, {
		enumerable: true,
		configurable: true,
		writable: true,
		value
	}) : obj[key] = value;
	var __spreadValues$1 = (a, b) => {
		for (var prop in b || (b = {})) if (__hasOwnProp$1.call(b, prop)) __defNormalProp$1(a, prop, b[prop]);
		if (__getOwnPropSymbols$1) {
			for (var prop of __getOwnPropSymbols$1(b)) if (__propIsEnum$1.call(b, prop)) __defNormalProp$1(a, prop, b[prop]);
		}
		return a;
	};
	var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
	var __async$1 = (__this, __arguments, generator) => {
		return new Promise((resolve, reject) => {
			var fulfilled = (value) => {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			};
			var rejected = (value) => {
				try {
					step(generator.throw(value));
				} catch (e) {
					reject(e);
				}
			};
			var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
			step((generator = generator.apply(__this, __arguments)).next());
		});
	};
	function defineGenericMessanging(config) {
		let removeRootListener;
		let perTypeListeners = {};
		function cleanupRootListener() {
			if (Object.entries(perTypeListeners).length === 0) {
				removeRootListener?.();
				removeRootListener = void 0;
			}
		}
		let idSeq = Math.floor(Math.random() * 1e4);
		function getNextId() {
			return idSeq++;
		}
		return {
			sendMessage(type, data, ...args) {
				return __async$1(this, null, function* () {
					var _a2, _b, _c, _d;
					const _message = {
						id: getNextId(),
						type,
						data,
						timestamp: Date.now()
					};
					const message = (_b = yield (_a2 = config.verifyMessageData) == null ? void 0 : _a2.call(config, _message)) != null ? _b : _message;
					(_c = config.logger) == null || _c.debug(`[messaging] sendMessage {id=${message.id}} \u2500\u1405`, message, ...args);
					const response = yield config.sendMessage(message, ...args);
					const { res, err } = response != null ? response : { err: /* @__PURE__ */ new Error("No response") };
					(_d = config.logger) == null || _d.debug(`[messaging] sendMessage {id=${message.id}} \u140A\u2500`, {
						res,
						err
					});
					if (err != null) throw deserializeError(err);
					return res;
				});
			},
			onMessage(type, onReceived) {
				var _a2, _b, _c;
				if (removeRootListener == null) {
					(_a2 = config.logger) == null || _a2.debug(`[messaging] "${type}" initialized the message listener for this context`);
					removeRootListener = config.addRootListener((message) => {
						var _a3, _b2;
						if (typeof message.type != "string" || typeof message.timestamp !== "number") {
							if (config.breakError) return;
							const err = Error(`[messaging] Unknown message format, must include the 'type' & 'timestamp' fields, received: ${JSON.stringify(message)}`);
							(_a3 = config.logger) == null || _a3.error(err);
							throw err;
						}
						(_b2 = config == null ? void 0 : config.logger) == null || _b2.debug("[messaging] Received message", message);
						const listener = perTypeListeners[message.type];
						if (listener == null) return;
						const res = listener(message);
						return Promise.resolve(res).then((res2) => {
							var _a4, _b3;
							return (_b3 = (_a4 = config.verifyMessageData) == null ? void 0 : _a4.call(config, res2)) != null ? _b3 : res2;
						}).then((res2) => {
							var _a4;
							(_a4 = config == null ? void 0 : config.logger) == null || _a4.debug(`[messaging] onMessage {id=${message.id}} \u2500\u1405`, { res: res2 });
							return { res: res2 };
						}).catch((err) => {
							var _a4;
							(_a4 = config == null ? void 0 : config.logger) == null || _a4.debug(`[messaging] onMessage {id=${message.id}} \u2500\u1405`, { err });
							return { err: serializeError(err) };
						});
					});
				}
				if (perTypeListeners[type] != null) {
					const err = Error(`[messaging] In this JS context, only one listener can be setup for ${type}`);
					(_b = config.logger) == null || _b.error(err);
					throw err;
				}
				perTypeListeners[type] = onReceived;
				(_c = config.logger) == null || _c.log(`[messaging] Added listener for ${type}`);
				return () => {
					delete perTypeListeners[type];
					cleanupRootListener();
				};
			},
			removeAllListeners() {
				Object.keys(perTypeListeners).forEach((type) => {
					delete perTypeListeners[type];
				});
				cleanupRootListener();
			}
		};
	}
	//#endregion
	//#region node_modules/@webext-core/messaging/lib/index.js
	var import_browser_polyfill = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
		(function(global, factory) {
			if (typeof define === "function" && define.amd) define("webextension-polyfill", ["module"], factory);
			else if (typeof exports !== "undefined") factory(module);
			else {
				var mod = { exports: {} };
				factory(mod);
				global.browser = mod.exports;
			}
		})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : exports, function(module$1) {
			"use strict";
			if (!globalThis.chrome?.runtime?.id) throw new Error("This script should only be loaded in a browser extension.");
			if (typeof globalThis.browser === "undefined" || Object.getPrototypeOf(globalThis.browser) !== Object.prototype) {
				const CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE = "The message port closed before a response was received.";
				const wrapAPIs = (extensionAPIs) => {
					const apiMetadata = {
						"alarms": {
							"clear": {
								"minArgs": 0,
								"maxArgs": 1
							},
							"clearAll": {
								"minArgs": 0,
								"maxArgs": 0
							},
							"get": {
								"minArgs": 0,
								"maxArgs": 1
							},
							"getAll": {
								"minArgs": 0,
								"maxArgs": 0
							}
						},
						"bookmarks": {
							"create": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"get": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"getChildren": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"getRecent": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"getSubTree": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"getTree": {
								"minArgs": 0,
								"maxArgs": 0
							},
							"move": {
								"minArgs": 2,
								"maxArgs": 2
							},
							"remove": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"removeTree": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"search": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"update": {
								"minArgs": 2,
								"maxArgs": 2
							}
						},
						"browserAction": {
							"disable": {
								"minArgs": 0,
								"maxArgs": 1,
								"fallbackToNoCallback": true
							},
							"enable": {
								"minArgs": 0,
								"maxArgs": 1,
								"fallbackToNoCallback": true
							},
							"getBadgeBackgroundColor": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"getBadgeText": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"getPopup": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"getTitle": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"openPopup": {
								"minArgs": 0,
								"maxArgs": 0
							},
							"setBadgeBackgroundColor": {
								"minArgs": 1,
								"maxArgs": 1,
								"fallbackToNoCallback": true
							},
							"setBadgeText": {
								"minArgs": 1,
								"maxArgs": 1,
								"fallbackToNoCallback": true
							},
							"setIcon": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"setPopup": {
								"minArgs": 1,
								"maxArgs": 1,
								"fallbackToNoCallback": true
							},
							"setTitle": {
								"minArgs": 1,
								"maxArgs": 1,
								"fallbackToNoCallback": true
							}
						},
						"browsingData": {
							"remove": {
								"minArgs": 2,
								"maxArgs": 2
							},
							"removeCache": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"removeCookies": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"removeDownloads": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"removeFormData": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"removeHistory": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"removeLocalStorage": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"removePasswords": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"removePluginData": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"settings": {
								"minArgs": 0,
								"maxArgs": 0
							}
						},
						"commands": { "getAll": {
							"minArgs": 0,
							"maxArgs": 0
						} },
						"contextMenus": {
							"remove": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"removeAll": {
								"minArgs": 0,
								"maxArgs": 0
							},
							"update": {
								"minArgs": 2,
								"maxArgs": 2
							}
						},
						"cookies": {
							"get": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"getAll": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"getAllCookieStores": {
								"minArgs": 0,
								"maxArgs": 0
							},
							"remove": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"set": {
								"minArgs": 1,
								"maxArgs": 1
							}
						},
						"devtools": {
							"inspectedWindow": { "eval": {
								"minArgs": 1,
								"maxArgs": 2,
								"singleCallbackArg": false
							} },
							"panels": {
								"create": {
									"minArgs": 3,
									"maxArgs": 3,
									"singleCallbackArg": true
								},
								"elements": { "createSidebarPane": {
									"minArgs": 1,
									"maxArgs": 1
								} }
							}
						},
						"downloads": {
							"cancel": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"download": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"erase": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"getFileIcon": {
								"minArgs": 1,
								"maxArgs": 2
							},
							"open": {
								"minArgs": 1,
								"maxArgs": 1,
								"fallbackToNoCallback": true
							},
							"pause": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"removeFile": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"resume": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"search": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"show": {
								"minArgs": 1,
								"maxArgs": 1,
								"fallbackToNoCallback": true
							}
						},
						"extension": {
							"isAllowedFileSchemeAccess": {
								"minArgs": 0,
								"maxArgs": 0
							},
							"isAllowedIncognitoAccess": {
								"minArgs": 0,
								"maxArgs": 0
							}
						},
						"history": {
							"addUrl": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"deleteAll": {
								"minArgs": 0,
								"maxArgs": 0
							},
							"deleteRange": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"deleteUrl": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"getVisits": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"search": {
								"minArgs": 1,
								"maxArgs": 1
							}
						},
						"i18n": {
							"detectLanguage": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"getAcceptLanguages": {
								"minArgs": 0,
								"maxArgs": 0
							}
						},
						"identity": { "launchWebAuthFlow": {
							"minArgs": 1,
							"maxArgs": 1
						} },
						"idle": { "queryState": {
							"minArgs": 1,
							"maxArgs": 1
						} },
						"management": {
							"get": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"getAll": {
								"minArgs": 0,
								"maxArgs": 0
							},
							"getSelf": {
								"minArgs": 0,
								"maxArgs": 0
							},
							"setEnabled": {
								"minArgs": 2,
								"maxArgs": 2
							},
							"uninstallSelf": {
								"minArgs": 0,
								"maxArgs": 1
							}
						},
						"notifications": {
							"clear": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"create": {
								"minArgs": 1,
								"maxArgs": 2
							},
							"getAll": {
								"minArgs": 0,
								"maxArgs": 0
							},
							"getPermissionLevel": {
								"minArgs": 0,
								"maxArgs": 0
							},
							"update": {
								"minArgs": 2,
								"maxArgs": 2
							}
						},
						"pageAction": {
							"getPopup": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"getTitle": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"hide": {
								"minArgs": 1,
								"maxArgs": 1,
								"fallbackToNoCallback": true
							},
							"setIcon": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"setPopup": {
								"minArgs": 1,
								"maxArgs": 1,
								"fallbackToNoCallback": true
							},
							"setTitle": {
								"minArgs": 1,
								"maxArgs": 1,
								"fallbackToNoCallback": true
							},
							"show": {
								"minArgs": 1,
								"maxArgs": 1,
								"fallbackToNoCallback": true
							}
						},
						"permissions": {
							"contains": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"getAll": {
								"minArgs": 0,
								"maxArgs": 0
							},
							"remove": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"request": {
								"minArgs": 1,
								"maxArgs": 1
							}
						},
						"runtime": {
							"getBackgroundPage": {
								"minArgs": 0,
								"maxArgs": 0
							},
							"getPlatformInfo": {
								"minArgs": 0,
								"maxArgs": 0
							},
							"openOptionsPage": {
								"minArgs": 0,
								"maxArgs": 0
							},
							"requestUpdateCheck": {
								"minArgs": 0,
								"maxArgs": 0
							},
							"sendMessage": {
								"minArgs": 1,
								"maxArgs": 3
							},
							"sendNativeMessage": {
								"minArgs": 2,
								"maxArgs": 2
							},
							"setUninstallURL": {
								"minArgs": 1,
								"maxArgs": 1
							}
						},
						"sessions": {
							"getDevices": {
								"minArgs": 0,
								"maxArgs": 1
							},
							"getRecentlyClosed": {
								"minArgs": 0,
								"maxArgs": 1
							},
							"restore": {
								"minArgs": 0,
								"maxArgs": 1
							}
						},
						"storage": {
							"local": {
								"clear": {
									"minArgs": 0,
									"maxArgs": 0
								},
								"get": {
									"minArgs": 0,
									"maxArgs": 1
								},
								"getBytesInUse": {
									"minArgs": 0,
									"maxArgs": 1
								},
								"remove": {
									"minArgs": 1,
									"maxArgs": 1
								},
								"set": {
									"minArgs": 1,
									"maxArgs": 1
								}
							},
							"managed": {
								"get": {
									"minArgs": 0,
									"maxArgs": 1
								},
								"getBytesInUse": {
									"minArgs": 0,
									"maxArgs": 1
								}
							},
							"sync": {
								"clear": {
									"minArgs": 0,
									"maxArgs": 0
								},
								"get": {
									"minArgs": 0,
									"maxArgs": 1
								},
								"getBytesInUse": {
									"minArgs": 0,
									"maxArgs": 1
								},
								"remove": {
									"minArgs": 1,
									"maxArgs": 1
								},
								"set": {
									"minArgs": 1,
									"maxArgs": 1
								}
							}
						},
						"tabs": {
							"captureVisibleTab": {
								"minArgs": 0,
								"maxArgs": 2
							},
							"create": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"detectLanguage": {
								"minArgs": 0,
								"maxArgs": 1
							},
							"discard": {
								"minArgs": 0,
								"maxArgs": 1
							},
							"duplicate": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"executeScript": {
								"minArgs": 1,
								"maxArgs": 2
							},
							"get": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"getCurrent": {
								"minArgs": 0,
								"maxArgs": 0
							},
							"getZoom": {
								"minArgs": 0,
								"maxArgs": 1
							},
							"getZoomSettings": {
								"minArgs": 0,
								"maxArgs": 1
							},
							"goBack": {
								"minArgs": 0,
								"maxArgs": 1
							},
							"goForward": {
								"minArgs": 0,
								"maxArgs": 1
							},
							"highlight": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"insertCSS": {
								"minArgs": 1,
								"maxArgs": 2
							},
							"move": {
								"minArgs": 2,
								"maxArgs": 2
							},
							"query": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"reload": {
								"minArgs": 0,
								"maxArgs": 2
							},
							"remove": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"removeCSS": {
								"minArgs": 1,
								"maxArgs": 2
							},
							"sendMessage": {
								"minArgs": 2,
								"maxArgs": 3
							},
							"setZoom": {
								"minArgs": 1,
								"maxArgs": 2
							},
							"setZoomSettings": {
								"minArgs": 1,
								"maxArgs": 2
							},
							"update": {
								"minArgs": 1,
								"maxArgs": 2
							}
						},
						"topSites": { "get": {
							"minArgs": 0,
							"maxArgs": 0
						} },
						"webNavigation": {
							"getAllFrames": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"getFrame": {
								"minArgs": 1,
								"maxArgs": 1
							}
						},
						"webRequest": { "handlerBehaviorChanged": {
							"minArgs": 0,
							"maxArgs": 0
						} },
						"windows": {
							"create": {
								"minArgs": 0,
								"maxArgs": 1
							},
							"get": {
								"minArgs": 1,
								"maxArgs": 2
							},
							"getAll": {
								"minArgs": 0,
								"maxArgs": 1
							},
							"getCurrent": {
								"minArgs": 0,
								"maxArgs": 1
							},
							"getLastFocused": {
								"minArgs": 0,
								"maxArgs": 1
							},
							"remove": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"update": {
								"minArgs": 2,
								"maxArgs": 2
							}
						}
					};
					if (Object.keys(apiMetadata).length === 0) throw new Error("api-metadata.json has not been included in browser-polyfill");
					/**
					* A WeakMap subclass which creates and stores a value for any key which does
					* not exist when accessed, but behaves exactly as an ordinary WeakMap
					* otherwise.
					*
					* @param {function} createItem
					*        A function which will be called in order to create the value for any
					*        key which does not exist, the first time it is accessed. The
					*        function receives, as its only argument, the key being created.
					*/
					class DefaultWeakMap extends WeakMap {
						constructor(createItem, items = void 0) {
							super(items);
							this.createItem = createItem;
						}
						get(key) {
							if (!this.has(key)) this.set(key, this.createItem(key));
							return super.get(key);
						}
					}
					/**
					* Returns true if the given object is an object with a `then` method, and can
					* therefore be assumed to behave as a Promise.
					*
					* @param {*} value The value to test.
					* @returns {boolean} True if the value is thenable.
					*/
					const isThenable = (value) => {
						return value && typeof value === "object" && typeof value.then === "function";
					};
					/**
					* Creates and returns a function which, when called, will resolve or reject
					* the given promise based on how it is called:
					*
					* - If, when called, `chrome.runtime.lastError` contains a non-null object,
					*   the promise is rejected with that value.
					* - If the function is called with exactly one argument, the promise is
					*   resolved to that value.
					* - Otherwise, the promise is resolved to an array containing all of the
					*   function's arguments.
					*
					* @param {object} promise
					*        An object containing the resolution and rejection functions of a
					*        promise.
					* @param {function} promise.resolve
					*        The promise's resolution function.
					* @param {function} promise.reject
					*        The promise's rejection function.
					* @param {object} metadata
					*        Metadata about the wrapped method which has created the callback.
					* @param {boolean} metadata.singleCallbackArg
					*        Whether or not the promise is resolved with only the first
					*        argument of the callback, alternatively an array of all the
					*        callback arguments is resolved. By default, if the callback
					*        function is invoked with only a single argument, that will be
					*        resolved to the promise, while all arguments will be resolved as
					*        an array if multiple are given.
					*
					* @returns {function}
					*        The generated callback function.
					*/
					const makeCallback = (promise, metadata) => {
						return (...callbackArgs) => {
							if (extensionAPIs.runtime.lastError) promise.reject(new Error(extensionAPIs.runtime.lastError.message));
							else if (metadata.singleCallbackArg || callbackArgs.length <= 1 && metadata.singleCallbackArg !== false) promise.resolve(callbackArgs[0]);
							else promise.resolve(callbackArgs);
						};
					};
					const pluralizeArguments = (numArgs) => numArgs == 1 ? "argument" : "arguments";
					/**
					* Creates a wrapper function for a method with the given name and metadata.
					*
					* @param {string} name
					*        The name of the method which is being wrapped.
					* @param {object} metadata
					*        Metadata about the method being wrapped.
					* @param {integer} metadata.minArgs
					*        The minimum number of arguments which must be passed to the
					*        function. If called with fewer than this number of arguments, the
					*        wrapper will raise an exception.
					* @param {integer} metadata.maxArgs
					*        The maximum number of arguments which may be passed to the
					*        function. If called with more than this number of arguments, the
					*        wrapper will raise an exception.
					* @param {boolean} metadata.singleCallbackArg
					*        Whether or not the promise is resolved with only the first
					*        argument of the callback, alternatively an array of all the
					*        callback arguments is resolved. By default, if the callback
					*        function is invoked with only a single argument, that will be
					*        resolved to the promise, while all arguments will be resolved as
					*        an array if multiple are given.
					*
					* @returns {function(object, ...*)}
					*       The generated wrapper function.
					*/
					const wrapAsyncFunction = (name, metadata) => {
						return function asyncFunctionWrapper(target, ...args) {
							if (args.length < metadata.minArgs) throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
							if (args.length > metadata.maxArgs) throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
							return new Promise((resolve, reject) => {
								if (metadata.fallbackToNoCallback) try {
									target[name](...args, makeCallback({
										resolve,
										reject
									}, metadata));
								} catch (cbError) {
									console.warn(`${name} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `, cbError);
									target[name](...args);
									metadata.fallbackToNoCallback = false;
									metadata.noCallback = true;
									resolve();
								}
								else if (metadata.noCallback) {
									target[name](...args);
									resolve();
								} else target[name](...args, makeCallback({
									resolve,
									reject
								}, metadata));
							});
						};
					};
					/**
					* Wraps an existing method of the target object, so that calls to it are
					* intercepted by the given wrapper function. The wrapper function receives,
					* as its first argument, the original `target` object, followed by each of
					* the arguments passed to the original method.
					*
					* @param {object} target
					*        The original target object that the wrapped method belongs to.
					* @param {function} method
					*        The method being wrapped. This is used as the target of the Proxy
					*        object which is created to wrap the method.
					* @param {function} wrapper
					*        The wrapper function which is called in place of a direct invocation
					*        of the wrapped method.
					*
					* @returns {Proxy<function>}
					*        A Proxy object for the given method, which invokes the given wrapper
					*        method in its place.
					*/
					const wrapMethod = (target, method, wrapper) => {
						return new Proxy(method, { apply(targetMethod, thisObj, args) {
							return wrapper.call(thisObj, target, ...args);
						} });
					};
					let hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);
					/**
					* Wraps an object in a Proxy which intercepts and wraps certain methods
					* based on the given `wrappers` and `metadata` objects.
					*
					* @param {object} target
					*        The target object to wrap.
					*
					* @param {object} [wrappers = {}]
					*        An object tree containing wrapper functions for special cases. Any
					*        function present in this object tree is called in place of the
					*        method in the same location in the `target` object tree. These
					*        wrapper methods are invoked as described in {@see wrapMethod}.
					*
					* @param {object} [metadata = {}]
					*        An object tree containing metadata used to automatically generate
					*        Promise-based wrapper functions for asynchronous. Any function in
					*        the `target` object tree which has a corresponding metadata object
					*        in the same location in the `metadata` tree is replaced with an
					*        automatically-generated wrapper function, as described in
					*        {@see wrapAsyncFunction}
					*
					* @returns {Proxy<object>}
					*/
					const wrapObject = (target, wrappers = {}, metadata = {}) => {
						let cache = Object.create(null);
						return new Proxy(Object.create(target), {
							has(proxyTarget, prop) {
								return prop in target || prop in cache;
							},
							get(proxyTarget, prop, receiver) {
								if (prop in cache) return cache[prop];
								if (!(prop in target)) return;
								let value = target[prop];
								if (typeof value === "function") if (typeof wrappers[prop] === "function") value = wrapMethod(target, target[prop], wrappers[prop]);
								else if (hasOwnProperty(metadata, prop)) {
									let wrapper = wrapAsyncFunction(prop, metadata[prop]);
									value = wrapMethod(target, target[prop], wrapper);
								} else value = value.bind(target);
								else if (typeof value === "object" && value !== null && (hasOwnProperty(wrappers, prop) || hasOwnProperty(metadata, prop))) value = wrapObject(value, wrappers[prop], metadata[prop]);
								else if (hasOwnProperty(metadata, "*")) value = wrapObject(value, wrappers[prop], metadata["*"]);
								else {
									Object.defineProperty(cache, prop, {
										configurable: true,
										enumerable: true,
										get() {
											return target[prop];
										},
										set(value) {
											target[prop] = value;
										}
									});
									return value;
								}
								cache[prop] = value;
								return value;
							},
							set(proxyTarget, prop, value, receiver) {
								if (prop in cache) cache[prop] = value;
								else target[prop] = value;
								return true;
							},
							defineProperty(proxyTarget, prop, desc) {
								return Reflect.defineProperty(cache, prop, desc);
							},
							deleteProperty(proxyTarget, prop) {
								return Reflect.deleteProperty(cache, prop);
							}
						});
					};
					/**
					* Creates a set of wrapper functions for an event object, which handles
					* wrapping of listener functions that those messages are passed.
					*
					* A single wrapper is created for each listener function, and stored in a
					* map. Subsequent calls to `addListener`, `hasListener`, or `removeListener`
					* retrieve the original wrapper, so that  attempts to remove a
					* previously-added listener work as expected.
					*
					* @param {DefaultWeakMap<function, function>} wrapperMap
					*        A DefaultWeakMap object which will create the appropriate wrapper
					*        for a given listener function when one does not exist, and retrieve
					*        an existing one when it does.
					*
					* @returns {object}
					*/
					const wrapEvent = (wrapperMap) => ({
						addListener(target, listener, ...args) {
							target.addListener(wrapperMap.get(listener), ...args);
						},
						hasListener(target, listener) {
							return target.hasListener(wrapperMap.get(listener));
						},
						removeListener(target, listener) {
							target.removeListener(wrapperMap.get(listener));
						}
					});
					const onRequestFinishedWrappers = new DefaultWeakMap((listener) => {
						if (typeof listener !== "function") return listener;
						/**
						* Wraps an onRequestFinished listener function so that it will return a
						* `getContent()` property which returns a `Promise` rather than using a
						* callback API.
						*
						* @param {object} req
						*        The HAR entry object representing the network request.
						*/
						return function onRequestFinished(req) {
							listener(wrapObject(req, {}, { getContent: {
								minArgs: 0,
								maxArgs: 0
							} }));
						};
					});
					const onMessageWrappers = new DefaultWeakMap((listener) => {
						if (typeof listener !== "function") return listener;
						/**
						* Wraps a message listener function so that it may send responses based on
						* its return value, rather than by returning a sentinel value and calling a
						* callback. If the listener function returns a Promise, the response is
						* sent when the promise either resolves or rejects.
						*
						* @param {*} message
						*        The message sent by the other end of the channel.
						* @param {object} sender
						*        Details about the sender of the message.
						* @param {function(*)} sendResponse
						*        A callback which, when called with an arbitrary argument, sends
						*        that value as a response.
						* @returns {boolean}
						*        True if the wrapped listener returned a Promise, which will later
						*        yield a response. False otherwise.
						*/
						return function onMessage(message, sender, sendResponse) {
							let didCallSendResponse = false;
							let wrappedSendResponse;
							let sendResponsePromise = new Promise((resolve) => {
								wrappedSendResponse = function(response) {
									didCallSendResponse = true;
									resolve(response);
								};
							});
							let result;
							try {
								result = listener(message, sender, wrappedSendResponse);
							} catch (err) {
								result = Promise.reject(err);
							}
							const isResultThenable = result !== true && isThenable(result);
							if (result !== true && !isResultThenable && !didCallSendResponse) return false;
							const sendPromisedResult = (promise) => {
								promise.then((msg) => {
									sendResponse(msg);
								}, (error) => {
									let message;
									if (error && (error instanceof Error || typeof error.message === "string")) message = error.message;
									else message = "An unexpected error occurred";
									sendResponse({
										__mozWebExtensionPolyfillReject__: true,
										message
									});
								}).catch((err) => {
									console.error("Failed to send onMessage rejected reply", err);
								});
							};
							if (isResultThenable) sendPromisedResult(result);
							else sendPromisedResult(sendResponsePromise);
							return true;
						};
					});
					const wrappedSendMessageCallback = ({ reject, resolve }, reply) => {
						if (extensionAPIs.runtime.lastError) if (extensionAPIs.runtime.lastError.message === CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE) resolve();
						else reject(new Error(extensionAPIs.runtime.lastError.message));
						else if (reply && reply.__mozWebExtensionPolyfillReject__) reject(new Error(reply.message));
						else resolve(reply);
					};
					const wrappedSendMessage = (name, metadata, apiNamespaceObj, ...args) => {
						if (args.length < metadata.minArgs) throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
						if (args.length > metadata.maxArgs) throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
						return new Promise((resolve, reject) => {
							const wrappedCb = wrappedSendMessageCallback.bind(null, {
								resolve,
								reject
							});
							args.push(wrappedCb);
							apiNamespaceObj.sendMessage(...args);
						});
					};
					const staticWrappers = {
						devtools: { network: { onRequestFinished: wrapEvent(onRequestFinishedWrappers) } },
						runtime: {
							onMessage: wrapEvent(onMessageWrappers),
							onMessageExternal: wrapEvent(onMessageWrappers),
							sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
								minArgs: 1,
								maxArgs: 3
							})
						},
						tabs: { sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
							minArgs: 2,
							maxArgs: 3
						}) }
					};
					const settingMetadata = {
						clear: {
							minArgs: 1,
							maxArgs: 1
						},
						get: {
							minArgs: 1,
							maxArgs: 1
						},
						set: {
							minArgs: 1,
							maxArgs: 1
						}
					};
					apiMetadata.privacy = {
						network: { "*": settingMetadata },
						services: { "*": settingMetadata },
						websites: { "*": settingMetadata }
					};
					return wrapObject(extensionAPIs, staticWrappers, apiMetadata);
				};
				module$1.exports = wrapAPIs(chrome);
			} else module$1.exports = globalThis.browser;
		});
	})))(), 1);
	function defineExtensionMessaging(config) {
		return defineGenericMessanging(__spreadProps(__spreadValues$1({}, config), {
			sendMessage(message, arg) {
				if (arg == null) return import_browser_polyfill.default.runtime.sendMessage(message);
				const options = typeof arg === "number" ? { tabId: arg } : arg;
				return import_browser_polyfill.default.tabs.sendMessage(options.tabId, message, options.frameId != null ? { frameId: options.frameId } : void 0);
			},
			addRootListener(processMessage) {
				const listener = (message, sender) => {
					if (typeof message === "object") return processMessage(__spreadProps(__spreadValues$1({}, message), { sender }));
					else return processMessage(message);
				};
				import_browser_polyfill.default.runtime.onMessage.addListener(listener);
				return () => import_browser_polyfill.default.runtime.onMessage.removeListener(listener);
			}
		}));
	}
	//#endregion
	//#region node_modules/@webext-core/proxy-service/lib/index.js
	var __defProp = Object.defineProperty;
	var __getOwnPropSymbols = Object.getOwnPropertySymbols;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __propIsEnum = Object.prototype.propertyIsEnumerable;
	var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {
		enumerable: true,
		configurable: true,
		writable: true,
		value
	}) : obj[key] = value;
	var __spreadValues = (a, b) => {
		for (var prop in b || (b = {})) if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
		if (__getOwnPropSymbols) {
			for (var prop of __getOwnPropSymbols(b)) if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
		}
		return a;
	};
	var __async = (__this, __arguments, generator) => {
		return new Promise((resolve, reject) => {
			var fulfilled = (value) => {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			};
			var rejected = (value) => {
				try {
					step(generator.throw(value));
				} catch (e) {
					reject(e);
				}
			};
			var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
			step((generator = generator.apply(__this, __arguments)).next());
		});
	};
	function createProxyService(key, config) {
		return createProxy(defineProxyMessaging(key, config));
	}
	function registerService(key, realService, config) {
		const messenger = defineProxyMessaging(key, config);
		return messenger.onMessage(messenger.messageKey, ({ data }) => {
			const method = data.path == null ? realService : get(realService != null ? realService : {}, data.path);
			if (method) return Promise.resolve(method.bind(realService)(...data.args));
		});
	}
	function defineProxyMessaging(key, config) {
		const messaging = defineExtensionMessaging(config);
		return __spreadValues({ messageKey: `proxy-service.${key}` }, messaging);
	}
	function createProxy(messenger, path) {
		const wrapped = () => {};
		const proxy = new Proxy(wrapped, {
			apply(_target, _thisArg, args) {
				return __async(this, null, function* () {
					return yield messenger.sendMessage(messenger.messageKey, {
						path,
						args
					});
				});
			},
			get(target, propertyName, receiver) {
				if (typeof propertyName === "symbol") return Reflect.get(target, propertyName, receiver);
				return createProxy(messenger, path == null ? [propertyName] : path.concat([propertyName]));
			}
		});
		proxy[ProxyServiceSymbol] = true;
		return proxy;
	}
	var ProxyServiceSymbol = Symbol();
	function get(obj, path) {
		if (path.length === 0) return obj;
		return path.reduce((acc, key) => acc == null ? void 0 : acc[key], obj);
	}
	//#endregion
	//#region extension/utils/common/data/default-database.ts
	var DefaultSetting = class {
		type;
		defaultValue;
		constructor(type, defaultValue) {
			this.type = type;
			this.defaultValue = defaultValue;
		}
	};
	var DEFAULT_STORAGE = {
		version: {
			current: new DefaultSetting("string", () => browser$1.runtime.getManifest().version),
			initial: new DefaultSetting("string", () => browser$1.runtime.getManifest().version),
			oldVersion: new DefaultSetting("string"),
			showNotice: new DefaultSetting("boolean", true)
		},
		api: {
			torn: {
				key: new DefaultSetting("string"),
				online: new DefaultSetting("boolean", true),
				error: new DefaultSetting("string")
			},
			tornstats: { key: new DefaultSetting("string") },
			yata: { key: new DefaultSetting("string") },
			ffScouter: { key: new DefaultSetting("string") }
		},
		settings: {
			updateNotice: new DefaultSetting("boolean", true),
			featureDisplay: new DefaultSetting("boolean", true),
			featureDisplayPosition: new DefaultSetting("string", "bottom-left"),
			featureDisplayOnlyFailed: new DefaultSetting("boolean", false),
			featureDisplayHideDisabled: new DefaultSetting("boolean", false),
			featureDisplayHideEmpty: new DefaultSetting("boolean", true),
			developer: new DefaultSetting("boolean", false),
			formatting: {
				tct: new DefaultSetting("boolean", false),
				date: new DefaultSetting("string", "eu"),
				time: new DefaultSetting("string", "eu")
			},
			sorting: { abroad: {
				column: new DefaultSetting("string", ""),
				order: new DefaultSetting("string", "none")
			} },
			notifications: {
				sound: new DefaultSetting("string", "default"),
				soundCustom: new DefaultSetting("string", ""),
				tts: new DefaultSetting("boolean", false),
				ttsVoice: new DefaultSetting("string", "default"),
				ttsRate: new DefaultSetting("number", 1),
				link: new DefaultSetting("boolean", true),
				volume: new DefaultSetting("number", 100),
				requireInteraction: new DefaultSetting("boolean", false),
				types: {
					global: new DefaultSetting("boolean", () => typeof Notification !== "undefined" && Notification.permission === "granted"),
					events: new DefaultSetting("boolean", true),
					messages: new DefaultSetting("boolean", true),
					status: new DefaultSetting("boolean", true),
					traveling: new DefaultSetting("boolean", true),
					cooldowns: new DefaultSetting("boolean", true),
					education: new DefaultSetting("boolean", true),
					newDay: new DefaultSetting("boolean", true),
					energy: new DefaultSetting("array", ["100%"]),
					nerve: new DefaultSetting("array", ["100%"]),
					happy: new DefaultSetting("array", ["100%"]),
					life: new DefaultSetting("array", ["100%"]),
					offline: new DefaultSetting("array", []),
					chainTimerEnabled: new DefaultSetting("boolean", true),
					chainBonusEnabled: new DefaultSetting("boolean", true),
					leavingHospitalEnabled: new DefaultSetting("boolean", true),
					landingEnabled: new DefaultSetting("boolean", true),
					cooldownDrugEnabled: new DefaultSetting("boolean", true),
					cooldownBoosterEnabled: new DefaultSetting("boolean", true),
					cooldownMedicalEnabled: new DefaultSetting("boolean", true),
					chainTimer: new DefaultSetting("array", []),
					chainBonus: new DefaultSetting("array", []),
					leavingHospital: new DefaultSetting("array", []),
					landing: new DefaultSetting("array", []),
					cooldownDrug: new DefaultSetting("array", []),
					cooldownBooster: new DefaultSetting("array", []),
					cooldownMedical: new DefaultSetting("array", []),
					stocks: new DefaultSetting("object", {}),
					missionsLimitEnabled: new DefaultSetting("boolean", false),
					missionsLimit: new DefaultSetting("string", ""),
					missionsExpireEnabled: new DefaultSetting("boolean", false),
					missionsExpire: new DefaultSetting("array", []),
					npcsGlobal: new DefaultSetting("boolean", true),
					npcs: new DefaultSetting("array", []),
					npcPlannedEnabled: new DefaultSetting("boolean", true),
					npcPlanned: new DefaultSetting("array", []),
					refillEnergyEnabled: new DefaultSetting("boolean", true),
					refillEnergy: new DefaultSetting("string", ""),
					refillNerveEnabled: new DefaultSetting("boolean", true),
					refillNerve: new DefaultSetting("string", "")
				}
			},
			apiUsage: {
				comment: new DefaultSetting("string", "TornTools"),
				delayEssential: new DefaultSetting("number", 30),
				delayBasic: new DefaultSetting("number", 120),
				delayStakeouts: new DefaultSetting("number", 30),
				user: {
					bars: new DefaultSetting("boolean", true),
					cooldowns: new DefaultSetting("boolean", true),
					travel: new DefaultSetting("boolean", true),
					newevents: new DefaultSetting("boolean", true),
					newmessages: new DefaultSetting("boolean", true),
					refills: new DefaultSetting("boolean", true),
					stocks: new DefaultSetting("boolean", true),
					education: new DefaultSetting("boolean", true),
					networth: new DefaultSetting("boolean", true),
					inventory: new DefaultSetting("boolean", true),
					jobpoints: new DefaultSetting("boolean", true),
					merits: new DefaultSetting("boolean", true),
					perks: new DefaultSetting("boolean", true),
					icons: new DefaultSetting("boolean", true),
					ammo: new DefaultSetting("boolean", true),
					battlestats: new DefaultSetting("boolean", true),
					crimes: new DefaultSetting("boolean", true),
					workstats: new DefaultSetting("boolean", true),
					skills: new DefaultSetting("boolean", true),
					weaponexp: new DefaultSetting("boolean", true),
					properties: new DefaultSetting("boolean", true),
					calendar: new DefaultSetting("boolean", true),
					organizedcrime: new DefaultSetting("boolean", true),
					missions: new DefaultSetting("boolean", true),
					personalstats: new DefaultSetting("boolean", true),
					attacks: new DefaultSetting("boolean", true),
					money: new DefaultSetting("boolean", true),
					honors: new DefaultSetting("boolean", true),
					medals: new DefaultSetting("boolean", true),
					virus: new DefaultSetting("boolean", true)
				}
			},
			themes: {
				pages: new DefaultSetting("string", "default"),
				containers: new DefaultSetting("string", "default")
			},
			hideIcons: new DefaultSetting("array", []),
			hideCasinoGames: new DefaultSetting("array", []),
			hideStocks: new DefaultSetting("array", []),
			alliedFactions: new DefaultSetting("array", []),
			customLinks: new DefaultSetting("array", []),
			employeeInactivityWarning: new DefaultSetting("array", []),
			factionInactivityWarning: new DefaultSetting("array", []),
			userAlias: new DefaultSetting("object", {}),
			csvDelimiter: new DefaultSetting("string", ";"),
			pages: {
				global: {
					alignLeft: new DefaultSetting("boolean", false),
					hideLevelUpgrade: new DefaultSetting("boolean", false),
					hideQuitButtons: new DefaultSetting("boolean", false),
					hideTutorials: new DefaultSetting("boolean", false),
					keepAttackHistory: new DefaultSetting("boolean", true),
					miniProfileLastAction: new DefaultSetting("boolean", true),
					reviveProvider: new DefaultSetting("string", ""),
					pageTitles: new DefaultSetting("boolean", true),
					stackingMode: new DefaultSetting("boolean", false),
					noOutsideLinkAlert: new DefaultSetting("boolean", false)
				},
				profile: {
					avgpersonalstats: new DefaultSetting("boolean", false),
					statusIndicator: new DefaultSetting("boolean", true),
					idBesideProfileName: new DefaultSetting("boolean", true),
					notes: new DefaultSetting("boolean", true),
					showAllyWarning: new DefaultSetting("boolean", true),
					ageToWords: new DefaultSetting("boolean", true),
					disableAllyAttacks: new DefaultSetting("boolean", true),
					box: new DefaultSetting("boolean", true),
					boxStats: new DefaultSetting("boolean", true),
					boxSpy: new DefaultSetting("boolean", true),
					boxStakeout: new DefaultSetting("boolean", true),
					boxAttackHistory: new DefaultSetting("boolean", true),
					boxFetch: new DefaultSetting("boolean", true)
				},
				chat: {
					fontSize: new DefaultSetting("number", 12),
					searchChat: new DefaultSetting("boolean", true),
					completeUsernames: new DefaultSetting("boolean", true),
					highlights: new DefaultSetting("array", [{
						name: "$player",
						color: "#7ca900"
					}]),
					titleHighlights: new DefaultSetting("array", []),
					tradeTimer: new DefaultSetting("boolean", true),
					resizable: new DefaultSetting("boolean", true),
					hideChatButton: new DefaultSetting("boolean", true),
					hideChat: new DefaultSetting("boolean", false)
				},
				sidebar: {
					notes: new DefaultSetting("boolean", true),
					highlightEnergy: new DefaultSetting("boolean", true),
					highlightNerve: new DefaultSetting("boolean", false),
					ocTimer: new DefaultSetting("boolean", true),
					oc2Timer: new DefaultSetting("boolean", true),
					oc2TimerPosition: new DefaultSetting("boolean", false),
					oc2TimerLevel: new DefaultSetting("boolean", true),
					factionOCTimer: new DefaultSetting("boolean", false),
					collapseAreas: new DefaultSetting("boolean", true),
					settingsLink: new DefaultSetting("boolean", true),
					hideGymHighlight: new DefaultSetting("boolean", false),
					hideNewspaperHighlight: new DefaultSetting("boolean", false),
					upkeepPropHighlight: new DefaultSetting("number", 0),
					barLinks: new DefaultSetting("boolean", true),
					pointsValue: new DefaultSetting("boolean", true),
					npcLootTimes: new DefaultSetting("boolean", true),
					npcLootTimesService: new DefaultSetting("string", "tornstats"),
					cooldownEndTimes: new DefaultSetting("boolean", true),
					companyAddictionLevel: new DefaultSetting("boolean", true),
					showJobPointsToolTip: new DefaultSetting("boolean", true),
					rwTimer: new DefaultSetting("boolean", true),
					virusTimer: new DefaultSetting("boolean", false)
				},
				popup: {
					dashboard: new DefaultSetting("boolean", true),
					marketSearch: new DefaultSetting("boolean", true),
					bazaarUsingExternal: new DefaultSetting("boolean", true),
					calculator: new DefaultSetting("boolean", true),
					stocksOverview: new DefaultSetting("boolean", true),
					notifications: new DefaultSetting("boolean", true),
					defaultTab: new DefaultSetting("string", "dashboard"),
					hoverBarTime: new DefaultSetting("boolean", false),
					showStakeouts: new DefaultSetting("boolean", true),
					showIcons: new DefaultSetting("boolean", true)
				},
				icon: {
					global: new DefaultSetting("boolean", true),
					energy: new DefaultSetting("boolean", true),
					nerve: new DefaultSetting("boolean", true),
					happy: new DefaultSetting("boolean", true),
					life: new DefaultSetting("boolean", true),
					chain: new DefaultSetting("boolean", true),
					travel: new DefaultSetting("boolean", true)
				},
				education: {
					greyOut: new DefaultSetting("boolean", true),
					finishTime: new DefaultSetting("boolean", true)
				},
				jail: { filter: new DefaultSetting("boolean", true) },
				bank: {
					investmentInfo: new DefaultSetting("boolean", true),
					investmentDueTime: new DefaultSetting("boolean", true)
				},
				home: {
					networthDetails: new DefaultSetting("boolean", true),
					effectiveStats: new DefaultSetting("boolean", true)
				},
				items: {
					quickItems: new DefaultSetting("boolean", true),
					values: new DefaultSetting("boolean", true),
					drugDetails: new DefaultSetting("boolean", true),
					marketLinks: new DefaultSetting("boolean", false),
					highlightBloodBags: new DefaultSetting("string", "none"),
					missingFlowers: new DefaultSetting("boolean", false),
					missingPlushies: new DefaultSetting("boolean", false),
					bookEffects: new DefaultSetting("boolean", true),
					canGains: new DefaultSetting("boolean", true),
					nerveGains: new DefaultSetting("boolean", true),
					candyHappyGains: new DefaultSetting("boolean", true),
					energyWarning: new DefaultSetting("boolean", true),
					medicalLife: new DefaultSetting("boolean", true),
					openedSupplyPackValue: new DefaultSetting("boolean", true),
					hideRecycleMessage: new DefaultSetting("boolean", false),
					hideTooManyItemsWarning: new DefaultSetting("boolean", false)
				},
				crimes: { quickCrimes: new DefaultSetting("boolean", true) },
				companies: {
					idBesideCompanyName: new DefaultSetting("boolean", false),
					specials: new DefaultSetting("boolean", true),
					autoStockFill: new DefaultSetting("boolean", true),
					employeeEffectiveness: new DefaultSetting("number", 18)
				},
				travel: {
					computer: new DefaultSetting("boolean", true),
					table: new DefaultSetting("boolean", true),
					cleanFlight: new DefaultSetting("boolean", false),
					tabTitleTimer: new DefaultSetting("boolean", false),
					travelProfits: new DefaultSetting("boolean", true),
					fillMax: new DefaultSetting("boolean", true),
					peopleFilter: new DefaultSetting("boolean", true),
					landingTime: new DefaultSetting("boolean", true),
					flyingTime: new DefaultSetting("boolean", true),
					itemFilter: new DefaultSetting("boolean", true),
					energyWarning: new DefaultSetting("boolean", true),
					cooldownWarnings: new DefaultSetting("boolean", true),
					autoTravelTableCountry: new DefaultSetting("boolean", false),
					autoFillMax: new DefaultSetting("boolean", true),
					efficientRehab: new DefaultSetting("boolean", true),
					efficientRehabSelect: new DefaultSetting("boolean", false)
				},
				stocks: {
					filter: new DefaultSetting("boolean", true),
					acronyms: new DefaultSetting("boolean", true),
					valueAndProfit: new DefaultSetting("boolean", true),
					moneyInput: new DefaultSetting("boolean", true)
				},
				competitions: {
					easterEggs: new DefaultSetting("boolean", false),
					easterEggsAlert: new DefaultSetting("boolean", true)
				},
				events: { worth: new DefaultSetting("boolean", true) },
				hospital: { filter: new DefaultSetting("boolean", true) },
				auction: { filter: new DefaultSetting("boolean", true) },
				api: {
					autoFillKey: new DefaultSetting("boolean", true),
					autoDemo: new DefaultSetting("boolean", false),
					autoPretty: new DefaultSetting("boolean", true),
					clickableSelections: new DefaultSetting("boolean", true)
				},
				forums: {
					menu: new DefaultSetting("boolean", true),
					hidePosts: new DefaultSetting("object", {}),
					hideThreads: new DefaultSetting("object", {}),
					highlightPosts: new DefaultSetting("object", {}),
					highlightThreads: new DefaultSetting("object", {}),
					ignoredThreads: new DefaultSetting("object", {}),
					debugInfoBtn: new DefaultSetting("boolean", true),
					onlyNewFeedButton: new DefaultSetting("boolean", true)
				},
				bazaar: {
					itemsCost: new DefaultSetting("boolean", true),
					worth: new DefaultSetting("boolean", true),
					fillMax: new DefaultSetting("boolean", true),
					maxBuyIgnoreCash: new DefaultSetting("boolean", false),
					highlightSubVendorItems: new DefaultSetting("boolean", false)
				},
				trade: {
					itemValues: new DefaultSetting("boolean", true),
					openChat: new DefaultSetting("boolean", true)
				},
				displayCase: { worth: new DefaultSetting("boolean", true) },
				shops: {
					fillMax: new DefaultSetting("boolean", true),
					maxBuyIgnoreCash: new DefaultSetting("boolean", false),
					profit: new DefaultSetting("boolean", true),
					filters: new DefaultSetting("boolean", true),
					values: new DefaultSetting("boolean", true)
				},
				casino: {
					netTotal: new DefaultSetting("boolean", true),
					blackjack: new DefaultSetting("boolean", true),
					highlow: new DefaultSetting("boolean", false),
					highlowMovement: new DefaultSetting("boolean", true)
				},
				racing: {
					winPercentage: new DefaultSetting("boolean", true),
					upgrades: new DefaultSetting("boolean", true),
					filter: new DefaultSetting("boolean", true)
				},
				faction: {
					idBesideFactionName: new DefaultSetting("boolean", false),
					csvRaidReport: new DefaultSetting("boolean", true),
					csvRankedWarReport: new DefaultSetting("boolean", true),
					csvWarReport: new DefaultSetting("boolean", true),
					csvChainReport: new DefaultSetting("boolean", true),
					csvChallengeContributions: new DefaultSetting("boolean", true),
					openOc: new DefaultSetting("boolean", true),
					highlightOwn: new DefaultSetting("boolean", true),
					availablePlayers: new DefaultSetting("boolean", true),
					recommendedNnb: new DefaultSetting("boolean", true),
					ocNnb: new DefaultSetting("boolean", true),
					ocTimes: new DefaultSetting("boolean", true),
					ocLastAction: new DefaultSetting("boolean", true),
					banker: new DefaultSetting("boolean", true),
					showFullInfobox: new DefaultSetting("boolean", true),
					foldableInfobox: new DefaultSetting("boolean", true),
					numberMembers: new DefaultSetting("boolean", true),
					warFinishTimes: new DefaultSetting("boolean", false),
					memberFilter: new DefaultSetting("boolean", true),
					armoryFilter: new DefaultSetting("boolean", true),
					armoryWorth: new DefaultSetting("boolean", true),
					upgradeRequiredRespect: new DefaultSetting("boolean", true),
					memberInfo: new DefaultSetting("boolean", false),
					rankedWarFilter: new DefaultSetting("boolean", true),
					quickItems: new DefaultSetting("boolean", true),
					stakeout: new DefaultSetting("boolean", true),
					showFactionSpy: new DefaultSetting("boolean", true),
					oc2Filter: new DefaultSetting("boolean", true),
					warnCrime: new DefaultSetting("boolean", false),
					rankedWarValue: new DefaultSetting("boolean", true),
					totalChallengeContributions: new DefaultSetting("boolean", true)
				},
				property: {
					value: new DefaultSetting("boolean", true),
					happy: new DefaultSetting("boolean", true)
				},
				gym: {
					specialist: new DefaultSetting("boolean", true),
					disableStats: new DefaultSetting("boolean", true),
					graph: new DefaultSetting("boolean", true),
					steadfast: new DefaultSetting("boolean", true),
					progress: new DefaultSetting("boolean", true)
				},
				missions: {
					hints: new DefaultSetting("boolean", true),
					rewards: new DefaultSetting("boolean", true)
				},
				attack: {
					bonusInformation: new DefaultSetting("boolean", true),
					timeoutWarning: new DefaultSetting("boolean", true),
					fairAttack: new DefaultSetting("boolean", true),
					weaponExperience: new DefaultSetting("boolean", true),
					hideAttackButtons: new DefaultSetting("array", [])
				},
				city: {
					items: new DefaultSetting("boolean", true),
					combineDuplicates: new DefaultSetting("boolean", true)
				},
				joblist: { specials: new DefaultSetting("boolean", true) },
				bounties: { filter: new DefaultSetting("boolean", true) },
				userlist: { filter: new DefaultSetting("boolean", true) },
				itemmarket: {
					highlightCheapItems: new DefaultSetting("number|empty", ""),
					highlightCheapItemsSound: new DefaultSetting("boolean", false),
					leftBar: new DefaultSetting("boolean", false),
					fillMax: new DefaultSetting("boolean", true)
				},
				competition: { filter: new DefaultSetting("boolean", true) },
				museum: { autoFill: new DefaultSetting("boolean", true) },
				enemies: { filter: new DefaultSetting("boolean", true) },
				friends: { filter: new DefaultSetting("boolean", true) },
				targets: { filter: new DefaultSetting("boolean", true) },
				crimes2: {
					burglaryFilter: new DefaultSetting("boolean", true),
					value: new DefaultSetting("boolean", true)
				}
			},
			scripts: {
				noConfirm: {
					itemEquip: new DefaultSetting("boolean", true),
					tradeAccept: new DefaultSetting("boolean", false),
					pointsMarketRemove: new DefaultSetting("boolean", false),
					pointsMarketBuy: new DefaultSetting("boolean", false),
					abroadItemBuy: new DefaultSetting("boolean", true)
				},
				achievements: {
					show: new DefaultSetting("boolean", true),
					completed: new DefaultSetting("boolean", false)
				},
				lastAction: {
					factionMember: new DefaultSetting("boolean", false),
					companyOwn: new DefaultSetting("boolean", false),
					companyOther: new DefaultSetting("boolean", false)
				},
				statsEstimate: {
					global: new DefaultSetting("boolean", true),
					delay: new DefaultSetting("number", 1500),
					cachedOnly: new DefaultSetting("boolean", true),
					displayNoResult: new DefaultSetting("boolean", false),
					maxLevel: new DefaultSetting("number", 100),
					profiles: new DefaultSetting("boolean", true),
					enemies: new DefaultSetting("boolean", true),
					hof: new DefaultSetting("boolean", true),
					attacks: new DefaultSetting("boolean", true),
					userlist: new DefaultSetting("boolean", true),
					bounties: new DefaultSetting("boolean", true),
					factions: new DefaultSetting("boolean", true),
					wars: new DefaultSetting("boolean", true),
					abroad: new DefaultSetting("boolean", true),
					competition: new DefaultSetting("boolean", true),
					rankedWars: new DefaultSetting("boolean", true),
					targets: new DefaultSetting("boolean", true)
				},
				ffScouter: {
					miniProfile: new DefaultSetting("boolean", true),
					profile: new DefaultSetting("boolean", true),
					attack: new DefaultSetting("boolean", true),
					factionList: new DefaultSetting("boolean", true),
					gauge: new DefaultSetting("boolean", true)
				}
			},
			external: {
				tornstats: new DefaultSetting("boolean", false),
				yata: new DefaultSetting("boolean", false),
				prometheus: new DefaultSetting("boolean", false),
				lzpt: new DefaultSetting("boolean", false),
				tornw3b: new DefaultSetting("boolean", false),
				ffScouter: new DefaultSetting("boolean", false),
				tornintel: new DefaultSetting("boolean", false)
			}
		},
		filters: {
			hospital: {
				enabled: new DefaultSetting("boolean", true),
				timeStart: new DefaultSetting("number", 0),
				timeEnd: new DefaultSetting("number", 100),
				levelStart: new DefaultSetting("number", 0),
				levelEnd: new DefaultSetting("number", 100),
				faction: new DefaultSetting("string", ""),
				activity: new DefaultSetting("array", []),
				revivesOn: new DefaultSetting("boolean", false)
			},
			jail: {
				enabled: new DefaultSetting("boolean", true),
				activity: new DefaultSetting("array", []),
				faction: new DefaultSetting("string", "All"),
				timeStart: new DefaultSetting("number", 0),
				timeEnd: new DefaultSetting("number", 100),
				levelStart: new DefaultSetting("number", 1),
				levelEnd: new DefaultSetting("number", 100),
				scoreStart: new DefaultSetting("number", 0),
				scoreEnd: new DefaultSetting("number", 5e3),
				bailCost: new DefaultSetting("number", -1)
			},
			racing: {
				enabled: new DefaultSetting("boolean", true),
				hideRaces: new DefaultSetting("array", []),
				timeStart: new DefaultSetting("number", 0),
				timeEnd: new DefaultSetting("number", 48),
				driversMin: new DefaultSetting("number", 2),
				driversMax: new DefaultSetting("number", 100),
				lapsMin: new DefaultSetting("number", 1),
				lapsMax: new DefaultSetting("number", 100),
				track: new DefaultSetting("array", []),
				name: new DefaultSetting("string", "")
			},
			containers: new DefaultSetting("object", {}),
			travel: {
				open: new DefaultSetting("boolean", false),
				type: new DefaultSetting("string", "basic"),
				categories: new DefaultSetting("array", []),
				countries: new DefaultSetting("array", []),
				hideOutOfStock: new DefaultSetting("boolean", false),
				applySalesTax: new DefaultSetting("boolean", false),
				sellAnonymously: new DefaultSetting("boolean", false)
			},
			abroadPeople: {
				enabled: new DefaultSetting("boolean", true),
				activity: new DefaultSetting("array", []),
				status: new DefaultSetting("array", []),
				levelStart: new DefaultSetting("number", 0),
				levelEnd: new DefaultSetting("number", 100),
				faction: new DefaultSetting("string", ""),
				special: {
					newPlayer: new DefaultSetting("string", "both"),
					inCompany: new DefaultSetting("string", "both"),
					inFaction: new DefaultSetting("string", "both"),
					isDonator: new DefaultSetting("string", "both"),
					hasBounties: new DefaultSetting("string", "both"),
					bazaarOpen: new DefaultSetting("string", "both")
				},
				estimates: new DefaultSetting("array", []),
				ffScoreMax: new DefaultSetting("number", null),
				ffScoreMin: new DefaultSetting("number", null)
			},
			abroadItems: {
				enabled: new DefaultSetting("boolean", true),
				profitOnly: new DefaultSetting("boolean", false),
				outOfStock: new DefaultSetting("boolean", false),
				categories: new DefaultSetting("array", []),
				taxes: new DefaultSetting("array", [])
			},
			trade: { hideValues: new DefaultSetting("boolean", false) },
			gym: {
				specialist1: new DefaultSetting("string", "none"),
				specialist2: new DefaultSetting("string", "none"),
				strength: new DefaultSetting("boolean", false),
				speed: new DefaultSetting("boolean", false),
				defense: new DefaultSetting("boolean", false),
				dexterity: new DefaultSetting("boolean", false)
			},
			city: { highlightItems: new DefaultSetting("boolean", true) },
			bounties: {
				maxLevel: new DefaultSetting("number", 100),
				hideUnavailable: new DefaultSetting("boolean", false)
			},
			userlist: {
				enabled: new DefaultSetting("boolean", true),
				activity: new DefaultSetting("array", []),
				levelStart: new DefaultSetting("number", 0),
				levelEnd: new DefaultSetting("number", 100),
				special: {
					fedded: new DefaultSetting("string", "both"),
					fallen: new DefaultSetting("string", "both"),
					traveling: new DefaultSetting("string", "both"),
					newPlayer: new DefaultSetting("string", "both"),
					onWall: new DefaultSetting("string", "both"),
					inCompany: new DefaultSetting("string", "both"),
					inFaction: new DefaultSetting("string", "both"),
					isDonator: new DefaultSetting("string", "both"),
					inHospital: new DefaultSetting("string", "both"),
					inJail: new DefaultSetting("string", "both"),
					earlyDischarge: new DefaultSetting("string", "both"),
					hasBounties: new DefaultSetting("string", "both"),
					bazaarOpen: new DefaultSetting("string", "both")
				},
				hospReason: {
					attackedBy: new DefaultSetting("string", "both"),
					muggedBy: new DefaultSetting("string", "both"),
					hospitalizedBy: new DefaultSetting("string", "both"),
					other: new DefaultSetting("string", "both")
				},
				estimates: new DefaultSetting("array", []),
				ffScoreMax: new DefaultSetting("number", null),
				ffScoreMin: new DefaultSetting("number", null)
			},
			stocks: {
				enabled: new DefaultSetting("boolean", true),
				name: new DefaultSetting("string", ""),
				investment: {
					owned: new DefaultSetting("string", "both"),
					benefit: new DefaultSetting("string", "both"),
					passive: new DefaultSetting("string", "both")
				},
				price: {
					price: new DefaultSetting("string", "both"),
					profit: new DefaultSetting("string", "both")
				}
			},
			faction: {
				enabled: new DefaultSetting("boolean", true),
				activity: new DefaultSetting("array", []),
				levelStart: new DefaultSetting("number", 1),
				levelEnd: new DefaultSetting("number", 100),
				lastActionStart: new DefaultSetting("number", 0),
				lastActionEnd: new DefaultSetting("number", -1),
				status: new DefaultSetting("array", []),
				position: new DefaultSetting("string", ""),
				special: {
					fedded: new DefaultSetting("string", "both"),
					fallen: new DefaultSetting("string", "both"),
					newPlayer: new DefaultSetting("string", "both"),
					inCompany: new DefaultSetting("string", "both"),
					isDonator: new DefaultSetting("string", "both"),
					isRecruit: new DefaultSetting("string", "both")
				}
			},
			factionArmory: {
				enabled: new DefaultSetting("boolean", true),
				hideUnavailable: new DefaultSetting("boolean", false),
				weapons: {
					name: new DefaultSetting("string", ""),
					category: new DefaultSetting("string", ""),
					rarity: new DefaultSetting("string", ""),
					weaponType: new DefaultSetting("string", ""),
					damage: new DefaultSetting("string", ""),
					accuracy: new DefaultSetting("string", ""),
					weaponBonus: new DefaultSetting("array", [])
				},
				armor: {
					name: new DefaultSetting("string", ""),
					rarity: new DefaultSetting("string", ""),
					defence: new DefaultSetting("string", ""),
					set: new DefaultSetting("string", ""),
					armorBonus: new DefaultSetting("string", "")
				},
				temporary: { name: new DefaultSetting("string", "") }
			},
			factionRankedWar: {
				enabled: new DefaultSetting("boolean", true),
				activity: new DefaultSetting("array", []),
				status: new DefaultSetting("array", []),
				levelStart: new DefaultSetting("number", 1),
				levelEnd: new DefaultSetting("number", 100),
				estimates: new DefaultSetting("array", []),
				ffScoreMax: new DefaultSetting("number", null),
				ffScoreMin: new DefaultSetting("number", null)
			},
			profile: {
				relative: new DefaultSetting("boolean", false),
				stats: new DefaultSetting("array", [])
			},
			competition: {
				levelStart: new DefaultSetting("number", 1),
				levelEnd: new DefaultSetting("number", 100),
				estimates: new DefaultSetting("array", [])
			},
			shops: {
				hideLoss: new DefaultSetting("boolean", false),
				hideUnder100: new DefaultSetting("boolean", false)
			},
			auction: {
				enabled: new DefaultSetting("boolean", true),
				weapons: {
					name: new DefaultSetting("string", ""),
					category: new DefaultSetting("string", ""),
					rarity: new DefaultSetting("string", ""),
					weaponType: new DefaultSetting("string", ""),
					damage: new DefaultSetting("string", ""),
					accuracy: new DefaultSetting("string", ""),
					weaponBonus: new DefaultSetting("array", []),
					quality: new DefaultSetting("string", "")
				},
				armor: {
					name: new DefaultSetting("string", ""),
					rarity: new DefaultSetting("string", ""),
					defence: new DefaultSetting("string", ""),
					set: new DefaultSetting("string", ""),
					armorBonus: new DefaultSetting("string", "")
				},
				items: {
					name: new DefaultSetting("string", ""),
					category: new DefaultSetting("string", ""),
					rarity: new DefaultSetting("string", "")
				}
			},
			enemies: {
				enabled: new DefaultSetting("boolean", true),
				activity: new DefaultSetting("array", []),
				levelStart: new DefaultSetting("number", 0),
				levelEnd: new DefaultSetting("number", 100),
				estimates: new DefaultSetting("array", [])
			},
			friends: {
				enabled: new DefaultSetting("boolean", true),
				activity: new DefaultSetting("array", []),
				levelStart: new DefaultSetting("number", 0),
				levelEnd: new DefaultSetting("number", 100)
			},
			targets: {
				enabled: new DefaultSetting("boolean", true),
				activity: new DefaultSetting("array", []),
				levelStart: new DefaultSetting("number", 0),
				levelEnd: new DefaultSetting("number", 100),
				estimates: new DefaultSetting("array", [])
			},
			burglary: {
				targetName: new DefaultSetting("string", ""),
				targetType: new DefaultSetting("array", [])
			},
			oc2: {
				enabled: new DefaultSetting("boolean", true),
				difficulty: new DefaultSetting("array", []),
				status: new DefaultSetting("array", [])
			}
		},
		userdata: new DefaultSetting("object", { date: -1 }),
		torndata: new DefaultSetting("object", { date: -2 }),
		stockdata: new DefaultSetting("object", {}),
		factiondata: new DefaultSetting("object", {}),
		localdata: {
			tradeMessage: new DefaultSetting("number", 0),
			popup: { calculatorItems: new DefaultSetting("array", []) },
			vault: {
				initialized: new DefaultSetting("boolean", false),
				lastTransaction: new DefaultSetting("string", ""),
				total: new DefaultSetting("number", 0),
				user: {
					initial: new DefaultSetting("number", 0),
					current: new DefaultSetting("number", 0)
				},
				partner: {
					initial: new DefaultSetting("number", 0),
					current: new DefaultSetting("number", 0)
				}
			},
			chatResize: new DefaultSetting("object", {}),
			feedHidden: new DefaultSetting("object", {}),
			threadsHiddenInFeed: new DefaultSetting("array", [])
		},
		stakeouts: new DefaultSetting("object", { order: [] }),
		factionStakeouts: new DefaultSetting("object", {}),
		attackHistory: {
			fetchData: new DefaultSetting("boolean", true),
			lastAttack: new DefaultSetting("number", 0),
			history: new DefaultSetting("object", {})
		},
		notes: {
			sidebar: {
				text: new DefaultSetting("string", ""),
				height: new DefaultSetting("string", "22px")
			},
			profile: new DefaultSetting("object", {})
		},
		quick: {
			items: new DefaultSetting("array", []),
			factionItems: new DefaultSetting("array", []),
			crimes: new DefaultSetting("array", []),
			jail: new DefaultSetting("array", [])
		},
		cache: new DefaultSetting("object", {}),
		usage: new DefaultSetting("object", {}),
		npcs: new DefaultSetting("object", {}),
		notificationHistory: new DefaultSetting("array", []),
		notifications: {
			events: new DefaultSetting("object", {}),
			messages: new DefaultSetting("object", {}),
			newDay: new DefaultSetting("object", {}),
			energy: new DefaultSetting("object", {}),
			happy: new DefaultSetting("object", {}),
			nerve: new DefaultSetting("object", {}),
			life: new DefaultSetting("object", {}),
			travel: new DefaultSetting("object", {}),
			drugs: new DefaultSetting("object", {}),
			boosters: new DefaultSetting("object", {}),
			medical: new DefaultSetting("object", {}),
			hospital: new DefaultSetting("object", {}),
			chain: new DefaultSetting("object", {}),
			chainCount: new DefaultSetting("object", {}),
			stakeouts: new DefaultSetting("object", {}),
			npcs: new DefaultSetting("object", {}),
			offline: new DefaultSetting("object", {}),
			missionsLimit: new DefaultSetting("object", {}),
			missionsExpire: new DefaultSetting("object", {}),
			refillEnergy: new DefaultSetting("object", {}),
			refillNerve: new DefaultSetting("object", {})
		},
		migrations: new DefaultSetting("array", [])
	};
	//#endregion
	//#region extension/utils/common/data/storage.ts
	var TornToolsStorage = class {
		get(key) {
			return new Promise(async (resolve) => {
				if (Array.isArray(key)) {
					const data = await browser$1.storage.local.get(key);
					resolve(key.map((i) => data[i]));
				} else if (key) resolve((await browser$1.storage.local.get([key]))[key]);
				else resolve(await browser$1.storage.local.get(null));
			});
		}
		set(object) {
			return browser$1.storage.local.set(object);
		}
		remove(key) {
			return browser$1.storage.local.remove(Array.isArray(key) ? key : [key]);
		}
		clear() {
			return browser$1.storage.local.clear();
		}
		change(object) {
			return new Promise(async (resolve) => {
				const keys = Object.keys(object);
				for (const key of keys) {
					const data = this.recursive(await this.get(key), object[key]);
					await this.set({ [key]: data });
				}
				resolve();
			});
		}
		recursive(parent, toChange) {
			for (const key in toChange) if (parent && typeof parent === "object" && !Array.isArray(parent[key]) && key in parent && typeof toChange[key] === "object" && !Array.isArray(toChange[key]) && toChange[key] !== null) parent[key] = this.recursive(parent[key], toChange[key]);
			else if (parent && typeof parent === "object") parent[key] = toChange[key];
			else parent = { [key]: toChange[key] };
			return parent;
		}
		reset(key) {
			return new Promise(async (resolve) => {
				if (["attackHistory", "stakeouts"].includes(key)) {
					await this.set({ [key]: getDefaultStorage(DEFAULT_STORAGE)[key] });
					resolve();
				} else {
					const apiKey = api ? api.torn.key : void 0;
					await this.clear();
					await this.set(getDefaultStorage(DEFAULT_STORAGE));
					await this.change({ api: { torn: { key: apiKey } } });
					console.log("Storage cleared");
					console.log("New storage", await this.get());
					resolve();
				}
				function getDefaultStorage(defaultStorage) {
					const newStorage = {};
					for (const key in defaultStorage) if (typeof defaultStorage[key] === "object") {
						const setting = defaultStorage[key];
						if (setting instanceof DefaultSetting && "defaultValue" in setting) switch (typeof setting.defaultValue) {
							case "function":
								newStorage[key] = setting.defaultValue();
								break;
							case "boolean":
							case "number":
							case "string":
							case "object":
								newStorage[key] = setting.defaultValue;
								break;
							default:
								newStorage[key] = setting.defaultValue;
								break;
						}
						else newStorage[key] = getDefaultStorage(defaultStorage[key]);
					} else newStorage[key] = defaultStorage[key];
					return newStorage;
				}
			});
		}
		async getSize() {
			let size;
			if (browser$1.storage.local.getBytesInUse) size = await browser$1.storage.local.getBytesInUse();
			else size = JSON.stringify(await this.get(null)).length;
			return size;
		}
	};
	var ttStorage = new TornToolsStorage();
	//#endregion
	//#region extension/utils/common/data/cache.ts
	var TornToolsCache = class {
		_cache;
		constructor() {
			this._cache = {};
		}
		set cache(value) {
			this._cache = value || {};
		}
		get cache() {
			return this._cache;
		}
		get(section, key) {
			return this.getCacheValue(section, key)?.value;
		}
		async remove(section, key) {
			if (!key) {
				key = section;
				section = null;
			}
			if (section && !this.hasValue(section, key) || !section && !this.hasValue(key.toString())) return;
			if (section) delete this.cache[section][key];
			else delete this.cache[key];
			await ttStorage.set({ cache: this.cache });
		}
		hasValue(section, key) {
			return this.getCacheValue(section, key) !== null;
		}
		getCacheValue(section, key) {
			if (!key) {
				key = section;
				section = null;
			}
			let value = null;
			if (section) {
				if (section in this.cache && key in this.cache[section]) value = this.cache[section][key];
			} else if (key in this.cache) value = this.cache[key];
			if (value === null || !("value" in value)) return null;
			if ("indefinite" in value) return value;
			else return value.timeout > Date.now() ? value : null;
		}
		async set(object, ttl, section) {
			return this._set(object, ttl, section);
		}
		setIndefinite(object, section) {
			return this._set(object, null, section);
		}
		async _set(object, ttl, section) {
			const timeout = ttl === null ? null : Date.now() + ttl;
			if (section) {
				if (!(section in this.cache)) this.cache[section] = {};
				for (const [key, value] of Object.entries(object)) this.cache[section][key] = this.createCacheValue(value, timeout);
			} else for (const [key, value] of Object.entries(object)) this.cache[key] = this.createCacheValue(value, timeout);
			await ttStorage.set({ cache: this.cache });
		}
		createCacheValue(value, timeout) {
			if (timeout === null) return {
				value,
				indefinite: true
			};
			else return {
				value,
				timeout
			};
		}
		async clear(section) {
			if (section) {
				delete this.cache[section];
				await ttStorage.set({ cache: this.cache });
			} else ttStorage.set({ cache: {} }).then(() => this.cache = {});
		}
		async refresh() {
			let hasChanged = false;
			const now = Date.now();
			refreshObject(this.cache);
			for (const section in this.cache) if (!Object.keys(this.cache[section]).length) delete this.cache[section];
			if (hasChanged) await ttStorage.set({ cache: this.cache });
			function refreshObject(object) {
				for (const key in object) {
					const value = object[key];
					if ("value" in value) {
						const cacheValue = value;
						if ("indefinite" in cacheValue || cacheValue.timeout > now) continue;
						hasChanged = true;
						delete object[key];
					} else refreshObject(value);
				}
			}
		}
	};
	var ttCache = new TornToolsCache();
	//#endregion
	//#region node_modules/@wxt-dev/storage/node_modules/@wxt-dev/browser/src/index.mjs
	var browser = globalThis.browser?.runtime?.id ? globalThis.browser : globalThis.chrome;
	//#endregion
	//#region node_modules/async-mutex/index.mjs
	var E_CANCELED = /* @__PURE__ */ new Error("request for lock canceled");
	var __awaiter$2 = function(thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P ? value : new P(function(resolve) {
				resolve(value);
			});
		}
		return new (P || (P = Promise))(function(resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator["throw"](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
			}
			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
	};
	var Semaphore = class {
		constructor(_value, _cancelError = E_CANCELED) {
			this._value = _value;
			this._cancelError = _cancelError;
			this._queue = [];
			this._weightedWaiters = [];
		}
		acquire(weight = 1, priority = 0) {
			if (weight <= 0) throw new Error(`invalid weight ${weight}: must be positive`);
			return new Promise((resolve, reject) => {
				const task = {
					resolve,
					reject,
					weight,
					priority
				};
				const i = findIndexFromEnd(this._queue, (other) => priority <= other.priority);
				if (i === -1 && weight <= this._value) this._dispatchItem(task);
				else this._queue.splice(i + 1, 0, task);
			});
		}
		runExclusive(callback_1) {
			return __awaiter$2(this, arguments, void 0, function* (callback, weight = 1, priority = 0) {
				const [value, release] = yield this.acquire(weight, priority);
				try {
					return yield callback(value);
				} finally {
					release();
				}
			});
		}
		waitForUnlock(weight = 1, priority = 0) {
			if (weight <= 0) throw new Error(`invalid weight ${weight}: must be positive`);
			if (this._couldLockImmediately(weight, priority)) return Promise.resolve();
			else return new Promise((resolve) => {
				if (!this._weightedWaiters[weight - 1]) this._weightedWaiters[weight - 1] = [];
				insertSorted(this._weightedWaiters[weight - 1], {
					resolve,
					priority
				});
			});
		}
		isLocked() {
			return this._value <= 0;
		}
		getValue() {
			return this._value;
		}
		setValue(value) {
			this._value = value;
			this._dispatchQueue();
		}
		release(weight = 1) {
			if (weight <= 0) throw new Error(`invalid weight ${weight}: must be positive`);
			this._value += weight;
			this._dispatchQueue();
		}
		cancel() {
			this._queue.forEach((entry) => entry.reject(this._cancelError));
			this._queue = [];
		}
		_dispatchQueue() {
			this._drainUnlockWaiters();
			while (this._queue.length > 0 && this._queue[0].weight <= this._value) {
				this._dispatchItem(this._queue.shift());
				this._drainUnlockWaiters();
			}
		}
		_dispatchItem(item) {
			const previousValue = this._value;
			this._value -= item.weight;
			item.resolve([previousValue, this._newReleaser(item.weight)]);
		}
		_newReleaser(weight) {
			let called = false;
			return () => {
				if (called) return;
				called = true;
				this.release(weight);
			};
		}
		_drainUnlockWaiters() {
			if (this._queue.length === 0) for (let weight = this._value; weight > 0; weight--) {
				const waiters = this._weightedWaiters[weight - 1];
				if (!waiters) continue;
				waiters.forEach((waiter) => waiter.resolve());
				this._weightedWaiters[weight - 1] = [];
			}
			else {
				const queuedPriority = this._queue[0].priority;
				for (let weight = this._value; weight > 0; weight--) {
					const waiters = this._weightedWaiters[weight - 1];
					if (!waiters) continue;
					const i = waiters.findIndex((waiter) => waiter.priority <= queuedPriority);
					(i === -1 ? waiters : waiters.splice(0, i)).forEach(((waiter) => waiter.resolve()));
				}
			}
		}
		_couldLockImmediately(weight, priority) {
			return (this._queue.length === 0 || this._queue[0].priority < priority) && weight <= this._value;
		}
	};
	function insertSorted(a, v) {
		const i = findIndexFromEnd(a, (other) => v.priority <= other.priority);
		a.splice(i + 1, 0, v);
	}
	function findIndexFromEnd(a, predicate) {
		for (let i = a.length - 1; i >= 0; i--) if (predicate(a[i])) return i;
		return -1;
	}
	var __awaiter$1 = function(thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P ? value : new P(function(resolve) {
				resolve(value);
			});
		}
		return new (P || (P = Promise))(function(resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator["throw"](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
			}
			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
	};
	var Mutex = class {
		constructor(cancelError) {
			this._semaphore = new Semaphore(1, cancelError);
		}
		acquire() {
			return __awaiter$1(this, arguments, void 0, function* (priority = 0) {
				const [, releaser] = yield this._semaphore.acquire(1, priority);
				return releaser;
			});
		}
		runExclusive(callback, priority = 0) {
			return this._semaphore.runExclusive(() => callback(), 1, priority);
		}
		isLocked() {
			return this._semaphore.isLocked();
		}
		waitForUnlock(priority = 0) {
			return this._semaphore.waitForUnlock(1, priority);
		}
		release() {
			if (this._semaphore.isLocked()) this._semaphore.release();
		}
		cancel() {
			return this._semaphore.cancel();
		}
	};
	//#endregion
	//#region node_modules/dequal/lite/index.mjs
	var has = Object.prototype.hasOwnProperty;
	function dequal(foo, bar) {
		var ctor, len;
		if (foo === bar) return true;
		if (foo && bar && (ctor = foo.constructor) === bar.constructor) {
			if (ctor === Date) return foo.getTime() === bar.getTime();
			if (ctor === RegExp) return foo.toString() === bar.toString();
			if (ctor === Array) {
				if ((len = foo.length) === bar.length) while (len-- && dequal(foo[len], bar[len]));
				return len === -1;
			}
			if (!ctor || typeof foo === "object") {
				len = 0;
				for (ctor in foo) {
					if (has.call(foo, ctor) && ++len && !has.call(bar, ctor)) return false;
					if (!(ctor in bar) || !dequal(foo[ctor], bar[ctor])) return false;
				}
				return Object.keys(bar).length === len;
			}
		}
		return foo !== foo && bar !== bar;
	}
	createStorage();
	function createStorage() {
		const drivers = {
			local: createDriver("local"),
			session: createDriver("session"),
			sync: createDriver("sync"),
			managed: createDriver("managed")
		};
		const getDriver = (area) => {
			const driver = drivers[area];
			if (driver == null) {
				const areaNames = Object.keys(drivers).join(", ");
				throw Error(`Invalid area "${area}". Options: ${areaNames}`);
			}
			return driver;
		};
		const resolveKey = (key) => {
			const deliminatorIndex = key.indexOf(":");
			const driverArea = key.substring(0, deliminatorIndex);
			const driverKey = key.substring(deliminatorIndex + 1);
			if (driverKey == null) throw Error(`Storage key should be in the form of "area:key", but received "${key}"`);
			return {
				driverArea,
				driverKey,
				driver: getDriver(driverArea)
			};
		};
		const getMetaKey = (key) => key + "$";
		const mergeMeta = (oldMeta, newMeta) => {
			const newFields = { ...oldMeta };
			Object.entries(newMeta).forEach(([key, value]) => {
				if (value == null) delete newFields[key];
				else newFields[key] = value;
			});
			return newFields;
		};
		const getValueOrFallback = (value, fallback) => value ?? fallback ?? null;
		const getMetaValue = (properties) => typeof properties === "object" && !Array.isArray(properties) ? properties : {};
		const getItem = async (driver, driverKey, opts) => {
			return getValueOrFallback(await driver.getItem(driverKey), opts?.fallback ?? opts?.defaultValue);
		};
		const getMeta = async (driver, driverKey) => {
			const metaKey = getMetaKey(driverKey);
			return getMetaValue(await driver.getItem(metaKey));
		};
		const setItem = async (driver, driverKey, value) => {
			await driver.setItem(driverKey, value ?? null);
		};
		const setMeta = async (driver, driverKey, properties) => {
			const metaKey = getMetaKey(driverKey);
			const existingFields = getMetaValue(await driver.getItem(metaKey));
			await driver.setItem(metaKey, mergeMeta(existingFields, properties));
		};
		const removeItem = async (driver, driverKey, opts) => {
			await driver.removeItem(driverKey);
			if (opts?.removeMeta) {
				const metaKey = getMetaKey(driverKey);
				await driver.removeItem(metaKey);
			}
		};
		const removeMeta = async (driver, driverKey, properties) => {
			const metaKey = getMetaKey(driverKey);
			if (properties == null) await driver.removeItem(metaKey);
			else {
				const newFields = getMetaValue(await driver.getItem(metaKey));
				[properties].flat().forEach((field) => delete newFields[field]);
				await driver.setItem(metaKey, newFields);
			}
		};
		const watch = (driver, driverKey, cb) => driver.watch(driverKey, cb);
		return {
			getItem: async (key, opts) => {
				const { driver, driverKey } = resolveKey(key);
				return await getItem(driver, driverKey, opts);
			},
			getItems: async (keys) => {
				const areaToKeyMap = /* @__PURE__ */ new Map();
				const keyToOptsMap = /* @__PURE__ */ new Map();
				const orderedKeys = [];
				keys.forEach((key) => {
					let keyStr;
					let opts;
					if (typeof key === "string") keyStr = key;
					else if ("getValue" in key) {
						keyStr = key.key;
						opts = { fallback: key.fallback };
					} else {
						keyStr = key.key;
						opts = key.options;
					}
					orderedKeys.push(keyStr);
					const { driverArea, driverKey } = resolveKey(keyStr);
					const areaKeys = areaToKeyMap.get(driverArea) ?? [];
					areaToKeyMap.set(driverArea, areaKeys.concat(driverKey));
					keyToOptsMap.set(keyStr, opts);
				});
				const resultsMap = /* @__PURE__ */ new Map();
				await Promise.all(Array.from(areaToKeyMap.entries()).map(async ([driverArea, keys]) => {
					(await drivers[driverArea].getItems(keys)).forEach((driverResult) => {
						const key = `${driverArea}:${driverResult.key}`;
						const opts = keyToOptsMap.get(key);
						const value = getValueOrFallback(driverResult.value, opts?.fallback ?? opts?.defaultValue);
						resultsMap.set(key, value);
					});
				}));
				return orderedKeys.map((key) => ({
					key,
					value: resultsMap.get(key)
				}));
			},
			getMeta: async (key) => {
				const { driver, driverKey } = resolveKey(key);
				return await getMeta(driver, driverKey);
			},
			getMetas: async (args) => {
				const keys = args.map((arg) => {
					const key = typeof arg === "string" ? arg : arg.key;
					const { driverArea, driverKey } = resolveKey(key);
					return {
						key,
						driverArea,
						driverKey,
						driverMetaKey: getMetaKey(driverKey)
					};
				});
				const areaToDriverMetaKeysMap = keys.reduce((map, key) => {
					map[key.driverArea] ??= [];
					map[key.driverArea].push(key);
					return map;
				}, {});
				const resultsMap = {};
				await Promise.all(Object.entries(areaToDriverMetaKeysMap).map(async ([area, keys]) => {
					const areaRes = await browser.storage[area].get(keys.map((key) => key.driverMetaKey));
					keys.forEach((key) => {
						resultsMap[key.key] = areaRes[key.driverMetaKey] ?? {};
					});
				}));
				return keys.map((key) => ({
					key: key.key,
					meta: resultsMap[key.key]
				}));
			},
			setItem: async (key, value) => {
				const { driver, driverKey } = resolveKey(key);
				await setItem(driver, driverKey, value);
			},
			setItems: async (items) => {
				const areaToKeyValueMap = {};
				items.forEach((item) => {
					const { driverArea, driverKey } = resolveKey("key" in item ? item.key : item.item.key);
					areaToKeyValueMap[driverArea] ??= [];
					areaToKeyValueMap[driverArea].push({
						key: driverKey,
						value: item.value
					});
				});
				await Promise.all(Object.entries(areaToKeyValueMap).map(async ([driverArea, values]) => {
					await getDriver(driverArea).setItems(values);
				}));
			},
			setMeta: async (key, properties) => {
				const { driver, driverKey } = resolveKey(key);
				await setMeta(driver, driverKey, properties);
			},
			setMetas: async (items) => {
				const areaToMetaUpdatesMap = {};
				items.forEach((item) => {
					const { driverArea, driverKey } = resolveKey("key" in item ? item.key : item.item.key);
					areaToMetaUpdatesMap[driverArea] ??= [];
					areaToMetaUpdatesMap[driverArea].push({
						key: driverKey,
						properties: item.meta
					});
				});
				await Promise.all(Object.entries(areaToMetaUpdatesMap).map(async ([storageArea, updates]) => {
					const driver = getDriver(storageArea);
					const metaKeys = updates.map(({ key }) => getMetaKey(key));
					const existingMetas = await driver.getItems(metaKeys);
					const existingMetaMap = Object.fromEntries(existingMetas.map(({ key, value }) => [key, getMetaValue(value)]));
					const metaUpdates = updates.map(({ key, properties }) => {
						const metaKey = getMetaKey(key);
						return {
							key: metaKey,
							value: mergeMeta(existingMetaMap[metaKey] ?? {}, properties)
						};
					});
					await driver.setItems(metaUpdates);
				}));
			},
			removeItem: async (key, opts) => {
				const { driver, driverKey } = resolveKey(key);
				await removeItem(driver, driverKey, opts);
			},
			removeItems: async (keys) => {
				const areaToKeysMap = {};
				keys.forEach((key) => {
					let keyStr;
					let opts;
					if (typeof key === "string") keyStr = key;
					else if ("getValue" in key) keyStr = key.key;
					else if ("item" in key) {
						keyStr = key.item.key;
						opts = key.options;
					} else {
						keyStr = key.key;
						opts = key.options;
					}
					const { driverArea, driverKey } = resolveKey(keyStr);
					areaToKeysMap[driverArea] ??= [];
					areaToKeysMap[driverArea].push(driverKey);
					if (opts?.removeMeta) areaToKeysMap[driverArea].push(getMetaKey(driverKey));
				});
				await Promise.all(Object.entries(areaToKeysMap).map(async ([driverArea, keys]) => {
					await getDriver(driverArea).removeItems(keys);
				}));
			},
			clear: async (base) => {
				await getDriver(base).clear();
			},
			removeMeta: async (key, properties) => {
				const { driver, driverKey } = resolveKey(key);
				await removeMeta(driver, driverKey, properties);
			},
			snapshot: async (base, opts) => {
				const data = await getDriver(base).snapshot();
				opts?.excludeKeys?.forEach((key) => {
					delete data[key];
					delete data[getMetaKey(key)];
				});
				return data;
			},
			restoreSnapshot: async (base, data) => {
				await getDriver(base).restoreSnapshot(data);
			},
			watch: (key, cb) => {
				const { driver, driverKey } = resolveKey(key);
				return watch(driver, driverKey, cb);
			},
			unwatch() {
				Object.values(drivers).forEach((driver) => {
					driver.unwatch();
				});
			},
			defineItem: (key, opts) => {
				const { driver, driverKey } = resolveKey(key);
				const { version: targetVersion = 1, migrations = {}, onMigrationComplete, debug = false } = opts ?? {};
				if (targetVersion < 1) throw Error("Storage item version cannot be less than 1. Initial versions should be set to 1, not 0.");
				let needsVersionSet = false;
				const migrate = async () => {
					const driverMetaKey = getMetaKey(driverKey);
					const [{ value }, { value: meta }] = await driver.getItems([driverKey, driverMetaKey]);
					needsVersionSet = value == null && meta?.v == null && !!targetVersion;
					if (value == null) return;
					const currentVersion = meta?.v ?? 1;
					if (currentVersion > targetVersion) throw Error(`Version downgrade detected (v${currentVersion} -> v${targetVersion}) for "${key}"`);
					if (currentVersion === targetVersion) return;
					if (debug) console.debug(`[@wxt-dev/storage] Running storage migration for ${key}: v${currentVersion} -> v${targetVersion}`);
					const migrationsToRun = Array.from({ length: targetVersion - currentVersion }, (_, i) => currentVersion + i + 1);
					let migratedValue = value;
					for (const migrateToVersion of migrationsToRun) try {
						migratedValue = await migrations?.[migrateToVersion]?.(migratedValue) ?? migratedValue;
						if (debug) console.debug(`[@wxt-dev/storage] Storage migration processed for version: v${migrateToVersion}`);
					} catch (err) {
						throw new MigrationError(key, migrateToVersion, { cause: err });
					}
					await driver.setItems([{
						key: driverKey,
						value: migratedValue
					}, {
						key: driverMetaKey,
						value: {
							...meta,
							v: targetVersion
						}
					}]);
					if (debug) console.debug(`[@wxt-dev/storage] Storage migration completed for ${key} v${targetVersion}`, { migratedValue });
					onMigrationComplete?.(migratedValue, targetVersion);
				};
				const migrationsDone = opts?.migrations == null ? Promise.resolve() : migrate().catch((err) => {
					console.error(`[@wxt-dev/storage] Migration failed for ${key}`, err);
				});
				const initMutex = new Mutex();
				const getFallback = () => opts?.fallback ?? opts?.defaultValue ?? null;
				const getOrInitValue = () => initMutex.runExclusive(async () => {
					const value = await driver.getItem(driverKey);
					if (value != null || opts?.init == null) return value;
					const newValue = await opts.init();
					await driver.setItem(driverKey, newValue);
					if (value == null && targetVersion > 1) await setMeta(driver, driverKey, { v: targetVersion });
					return newValue;
				});
				migrationsDone.then(getOrInitValue);
				return {
					key,
					get defaultValue() {
						return getFallback();
					},
					get fallback() {
						return getFallback();
					},
					getValue: async () => {
						await migrationsDone;
						if (opts?.init) return await getOrInitValue();
						else return await getItem(driver, driverKey, opts);
					},
					getMeta: async () => {
						await migrationsDone;
						return await getMeta(driver, driverKey);
					},
					setValue: async (value) => {
						await migrationsDone;
						if (needsVersionSet) {
							needsVersionSet = false;
							await Promise.all([setItem(driver, driverKey, value), setMeta(driver, driverKey, { v: targetVersion })]);
						} else await setItem(driver, driverKey, value);
					},
					setMeta: async (properties) => {
						await migrationsDone;
						return await setMeta(driver, driverKey, properties);
					},
					removeValue: async (opts) => {
						await migrationsDone;
						return await removeItem(driver, driverKey, opts);
					},
					removeMeta: async (properties) => {
						await migrationsDone;
						return await removeMeta(driver, driverKey, properties);
					},
					watch: (cb) => watch(driver, driverKey, (newValue, oldValue) => cb(newValue ?? getFallback(), oldValue ?? getFallback())),
					migrate
				};
			}
		};
	}
	function createDriver(storageArea) {
		const getStorageArea = () => {
			if (browser.runtime == null) throw Error(`'wxt/storage' must be loaded in a web extension environment

 - If thrown during a build, see https://github.com/wxt-dev/wxt/issues/371
 - If thrown during tests, mock 'wxt/browser' correctly. See https://wxt.dev/guide/go-further/testing.html
`);
			if (browser.storage == null) throw Error("You must add the 'storage' permission to your manifest to use 'wxt/storage'");
			const area = browser.storage[storageArea];
			if (area == null) throw Error(`"browser.storage.${storageArea}" is undefined`);
			return area;
		};
		const watchListeners = /* @__PURE__ */ new Set();
		return {
			getItem: async (key) => {
				return (await getStorageArea().get(key))[key];
			},
			getItems: async (keys) => {
				const result = await getStorageArea().get(keys);
				return keys.map((key) => ({
					key,
					value: result[key] ?? null
				}));
			},
			setItem: async (key, value) => {
				if (value == null) await getStorageArea().remove(key);
				else await getStorageArea().set({ [key]: value });
			},
			setItems: async (values) => {
				const map = values.reduce((map, { key, value }) => {
					map[key] = value;
					return map;
				}, {});
				await getStorageArea().set(map);
			},
			removeItem: async (key) => {
				await getStorageArea().remove(key);
			},
			removeItems: async (keys) => {
				await getStorageArea().remove(keys);
			},
			clear: async () => {
				await getStorageArea().clear();
			},
			snapshot: async () => {
				return await getStorageArea().get();
			},
			restoreSnapshot: async (data) => {
				await getStorageArea().set(data);
			},
			watch(key, cb) {
				const listener = (changes) => {
					const change = changes[key];
					if (change == null || dequal(change.newValue, change.oldValue)) return;
					cb(change.newValue ?? null, change.oldValue ?? null);
				};
				getStorageArea().onChanged.addListener(listener);
				watchListeners.add(listener);
				return () => {
					getStorageArea().onChanged.removeListener(listener);
					watchListeners.delete(listener);
				};
			},
			unwatch() {
				watchListeners.forEach((listener) => {
					getStorageArea().onChanged.removeListener(listener);
				});
				watchListeners.clear();
			}
		};
	}
	var MigrationError = class extends Error {
		constructor(key, version, options) {
			super(`v${version} migration failed for "${key}"`, options);
			this.key = key;
			this.version = version;
		}
	};
	//#endregion
	//#region node_modules/@phosphor-icons/core/assets/bold/arrow-bend-up-left-bold.svg
	var arrow_bend_up_left_bold_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20256%20256'%20fill='currentColor'%3e%3cpath%20d='M236,200a12,12,0,0,1-24,0,84.09,84.09,0,0,0-84-84H61l27.52,27.51a12,12,0,0,1-17,17l-48-48a12,12,0,0,1,0-17l48-48a12,12,0,0,1,17,17L61,92h67A108.12,108.12,0,0,1,236,200Z'/%3e%3c/svg%3e";
	//#endregion
	//#region node_modules/@phosphor-icons/core/assets/bold/arrow-clockwise-bold.svg
	var arrow_clockwise_bold_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20256%20256'%20fill='currentColor'%3e%3cpath%20d='M244,56v48a12,12,0,0,1-12,12H184a12,12,0,1,1,0-24H201.1l-19-17.38c-.13-.12-.26-.24-.38-.37A76,76,0,1,0,127,204h1a75.53,75.53,0,0,0,52.15-20.72,12,12,0,0,1,16.49,17.45A99.45,99.45,0,0,1,128,228h-1.37A100,100,0,1,1,198.51,57.06L220,76.72V56a12,12,0,0,1,24,0Z'/%3e%3c/svg%3e";
	//#endregion
	//#region node_modules/@phosphor-icons/core/assets/bold/arrow-down-bold.svg
	var arrow_down_bold_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20256%20256'%20fill='currentColor'%3e%3cpath%20d='M208.49,152.49l-72,72a12,12,0,0,1-17,0l-72-72a12,12,0,0,1,17-17L116,187V40a12,12,0,0,1,24,0V187l51.51-51.52a12,12,0,0,1,17,17Z'/%3e%3c/svg%3e";
	//#endregion
	//#region node_modules/@phosphor-icons/core/assets/bold/arrow-up-bold.svg
	var arrow_up_bold_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20256%20256'%20fill='currentColor'%3e%3cpath%20d='M208.49,120.49a12,12,0,0,1-17,0L140,69V216a12,12,0,0,1-24,0V69L64.49,120.49a12,12,0,0,1-17-17l72-72a12,12,0,0,1,17,0l72,72A12,12,0,0,1,208.49,120.49Z'/%3e%3c/svg%3e";
	//#endregion
	//#region node_modules/@phosphor-icons/core/assets/bold/check-bold.svg
	var check_bold_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20256%20256'%20fill='currentColor'%3e%3cpath%20d='M232.49,80.49l-128,128a12,12,0,0,1-17,0l-56-56a12,12,0,1,1,17-17L96,183,215.51,63.51a12,12,0,0,1,17,17Z'/%3e%3c/svg%3e";
	//#endregion
	//#region node_modules/@phosphor-icons/core/assets/bold/check-circle-bold.svg
	var check_circle_bold_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20256%20256'%20fill='currentColor'%3e%3cpath%20d='M176.49,95.51a12,12,0,0,1,0,17l-56,56a12,12,0,0,1-17,0l-24-24a12,12,0,1,1,17-17L112,143l47.51-47.52A12,12,0,0,1,176.49,95.51ZM236,128A108,108,0,1,1,128,20,108.12,108.12,0,0,1,236,128Zm-24,0a84,84,0,1,0-84,84A84.09,84.09,0,0,0,212,128Z'/%3e%3c/svg%3e";
	//#endregion
	//#region node_modules/@phosphor-icons/core/assets/bold/copy-bold.svg
	var copy_bold_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20256%20256'%20fill='currentColor'%3e%3cpath%20d='M216,28H88A12,12,0,0,0,76,40V76H40A12,12,0,0,0,28,88V216a12,12,0,0,0,12,12H168a12,12,0,0,0,12-12V180h36a12,12,0,0,0,12-12V40A12,12,0,0,0,216,28ZM156,204H52V100H156Zm48-48H180V88a12,12,0,0,0-12-12H100V52H204Z'/%3e%3c/svg%3e";
	//#endregion
	//#region node_modules/@phosphor-icons/core/assets/bold/info-bold.svg
	var info_bold_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20256%20256'%20fill='currentColor'%3e%3cpath%20d='M108,84a16,16,0,1,1,16,16A16,16,0,0,1,108,84Zm128,44A108,108,0,1,1,128,20,108.12,108.12,0,0,1,236,128Zm-24,0a84,84,0,1,0-84,84A84.09,84.09,0,0,0,212,128Zm-72,36.68V132a20,20,0,0,0-20-20,12,12,0,0,0-4,23.32V168a20,20,0,0,0,20,20,12,12,0,0,0,4-23.32Z'/%3e%3c/svg%3e";
	//#endregion
	//#region node_modules/@phosphor-icons/core/assets/bold/spinner-gap-bold.svg
	var spinner_gap_bold_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20256%20256'%20fill='currentColor'%3e%3cpath%20d='M140,32V64a12,12,0,0,1-24,0V32a12,12,0,0,1,24,0Zm84,84H192a12,12,0,0,0,0,24h32a12,12,0,0,0,0-24Zm-42.26,48.77a12,12,0,1,0-17,17l22.63,22.63a12,12,0,0,0,17-17ZM128,180a12,12,0,0,0-12,12v32a12,12,0,0,0,24,0V192A12,12,0,0,0,128,180ZM74.26,164.77,51.63,187.4a12,12,0,0,0,17,17l22.63-22.63a12,12,0,1,0-17-17ZM76,128a12,12,0,0,0-12-12H32a12,12,0,0,0,0,24H64A12,12,0,0,0,76,128ZM68.6,51.63a12,12,0,1,0-17,17L74.26,91.23a12,12,0,0,0,17-17Z'/%3e%3c/svg%3e";
	//#endregion
	//#region node_modules/@phosphor-icons/core/assets/bold/warning-circle-bold.svg
	var warning_circle_bold_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20256%20256'%20fill='currentColor'%3e%3cpath%20d='M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212Zm-12-80V80a12,12,0,0,1,24,0v52a12,12,0,0,1-24,0Zm28,40a16,16,0,1,1-16-16A16,16,0,0,1,144,172Z'/%3e%3c/svg%3e";
	//#endregion
	//#region node_modules/@phosphor-icons/core/assets/bold/x-circle-bold.svg
	var x_circle_bold_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20256%20256'%20fill='currentColor'%3e%3cpath%20d='M168.49,104.49,145,128l23.52,23.51a12,12,0,0,1-17,17L128,145l-23.51,23.52a12,12,0,0,1-17-17L111,128,87.51,104.49a12,12,0,0,1,17-17L128,111l23.51-23.52a12,12,0,0,1,17,17ZM236,128A108,108,0,1,1,128,20,108.12,108.12,0,0,1,236,128Zm-24,0a84,84,0,1,0-84,84A84.09,84.09,0,0,0,212,128Z'/%3e%3c/svg%3e";
	//#endregion
	//#region node_modules/@phosphor-icons/core/assets/fill/airplane-fill.svg
	var airplane_fill_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20256%20256'%20fill='currentColor'%3e%3cpath%20d='M240,136v32a8,8,0,0,1-8,8,7.61,7.61,0,0,1-1.57-.16L156,161v23.73l17.66,17.65A8,8,0,0,1,176,208v24a8,8,0,0,1-11,7.43l-37-14.81L91,239.43A8,8,0,0,1,80,232V208a8,8,0,0,1,2.34-5.66L100,184.69V161L25.57,175.84A7.61,7.61,0,0,1,24,176a8,8,0,0,1-8-8V136a8,8,0,0,1,4.42-7.16L100,89.06V44a28,28,0,0,1,56,0V89.06l79.58,39.78A8,8,0,0,1,240,136Z'/%3e%3c/svg%3e";
	//#endregion
	//#region node_modules/@phosphor-icons/core/assets/fill/arrows-out-cardinal-fill.svg
	var arrows_out_cardinal_fill_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20256%20256'%20fill='currentColor'%3e%3cpath%20d='M96,136H64v24a8,8,0,0,1-13.66,5.66l-32-32a8,8,0,0,1,0-11.32l32-32A8,8,0,0,1,64,96v24H96a8,8,0,0,1,0,16Zm0-72h24V96a8,8,0,0,0,16,0V64h24a8,8,0,0,0,5.66-13.66l-32-32a8,8,0,0,0-11.32,0l-32,32A8,8,0,0,0,96,64Zm141.66,58.34-32-32A8,8,0,0,0,192,96v24H160a8,8,0,0,0,0,16h32v24a8,8,0,0,0,13.66,5.66l32-32A8,8,0,0,0,237.66,122.34ZM160,192H136V160a8,8,0,0,0-16,0v32H96a8,8,0,0,0-5.66,13.66l32,32a8,8,0,0,0,11.32,0l32-32A8,8,0,0,0,160,192Z'/%3e%3c/svg%3e";
	//#endregion
	//#region node_modules/@phosphor-icons/core/assets/fill/bell-fill.svg
	var bell_fill_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20256%20256'%20fill='currentColor'%3e%3cpath%20d='M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216Z'/%3e%3c/svg%3e";
	//#endregion
	//#region node_modules/@phosphor-icons/core/assets/fill/bell-slash-fill.svg
	var bell_slash_fill_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20256%20256'%20fill='currentColor'%3e%3cpath%20d='M221.84,192v0a1.85,1.85,0,0,1-3,.28L83.27,43.19a4,4,0,0,1,.8-6A79.55,79.55,0,0,1,129.17,24C173,24.66,207.8,61.1,208,104.92c.14,34.88,8.31,61.54,13.82,71A15.89,15.89,0,0,1,221.84,192Zm-7.92,18.62a8,8,0,0,1-11.85,10.76L182.62,200H167.16a40,40,0,0,1-78.41,0H47.91a15.78,15.78,0,0,1-13.59-7.59,16.42,16.42,0,0,1-.09-16.68c5.55-9.73,13.7-36.64,13.7-71.73A79.42,79.42,0,0,1,58.79,63.85L42,45.38A8,8,0,1,1,53.84,34.62ZM150.59,200H105.32a24,24,0,0,0,45.27,0Z'/%3e%3c/svg%3e";
	//#endregion
	//#region node_modules/@phosphor-icons/core/assets/fill/caret-down-fill.svg
	var caret_down_fill_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20256%20256'%20fill='currentColor'%3e%3cpath%20d='M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,48,88H208a8,8,0,0,1,5.66,13.66Z'/%3e%3c/svg%3e";
	//#endregion
	//#region node_modules/@phosphor-icons/core/assets/fill/caret-right-fill.svg
	var caret_right_fill_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20256%20256'%20fill='currentColor'%3e%3cpath%20d='M181.66,133.66l-80,80A8,8,0,0,1,88,208V48a8,8,0,0,1,13.66-5.66l80,80A8,8,0,0,1,181.66,133.66Z'/%3e%3c/svg%3e";
	//#endregion
	//#region node_modules/@phosphor-icons/core/assets/fill/caret-up-fill.svg
	var caret_up_fill_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20256%20256'%20fill='currentColor'%3e%3cpath%20d='M215.39,163.06A8,8,0,0,1,208,168H48a8,8,0,0,1-5.66-13.66l80-80a8,8,0,0,1,11.32,0l80,80A8,8,0,0,1,215.39,163.06Z'/%3e%3c/svg%3e";
	//#endregion
	//#region node_modules/@phosphor-icons/core/assets/fill/funnel-fill.svg
	var funnel_fill_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20256%20256'%20fill='currentColor'%3e%3cpath%20d='M227.81,66.76l-.08.09L160,139.17v55.49A16,16,0,0,1,152.87,208l-32,21.34A16,16,0,0,1,96,216V139.17L28.27,66.85l-.08-.09A16,16,0,0,1,40,40H216a16,16,0,0,1,11.84,26.76Z'/%3e%3c/svg%3e";
	//#endregion
	//#region node_modules/@phosphor-icons/core/assets/fill/funnel-x-fill.svg
	var funnel_x_fill_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20256%20256'%20fill='currentColor'%3e%3cpath%20d='M227.73,66.85,160,139.17v55.49A16,16,0,0,1,152.87,208l-32,21.34A16,16,0,0,1,96,216V139.17L28.27,66.85l-.08-.09A16,16,0,0,1,40,40H216a16,16,0,0,1,11.84,26.76ZM227.31,192l18.35-18.34a8,8,0,0,0-11.32-11.32L216,180.69l-18.34-18.35a8,8,0,0,0-11.32,11.32L204.69,192l-18.35,18.34a8,8,0,0,0,11.32,11.32L216,203.31l18.34,18.35a8,8,0,0,0,11.32-11.32Z'/%3e%3c/svg%3e";
	//#endregion
	//#region node_modules/@phosphor-icons/core/assets/fill/gear-fill.svg
	var gear_fill_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20256%20256'%20fill='currentColor'%3e%3cpath%20d='M216,130.16q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.6,107.6,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.29,107.29,0,0,0-26.25-10.86,8,8,0,0,0-7.06,1.48L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.6,107.6,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06ZM128,168a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z'/%3e%3c/svg%3e";
	//#endregion
	//#region node_modules/@phosphor-icons/core/assets/fill/info-fill.svg
	var info_fill_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20256%20256'%20fill='currentColor'%3e%3cpath%20d='M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm-4,48a12,12,0,1,1-12,12A12,12,0,0,1,124,72Zm12,112a16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40a8,8,0,0,1,0,16Z'/%3e%3c/svg%3e";
	//#endregion
	//#region node_modules/@phosphor-icons/core/assets/fill/plus-fill.svg
	var plus_fill_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20256%20256'%20fill='currentColor'%3e%3cpath%20d='M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM184,136H136v48a8,8,0,0,1-16,0V136H72a8,8,0,0,1,0-16h48V72a8,8,0,0,1,16,0v48h48a8,8,0,0,1,0,16Z'/%3e%3c/svg%3e";
	//#endregion
	//#region node_modules/@phosphor-icons/core/assets/fill/stethoscope-fill.svg
	var stethoscope_fill_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20256%20256'%20fill='currentColor'%3e%3cpath%20d='M240,160a32,32,0,1,0-39.93,31,8,8,0,0,0-.07,1,32,32,0,0,1-32,32H144a32,32,0,0,1-32-32V151.48c31.47-4,56-31.47,56-64.31V40a8,8,0,0,0-8-8H136a8,8,0,0,0,0,16h16V87.17c0,26.58-21.25,48.49-47.36,48.83A48,48,0,0,1,56,88V48H72a8,8,0,0,0,0-16H48a8,8,0,0,0-8,8V88a64,64,0,0,0,56,63.49V192a48.05,48.05,0,0,0,48,48h24a48.05,48.05,0,0,0,48-48,8,8,0,0,0-.07-1A32,32,0,0,0,240,160Zm-32,8a8,8,0,1,1,8-8A8,8,0,0,1,208,168Z'/%3e%3c/svg%3e";
	//#endregion
	//#region node_modules/@phosphor-icons/core/assets/fill/table-fill.svg
	var table_fill_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20256%20256'%20fill='currentColor'%3e%3cpath%20d='M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM40,112H80v32H40Zm56,0H216v32H96ZM40,160H80v32H40Zm176,32H96V160H216v32Z'/%3e%3c/svg%3e";
	//#endregion
	//#region node_modules/@phosphor-icons/core/assets/regular/caret-down.svg
	var caret_down_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20256%20256'%20fill='currentColor'%3e%3cpath%20d='M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z'/%3e%3c/svg%3e";
	//#endregion
	//#region node_modules/@phosphor-icons/core/assets/regular/dots-six.svg
	var dots_six_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20256%20256'%20fill='currentColor'%3e%3cpath%20d='M72,92A12,12,0,1,1,60,80,12,12,0,0,1,72,92Zm56-12a12,12,0,1,0,12,12A12,12,0,0,0,128,80Zm68,24a12,12,0,1,0-12-12A12,12,0,0,0,196,104ZM60,152a12,12,0,1,0,12,12A12,12,0,0,0,60,152Zm68,0a12,12,0,1,0,12,12A12,12,0,0,0,128,152Zm68,0a12,12,0,1,0,12,12A12,12,0,0,0,196,152Z'/%3e%3c/svg%3e";
	//#endregion
	//#region node_modules/@phosphor-icons/core/assets/regular/eye.svg
	var eye_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20256%20256'%20fill='currentColor'%3e%3cpath%20d='M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z'/%3e%3c/svg%3e";
	//#endregion
	//#region node_modules/@phosphor-icons/core/assets/regular/eye-slash.svg
	var eye_slash_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20256%20256'%20fill='currentColor'%3e%3cpath%20d='M53.92,34.62A8,8,0,1,0,42.08,45.38L61.32,66.55C25,88.84,9.38,123.2,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208a127.11,127.11,0,0,0,52.07-10.83l22,24.21a8,8,0,1,0,11.84-10.76Zm47.33,75.84,41.67,45.85a32,32,0,0,1-41.67-45.85ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.16,133.16,0,0,1,25,128c4.69-8.79,19.66-33.39,47.35-49.38l18,19.75a48,48,0,0,0,63.66,70l14.73,16.2A112,112,0,0,1,128,192Zm6-95.43a8,8,0,0,1,3-15.72,48.16,48.16,0,0,1,38.77,42.64,8,8,0,0,1-7.22,8.71,6.39,6.39,0,0,1-.75,0,8,8,0,0,1-8-7.26A32.09,32.09,0,0,0,134,96.57Zm113.28,34.69c-.42.94-10.55,23.37-33.36,43.8a8,8,0,1,1-10.67-11.92A132.77,132.77,0,0,0,231.05,128a133.15,133.15,0,0,0-23.12-30.77C185.67,75.19,158.78,64,128,64a118.37,118.37,0,0,0-19.36,1.57A8,8,0,1,1,106,49.79,134,134,0,0,1,128,48c34.88,0,66.57,13.26,91.66,38.35,18.83,18.83,27.3,37.62,27.65,38.41A8,8,0,0,1,247.31,131.26Z'/%3e%3c/svg%3e";
	//#endregion
	//#region node_modules/@phosphor-icons/core/assets/regular/plus.svg
	var plus_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20256%20256'%20fill='currentColor'%3e%3cpath%20d='M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z'/%3e%3c/svg%3e";
	//#endregion
	//#region node_modules/@phosphor-icons/core/assets/regular/question.svg
	var question_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20256%20256'%20fill='currentColor'%3e%3cpath%20d='M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z'/%3e%3c/svg%3e";
	//#endregion
	//#region node_modules/@phosphor-icons/core/assets/regular/trash.svg
	var trash_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20256%20256'%20fill='currentColor'%3e%3cpath%20d='M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z'/%3e%3c/svg%3e";
	//#endregion
	//#region node_modules/@phosphor-icons/core/assets/regular/x.svg
	var x_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20256%20256'%20fill='currentColor'%3e%3cpath%20d='M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z'/%3e%3c/svg%3e";
	//#endregion
	//#region node_modules/@phosphor-icons/core/assets/regular/x-circle.svg
	var x_circle_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20256%20256'%20fill='currentColor'%3e%3cpath%20d='M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z'/%3e%3c/svg%3e";
	//#endregion
	//#region extension/utils/common/svg-helper.ts
	function svgImport(svgImport) {
		if (typeof svgImport !== "string") return (attributes = {}) => createFallbackElement(attributes);
		if (svgImport.startsWith("data:image/svg+xml")) {
			const encodedData = svgImport.substring(19);
			let svgContent;
			try {
				svgContent = decodeURIComponent(encodedData);
			} catch (error) {
				console.error("Failed to decode SVG data URL", error);
				return (attributes = {}) => createFallbackElement(attributes);
			}
			return (attributes = {}) => createSvgElement(svgContent, attributes);
		}
		return (attributes = {}) => createSvgElement(svgImport, attributes);
	}
	function createFallbackElement(attributes) {
		const svgNS = "http://www.w3.org/2000/svg";
		const svg = document.createElementNS(svgNS, "svg");
		svg.setAttribute("width", "24");
		svg.setAttribute("height", "24");
		svg.setAttribute("viewBox", "0 0 24 24");
		Object.entries(attributes).filter(([, value]) => value !== false && value !== null && value !== void 0).map(([key, value]) => svg.setAttribute(key, String(value)));
		const rect = document.createElementNS(svgNS, "rect");
		rect.setAttribute("x", "0");
		rect.setAttribute("y", "0");
		rect.setAttribute("width", "24");
		rect.setAttribute("height", "24");
		rect.setAttribute("fill", "red");
		svg.appendChild(rect);
		return svg;
	}
	function createSvgElement(svgContent, attributes = {}) {
		const fullAttributes = {
			width: "size" in attributes ? attributes.size : "1em",
			height: "size" in attributes ? attributes.size : "1em",
			...attributes
		};
		const svg = elementBuilder({
			type: "template",
			html: svgContent.trim()
		}).content.firstChild;
		if (!isSVGElement(svg)) return createFallbackElement(fullAttributes);
		Object.entries(fullAttributes).filter(([, value]) => value !== false && value !== null && value !== void 0).forEach(([key, value]) => svg.setAttribute(key, String(value)));
		return svg;
	}
	svgImport(caret_down_default);
	svgImport(dots_six_default);
	svgImport(eye_default);
	svgImport(eye_slash_default);
	svgImport(plus_default);
	svgImport(trash_default);
	svgImport(question_default);
	svgImport(x_default);
	svgImport(x_circle_default);
	svgImport(arrow_bend_up_left_bold_default);
	svgImport(arrow_clockwise_bold_default);
	svgImport(arrow_down_bold_default);
	svgImport(arrow_up_bold_default);
	svgImport(check_bold_default);
	svgImport(check_circle_bold_default);
	svgImport(copy_bold_default);
	svgImport(info_bold_default);
	svgImport(warning_circle_bold_default);
	svgImport(x_circle_bold_default);
	svgImport(spinner_gap_bold_default);
	svgImport(arrows_out_cardinal_fill_default);
	svgImport(airplane_fill_default);
	svgImport(bell_fill_default);
	svgImport(bell_slash_fill_default);
	svgImport(caret_down_fill_default);
	svgImport(caret_right_fill_default);
	svgImport(caret_up_fill_default);
	svgImport(info_fill_default);
	svgImport(funnel_fill_default);
	svgImport(funnel_x_fill_default);
	svgImport(gear_fill_default);
	svgImport(plus_fill_default);
	svgImport(stethoscope_fill_default);
	svgImport(table_fill_default);
	//#endregion
	//#region extension/utils/common/functions/dom.ts
	function elementBuilder(options) {
		if (typeof options === "string") return document.createElement(options);
		else if (typeof options === "object") {
			options = {
				type: "div",
				id: void 0,
				class: void 0,
				text: void 0,
				html: void 0,
				value: void 0,
				href: void 0,
				children: [],
				attributes: {},
				events: {},
				style: {},
				dataset: {},
				...options
			};
			const newElement = document.createElement(options.type);
			if (options.id) newElement.id = options.id;
			if (options.class) newElement.className = Array.isArray(options.class) ? options.class.filter((name) => !!name).join(" ") : options.class.trim();
			if (options.text !== void 0) newElement.textContent = options.text.toString();
			if (options.html) newElement.innerHTML = options.html;
			if (options.value && "value" in newElement) if (typeof options.value === "function") newElement.value = options.value();
			else newElement.value = options.value;
			if (options.href && "href" in newElement) newElement.href = options.href;
			for (const child of options.children.filter((child) => !!child) || []) if (typeof child === "string") newElement.appendChild(document.createTextNode(child));
			else newElement.appendChild(child);
			if (options.attributes) {
				let attributes = options.attributes;
				if (typeof attributes === "function") attributes = attributes();
				for (const attribute in attributes) newElement.setAttribute(attribute, attributes[attribute].toString());
			}
			for (const event in options.events) newElement.addEventListener(event, options.events[event]);
			for (const key in options.style) newElement.style[key] = options.style[key];
			for (const key in options.dataset) if (typeof options.dataset[key] === "object") newElement.dataset[key] = JSON.stringify(options.dataset[key]);
			else newElement.dataset[key] = options.dataset[key].toString();
			return newElement;
		} else throw new Error("Invalid options provided to newElement.");
	}
	function isSVGElement(node) {
		return node && "nodeType" in node && node.nodeType === Node.ELEMENT_NODE && "ownerSVGElement" in node;
	}
	//#endregion
	//#region extension/utils/common/functions/utilities.ts
	var SCRIPT_TYPE = (() => {
		if (typeof window === "undefined" || window.location.href.endsWith("/_generated_background_page.html")) return "BACKGROUND";
		else if (typeof browser$1 === "object" && browser$1.action) return "POPUP";
		else return "CONTENT";
	})();
	function sleep(millis) {
		return new Promise((resolve) => setTimeout(resolve, millis));
	}
	var TO_MILLIS = {
		SECONDS: 1e3,
		MINUTES: 1e3 * 60,
		HOURS: 1e3 * 60 * 60,
		DAYS: 1e3 * 60 * 60 * 24
	};
	function isSameUTCDay(date1, date2) {
		const _date1 = new Date(date1);
		const _date2 = new Date(date2);
		return _date1.setUTCHours(24, 0, 0, 0) === _date2.setUTCHours(24, 0, 0, 0);
	}
	function getUTCTodayAtTime(hours, minutes) {
		const date = /* @__PURE__ */ new Date();
		date.setUTCHours(hours, minutes);
		return date;
	}
	function hasTimePassed(timestamp, time) {
		const difference = Date.now() - timestamp;
		return Math.abs(difference) >= time;
	}
	function getCookie(cname) {
		const name = `${cname}=`;
		for (let cookie of decodeURIComponent(document.cookie).split(";")) {
			cookie = cookie.trimStart();
			if (cookie.includes(name)) return cookie.substring(name.length);
		}
		return "";
	}
	function toNumericVersion(version) {
		return parseInt(version.split(".").map((part) => part.padStart(3, "0")).join("").padEnd(9, "9"));
	}
	//#endregion
	//#region extension/utils/common/data/migrations.ts
	var MIGRATIONS = [
		{
			id: "9da14c73-0145-4b1d-90e3-0363a5b57499",
			version: "9.0.0",
			execute(_database, flags, _oldStorage) {
				flags.updateUserdata = true;
			}
		},
		{
			id: "43fae1f2-5568-4ae5-b12f-f3625e1e58c6",
			version: "9.0.0",
			execute(database, _flags, _oldStorage) {
				database.cache["personal-stats"] = {};
			}
		},
		{
			id: "b194a6d5-4230-4b03-8a8b-bebd7c431cc9",
			version: "9.0.0",
			execute(database, _flags, _oldStorage) {
				database.settings.pages.api.autoDemo = false;
			}
		},
		{
			id: "b0f539ba-41f8-4eed-93e2-e8523f7c49a5",
			version: "9.0.1",
			execute(database, _flags, oldStorage) {
				const oldCustomLinks = oldStorage?.settings?.customLinks ?? [];
				database.settings.customLinks = oldCustomLinks.map((link) => {
					return link.preset && link.preset !== "custom" ? {
						newTab: link.newTab,
						location: link.location,
						name: link.name,
						preset: link.preset
					} : {
						newTab: link.newTab,
						location: link.location,
						name: link.name,
						href: link.href
					};
				});
			}
		}
	];
	async function executeMigrationScripts(storage, oldStorage) {
		const migrations = MIGRATIONS.filter(({ version }) => toNumericVersion(version) >= toNumericVersion(storage.version.initial)).filter(({ id }) => !storage.migrations.map(({ id }) => id).includes(id));
		const flags = {
			updateUserdata: false,
			updateFactiondata: false,
			updateTorndata: false,
			clearCache: false
		};
		migrations.reverse().filter((migration) => {
			migration.execute(storage, flags, oldStorage);
			storage.migrations.push({ id: migration.id });
		});
		if (flags.updateUserdata) storage.userdata.date = 0;
		if (flags.updateFactiondata) storage.factiondata.date = 0;
		if (flags.updateTorndata) storage.torndata.date = 0;
		if (flags.clearCache) storage.cache = {};
	}
	//#endregion
	//#region extension/utils/common/functions/formatting.ts
	var REGEXES = {
		convertToNumber: /-?[\d,]+(\.\d+)?/,
		formatNumber: /\B(?=(\d{3})+(?!\d))/g
	};
	function dropDecimals(number) {
		return parseInt(number.toString());
	}
	function toMultipleDigits(number, digits = 2) {
		if (number === void 0) return void 0;
		return number.toString().length < digits ? toMultipleDigits(`0${number}`, digits) : number.toString();
	}
	function formatTime(time, partialOptions = {}) {
		if (typeof time === "number") return formatTime({ milliseconds: time }, partialOptions);
		else if (time instanceof Date) return formatTime({ milliseconds: time.getTime() }, partialOptions);
		const options = {
			type: "normal",
			showDays: false,
			hideHours: false,
			hideSeconds: false,
			short: false,
			extraShort: false,
			agoFilter: void 0,
			daysToHours: false,
			truncateSeconds: false,
			...partialOptions
		};
		let millis;
		if ("milliseconds" in time) millis = time.milliseconds;
		else if ("seconds" in time) millis = time.seconds * TO_MILLIS.SECONDS;
		let date, parts;
		switch (options.type) {
			case "normal": {
				date = new Date(millis);
				let seconds, minutes, hours;
				if (settings.formatting.tct) {
					seconds = date.getUTCSeconds();
					minutes = date.getUTCMinutes();
					hours = date.getUTCHours();
				} else {
					seconds = date.getSeconds();
					minutes = date.getMinutes();
					hours = date.getHours();
				}
				const secondsText = options.hideSeconds ? void 0 : toMultipleDigits(seconds);
				const minutesText = toMultipleDigits(minutes);
				let hoursText = toMultipleDigits(hours);
				switch (settings.formatting.time) {
					case "us": {
						const afternoon = hours >= 12;
						hoursText = toMultipleDigits(hours % 12 || 12);
						return secondsText ? `${hoursText}:${minutesText}:${secondsText} ${afternoon ? "PM" : "AM"}` : `${hoursText}:${minutesText} ${afternoon ? "PM" : "AM"}`;
					}
					default: return secondsText ? `${hoursText}:${minutesText}:${secondsText}` : `${hoursText}:${minutesText}`;
				}
			}
			case "timer": {
				date = new Date(millis);
				parts = [];
				if (options.showDays) parts.push(Math.floor(date.getTime() / TO_MILLIS.DAYS));
				if (!options.hideHours) parts.push(date.getUTCHours() + (options.daysToHours ? 24 * Math.floor(millis / TO_MILLIS.DAYS) : 0));
				parts.push(date.getUTCMinutes());
				if (!options.hideSeconds) parts.push(date.getUTCSeconds());
				let timerText = parts.map((p) => toMultipleDigits(p, 2)).join(":");
				if (options.short && options.showDays && timerText.startsWith("00:")) timerText = timerText.slice(3);
				return timerText;
			}
			case "wordTimer": return formatTimeAsWordTimer(millis, options);
			case "ago": {
				let timeAgo = Math.floor(Date.now() - millis);
				let token = "ago";
				if (timeAgo < 0) {
					token = "from now";
					timeAgo = Math.abs(timeAgo);
				}
				const UNITS = [
					{
						unit: options.short ? "y" : "year",
						millis: TO_MILLIS.DAYS * 370,
						getter: () => {
							const to = /* @__PURE__ */ new Date();
							const from = new Date(millis);
							let years = to.getFullYear() - from.getFullYear();
							if (to.getMonth() > from.getMonth() || to.getMonth() === from.getMonth() && to.getDay() > from.getDay()) years--;
							return years;
						}
					},
					{
						unit: options.short ? "mth" : "month",
						millis: TO_MILLIS.DAYS * 30,
						getter: () => {
							const to = /* @__PURE__ */ new Date();
							const from = new Date(millis);
							let months = (to.getFullYear() - from.getFullYear()) * 12;
							months += to.getMonth() - from.getMonth();
							if (to.getDay() > from.getDay()) months--;
							return months;
						}
					},
					{
						unit: options.short ? "d" : "day",
						millis: TO_MILLIS.DAYS
					},
					{
						unit: options.short ? "hr" : "hour",
						millis: TO_MILLIS.HOURS
					},
					{
						unit: options.short ? "min" : "minute",
						millis: TO_MILLIS.MINUTES
					},
					{
						unit: options.short ? "sec" : "second",
						millis: TO_MILLIS.SECONDS
					},
					{
						text: options.short ? "now" : "just now",
						millis: 0
					}
				];
				let _units = UNITS;
				if (options.agoFilter) _units = UNITS.filter((value) => value.millis <= options.agoFilter);
				for (const unit of _units) {
					if (timeAgo < unit.millis) continue;
					if (unit.unit) {
						const amount = unit.getter ? unit.getter() : Math.floor(timeAgo / unit.millis);
						return `${amount} ${unit.unit}${applyPlural(amount)} ${token}`;
					} else if (unit.text) return unit.text;
				}
				return timeAgo.toString();
			}
			default: throw new Error("Invalid formatTime type.");
		}
	}
	function formatTimeAsWordTimer(millis, options) {
		const date = new Date(millis);
		let hasShownDays = false;
		let hasShownHours = false;
		const parts = [];
		if (options.showDays && dropDecimals(date.getTime() / TO_MILLIS.DAYS) > 0) {
			hasShownDays = true;
			parts.push(formatUnit(Math.floor(date.getTime() / TO_MILLIS.DAYS), {
				normal: "day",
				short: "day",
				extraShort: "d"
			}));
		}
		if (!options.hideHours && date.getUTCHours()) {
			hasShownHours = true;
			parts.push(formatUnit(date.getUTCHours(), {
				normal: "hour",
				short: "hr",
				extraShort: "h"
			}));
		}
		if (date.getUTCMinutes()) parts.push(formatUnit(date.getUTCMinutes(), {
			normal: "minute",
			short: "min",
			extraShort: "m"
		}));
		if (!options.hideSeconds && date.getUTCSeconds() && (!options.truncateSeconds || !(hasShownDays || hasShownHours))) parts.push(formatUnit(date.getUTCSeconds(), {
			normal: "second",
			short: "sec",
			extraShort: "s"
		}));
		if (parts.length > 1 && !options.extraShort) parts.splice(parts.length - 1, 0, "and");
		function formatUnit(amount, unit) {
			let formatted = `${amount}`;
			if (options.extraShort) formatted += unit.extraShort;
			else if (options.short) formatted += ` ${unit.short}${applyPlural(amount)}`;
			else formatted += ` ${unit.normal}${applyPlural(amount)}`;
			return formatted;
		}
		return parts.join(" ");
	}
	function formatNumber(number, partialOptions = {}) {
		const options = {
			shorten: false,
			formatter: void 0,
			decimals: 0,
			currency: false,
			forceOperation: false,
			roman: false,
			...partialOptions
		};
		if (typeof number !== "number") if (Number.isNaN(parseInt(number))) return number;
		else number = parseFloat(number);
		if (number === Number.POSITIVE_INFINITY) return "∞";
		if (options.decimals !== void 0) number = parseFloat(number.toFixed(options.decimals));
		if (options.formatter) return options.formatter.format(number);
		if (options.roman) {
			if (number === 0) return "";
			else if (number < 0) throw "Roman numbers can only be positive!";
			const ROMAN = [
				[1e3, "M"],
				[900, "CM"],
				[500, "D"],
				[400, "CD"],
				[100, "C"],
				[90, "XC"],
				[50, "L"],
				[40, "XL"],
				[10, "X"],
				[9, "IX"],
				[5, "V"],
				[4, "IV"],
				[1, "I"]
			];
			return toRoman(number);
			function toRoman(number) {
				if (number === 0) return "";
				for (const [value, character] of ROMAN) {
					if (number < value) continue;
					return character + toRoman(number - value);
				}
				return "N/A";
			}
		}
		const abstract = Math.abs(number);
		const operation = number < 0 ? "-" : options.forceOperation ? "+" : "";
		let text;
		if (options.shorten) {
			const version = options.shorten === true ? 1 : options.shorten;
			const decimals = options.decimals !== -1 ? options.decimals : 3;
			const words = (() => {
				switch (version) {
					case 1: return {
						thousand: "k",
						million: "mil",
						billion: "bill"
					};
					case 2:
					case 3: return {
						thousand: "k",
						million: "m",
						billion: "b"
					};
				}
			})();
			if (version === 1 || version === 2) {
				if (abstract >= 1e9) if (abstract % 1e9 === 0) text = (abstract / 1e9).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + words.billion;
				else text = (abstract / 1e9).toFixed(3) + words.billion;
				else if (abstract >= 1e6) if (abstract % 1e6 === 0) text = abstract / 1e6 + words.million;
				else text = (abstract / 1e6).toFixed(3) + words.million;
				else if (abstract >= 1e3) {
					if (abstract % 1e3 === 0) text = abstract / 1e3 + words.thousand;
				}
			} else if (abstract >= 1e9) if (abstract % 1e9 === 0) text = abstract / 1e9 + words.billion;
			else text = parseFloat((abstract / 1e9).toFixed(decimals)) + words.billion;
			else if (abstract >= 1e6) if (abstract % 1e6 === 0) text = abstract / 1e6 + words.million;
			else text = parseFloat((abstract / 1e6).toFixed(decimals)) + words.million;
			else if (abstract >= 1e3) {
				if (abstract % 1e3 === 0) text = abstract / 1e3 + words.thousand;
				else if (abstract % 100 === 0) text = abstract / 1e3 + words.thousand;
			}
		}
		if (!text) text = abstract.toString().replace(REGEXES.formatNumber, ",");
		return `${operation}${options.currency ? "$" : ""}${text}`;
	}
	function capitalizeText(text, partialOptions = {}) {
		if (!text) return "";
		if (!{
			everyWord: false,
			...partialOptions
		}.everyWord) return text[0].toUpperCase() + text.slice(1);
		return text.trim().split(" ").map((word) => capitalizeText(word)).join(" ").trim();
	}
	function applyPlural(check) {
		return check !== 1 ? "s" : "";
	}
	//#endregion
	//#region extension/utils/common/data/usage.ts
	var TornToolsUsage = class {
		usage;
		constructor() {
			this.usage = {};
		}
		async add(location) {
			const minute = dropDecimals(Date.now() / TO_MILLIS.MINUTES);
			if (!(minute in this.usage)) this.usage[minute] = {};
			if (!(location in this.usage[minute])) this.usage[minute][location] = 0;
			this.usage[minute][location] += 1;
			await ttStorage.set({ usage: this.usage });
		}
		async refresh() {
			const last24HrsMinute = dropDecimals((Date.now() - 24 * TO_MILLIS.HOURS) / TO_MILLIS.MINUTES);
			Object.keys(this.usage).forEach((minute) => {
				if (parseInt(minute) < last24HrsMinute) delete this.usage[parseInt(minute)];
			});
			await ttStorage.set({ usage: this.usage });
		}
		async clear() {
			this.usage = {};
			await ttStorage.set({ usage: {} });
		}
	};
	var ttUsage = new TornToolsUsage();
	//#endregion
	//#region extension/utils/common/data/database.ts
	var settings;
	var filters;
	var version;
	var api;
	var userdata;
	var torndata;
	var stakeouts;
	var attackHistory;
	var notes;
	var factiondata;
	var quick;
	var localdata;
	var npcs;
	var notificationHistory;
	var stockdata;
	var factionStakeouts;
	var notifications;
	var migrations;
	var databaseLoaded = false;
	var databaseLoading = false;
	var storageListeners = {
		settings: [],
		filters: [],
		version: [],
		userdata: [],
		stakeouts: [],
		factionStakeouts: [],
		notes: [],
		factiondata: [],
		localdata: [],
		cache: [],
		api: [],
		npcs: []
	};
	async function loadDatabase(force = false) {
		if (databaseLoaded && !force) return {
			settings,
			filters,
			version,
			userdata,
			stakeouts,
			factionStakeouts,
			notes,
			factiondata,
			localdata,
			cache: ttCache.cache,
			api,
			npcs,
			torndata,
			notificationHistory,
			attackHistory,
			quick,
			stockdata,
			usage: ttUsage.usage,
			notifications,
			migrations
		};
		else if (databaseLoaded && !settings || databaseLoading) {
			await sleep(75);
			return await loadDatabase();
		}
		databaseLoading = true;
		const database = await ttStorage.get();
		populateDatabaseVariables(database);
		console.log("TT - Database loaded.", database);
		databaseLoaded = true;
		databaseLoading = false;
		return database;
	}
	async function migrateDatabase(force = false) {
		try {
			const loadedStorage = await ttStorage.get();
			if (!loadedStorage || !Object.keys(loadedStorage).length) {
				console.log("TT - Fresh installation detected, setting up default storage.");
				await ttStorage.reset();
				await loadDatabase();
				return;
			}
			const storedVersion = loadedStorage?.version?.current || "5.0.0";
			const currentVersion = browser$1.runtime.getManifest().version;
			console.log(`TT - Migration check: ${storedVersion} -> ${currentVersion}`);
			const migratedStorage = convertStorage(loadedStorage, DEFAULT_STORAGE);
			await executeMigrationScripts(migratedStorage, loadedStorage);
			migratedStorage.version.current = currentVersion;
			await ttStorage.set(migratedStorage);
			populateDatabaseVariables(migratedStorage);
			console.log("TT - Database migration completed successfully.");
		} catch (error) {
			console.error("TT - Database migration failed:", error);
			await loadDatabase();
		}
	}
	function convertStorage(oldStorage, defaultStorage) {
		const newStorage = {};
		for (const key in defaultStorage) {
			if (!oldStorage) oldStorage = {};
			if (!(key in oldStorage)) oldStorage[key] = {};
			const defaultValue = defaultStorage[key];
			if (typeof defaultValue === "object" && defaultValue !== null) if (defaultValue instanceof DefaultSetting) newStorage[key] = migrateDefaultSetting(oldStorage[key], defaultValue);
			else newStorage[key] = convertStorage(oldStorage[key], defaultValue);
			else newStorage[key] = oldStorage[key] ?? defaultValue;
		}
		return newStorage;
	}
	function migrateDefaultSetting(oldValue, setting) {
		if (isValidSettingValue(oldValue, setting)) return oldValue;
		if (setting.defaultValue) return typeof setting.defaultValue === "function" ? setting.defaultValue() : setting.defaultValue;
		return null;
	}
	function isValidSettingValue(value, setting) {
		if (setting.type === "array") return Array.isArray(value);
		return setting.type.split("|").some((type) => type === "empty" && value === "" || typeof value === type);
	}
	function populateDatabaseVariables(database) {
		settings = database.settings;
		filters = database.filters;
		version = database.version;
		api = database.api;
		userdata = database.userdata;
		torndata = database.torndata;
		localdata = database.localdata;
		stakeouts = database.stakeouts;
		attackHistory = database.attackHistory;
		notes = database.notes;
		factiondata = database.factiondata;
		quick = database.quick;
		npcs = database.npcs;
		stockdata = database.stockdata;
		factionStakeouts = database.factionStakeouts;
		notificationHistory = database.notificationHistory;
		notifications = database.notifications;
		migrations = database.migrations;
		ttCache.cache = database.cache;
		ttUsage.usage = database.usage;
	}
	function initializeDatabase() {
		loadDatabase().catch(() => console.error("TT - Failed to load database."));
		browser$1.storage.onChanged.addListener((changes, area) => {
			if (area === "local") for (const key in changes) {
				switch (key) {
					case "settings":
						settings = changes.settings.newValue;
						break;
					case "filters":
						filters = changes.filters.newValue;
						break;
					case "version":
						version = changes.version.newValue;
						break;
					case "userdata":
						userdata = changes.userdata.newValue;
						break;
					case "api":
						api = changes.api.newValue;
						break;
					case "torndata":
						torndata = changes.torndata.newValue;
						break;
					case "stakeouts":
						stakeouts = changes.stakeouts.newValue;
						break;
					case "attackHistory":
						attackHistory = changes.attackHistory.newValue;
						break;
					case "notes":
						notes = changes.notes.newValue;
						break;
					case "factiondata":
						factiondata = changes.factiondata.newValue;
						break;
					case "quick":
						quick = changes.quick.newValue;
						break;
					case "localdata":
						localdata = changes.localdata.newValue;
						break;
					case "cache":
						ttCache.cache = changes.cache.newValue;
						break;
					case "usage":
						ttUsage.usage = changes.usage.newValue;
						break;
					case "npcs":
						npcs = changes.npcs.newValue;
						break;
					case "stockdata":
						stockdata = changes.stockdata.newValue;
						break;
					case "notificationHistory":
						notificationHistory = changes.notificationHistory.newValue;
						break;
					case "factionStakeouts":
						factionStakeouts = changes.factionStakeouts.newValue;
						break;
				}
				if (storageListeners[key]) storageListeners[key].forEach((listener) => listener(changes[key].oldValue));
			}
		});
	}
	function setUserdata(data) {
		userdata = data;
	}
	function setFactiondata(data) {
		factiondata = data;
	}
	function setFactionStakeouts(data) {
		factionStakeouts = data;
	}
	function setTorndata(data) {
		torndata = data;
	}
	function setNotificationHistory(data) {
		notificationHistory = data;
	}
	//#endregion
	//#region extension/utils/common/functions/browser.ts
	function usingFirefox() {
		return navigator.userAgent.includes("Firefox");
	}
	function hasSilentSupport() {
		if (navigator.userAgentData) return navigator.userAgentData.brands.some(({ brand }) => brand === "Chromium");
		else return !usingFirefox();
	}
	function hasInteractionSupport() {
		if (navigator.userAgentData) return navigator.userAgentData.brands.some(({ brand }) => brand === "Chromium");
		else return !usingFirefox();
	}
	//#endregion
	//#region extension/entrypoints/background/notifications.ts
	var AudioPlayer = class {
		_src;
		_volume;
		_audio;
		set src(src) {
			this._src = src;
		}
		set volume(volume) {
			this._volume = volume;
		}
		async play() {
			if (typeof Audio !== "undefined") {
				const audio = new Audio(this._src);
				audio.volume = this._volume;
				audio.play();
				this._audio = audio;
				return;
			}
			await setupAudioPlayerDocument();
			if (!this._src) throw Error("No sound src set.");
			await browser$1.runtime.sendMessage({
				offscreen: "audio",
				src: this._src,
				volume: this._volume
			});
		}
		async pause() {
			if (this._audio) {
				this._audio.pause();
				return;
			}
		}
	};
	var creatingOffscreen = null;
	async function setupAudioPlayerDocument() {
		if ((await browser$1.runtime.getContexts({ contextTypes: ["OFFSCREEN_DOCUMENT"] })).length > 0) return;
		if (!creatingOffscreen) {
			creatingOffscreen = browser$1.offscreen.createDocument({
				url: "/offscreen.html",
				reasons: ["AUDIO_PLAYBACK"],
				justification: "To play notification alert sound and TTS."
			});
			await creatingOffscreen;
			creatingOffscreen = null;
		} else await creatingOffscreen;
	}
	var notificationPlayer = new AudioPlayer();
	var notificationTestPlayer = new AudioPlayer();
	var notificationSound, notificationWorker;
	var notificationRelations = {};
	async function sendNotifications() {
		for (const type in notifications) for (const key in notifications[type]) {
			const notification = notifications[type][key];
			if ("combined" in notification) continue;
			const { seen, date, title, message, url } = notification;
			if (!seen) {
				await notifyUser(title, message, url);
				notification.seen = true;
				await storeNotification({
					title,
					message,
					url,
					type,
					key,
					date
				});
			}
			if (seen && Date.now() - date > 3 * TO_MILLIS.DAYS) delete notifications[type][key];
		}
		await ttStorage.set({
			notifications,
			notificationHistory
		});
	}
	async function notifyUser(title, message, url) {
		await setupSoundPlayer();
		const icon = browser$1.runtime.getURL("/images/icon_128.png");
		const requireInteraction = hasInteractionSupport() && settings.notifications.requireInteraction;
		const silent = hasSilentSupport() && notificationSound !== "default";
		if (settings.notifications.tts) readMessage(title + message).then(() => {}).catch((err) => console.error(err));
		try {
			await notifyNative();
		} catch (errorNative) {
			try {
				await notifyService();
			} catch (errorService) {
				console.error("Failed to send notification.", {
					native: errorNative,
					service: errorService
				});
			}
		}
		async function setupSoundPlayer() {
			if (notificationSound !== settings.notifications.sound) {
				const sound = getNotificationSound(settings.notifications.sound);
				if (sound && sound !== "mute") notificationPlayer.src = sound;
				notificationSound = settings.notifications.sound;
			}
			notificationPlayer.volume = settings.notifications.volume / 100;
		}
		async function notifyNative() {
			const options = {
				type: "basic",
				iconUrl: icon,
				title,
				message
			};
			if (silent) options.silent = true;
			if (requireInteraction) options.requireInteraction = true;
			const id = await browser$1.notifications.create(options);
			if (notificationSound !== "default" && notificationSound !== "mute") notificationPlayer.play().then(() => {});
			if (settings.notifications.link) notificationRelations[id] = url;
		}
		async function notifyService() {
			const options = {
				icon,
				body: message,
				requireInteraction,
				data: { settings: {} }
			};
			if (silent) options.silent;
			if (settings.notifications.link) options.data.link = url;
			if (!notificationWorker) await navigator.serviceWorker.register("scripts/service-worker.js").then(async (registration) => {
				notificationWorker = registration;
				await registration.update();
			});
			await new Promise((resolve, reject) => {
				notificationWorker.showNotification(title, options).then(() => {
					if (notificationSound !== "default" && notificationSound !== "mute") notificationPlayer.play();
					resolve();
				}).catch((error) => reject(error));
			});
		}
		async function readMessage(text) {
			if (typeof SpeechSynthesisUtterance !== "undefined") {
				const ttsMessage = new SpeechSynthesisUtterance(text);
				ttsMessage.volume = settings.notifications.volume / 100;
				if (settings.notifications.ttsVoice !== "default") {
					const matchedVoice = window.speechSynthesis.getVoices().find(({ name, lang }) => `${name} (${lang})` === settings.notifications.ttsVoice);
					if (matchedVoice) ttsMessage.voice = matchedVoice;
				}
				ttsMessage.rate = settings.notifications.ttsRate;
				window.speechSynthesis.speak(ttsMessage);
			} else {
				await setupAudioPlayerDocument();
				await browser$1.runtime.sendMessage({
					offscreen: "tts",
					text,
					volume: settings.notifications.volume / 100,
					voice: settings.notifications.ttsVoice,
					rate: settings.notifications.ttsRate
				});
			}
		}
	}
	async function storeNotification(notification) {
		if ("combined" in notification) {
			console.warn("Trying to save a combined notification.", notification);
			return;
		}
		if (!notification.title || !notification.message || !notification.date) {
			console.warn("Trying to save a notification without title, message or date.", notification);
			return;
		}
		notificationHistory.splice(0, 0, notification);
		setNotificationHistory(notificationHistory.slice(0, 100));
		await ttStorage.set({ notificationHistory });
	}
	function getNotificationSound(type, allowDefault = false) {
		switch (type) {
			case "1":
			case "2":
			case "3":
			case "4":
			case "5": return browser$1.runtime.getURL(`/audio/notification${type}.wav`);
			case "custom": return settings.notifications.soundCustom;
			default: return allowDefault ? getNotificationSound("1") : false;
		}
	}
	function newNotification(title, message, link) {
		return {
			title: `TornTools - ${title}`,
			message,
			url: link,
			date: Date.now()
		};
	}
	//#endregion
	//#region extension/entrypoints/background/updates-helper.ts
	function calculateOC(crimes, user) {
		return Object.values(crimes).reverse().filter(({ initiated }) => !initiated).filter(({ participants }) => participants.map((value) => parseInt(Object.keys(value)[0])).includes(user)).map(({ time_ready }) => time_ready * 1e3).find((time) => !!time) ?? -1;
	}
	//#endregion
	//#region extension/utils/common/functions/extension.ts
	var BADGE_TYPES = {
		default: {
			text: "",
			color: null
		},
		error: {
			text: "error",
			color: "#FF0000"
		},
		count: {
			text: async (options) => {
				if (options.events && options.messages) return `${options.events}/${options.messages}`;
				else if (options.events) return options.events.toString();
				else if (options.messages) return options.messages.toString();
				else return await getBadgeText() === "error" ? "error" : null;
			},
			color: async (options) => {
				if (options.events && options.messages) return "#1ed2ac";
				else if (options.events) return "#009eda";
				else if (options.messages) return "#84af03";
				else return await getBadgeText() === "error" ? "error" : null;
			}
		}
	};
	async function setBadge(type, partialOptions = {}) {
		if (SCRIPT_TYPE !== "BACKGROUND") return false;
		const options = {
			events: 0,
			messages: 0,
			...partialOptions
		};
		const badge = { ...BADGE_TYPES[type] };
		if (typeof badge.text === "function") badge.text = await badge.text(options);
		if (typeof badge.color === "function") badge.color = await badge.color(options);
		if (!badge.text) badge.text = "";
		browser$1.action.setBadgeText({ text: badge.text || "" });
		if (badge.color) browser$1.action.setBadgeBackgroundColor({ color: badge.color });
		return true;
	}
	function getBadgeText() {
		if (SCRIPT_TYPE !== "BACKGROUND") return Promise.resolve(null);
		return browser$1.action.getBadgeText({});
	}
	//#endregion
	//#region extension/utils/common/functions/torn.ts
	var LINKS = {
		auction: "https://www.torn.com/amarket.php",
		bank: "https://www.torn.com/bank.php",
		bazaar: "https://www.torn.com/bazaar.php",
		bounties: "https://www.torn.com/bounties.php#!p=main",
		chain: "https://www.torn.com/factions.php?step=your#/war/chain",
		church: "https://www.torn.com/church.php",
		committee: "https://www.torn.com/committee.php",
		companies: "https://www.torn.com/companies.php",
		companyEmployees: "https://www.torn.com/companies.php#/option=employees",
		crimes: "https://www.torn.com/crimes.php",
		donator: "https://www.torn.com/donator.php",
		education: "https://www.torn.com/page.php?sid=education",
		events: "https://www.torn.com/events.php#/step=all",
		faction: "https://www.torn.com/factions.php",
		faction__ranked_war: "https://www.torn.com/factions.php?step=your&type=1#/war/rank",
		faction_oc: "https://www.torn.com/factions.php?step=your#/tab=crimes",
		gym: "https://www.torn.com/gym.php",
		home: "https://www.torn.com/index.php",
		homepage: "https://www.torn.com/index.php",
		hospital: "https://www.torn.com/hospitalview.php",
		itemmarket: "https://www.torn.com/page.php?sid=ItemMarket",
		items: "https://www.torn.com/item.php",
		items_booster: "https://www.torn.com/item.php#boosters-items",
		items_candy: "https://www.torn.com/item.php#candy-items",
		items_drug: "https://www.torn.com/item.php#drugs-items",
		items_medical: "https://www.torn.com/item.php#medical-items",
		jailview: "https://www.torn.com/jailview.php",
		jobs: "https://www.torn.com/companies.php",
		loan: "https://www.torn.com/loan.php",
		messages: "https://www.torn.com/messages.php",
		missions: "https://www.torn.com/loader.php?sid=missions",
		organizedCrimes: "https://www.torn.com/factions.php?step=your#/tab=crimes",
		pc: "https://www.torn.com/pc.php",
		points: "https://www.torn.com/page.php?sid=points",
		pointsmarket: "https://www.torn.com/pmarket.php",
		property_upkeep: "https://www.torn.com/properties.php#/p=options&tab=upkeep",
		property_vault: "https://www.torn.com/properties.php#/p=options&tab=vault",
		raceway: "https://www.torn.com/page.php?sid=racing",
		staff: "https://www.torn.com/staff.php",
		stocks: "https://www.torn.com/page.php?sid=stocks",
		trade: "https://www.torn.com/trade.php",
		travelagency: "https://www.torn.com/page.php?sid=travel"
	};
	LINKS.donator, LINKS.donator, LINKS.staff, LINKS.committee, LINKS.church, LINKS.jobs, LINKS.jobs, LINKS.jobs, LINKS.jobs, LINKS.jobs, LINKS.jobs, LINKS.companies, LINKS.companies, LINKS.companies, LINKS.faction, LINKS.faction, LINKS.faction, LINKS.faction, LINKS.faction, LINKS.education, LINKS.education, LINKS.bank, LINKS.bank, LINKS.travelagency, LINKS.property_vault, LINKS.loan, LINKS.auction, LINKS.bazaar, LINKS.itemmarket, LINKS.pointsmarket, LINKS.stocks, LINKS.stocks, LINKS.trade, LINKS.homepage, LINKS.raceway, LINKS.raceway, LINKS.faction_oc, LINKS.faction_oc, LINKS.faction_oc, LINKS.faction_oc, LINKS.bounties, LINKS.bank, LINKS.auction, LINKS.auction, LINKS.hospital, LINKS.hospital, LINKS.hospital, LINKS.jailview, LINKS.hospital, LINKS.items_booster, LINKS.items_booster, LINKS.items_booster, LINKS.items_booster, LINKS.items_booster, LINKS.items_medical, LINKS.items_medical, LINKS.items_medical, LINKS.items_medical, LINKS.items_medical, LINKS.items_drug, LINKS.items_drug, LINKS.items_drug, LINKS.items_drug, LINKS.items_drug, LINKS.travelagency, LINKS.travelagency, LINKS.travelagency, LINKS.travelagency, LINKS.travelagency, LINKS.items_medical, LINKS.items_medical, LINKS.items_medical, LINKS.items_medical, LINKS.items_medical, LINKS.property_upkeep, LINKS.property_upkeep, LINKS.property_upkeep;
	[
		{
			id: 1,
			reason: "Admin"
		},
		{
			id: 4,
			reason: "NPC"
		},
		{
			id: 7,
			reason: "NPC"
		},
		{
			id: 9,
			reason: "NPC"
		},
		{
			id: 10,
			reason: "NPC"
		},
		{
			id: 15,
			reason: "NPC"
		},
		{
			id: 17,
			reason: "NPC"
		},
		{
			id: 19,
			reason: "NPC"
		},
		{
			id: 20,
			reason: "NPC"
		},
		{
			id: 21,
			reason: "NPC"
		}
	].map(({ id }) => id);
	var CHAIN_BONUSES = [
		10,
		25,
		50,
		100,
		250,
		500,
		1e3,
		2500,
		5e3,
		1e4,
		25e3,
		5e4,
		1e5
	];
	function getNextChainBonus(current) {
		return CHAIN_BONUSES.find((bonus) => bonus > current);
	}
	function getRFC() {
		const rfc = getCookie("rfc_v");
		if (!rfc) for (const cookie of document.cookie.split("; ")) {
			const parts = cookie.split("=");
			if (parts[0] === "rfc_v") return parts[1];
		}
		return rfc;
	}
	function hasFinishedEducation() {
		if (!torndata.education || !userdata.education_completed) return false;
		return torndata.education.flatMap((e) => e.courses).every(({ id }) => userdata.education_completed.includes(id));
	}
	var HOSP_REASONS = [
		{
			name: "overdosed",
			display: "Overdosed",
			display_sentence: "after overdosing",
			keywords: [
				"overdosed",
				"collapsed after taking",
				"collapsed while smoking"
			],
			important: true
		},
		{
			name: "hospitalized",
			display: "Hospitalized",
			display_sentence: "after being hospitalized",
			keywords: ["hospitalized"],
			important: true
		},
		{
			name: "mugged",
			display: "Mugged",
			display_sentence: "after being mugged",
			keywords: ["mugged"],
			important: true
		},
		{
			name: "attacked",
			display: "Attacked",
			display_sentence: "after being attacked",
			keywords: ["attacked"],
			important: true
		},
		{
			name: "lost",
			display: "Lost",
			keywords: ["lost"]
		},
		{
			name: "crashed",
			display: "Crashed",
			keywords: ["crashed"]
		},
		{
			name: "oc 1 failure",
			display: "OC 1 Failure",
			keywords: [
				"thrown at a wall",
				"nudist rebels",
				"shot in the back",
				"exploded",
				"swat marksman",
				"taken down by members",
				"taken down by guards",
				"attempted robbery",
				"derailed",
				"attempting to take down a president",
				"dropped by swiss guards"
			]
		},
		{
			name: "crimes 1 failure",
			display: "Crimes 1 Failure",
			keywords: [
				"trying to rob",
				"drive-by shooting",
				"third degree burns",
				"hitman mission",
				"arson attempt",
				"mauled by a guard dog",
				"shot while resisting arrest"
			]
		},
		{
			name: "crimes 2 failure",
			display: "Crimes 2 Failure",
			keywords: ["gunshot wound", "primary blast"]
		},
		{
			name: "sed",
			display: "SED",
			display_sentence: "after using a SED",
			keywords: ["nasty surprise"],
			important: true
		},
		{
			name: "blood_bag",
			display: "Blood Bag",
			display_sentence: "after using a wrong blood bag",
			keywords: ["acute hemolytic transfusion reaction"],
			important: true
		},
		{
			name: "ipecac_syrup",
			display: "Ipecac Syrup",
			display_sentence: "after ingesting Ipecac Syrup",
			keywords: ["ipecac syrup"],
			important: true
		},
		{
			name: "radiation_poisoning",
			display: "Radiation Poisoning",
			keywords: ["radiation poisoning"]
		}
	];
	function getHospitalizationReason(details) {
		details = details.toLowerCase();
		return HOSP_REASONS.find((_reason) => _reason.keywords.some((keyword) => details.includes(keyword)));
	}
	var MAX_MISSIONS = {
		Duke: 3,
		DEFAULT: 3
	};
	//#endregion
	//#region extension/utils/services/proxy-service-keys.ts
	var SOURCE_SERVICE_KEY = "source-service";
	var BACKGROUND_SERVICE_KEY = "background-service";
	createProxyService(SOURCE_SERVICE_KEY);
	var BACKGROUND_SERVICE = createProxyService(BACKGROUND_SERVICE_KEY);
	//#endregion
	//#region extension/utils/common/functions/api.ts
	var IS_SAFARI = typeof navigator !== "undefined" && /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/Chromium/.test(navigator.userAgent);
	var CUSTOM_API_ERROR = {
		NO_NETWORK: "tt-no_network",
		NO_PERMISSION: "tt-no_permission",
		CANCELLED: "tt-cancelled"
	};
	var FETCH_PLATFORMS = {
		tornv2: "https://api.torn.com/v2/",
		torn_direct: "https://www.torn.com/",
		yata: "https://yata.yt/",
		tornstats: "https://www.tornstats.com/",
		torntools: "https://torntools.gregork.com/",
		nukefamily: "https://nuke.family/",
		uhc: "https://tornuhc.eu/",
		stig: "https://api.no1irishstig.co.uk/",
		prometheus: "https://prombot.co.uk/",
		lzpt: "https://api.lzpt.io/",
		wtf: "https://what-the-f.de/",
		tornw3b: "https://weav3r.dev/",
		ffscouter: "https://ffscouter.com/",
		laekna: "https://laekna-revive-bot.onrender.com/",
		tornintel: "https://torn-intel.com/"
	};
	var FACTION_ACCESS = {
		none: "none",
		basic: "basic",
		full_access: "full_access"
	};
	async function fetchData(l, partialOptions = {}) {
		const options = {
			fakeResponse: false,
			section: void 0,
			id: void 0,
			selections: [],
			legacySelections: [],
			key: void 0,
			action: void 0,
			method: "GET",
			body: void 0,
			silent: false,
			succeedOnError: false,
			includeKey: false,
			relay: false,
			params: {},
			...partialOptions
		};
		if (options.relay && SCRIPT_TYPE !== "BACKGROUND" && !IS_SAFARI) return new Promise((resolve, reject) => {
			BACKGROUND_SERVICE.fetchRelay(l, {
				...options,
				relay: false
			}).then((response) => resolve(response)).catch((error) => {
				if (error.name === "NonError") reject(JSON.parse(error.message));
				else reject(new Error(error));
			});
		});
		return new Promise(async (resolve, reject) => {
			let location;
			if (!(l in FETCH_PLATFORMS)) {
				location = Object.entries(FETCH_PLATFORMS).filter(([, value]) => l === value).map(([key]) => key).find(() => true);
				if (!location) throw new Error(`Unknown fetch platform was chosen: ${l}!`);
			} else location = l;
			let url, path, pathSections, key;
			const headers = {};
			const params = new URLSearchParams();
			switch (location) {
				case "tornv2":
					url = FETCH_PLATFORMS.tornv2;
					path = `${options.section}/${options.id || ""}`;
					params.append("selections", [...options.selections, ...options.legacySelections].join(","));
					params.append("legacy", options.legacySelections.join(","));
					params.append("key", options.key || api.torn.key);
					if (settings.apiUsage.comment) params.append("comment", settings.apiUsage.comment);
					await ttUsage.add(location);
					break;
				case "torn_direct":
					url = FETCH_PLATFORMS.torn_direct;
					path = options.action;
					params.set("rfcv", getRFC());
					break;
				case "tornstats":
					url = FETCH_PLATFORMS.tornstats;
					pathSections = [
						"api",
						"v2",
						options.key || api.tornstats.key || api.torn.key
					];
					if (options.section) pathSections.push(options.section);
					if (options.id) pathSections.push(options.id);
					path = pathSections.join("/");
					await ttUsage.add(location);
					break;
				case "yata":
					url = FETCH_PLATFORMS.yata;
					pathSections = [
						"api",
						"v1",
						options.section
					];
					if (options.id) pathSections.push(options.id, "");
					if (options.includeKey) key = api.yata.key;
					path = pathSections.join("/");
					await ttUsage.add(location);
					break;
				case "prometheus":
					url = FETCH_PLATFORMS.prometheus;
					path = ["api", options.section].join("/");
					break;
				case "tornw3b":
					url = FETCH_PLATFORMS.tornw3b;
					path = ["api", options.section].join("/");
					break;
				case "ffscouter":
					url = FETCH_PLATFORMS.ffscouter;
					path = [
						"api",
						"v1",
						options.section
					].join("/");
					key = api.ffScouter.key;
					break;
				case "tornintel":
					url = FETCH_PLATFORMS.tornintel;
					path = ["api", options.section].join("/");
					break;
				default:
					url = FETCH_PLATFORMS[location];
					path = options.section;
					break;
			}
			if (options.includeKey) params.append("key", options.key || key || api.torn.key);
			if (options.params) for (const [key, value] of Object.entries(options.params)) params.append(key, value.toString());
			const fullUrl = `${url}${path}${params.toString() ? `?${params}` : ""}`;
			let parameters = {};
			if (options.method.toUpperCase() === "POST") {
				let body;
				if (options.body instanceof URLSearchParams) body = options.body;
				else {
					body = JSON.stringify(options.body);
					headers["content-type"] = "application/json";
				}
				if (location === "torn_direct") headers["x-requested-with"] = "XMLHttpRequest";
				parameters = {
					method: "POST",
					body
				};
			}
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), decideTimeoutTimer(l));
			fetch(fullUrl, {
				...parameters,
				headers,
				signal: controller.signal
			}).then(async (response) => {
				let result = {};
				try {
					result = await response.clone().json();
				} catch (error) {
					if (location === "torn_direct" || location === "laekna") {
						result = await response.clone().text();
						resolve(result);
						return;
					} else {
						if (controller.signal.aborted) {
							result.success = false;
							result.error = error;
						} else if (response.status === 200) result.success = true;
						else {
							result.success = false;
							result.error = new HTTPException(response.status);
						}
						result.metadata = {
							error,
							response,
							signal: controller.signal
						};
					}
				}
				if (options.fakeResponse) result = options.fakeResponse;
				if (result.error) await handleError(result);
				else {
					if (isTornAPICall(location) && !options.silent && SCRIPT_TYPE === "BACKGROUND") {
						await getBadgeText().then(async (value) => {
							if (value === "error") await setBadge("default");
						}).catch(() => console.error("TT - Couldn't get the badge text."));
						await ttStorage.change({ api: { torn: {
							online: true,
							error: ""
						} } });
					}
					resolve(result);
				}
			}).catch((error) => handleError(error)).then(() => clearTimeout(timeoutId));
			return fullUrl;
			async function handleError(result) {
				if (options.succeedOnError) {
					resolve(result);
					await ttUsage.add(location);
					return;
				}
				if (result instanceof DOMException) {
					const error = "Request cancelled because it took too long.";
					const isLocal = false;
					const code = CUSTOM_API_ERROR.CANCELLED;
					if (isTornAPICall(location) && !options.silent && SCRIPT_TYPE === "BACKGROUND") {
						await ttStorage.change({ api: { torn: {
							online: false,
							error
						} } });
						await setBadge("error");
					}
					reject({
						error,
						isLocal,
						code
					});
				} else if (result.constructor.name === "TypeError") {
					let error = result.message;
					let isLocal = false;
					let code;
					if (error === "Failed to fetch") {
						isLocal = true;
						if (SCRIPT_TYPE === "BACKGROUND" && !await hasOrigins(url)) {
							error = "Permission issues";
							code = CUSTOM_API_ERROR.NO_PERMISSION;
						} else {
							error = "Network issues";
							code = CUSTOM_API_ERROR.NO_NETWORK;
						}
					}
					if (isTornAPICall(location) && !options.silent && SCRIPT_TYPE === "BACKGROUND") {
						await ttStorage.change({ api: { torn: {
							online: false,
							error
						} } });
						await setBadge("error");
					}
					reject({
						error,
						isLocal,
						code
					});
				} else if (isTornAPICall(location)) {
					let error, online;
					if (result.error instanceof HTTPException) {
						error = result.error.toString();
						online = false;
					} else {
						error = result.error.error;
						online = result.error.code !== 9 && !(result instanceof HTTPException);
					}
					if (!options.silent && SCRIPT_TYPE === "BACKGROUND") {
						await ttStorage.change({ api: { torn: {
							online,
							error
						} } });
						await setBadge("error");
					}
					if (result.error instanceof HTTPException) reject(result.error.asObject());
					else reject(result.error);
				} else reject({ error: result.error });
			}
		});
	}
	function decideTimeoutTimer(location) {
		switch (location) {
			case "yata": return 30 * TO_MILLIS.SECONDS;
			default: return 10 * TO_MILLIS.SECONDS;
		}
	}
	function isTornAPICall(location) {
		return ["tornv2"].includes(location);
	}
	function hasAPIData() {
		const hasKey = !!api?.torn?.key;
		const hasError = !!api?.torn?.error && !api.torn.error.includes("Backend error") && api.torn.error !== "Network issues";
		const hasUserdata = !!(userdata && Object.keys(userdata).length);
		return hasKey && !hasError && hasUserdata;
	}
	function hasFactionAPIAccess() {
		if (!hasAPIData()) return false;
		return userdata.faction && factiondata?.access === FACTION_ACCESS.full_access;
	}
	async function hasOrigins(...origins) {
		origins = origins.map((origin) => origin.replaceAll("api.torn.com", "torn.com"));
		return browser$1.permissions.contains({ origins });
	}
	var HTTPException = class HTTPException {
		code;
		constructor(code) {
			this.code = code;
		}
		get message() {
			return this.code in HTTPException.codes ? HTTPException.codes[this.code] : `Unknown code (${this.code})`;
		}
		asObject() {
			return {
				code: this.code,
				message: this.message,
				http: true
			};
		}
		toString() {
			return `HTTP ${this.code}: ${this.message}`;
		}
		static get codes() {
			return {
				200: "OK",
				201: "Created",
				202: "Accepted",
				203: "Non-Authoritative Information",
				204: "No Content",
				205: "Reset Content",
				206: "Partial Content",
				300: "Multiple Choices",
				301: "Moved Permanently",
				302: "Found",
				303: "See Other",
				304: "Not Modified",
				305: "Use Proxy",
				306: "Unused",
				307: "Temporary Redirect",
				400: "Bad Request",
				401: "Unauthorized",
				402: "Payment Required",
				403: "Forbidden",
				404: "Not Found",
				405: "Method Not Allowed",
				406: "Not Acceptable",
				407: "Proxy Authentication Required",
				408: "Request Timeout",
				409: "Conflict",
				410: "Gone",
				411: "Length Required",
				412: "Precondition Required",
				413: "Request Entry Too Large",
				414: "Request-URI Too Long",
				415: "Unsupported Media Type",
				416: "Requested Range Not Satisfiable",
				417: "Expectation Failed",
				418: "I'm a teapot",
				429: "Too Many Requests",
				500: "Internal Server Error",
				501: "Not Implemented",
				502: "Bad Gateway",
				503: "Service Unavailable",
				504: "Gateway Timeout",
				505: "HTTP Version Not Supported"
			};
		}
	};
	function isTornApiError(response) {
		return !!response && typeof response === "object" && "error" in response && "code" in response;
	}
	//#endregion
	//#region extension/entrypoints/background/updates.ts
	var lockTimedUpdates = false;
	async function timedUpdates() {
		if (lockTimedUpdates) return;
		lockTimedUpdates = true;
		const updatePromises = [];
		try {
			await loadDatabase();
			if (api.torn.key) {
				updatePromises.push(updateUserdata().then(({ updated, types, selections }) => {
					if (updated) console.log(`Updated ${types.join("+")} userdata.`, selections);
					else console.log("Skipped this userdata update.");
				}).catch((error) => logError("updating userdata", error)));
				updatePromises.push(updateStakeouts().then(({ updated, success, failed }) => {
					if (updated) if (success || failed) console.log("Updated stakeouts.", {
						success,
						failed
					});
					else console.log("No stakeouts to update.");
					else console.log("Skipped this stakeout update.");
				}).catch((error) => logError("updating stakeouts", error)));
				updatePromises.push(updateFactionStakeouts().then(({ updated, success, failed }) => {
					if (updated) if (success || failed) console.log("Updated faction stakeouts.", {
						success,
						failed
					});
					else console.log("No faction stakeouts to update.");
					else console.log("Skipped this faction stakeout update.");
				}).catch((error) => logError("updating faction stakeouts", error)));
				if (!torndata || !isSameUTCDay(new Date(torndata.date), /* @__PURE__ */ new Date()) || hasOutdatedTornStats() && hasTimePassed(torndata.date, TO_MILLIS.MINUTES * 10)) updatePromises.push(updateTorndata().then(() => console.log("Updated torndata.")).catch((error) => logError("updating torndata", error)));
				if (!stockdata?.date || hasTimePassed(stockdata.date, TO_MILLIS.MINUTES * 5)) updatePromises.push(updateStocks().then(() => console.log("Updated stocks.")).catch((error) => logError("updating stocks", error)));
				if (!factiondata || !("date" in factiondata) || hasTimePassed(factiondata.date, TO_MILLIS.MINUTES * 15)) updatePromises.push(updateFactiondata().then(() => console.log("Updated factiondata.")).catch((error) => logError("updating factiondata", error)));
			}
			updatePromises.push(updateNPCs().then(({ updated, alerts }) => {
				if (updated) console.log("Updated npcs.");
				if (alerts) console.log(`Sent out ${alerts} npc alerts.`);
			}).catch((error) => logError("updating npcs", error)));
			updatePromises.push(verifyTime().catch((error) => logError("Failed to verify your time to be synced.", error)));
			await Promise.all(updatePromises);
		} finally {
			lockTimedUpdates = false;
		}
		function logError(message, error) {
			if (error.code === CUSTOM_API_ERROR.NO_PERMISSION) console.warn(`You disabled our permission to call the API!`);
			else if (error.code === CUSTOM_API_ERROR.NO_NETWORK) console.warn(`Error due to no internet while ${message}.`);
			else if (error.code === CUSTOM_API_ERROR.CANCELLED) console.warn(`Error due to requests taking too long while ${message}.`);
			else if (isTornApiError(error)) if (error.code === 9) console.log(`Torn's API is temporary disabled while ${message}.`);
			else if (error.code === 17) console.log(`Torn's API is having backend issues while ${message}.`);
			else console.error(`Error while ${message}.`, error);
			else console.error(`Error while ${message}.`, error);
		}
	}
	async function verifyTime() {
		const savedTime = await ttStorage.get("time");
		const now = Date.now();
		if (savedTime != null && savedTime > Date.now()) {
			console.warn("Detected a desynchronized time! Resetting timed data.");
			await ttCache.clear();
			await Promise.all([
				updateUserdata(true),
				updateFactiondata(),
				updateTorndata(),
				updateStocks(),
				updateStakeouts(true),
				updateFactionStakeouts(true)
			]);
		}
		await ttStorage.set({ time: now });
	}
	async function updateUserdata(forceUpdate = false) {
		const now = Date.now();
		const updatedTypes = [];
		const updateEssential = forceUpdate || !userdata || !Object.keys(userdata).length || hasTimePassed((userdata.date ?? 0) - 100, TO_MILLIS.SECONDS * settings.apiUsage.delayEssential);
		const updateBasic = updateEssential && (forceUpdate || !userdata?.dateBasic || hasTimePassed(userdata?.dateBasic - 100, TO_MILLIS.SECONDS * settings.apiUsage.delayBasic) && !hasTimePassed(userdata?.profile?.last_action?.timestamp * 1e3, TO_MILLIS.MINUTES * 5));
		const selections = [];
		const selectionsV2 = [];
		if (updateEssential) {
			selectionsV2.push("profile", "faction", "job", "timestamp", "notifications");
			for (const selection of ["bars"]) {
				if (!settings.apiUsage.user[selection]) continue;
				selections.push(selection);
			}
			for (const selection of [
				"cooldowns",
				"icons",
				"newmessages",
				"money",
				"travel",
				"refills"
			]) {
				if (!settings.apiUsage.user[selection]) continue;
				selectionsV2.push(selection);
			}
			updatedTypes.push("essential");
		}
		if (updateBasic) {
			for (const selection of [
				"perks",
				"networth",
				"ammo"
			]) {
				if (!settings.apiUsage.user[selection]) continue;
				selections.push(selection);
			}
			for (const selection of [
				"battlestats",
				"skills",
				"calendar",
				"organizedcrime",
				"personalstats",
				"honors",
				"weaponexp",
				"medals",
				"properties",
				"missions",
				"workstats",
				"virus",
				"merits",
				"stocks"
			]) {
				if (!settings.apiUsage.user[selection]) continue;
				selectionsV2.push(selection);
			}
			if (settings.apiUsage.user.education && !hasFinishedEducation()) selections.push("education");
			updatedTypes.push("basic");
		}
		if (attackHistory.fetchData && settings.apiUsage.user.attacks && settings.pages.global.keepAttackHistory) {
			selectionsV2.push("attacks");
			updatedTypes.push("attack history");
		}
		console.log("Time elapsed:", Date.now() - userdata.date);
		if (!selections.length && !selectionsV2.length) return { updated: false };
		const oldUserdata = (await loadDatabase()).userdata;
		setUserdata({
			...oldUserdata,
			...await fetchData("tornv2", {
				section: "user",
				legacySelections: selections,
				selections: selectionsV2,
				params: {
					cat: "all",
					timestamp: Math.floor(Date.now() / 1e3)
				}
			})
		});
		if (!userdata || !Object.keys(userdata).length) throw new Error("Aborted updating due to an unexpected response.");
		userdata.date = now;
		userdata.dateBasic = updateBasic ? now : oldUserdata?.dateBasic ?? now;
		if (oldUserdata?.notifications?.events !== userdata?.notifications?.events) {
			const newEventsCount = (userdata?.notifications?.events ?? 0) - (oldUserdata?.notifications?.events ?? 0);
			if (newEventsCount > 0) {
				const category = newEventsCount <= 25 ? "newevents" : "events";
				userdata.events = (await fetchData("tornv2", {
					section: "user",
					selections: [category],
					params: { limit: newEventsCount }
				})).events;
				selections.push(category);
			}
		}
		if (!("events" in userdata) || userdata?.notifications?.events === 0) userdata.events = [];
		await processUserdata().catch((error) => console.error("Error while processing userdata.", error));
		await checkAttacks().catch((error) => console.error("Error while checking personal stats for attack changes.", error));
		await ttStorage.set({ userdata: {
			...oldUserdata,
			...userdata
		} });
		await showIconBars().catch((error) => console.error("Error while updating the icon bars.", error));
		if (updateEssential) {
			await notifyEventMessages().catch((error) => console.error("Error while sending event and message notifications.", error));
			await notifyTravelLanding().catch((error) => console.error("Error while sending travel landing notifications.", error));
			await notifyBars().catch((error) => console.error("Error while sending bar notification.", error));
			await notifyOffline().catch((error) => console.error("Error while sending offline notification.", error));
			await notifyChain().catch((error) => console.error("Error while sending chain notifications.", error));
			await notifyTraveling().catch((error) => console.error("Error while sending traveling notifications.", error));
			await notifyMissions().catch((error) => console.error("Error while sending mission notifications.", error));
			await notifyRefills().catch((error) => console.error("Error while sending refill notifications.", error));
		}
		await notifyStatusChange().catch((error) => console.error("Error while sending status change notifications.", error));
		await notifyCooldownOver().catch((error) => console.error("Error while sending cooldown notifications.", error));
		await notifyEducation().catch((error) => console.error("Error while sending education notifications.", error));
		await notifyNewDay().catch((error) => console.error("Error while sending new day notification.", error));
		await notifyHospital().catch((error) => console.error("Error while sending hospital notifications.", error));
		await notifySpecificCooldowns().catch((error) => console.error("Error while sending specific cooldown notifications.", error));
		await ttStorage.set({ notifications });
		return {
			updated: true,
			types: updatedTypes,
			selections: [...selections, ...selectionsV2]
		};
		async function checkAttacks() {
			if (!settings.pages.global.keepAttackHistory) return;
			if (userdata.attacks) {
				await updateAttackHistory();
				delete userdata.attacks;
			}
			if (oldUserdata.personalstats && userdata.personalstats) {
				const fetchData = [
					(data) => data.personalstats.attacking.attacks.lost,
					(data) => data.personalstats.attacking.attacks.stalemate,
					(data) => data.personalstats.attacking.defends.lost,
					(data) => data.personalstats.attacking.defends.stalemate,
					(data) => data.personalstats.attacking.killstreak.current
				].some((getter) => getter(oldUserdata) !== getter(userdata));
				await ttStorage.change({ attackHistory: { fetchData } });
			}
			async function updateAttackHistory() {
				let lastAttack = attackHistory.lastAttack;
				userdata.attacks.filter(({ id }) => id > attackHistory.lastAttack).forEach((attack) => {
					if (attack.id > lastAttack) lastAttack = attack.id;
					const enemyId = attack.attacker?.id === userdata.profile.id ? attack.defender.id : attack.attacker?.id;
					if (!enemyId) return;
					attackHistory.history[enemyId] = {
						name: "",
						defend: 0,
						defend_lost: 0,
						lose: 0,
						stalemate: 0,
						win: 0,
						stealth: 0,
						mug: 0,
						hospitalise: 0,
						leave: 0,
						arrest: 0,
						assist: 0,
						special: 0,
						escapes: 0,
						respect: [],
						respect_base: [],
						...enemyId in attackHistory.history ? attackHistory.history[enemyId] : {},
						lastAttack: attack.ended * 1e3,
						lastAttackCode: attack.code
					};
					if (attack.defender.id === userdata.profile.id) {
						if (attack.attacker.name) attackHistory.history[enemyId].name = attack.attacker.name;
						if (attack.result === "Assist") {} else if ([
							"Lost",
							"Timeout",
							"Escape",
							"Stalemate"
						].includes(attack.result)) attackHistory.history[enemyId].defend++;
						else attackHistory.history[enemyId].defend_lost++;
					} else if (attack.attacker?.id === userdata.profile.id) {
						if (attack.defender.name) attackHistory.history[enemyId].name = attack.defender.name;
						if (attack.result === "Lost" || attack.result === "Timeout") attackHistory.history[enemyId].lose++;
						else if (attack.result === "Stalemate") attackHistory.history[enemyId].stalemate++;
						else if (attack.result === "Assist") attackHistory.history[enemyId].assist++;
						else if (attack.result === "Escape") attackHistory.history[enemyId].escapes++;
						else {
							attackHistory.history[enemyId].win++;
							if (attack.is_stealthed) attackHistory.history[enemyId].stealth++;
							let respect = attack.respect_gain;
							if (respect !== 0) {
								let hasAccurateModifiers = "modifiers" in attack;
								if (hasAccurateModifiers) {
									if (respect === attack.modifiers.chain) {
										respect = 1;
										hasAccurateModifiers = false;
									} else {
										if (attack.result === "Mugged") respect /= .75;
										respect = respect / attack.modifiers.war / attack.modifiers.retaliation / attack.modifiers.group / attack.modifiers.overseas / attack.modifiers.chain / attack.modifiers.warlord;
									}
									attackHistory.history[enemyId].latestFairFightModifier = attack.modifiers.fair_fight;
								}
								attackHistory.history[enemyId][hasAccurateModifiers ? "respect_base" : "respect"].push(respect);
							}
							switch (attack.result) {
								case "Mugged":
									attackHistory.history[enemyId].mug++;
									break;
								case "Hospitalized":
									attackHistory.history[enemyId].hospitalise++;
									break;
								case "Attacked":
									attackHistory.history[enemyId].leave++;
									break;
								case "Arrested":
									attackHistory.history[enemyId].arrest++;
									break;
								case "Special":
									attackHistory.history[enemyId].special++;
									break;
							}
						}
					}
				});
				await ttStorage.change({ attackHistory: {
					lastAttack,
					fetchData: false,
					history: { ...attackHistory.history }
				} });
			}
		}
		async function processUserdata() {
			if ("icons" in userdata) {
				const icon85 = userdata.icons.find(({ id }) => id === 85);
				if (icon85) userdata.userCrime = icon85.until * 1e3;
				else if (userdata.icons.some(({ id }) => id === 86)) userdata.userCrime = userdata.timestamp * TO_MILLIS.SECONDS;
				else userdata.userCrime = -1;
			}
		}
		async function notifyEventMessages() {
			if (settings.apiUsage.user.newevents) {
				const events = [];
				userdata.events.forEach((event) => {
					if (settings.notifications.types.global && settings.notifications.types.events && !notifications.events[event.id]) {
						events.push({
							id: event.id,
							event: event.event
						});
						notifications.events[event.id] = { combined: true };
					}
				});
				if (events.length) {
					let message = events.at(-1).event.replace(/<\/?[^>]+(>|$)/g, "");
					if (events.length > 1) message += `\n(and ${events.length - 1} more event${events.length > 2 ? "s" : ""})`;
					notifications.events.combined = newNotification(`New Event${applyPlural(events.length)}`, message, LINKS.events);
				}
			}
			if (settings.apiUsage.user.newmessages) {
				const messages = [];
				userdata.messages.filter(({ seen }) => !seen).forEach((message) => {
					if (settings.notifications.types.global && settings.notifications.types.messages && !notifications.messages[message.id]) {
						messages.push({
							id: message.id,
							title: message.topic,
							sender: message.sender.name
						});
						notifications.messages[message.id] = { combined: true };
					}
				});
				if (messages.length) {
					let message = `${messages.at(-1).title} - by ${messages.at(-1).sender}`;
					if (messages.length > 1) message += `\n(and ${messages.length - 1} more message${messages.length > 2 ? "s" : ""})`;
					notifications.messages.combined = newNotification(`New Message${applyPlural(messages.length)}`, message, LINKS.messages);
				}
			}
			await setBadge("count", {
				events: userdata.notifications.events,
				messages: userdata.notifications.messages
			});
		}
		async function notifyStatusChange() {
			if (!settings.notifications.types.global || !settings.notifications.types.status || !oldUserdata.profile?.status) return;
			const previous = oldUserdata.profile.status.state;
			const current = userdata.profile.status.state;
			if (current === previous || current === "Traveling" || current === "Abroad") return;
			if (current === "Okay") {
				if (previous === "Hospital") {
					await notifyUser("TornTools - Status", "You are out of the hospital.", LINKS.home);
					await storeNotification({
						title: "TornTools - Status",
						message: "You are out of the hospital.",
						url: LINKS.home,
						type: "status",
						key: Date.now(),
						date: Date.now()
					});
				} else if (previous === "Jail") {
					await notifyUser("TornTools - Status", "You are out of the jail.", LINKS.home);
					await storeNotification({
						title: "TornTools - Status",
						message: "You are out of the jail.",
						url: LINKS.home,
						date: Date.now()
					});
				}
			} else {
				await notifyUser("TornTools - Status", userdata.profile.status.description, LINKS.home);
				await storeNotification({
					title: "TornTools - Status",
					message: userdata.profile.status.description,
					url: LINKS.home,
					date: Date.now()
				});
			}
		}
		async function notifyCooldownOver() {
			if (!settings.apiUsage.user.cooldowns || !settings.notifications.types.global || !settings.notifications.types.cooldowns || !oldUserdata.cooldowns) return;
			for (const type in userdata.cooldowns) {
				if (userdata.cooldowns[type] || !oldUserdata.cooldowns[type]) continue;
				await notifyUser("TornTools - Cooldown", `Your ${type} cooldown has ended.`, LINKS.items);
				await storeNotification({
					title: "TornTools - Cooldown",
					message: `Your ${type} cooldown has ended.`,
					url: LINKS.items,
					date: Date.now()
				});
			}
		}
		async function notifyTravelLanding() {
			if (!settings.apiUsage.user.travel || !settings.notifications.types.global || !settings.notifications.types.traveling || !oldUserdata.travel) return;
			if (userdata.travel.time_left !== 0 || oldUserdata.travel.time_left === 0) return;
			await notifyUser("TornTools - Traveling", `You have landed in ${userdata.travel.destination}.`, LINKS.home);
			await storeNotification({
				title: "TornTools - Traveling",
				message: `You have landed in ${userdata.travel.destination}.`,
				url: LINKS.home,
				date: Date.now()
			});
		}
		async function notifyEducation() {
			if (!settings.apiUsage.user.education || !settings.notifications.types.global || !settings.notifications.types.education || !oldUserdata.education_timeleft) return;
			if (userdata.education_timeleft !== 0 || oldUserdata.education_timeleft === 0) return;
			await notifyUser("TornTools - Education", "You have finished your education course.", LINKS.education);
			await storeNotification({
				title: "TornTools - Education",
				message: "You have finished your education course.",
				url: LINKS.education,
				date: Date.now()
			});
		}
		async function notifyNewDay() {
			if (!settings.notifications.types.global || !settings.notifications.types.newDay) return;
			const date = /* @__PURE__ */ new Date();
			const utc = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
			if (date.getUTCHours() !== 0 || date.getUTCMinutes() !== 0 || utc in notifications.newDay) return;
			notifications.newDay[utc] = newNotification("New Day", "It's a new day! Hopefully a sunny one.", LINKS.home);
		}
		async function notifyBars() {
			if (!settings.apiUsage.user.bars || !settings.notifications.types.global) return;
			for (const bar of [
				"energy",
				"happy",
				"nerve",
				"life"
			]) {
				if (!settings.notifications.types[bar].length || !oldUserdata[bar]) continue;
				const checkpoints = settings.notifications.types[bar].map((checkpoint) => typeof checkpoint === "string" && checkpoint.includes("%") ? parseInt(checkpoint) / 100 * userdata[bar].maximum : parseInt(checkpoint.toString())).sort((a, b) => b - a);
				for (const checkpoint of checkpoints) if (oldUserdata[bar].current < userdata[bar].current && userdata[bar].current >= checkpoint && !notifications[bar][checkpoint]) {
					const url = (() => {
						switch (bar) {
							case "energy": return LINKS.gym;
							case "happy": return LINKS.items_candy;
							case "nerve": return LINKS.crimes;
							case "life": return LINKS.items_medical;
							default: return LINKS.home;
						}
					})();
					notifications[bar][checkpoint] = newNotification("Bars", `Your ${capitalizeText(bar)} bar has reached ${userdata[bar].current}/${userdata[bar].maximum}.`, url);
					break;
				} else if (userdata[bar].current < checkpoint && notifications[bar][checkpoint]) delete notifications[bar][checkpoint];
			}
		}
		async function notifyOffline() {
			if (!settings.notifications.types.global || !settings.notifications.types.offline.length || !oldUserdata?.profile?.last_action?.timestamp) return;
			const checkpoints = settings.notifications.types.offline.sort((a, b) => b - a);
			const oldHoursOffline = Math.floor((oldUserdata.timestamp - oldUserdata.profile.last_action.timestamp) * TO_MILLIS.SECONDS / TO_MILLIS.HOURS);
			const hoursOffline = Math.floor((userdata.timestamp - userdata.profile.last_action.timestamp) * TO_MILLIS.SECONDS / TO_MILLIS.HOURS);
			for (const checkpoint of checkpoints) if (oldHoursOffline < hoursOffline && hoursOffline >= checkpoint && !notifications.offline[checkpoint]) {
				notifications.offline[checkpoint] = newNotification("Offline", `You've been offline for over ${checkpoint} hour${applyPlural(checkpoint)}.`, LINKS.home);
				break;
			} else if (hoursOffline < checkpoint && notifications.offline[checkpoint]) delete notifications.offline[checkpoint];
		}
		async function notifyChain() {
			if (!settings.apiUsage.user.bars || !settings.notifications.types.global) return;
			if (settings.notifications.types.chainTimerEnabled && settings.notifications.types.chainTimer.length > 0 && userdata.chain.timeout !== 0 && userdata.chain.current >= 10) {
				const timeout = userdata.chain.timeout * 1e3 - (now - userdata.timestamp * 1e3);
				const count = userdata.chain.current;
				for (const checkpoint of settings.notifications.types.chainTimer.sort((a, b) => a - b)) {
					const key = `${count}_${checkpoint}`;
					if (timeout > checkpoint * TO_MILLIS.SECONDS || notifications.chain[key]) continue;
					notifications.chain[key] = newNotification("Chain", `Chain timer will run out in ${formatTime({ milliseconds: timeout }, { type: "wordTimer" })}.`, LINKS.chain);
					break;
				}
			} else notifications.chain = {};
			if (settings.notifications.types.chainBonusEnabled && settings.notifications.types.chainBonus.length > 0 && userdata.chain.timeout !== 0 && userdata.chain.current >= 10) {
				const count = userdata.chain.current;
				const nextBonus = getNextChainBonus(count);
				for (const checkpoint of settings.notifications.types.chainBonus.sort((a, b) => b - a)) {
					const key = `${nextBonus}_${checkpoint}`;
					if (nextBonus - count > checkpoint || notifications.chainCount[key]) continue;
					notifications.chainCount[key] = newNotification("Chain", `Chain will reach the next bonus hit in ${nextBonus - count} hit${applyPlural(nextBonus - count)}.`, LINKS.chain);
					break;
				}
			} else notifications.chainCount = {};
		}
		async function notifyHospital() {
			if (!settings.notifications.types.global) return;
			if (settings.notifications.types.leavingHospitalEnabled && settings.notifications.types.leavingHospital.length && userdata.profile.status.state === "Hospital") for (const checkpoint of settings.notifications.types.leavingHospital.sort((a, b) => a - b)) {
				const timeLeft = userdata.profile.status.until * 1e3 - now;
				if (timeLeft > checkpoint * TO_MILLIS.MINUTES || notifications.hospital[checkpoint]) continue;
				notifications.hospital[checkpoint] = newNotification("Hospital", `You will be out of the hospital in ${formatTime({ milliseconds: timeLeft }, { type: "wordTimer" })}.`, LINKS.hospital);
				break;
			}
			else notifications.hospital = {};
		}
		async function notifyTraveling() {
			if (!settings.apiUsage.user.travel || !settings.notifications.types.global) return;
			if (settings.notifications.types.landingEnabled && settings.notifications.types.landing.length && userdata.travel.time_left) for (const checkpoint of settings.notifications.types.landing.sort((a, b) => a - b)) {
				const timeLeft = userdata.travel.arrival_at * 1e3 - now;
				if (timeLeft > checkpoint * TO_MILLIS.MINUTES || notifications.travel[checkpoint]) continue;
				notifications.travel[checkpoint] = newNotification("Travel", `You will be landing in ${formatTime({ milliseconds: timeLeft }, { type: "wordTimer" })}.`, LINKS.home);
				break;
			}
			else notifications.travel = {};
		}
		async function notifySpecificCooldowns() {
			if (!settings.apiUsage.user.cooldowns || !settings.notifications.types.global) return;
			for (const cooldown of [
				{
					name: "drug",
					title: "Drugs",
					setting: "cooldownDrug",
					memory: "drugs",
					enabled: "cooldownDrugEnabled"
				},
				{
					name: "booster",
					title: "Boosters",
					setting: "cooldownBooster",
					memory: "boosters",
					enabled: "cooldownBoosterEnabled"
				},
				{
					name: "medical",
					title: "Medical",
					setting: "cooldownMedical",
					memory: "medical",
					enabled: "cooldownMedicalEnabled"
				}
			]) if (settings.notifications.types[cooldown.enabled] && settings.notifications.types[cooldown.setting].length && userdata.cooldowns[cooldown.name] > 0) for (const checkpoint of settings.notifications.types[cooldown.setting].sort((a, b) => a - b)) {
				const timeLeft = userdata.cooldowns[cooldown.name] * 1e3;
				if (timeLeft > parseFloat(checkpoint) * TO_MILLIS.MINUTES || notifications[cooldown.memory][checkpoint]) continue;
				notifications[cooldown.memory][checkpoint] = newNotification(cooldown.title, `Your ${cooldown.name} cooldown will end in ${formatTime({ milliseconds: timeLeft }, { type: "wordTimer" })}.`, LINKS.items);
			}
			else notifications[cooldown.memory] = {};
		}
		async function notifyMissions() {
			if (!settings.apiUsage.user.missions || !settings.notifications.types.global) return;
			if (settings.notifications.types.missionsLimitEnabled && settings.notifications.types.missionsLimit) {
				const limitParts = settings.notifications.types.missionsLimit.split(":").map((part) => parseInt(part, 10));
				const cutoff = getUTCTodayAtTime(limitParts[0], limitParts[1]);
				if (/* @__PURE__ */ new Date() >= cutoff) for (const { name, contracts } of userdata.missions.givers) {
					const activeContracts = contracts.filter((contract) => contract.completed_at === null);
					const maxMissions = name in MAX_MISSIONS ? MAX_MISSIONS[name] : MAX_MISSIONS.DEFAULT;
					if (activeContracts.length >= maxMissions) {
						const now = /* @__PURE__ */ new Date();
						const key = `${name}_${now.getUTCFullYear()}-${now.getUTCMonth() + 1}-${now.getUTCDate()}`;
						if (!(key in notifications.missionsLimit)) notifications.missionsLimit[key] = newNotification("Missions", `You are currently at the maximum amount of contracts (${maxMissions}) for ${name}.`, LINKS.missions);
					}
				}
			} else notifications.missionsLimit = {};
			if (settings.notifications.types.missionsExpireEnabled && settings.notifications.types.missionsExpire.length) for (const { name, contracts } of userdata.missions.givers) {
				const ongoingMissions = contracts.filter((contract) => contract.status === "Accepted");
				for (const mission of ongoingMissions) for (const checkpoint of settings.notifications.types.missionsExpire.sort((a, b) => a - b)) {
					const timeLeft = mission.expires_at * 1e3 - now;
					const key = `${name}_${mission.title}_${mission.created_at}_${checkpoint}`;
					if (timeLeft > checkpoint * TO_MILLIS.HOURS || notifications.missionsExpire[key]) continue;
					notifications.missionsExpire[key] = newNotification("Missions", `'${mission.title}' by ${name} will expire in ${formatTime({ milliseconds: timeLeft }, {
						type: "wordTimer",
						showDays: true,
						truncateSeconds: true
					})}.`, LINKS.missions);
					break;
				}
			}
			else notifications.missionsExpire = {};
		}
		async function notifyRefills() {
			if (!settings.apiUsage.user.refills || !settings.notifications.types.global) return;
			if (settings.notifications.types.refillEnergyEnabled && settings.notifications.types.refillEnergy) {
				const limitParts = settings.notifications.types.refillEnergy.split(":").map((part) => parseInt(part, 10));
				const cutoff = getUTCTodayAtTime(limitParts[0], limitParts[1]);
				if (/* @__PURE__ */ new Date() >= cutoff) {
					if (!userdata.refills.energy) {
						const now = /* @__PURE__ */ new Date();
						const key = `${now.getUTCFullYear()}-${now.getUTCMonth() + 1}-${now.getUTCDate()}`;
						if (!(key in notifications.refillEnergy)) notifications.refillEnergy[key] = newNotification("Refill", `You have yet to use your energy refill today.`, LINKS.points);
					}
				}
			} else notifications.refillEnergy = {};
			if (settings.notifications.types.refillNerveEnabled && settings.notifications.types.refillNerve) {
				const limitParts = settings.notifications.types.refillNerve.split(":").map((part) => parseInt(part, 10));
				const cutoff = getUTCTodayAtTime(limitParts[0], limitParts[1]);
				if (/* @__PURE__ */ new Date() >= cutoff) {
					if (!userdata.refills.nerve) {
						const now = /* @__PURE__ */ new Date();
						const key = `${now.getUTCFullYear()}-${now.getUTCMonth() + 1}-${now.getUTCDate()}`;
						if (!(key in notifications.refillNerve)) notifications.refillNerve[key] = newNotification("Refill", `You have yet to use your nerve refill today.`, LINKS.points);
					}
				}
			} else notifications.refillNerve = {};
		}
	}
	async function showIconBars() {
		if (!settings.apiUsage.user.bars || !hasAPIData() || !settings.pages.icon.global) await browser$1.action.setIcon({ path: browser$1.runtime.getURL("/images/icon_128.png") });
		else {
			let barCount = 0;
			if (settings.pages.icon.energy) barCount++;
			if (settings.pages.icon.nerve) barCount++;
			if (settings.pages.icon.happy) barCount++;
			if (settings.pages.icon.life) barCount++;
			if (settings.pages.icon.chain && userdata.chain && userdata.chain.current > 0) barCount++;
			if (settings.pages.icon.travel && userdata.travel && userdata.travel.time_left > 0) barCount++;
			const canvas = new OffscreenCanvas(128, 128);
			const canvasContext = canvas.getContext("2d");
			canvasContext.fillStyle = "#fff";
			canvasContext.fillRect(0, 0, canvas.width, canvas.height);
			const padding = 10;
			const barHeight = (canvas.height - (barCount + 1) * 10) / barCount;
			const barWidth = canvas.width - padding * 2;
			const BAR_COLORS = {
				energy: "#7cc833",
				nerve: "#b3382c",
				happy: "#e3e338",
				life: "#7b98ee",
				chain: "#333",
				travel: "#d961ee"
			};
			let y = padding;
			Object.keys(BAR_COLORS).forEach((key) => {
				if (!settings.pages.icon[key] || !userdata[key]) return;
				if (key === "chain" && userdata.chain.current === 0) return;
				let current, maximum;
				if (key === "travel") {
					const totalTrip = userdata[key].arrival_at - userdata[key].departed_at;
					current = totalTrip - userdata[key].time_left;
					maximum = totalTrip;
				} else if (key === "chain") {
					current = userdata[key].current;
					maximum = userdata[key].maximum;
					if (current !== maximum) maximum = getNextChainBonus(current);
				} else {
					current = userdata[key].current;
					maximum = userdata[key].maximum;
				}
				let width = barWidth * (current / maximum);
				width = Math.min(width, barWidth);
				canvasContext.fillStyle = BAR_COLORS[key];
				canvasContext.fillRect(padding, y, width, barHeight);
				y += barHeight + padding;
			});
			await browser$1.action.setIcon({ imageData: canvasContext.getImageData(0, 0, canvas.width, canvas.height) });
		}
	}
	async function updateStakeouts(forceUpdate = false) {
		await loadDatabase(true);
		const now = Date.now();
		if (!forceUpdate && stakeouts.date && !hasTimePassed(stakeouts.date - 100, TO_MILLIS.SECONDS * settings.apiUsage.delayStakeouts)) return { updated: false };
		let success = 0;
		let failed = 0;
		for (const id in stakeouts) {
			const stakeout = stakeouts[id];
			if (typeof stakeout !== "object" || Array.isArray(stakeout)) continue;
			const oldData = stakeout?.info ?? null;
			let data;
			try {
				data = await fetchData("tornv2", {
					section: "user",
					selections: ["profile"],
					id,
					silent: true
				});
				if (!data) {
					console.log("Unexpected result during stakeout updating.");
					failed++;
					continue;
				}
				success++;
			} catch (e) {
				console.log("STAKEOUT error", e);
				failed++;
				continue;
			}
			if (stakeout.alerts) {
				const { label } = stakeout;
				const { okay, hospital, landing, online, life, offline, revivable } = stakeout.alerts;
				if (okay) {
					const key = `${id}_okay`;
					if (data.profile.status.state === "Okay" && (!oldData || oldData.status.state !== data.profile.status.state) && !notifications.stakeouts[key]) {
						if (settings.notifications.types.global) notifications.stakeouts[key] = newNotification("Stakeouts", label ? `${data.profile.name} (${label}) is now okay.` : `${data.profile.name} is now okay.`, `https://www.torn.com/profiles.php?XID=${id}`);
					} else if (data.profile.status.state !== "Okay") delete notifications.stakeouts[key];
				}
				if (hospital) {
					const key = `${id}_hospital`;
					if (data.profile.status.state === "Hospital" && (!oldData || oldData.status.state !== data.profile.status.state)) {
						if (settings.notifications.types.global) {
							let reasonText = "";
							const reason = getHospitalizationReason(data.profile.status.details);
							if (reason?.important) {
								reasonText = reason.display_sentence ?? reason.display ?? reason.name;
								reasonText = ` ${reasonText}`;
							}
							notifications.stakeouts[key] = newNotification("Stakeouts", label ? `${data.profile.name} (${label}) is now in the hospital${reasonText}.` : `${data.profile.name} is now in the hospital${reasonText}.`, `https://www.torn.com/profiles.php?XID=${id}`);
						}
					} else if (data.profile.status.state !== "Hospital") delete notifications.stakeouts[key];
				}
				if (landing) {
					const key = `${id}_landing`;
					if (data.profile.status.state !== "Traveling" && !notifications.stakeouts[key]) {
						if (settings.notifications.types.global) notifications.stakeouts[key] = newNotification("Stakeouts", label ? `${data.profile.name} (${label}) is now ${data.profile.status.state === "Abroad" ? data.profile.status.description : "in Torn"}.` : `${data.profile.name} is now ${data.profile.status.state === "Abroad" ? data.profile.status.description : "in Torn"}.`, `https://www.torn.com/profiles.php?XID=${id}`);
					} else if (data.profile.status.state === "Traveling") delete notifications.stakeouts[key];
				}
				if (online) {
					const key = `${id}_online`;
					if (data.profile.last_action.status === "Online" && (!oldData || oldData.last_action.status !== data.profile.last_action.status) && !notifications.stakeouts[key]) {
						if (settings.notifications.types.global) notifications.stakeouts[key] = newNotification("Stakeouts", label ? `${data.profile.name} (${label}) is now online.` : `${data.profile.name} is now online.`, `https://www.torn.com/profiles.php?XID=${id}`);
					} else if (data.profile.last_action.status !== "Online") delete notifications.stakeouts[key];
				}
				if (life) {
					const key = `${id}_life`;
					if (data.profile.life.current <= data.profile.life.maximum * (life / 100) && !notifications.stakeouts[key]) {
						if (settings.notifications.types.global) notifications.stakeouts[key] = newNotification("Stakeouts", label ? `${data.profile.name}'${data.profile.name.endsWith("s") ? "" : "s"} (${label}) life has dropped below ${life}%.` : `${data.profile.name}'${data.profile.name.endsWith("s") ? "" : "s"} life has dropped below ${life}%.`, `https://www.torn.com/profiles.php?XID=${id}`);
					} else if (data.profile.life.current > data.profile.life.maximum * (life / 100)) delete notifications.stakeouts[key];
				}
				if (offline) {
					const oldOfflineHours = oldData ? dropDecimals((now - oldData.last_action.timestamp * 1e3) / TO_MILLIS.HOURS) : null;
					const offlineHours = dropDecimals((now - data.profile.last_action.timestamp * 1e3) / TO_MILLIS.HOURS);
					const key = `${id}_offline`;
					if (offlineHours >= offline && (!oldOfflineHours || oldOfflineHours < offlineHours) && !notifications.stakeouts[key]) {
						if (settings.notifications.types.global) notifications.stakeouts[key] = newNotification("Stakeouts", label ? `${data.profile.name} (${label}) has been offline for ${offlineHours} hours.` : `${data.profile.name} has been offline for ${offlineHours} hours.`, `https://www.torn.com/profiles.php?XID=${id}`);
					} else if (offlineHours < offline) delete notifications.stakeouts[key];
				}
				if (revivable) {
					const oldIsRevivable = oldData?.isRevivable ?? false;
					const isRevivable = data.profile.revivable;
					const key = `${id}_revivable`;
					if (!oldIsRevivable && isRevivable && !notifications.stakeouts[key]) {
						if (settings.notifications.types.global) notifications.stakeouts[key] = newNotification("Stakeouts", label ? `${data.profile.name} (${label}) is now revivable.` : `${data.profile.name} is now revivable.`, `https://www.torn.com/profiles.php?XID=${id}`);
					} else if (!oldIsRevivable) delete notifications.stakeouts[key];
				}
			}
			if (id in stakeouts) stakeouts[id] = {
				...stakeout,
				info: {
					name: data.profile.name,
					last_action: {
						status: data.profile.last_action.status,
						relative: data.profile.last_action.relative,
						timestamp: data.profile.last_action.timestamp * 1e3
					},
					life: {
						current: data.profile.life.current,
						maximum: data.profile.life.maximum
					},
					status: {
						state: data.profile.status.state,
						color: data.profile.status.color,
						until: data.profile.status.until ? data.profile.status.until * 1e3 : null,
						description: data.profile.status.description
					},
					isRevivable: data.profile.revivable
				}
			};
		}
		stakeouts.date = now;
		await ttStorage.change({
			stakeouts,
			notifications
		});
		return {
			updated: true,
			success,
			failed
		};
	}
	async function updateFactionStakeouts(forceUpdate = false) {
		await loadDatabase(true);
		const now = Date.now();
		if (!forceUpdate && "date" in factionStakeouts && !hasTimePassed(factionStakeouts.date - 100, TO_MILLIS.SECONDS * settings.apiUsage.delayStakeouts)) return { updated: false };
		let success = 0;
		let failed = 0;
		for (const factionId in factionStakeouts) {
			if (Number.isNaN(parseInt(factionId))) continue;
			const oldData = typeof factionStakeouts[factionId] === "object" && factionStakeouts[factionId] !== null ? factionStakeouts[factionId].info : null;
			let data;
			try {
				data = await fetchData("tornv2", {
					section: "faction",
					selections: [
						"basic",
						"chain",
						"wars"
					],
					id: factionId,
					silent: true
				});
				if (!data) {
					console.log("Unexpected result during faction stakeout updating.");
					failed++;
					continue;
				}
				success++;
			} catch (e) {
				console.log("FACTION STAKEOUT error", e);
				failed++;
				continue;
			}
			if (typeof factionStakeouts[factionId] === "object" && factionStakeouts[factionId] !== null && factionStakeouts[factionId].alerts) {
				const { chainReaches, memberCountDrops, rankedWarStarts, inRaid, inTerritoryWar } = factionStakeouts[factionId].alerts;
				if (chainReaches !== null) {
					const oldChainCount = oldData ? oldData.chain : false;
					const chainCount = data.chain.current;
					if (chainReaches === 0) {
						const key = `faction_${factionId}_chainDrops`;
						if (typeof oldChainCount === "number" && chainCount < oldChainCount && oldChainCount >= 10 && !notifications.stakeouts[key]) {
							if (settings.notifications.types.global) notifications.stakeouts[key] = newNotification("Faction Stakeouts", `${data.basic.name} has dropped their ${oldChainCount} chain.`, `https://www.torn.com/factions.php?step=profile&ID=${factionId}#/`);
						} else if (chainCount > 10) delete notifications.stakeouts[key];
					} else {
						const key = `faction_${factionId}_chainReaches`;
						if (chainReaches !== false && chainCount >= chainReaches && (!oldChainCount || oldChainCount < chainCount) && !notifications.stakeouts[key]) {
							if (settings.notifications.types.global) notifications.stakeouts[key] = newNotification("Faction Stakeouts", `${data.basic.name} has reached a ${chainCount} chain.`, `https://www.torn.com/factions.php?step=profile&ID=${factionId}#/`);
						} else if (typeof oldChainCount === "number" && chainCount < oldChainCount) delete notifications.stakeouts[key];
					}
				}
				if (memberCountDrops) {
					const oldMemberCount = oldData ? oldData.members.current : false;
					const memberCount = data.basic.members;
					const key = `faction_${factionId}_memberCountDrops`;
					if (typeof oldMemberCount === "number" && memberCount >= oldMemberCount && (!oldMemberCount || oldMemberCount > memberCount) && !notifications.stakeouts[key]) {
						if (settings.notifications.types.global) notifications.stakeouts[key] = newNotification("Faction Stakeouts", `${data.basic.name} now has less than ${memberCount} members.`, `https://www.torn.com/factions.php?step=profile&ID=${factionId}#/`);
					} else delete notifications.stakeouts[key];
				}
				const handleWarStakeout = (type, wasValue, isValue, createMessage) => {
					const key = `faction_${factionId}_${type}`;
					if (isValue && (!oldData || !wasValue) && !notifications.stakeouts[key]) {
						if (settings.notifications.types.global) notifications.stakeouts[key] = newNotification("Faction Stakeouts", createMessage(), `https://www.torn.com/factions.php?step=profile&ID=${factionId}#/`);
					} else if (!isValue) delete notifications.stakeouts[key];
				};
				if (rankedWarStarts) handleWarStakeout("rankedWarStarts", oldData ? oldData.rankedWar : false, data.wars.ranked !== null, () => `${data.basic.name} is now in a ranked war.`);
				if (inRaid) handleWarStakeout("inRaid", oldData ? oldData.raid : false, data.wars.raids.length > 0, () => `${data.basic.name} is now in a raid.`);
				if (inTerritoryWar) handleWarStakeout("inTerritoryWar", oldData ? oldData.territoryWar : false, data.wars.territory.length > 0, () => `${data.basic.name} is now in a territory war.`);
			}
			if (typeof factionStakeouts[factionId] === "object" && factionStakeouts[factionId] !== null) factionStakeouts[factionId].info = {
				name: data.basic.name,
				chain: data.chain.current,
				members: {
					current: data.basic.members,
					maximum: data.basic.capacity
				},
				rankedWar: data.wars.ranked !== null,
				raid: data.wars.raids.length > 0,
				territoryWar: data.wars.territory.length > 0
			};
		}
		setFactionStakeouts({
			...factionStakeouts,
			date: now
		});
		await ttStorage.change({
			factionStakeouts,
			notifications
		});
		return {
			updated: true,
			success,
			failed
		};
	}
	async function updateTorndata() {
		const data = await fetchData("tornv2", {
			section: "torn",
			selections: [
				"education",
				"calendar",
				"properties",
				"honors",
				"medals",
				"items",
				"pawnshop",
				"stats"
			],
			legacySelections: ["pawnshop", "stats"]
		});
		if (data.stats.points_averagecost === null || data.stats.points_averagecost <= 0) throw new Error("Aborted updating due to an unexpected/corrupted response.");
		const newData = {
			...data,
			itemsMap: data.items.reduce((map, item) => {
				map[item.id] = item;
				return map;
			}, {}),
			date: Date.now()
		};
		setTorndata(newData);
		await ttStorage.set({ torndata: newData });
	}
	function hasOutdatedTornStats() {
		const alteredStatsTimestamp = torndata.stats.timestamp * 1e3 + TO_MILLIS.DAYS;
		return !isSameUTCDay(alteredStatsTimestamp, torndata.date) && torndata.date > alteredStatsTimestamp;
	}
	async function updateStocks() {
		const oldStocks = { ...stockdata };
		const stocks = (await fetchData("tornv2", {
			section: "torn",
			selections: ["stocks"],
			legacySelections: ["stocks"]
		})).stocks;
		if (!stocks || !Object.keys(stocks).length) throw new Error("Aborted updating due to an unexpected response.");
		await ttStorage.change({ stockdata: {
			...stocks,
			date: Date.now()
		} });
		if (oldStocks && settings.notifications.types.global) for (const id in settings.notifications.types.stocks) {
			if (!oldStocks[id] || typeof oldStocks[id] === "number") continue;
			const alerts = settings.notifications.types.stocks[id];
			if (alerts.priceFalls && oldStocks[id].current_price > alerts.priceFalls && stocks[id].current_price <= alerts.priceFalls) {
				const message = `(${stocks[id].acronym}) ${stocks[id].name} has fallen to ${formatNumber(stocks[id].current_price, { currency: true })} (alert: ${formatNumber(alerts.priceFalls, { currency: true })})!`;
				await notifyUser("TornTools - Stock Alerts", message, LINKS.stocks);
				await storeNotification({
					title: "TornTools -  Stock Alerts",
					message,
					url: LINKS.stocks,
					date: Date.now()
				});
			} else if (alerts.priceReaches && oldStocks[id].current_price < alerts.priceReaches && stocks[id].current_price >= alerts.priceReaches) {
				const message = `(${stocks[id].acronym}) ${stocks[id].name} has reached ${formatNumber(stocks[id].current_price, { currency: true })} (alert: ${formatNumber(alerts.priceReaches, { currency: true })})!`;
				await notifyUser("TornTools - Stock Alerts", message, LINKS.stocks);
				await storeNotification({
					title: "TornTools -  Stock Alerts",
					message,
					url: LINKS.stocks,
					date: Date.now()
				});
			}
		}
	}
	async function updateFactiondata() {
		if (!userdata?.faction) setFactiondata({
			access: FACTION_ACCESS.none,
			date: 0
		});
		else if (!(!factiondata || typeof factiondata !== "object" || factiondata.access !== FACTION_ACCESS.none) || hasFactionAPIAccess()) setFactiondata(await updateAccess());
		else if ("retry" in factiondata && !!factiondata.retry || "date" in factiondata && hasTimePassed(factiondata.date, TO_MILLIS.HOURS * 6)) setFactiondata(await updateAccess());
		else setFactiondata(await updateBasic());
		await ttStorage.set({ factiondata });
		async function updateAccess() {
			try {
				const data = await fetchData("tornv2", {
					section: "faction",
					selections: [
						"crimes",
						"basic",
						"rankedwars"
					],
					legacySelections: ["crimes"],
					silent: true
				});
				return {
					...data,
					access: FACTION_ACCESS.full_access,
					date: Date.now(),
					userCrime: calculateOC(data.crimes, userdata.profile.id)
				};
			} catch (error) {
				if (error?.code === 7) return {
					...await updateBasic(),
					retry: Date.now()
				};
				return {
					error,
					access: FACTION_ACCESS.none,
					date: 0
				};
			}
		}
		async function updateBasic() {
			try {
				return {
					...await fetchData("tornv2", {
						section: "faction",
						selections: ["basic", "rankedwars"],
						silent: true
					}),
					access: FACTION_ACCESS.basic,
					date: Date.now()
				};
			} catch (error) {
				return {
					error,
					access: FACTION_ACCESS.none,
					date: 0
				};
			}
		}
	}
	var npcUpdater;
	async function updateNPCs() {
		const { yata: useYata, tornstats: useTornstats, lzpt: useLzpt } = settings.external;
		if (!useYata && !useTornstats && !useLzpt) {
			await ttStorage.set({ npcs: {} });
			return { updated: false };
		}
		const NPCS = {
			4: "DUKE",
			7: "Amanda",
			9: "Anonymous",
			10: "Scrooge",
			15: "Leslie",
			17: "Easter Bunny",
			19: "Jimmy",
			20: "Fernando",
			21: "Tiny"
		};
		const now = Date.now();
		let updated;
		if (npcs && "next_update" in npcs && npcs.next_update > now) updated = await updateLevels();
		else {
			const services = [
				{
					service: "loot-rangers",
					method: fetchLootRangers,
					check: useLzpt
				},
				{
					service: "yata",
					method: fetchYata,
					check: useYata
				},
				{
					service: "tornstats",
					method: fetchTornStats,
					check: useTornstats && hasAPIData()
				}
			].filter((s) => s.check);
			updated = await (services.find((s) => s.service === settings.pages.sidebar.npcLootTimesService) || services[0]).method();
		}
		if (updated || !npcUpdater) triggerUpdate();
		const alerts = checkNPCAlerts();
		await ttStorage.set({ notifications });
		return {
			updated,
			alerts
		};
		async function fetchYata() {
			const data = await fetchData("yata", { section: "loot" });
			if (npcs && "timestamp" in npcs && npcs.timestamp === data.timestamp) return await updateLevels();
			const newNpcs = {
				next_update: data.next_update * 1e3,
				service: "YATA",
				targets: {}
			};
			for (let [id, hospital] of Object.entries(data.hosp_out)) {
				hospital = hospital * 1e3;
				newNpcs.targets[id] = {
					levels: {
						1: hospital,
						2: hospital + TO_MILLIS.MINUTES * 30,
						3: hospital + TO_MILLIS.MINUTES * 90,
						4: hospital + TO_MILLIS.MINUTES * 210,
						5: hospital + TO_MILLIS.MINUTES * 450
					},
					name: NPCS[id] ?? "Unknown",
					order: parseInt(id)
				};
				newNpcs.targets[id].current = getCurrentLevel(newNpcs.targets[id]);
			}
			await ttStorage.set({ npcs });
			return true;
		}
		async function fetchTornStats() {
			const data = await fetchData("tornstats", { section: "loot" });
			if (data && !data.status) return await updateLevels();
			const newNpcs = {
				next_update: now + TO_MILLIS.MINUTES * 15,
				service: "TornStats",
				targets: {}
			};
			for (const npc of Object.values(data).filter((x) => typeof x === "object").filter((npc) => npc.torn_id)) {
				newNpcs.targets[npc.torn_id] = {
					levels: {
						1: npc.hosp_out * 1e3,
						2: npc.loot_2 * 1e3,
						3: npc.loot_3 * 1e3,
						4: npc.loot_4 * 1e3,
						5: npc.loot_5 * 1e3
					},
					name: npc.name,
					order: npc.torn_id
				};
				newNpcs.targets[npc.torn_id].current = getCurrentLevel(newNpcs.targets[npc.torn_id]);
			}
			await ttStorage.set({ npcs: newNpcs });
			return true;
		}
		async function fetchLootRangers() {
			const result = await fetchData("lzpt", { section: "loot" });
			if (!("npcs" in result)) {
				await ttStorage.set({ npcs: {
					error: "No NPC results from Loot Rangers.",
					next_update: now + TO_MILLIS.MINUTES * 5,
					service: "Loot Rangers"
				} });
				return;
			}
			const { time: { clear: planned, reason, attack: ongoing }, ...data } = result;
			const newNpcs = {
				next_update: now + TO_MILLIS.MINUTES * (ongoing || planned === 0 && !reason ? 1 : 15),
				service: "Loot Rangers",
				targets: {}
			};
			for (const [_id, npc] of Object.entries(data.npcs)) {
				const id = parseInt(_id);
				const hospital = npc.hosp_out * 1e3;
				newNpcs.targets[id] = {
					levels: {
						1: hospital,
						2: hospital + TO_MILLIS.MINUTES * 30,
						3: hospital + TO_MILLIS.MINUTES * 90,
						4: hospital + TO_MILLIS.MINUTES * 210,
						5: hospital + TO_MILLIS.MINUTES * 450
					},
					name: npc.name || (NPCS[id] ?? "Unknown"),
					scheduled: npc.next ?? true,
					order: data.order.indexOf(id) + (npc.next ? 0 : 10)
				};
				newNpcs.targets[id].current = getCurrentLevel(newNpcs.targets[id]);
			}
			newNpcs.planned = planned === 0 ? false : planned * 1e3;
			newNpcs.reason = reason;
			await ttStorage.set({ npcs: newNpcs });
			return true;
		}
		async function updateLevels() {
			if (!("targets" in npcs)) return false;
			const targets = {};
			for (const [id, npc] of Object.entries(npcs.targets)) {
				const current = getCurrentLevel(npc);
				if (npc.current !== current) targets[id] = { current };
			}
			if (Object.keys(targets).length) {
				await ttStorage.change({ npcs: { targets } });
				return true;
			}
			return false;
		}
		function getCurrentLevel(npc) {
			return Object.entries(npc.levels).filter(([, time]) => time <= now).map(([level, time]) => ({
				level: parseInt(level),
				time
			}))?.at(-1)?.level ?? 0;
		}
		function checkNPCAlerts() {
			if (!settings.notifications.types.global || !settings.notifications.types.npcsGlobal) return 0;
			if (!("targets" in npcs)) return 0;
			let alerts = 0;
			for (const { id, level, minutes } of settings.notifications.types.npcs.filter((npc) => npc.level !== "" && npc.minutes !== "")) {
				const npc = npcs.targets[id];
				if (!npc) {
					delete notifications.npcs[id];
					continue;
				}
				const time = npc.levels[level];
				if (!time) {
					delete notifications.npcs[id];
					continue;
				}
				const left = time - now;
				const _minutes = Math.ceil(left / TO_MILLIS.MINUTES);
				if (_minutes > minutes || _minutes < 0) {
					delete notifications.npcs[id];
					continue;
				}
				if (notifications.npcs[id]) continue;
				notifications.npcs[id] = newNotification("NPC Loot", `${npc.name} is reaching loot level ${formatNumber(level, { roman: true })} in ${formatTime(left, { type: "wordTimer" })}.`, `https://www.torn.com/profiles.php?XID=${id}`);
				alerts++;
			}
			if (settings.notifications.types.npcPlannedEnabled && npcs.planned) for (const minutes of settings.notifications.types.npcPlanned.sort()) {
				const key = `npc_planned_${minutes}`;
				const time = npcs.planned;
				if (!time) {
					delete notifications.npcs[key];
					continue;
				}
				const left = time - now;
				const _minutes = Math.ceil(left / TO_MILLIS.MINUTES);
				if (_minutes > minutes || _minutes < 0) {
					delete notifications.npcs[key];
					continue;
				}
				if (notifications.npcs[key]) continue;
				notifications.npcs[key] = newNotification("NPC Loot", `There is a planned attack in ${formatTime(left, { type: "wordTimer" })}.`);
				alerts++;
			}
			return alerts;
		}
		function triggerUpdate() {
			const shortest = "targets" in npcs ? Object.values(npcs.targets).flatMap((npc) => Object.values(npc.levels)).filter((time) => time > now).sort()[0] : null;
			if (!shortest) return;
			if (npcUpdater) clearTimeout(npcUpdater);
			npcUpdater = setTimeout(() => {
				updateLevels();
				npcUpdater = void 0;
			}, shortest - Date.now());
		}
	}
	//#endregion
	//#region extension/utils/common/functions/pages-debug.ts
	function exposeDebugObjects(backgroundService) {
		globalThis.DebugFunctions = {
			fullDataDump,
			forceUpdateUserdata: () => backgroundService.forceUpdate("userdata"),
			forceUpdateTorndata: () => backgroundService.forceUpdate("torndata"),
			forceUpdateAll: () => forceUpdateAll(backgroundService),
			reinitializeTimers: () => backgroundService.reinitializeTimers(),
			notification: (title, message) => backgroundService.notification(title, message)
		};
		globalThis.InternalObjects = {
			ttStorage,
			ttCache
		};
	}
	function fullDataDump(reduction = true) {
		ttStorage.get().then((storage) => {
			Object.values(storage.api).forEach((x) => {
				if (!("key" in x) || !x.key) return;
				if (x.key.startsWith("TS_")) x.key = `TS_<redacted:${x.key.length - 3}>`;
				else x.key = `<redacted:${x.key.length}>`;
			});
			if (reduction) {
				if (storage.settings.notifications?.soundCustom) storage.settings.notifications.soundCustom = "<reduced:custom_sound>";
				storage.stockdata = {
					"<reduced>": Object.keys(storage.stockdata).length,
					date: storage.stockdata.date
				};
				storage.torndata.education = `<reduced:${storage.torndata.education.length}>`;
				storage.torndata.honors = `<reduced:${storage.torndata.honors.length}>`;
				storage.torndata.medals = `<reduced:${storage.torndata.medals.length}>`;
				storage.torndata.items = `<reduced:${storage.torndata.items.length}>`;
				storage.torndata.itemsMap = `<reduced:${Object.keys(storage.torndata.itemsMap).length}>`;
				storage.torndata.stats = `<reduced:${Object.keys(storage.torndata.stats).length}>`;
				storage.torndata.properties = `<reduced:${storage.torndata.properties.length}>`;
				storage.torndata.calendar.competitions = `<reduced:${storage.torndata.calendar.competitions.length}>`;
				storage.torndata.calendar.events = `<reduced:${storage.torndata.calendar.events.length}>`;
				if (storage.factiondata.access === "full_access") {
					storage.factiondata.crimes = `<reduced:${Object.values(storage.factiondata.crimes).length}>`;
					storage.factiondata.rankedwars = `<reduced:${storage.factiondata.rankedwars.length}>`;
				}
				storage.notes.profile = `<reduced:${Object.values(storage.notes.profile).length}>`;
				storage.usage = `<reduced:${Object.keys(storage.usage).length}>`;
				storage.attackHistory.history = `<reduced:${Object.keys(storage.attackHistory.history).length}>`;
				Object.keys(storage.cache).forEach((cacheKey) => {
					storage.cache[cacheKey] = `<reduced:${Object.values(storage.cache[cacheKey]).length}>`;
				});
			}
			const data = JSON.stringify(storage, null, 4);
			elementBuilder({
				type: "a",
				href: window.URL.createObjectURL(new Blob([data], { type: "octet/stream" })),
				attributes: { download: "torntools-full-data-dump.json" }
			}).click();
		});
	}
	function forceUpdateAll(backgroundService) {
		return Promise.all([
			backgroundService.forceUpdate("torndata"),
			backgroundService.forceUpdate("userdata"),
			backgroundService.forceUpdate("stocks"),
			backgroundService.forceUpdate("factiondata")
		]);
	}
	//#endregion
	//#region extension/utils/services/BackgroundService.ts
	var BackgroundService = class {
		async initialize() {
			await timedUpdates();
			return { success: true };
		}
		playNotificationSound(s, volume, allowDefault) {
			const sound = getNotificationSound(s, allowDefault ?? true);
			if (sound) {
				notificationTestPlayer.volume = volume / 100;
				notificationTestPlayer.src = sound;
				notificationTestPlayer.play();
			}
		}
		stopNotificationSound() {
			notificationTestPlayer.pause();
		}
		notification(title, message, url) {
			return new Promise((resolve) => {
				notifyUser(title, message, url).then(() => resolve({ success: true })).catch((error) => resolve({
					success: false,
					error
				}));
			});
		}
		fetchRelay(location, options = {}) {
			return fetchData(location, options);
		}
		async forceUpdate(update) {
			let updateFunction;
			if (update === "torndata") updateFunction = updateTorndata;
			else if (update === "stocks") updateFunction = updateStocks;
			else if (update === "factiondata") updateFunction = updateFactiondata;
			else if (update === "userdata") updateFunction = updateUserdata;
			else return {
				success: false,
				message: "Unknown update type."
			};
			await updateFunction(true);
			return { success: true };
		}
		async reinitializeTimers() {
			await resetAlarms();
			return browser$1.alarms.getAll();
		}
		async clearCache() {
			await ttCache.clear();
			return { success: true };
		}
	};
	//#endregion
	//#region node_modules/source-map/lib/base64.js
	var require_base64 = /* @__PURE__ */ __commonJSMin(((exports) => {
		var intToCharMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
		/**
		* Encode an integer in the range of 0 to 63 to a single base 64 digit.
		*/
		exports.encode = function(number) {
			if (0 <= number && number < intToCharMap.length) return intToCharMap[number];
			throw new TypeError("Must be between 0 and 63: " + number);
		};
	}));
	//#endregion
	//#region node_modules/source-map/lib/base64-vlq.js
	var require_base64_vlq = /* @__PURE__ */ __commonJSMin(((exports) => {
		var base64 = require_base64();
		var VLQ_BASE_SHIFT = 5;
		var VLQ_BASE = 1 << VLQ_BASE_SHIFT;
		var VLQ_BASE_MASK = VLQ_BASE - 1;
		var VLQ_CONTINUATION_BIT = VLQ_BASE;
		/**
		* Converts from a two-complement value to a value where the sign bit is
		* placed in the least significant bit.  For example, as decimals:
		*   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
		*   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
		*/
		function toVLQSigned(aValue) {
			return aValue < 0 ? (-aValue << 1) + 1 : (aValue << 1) + 0;
		}
		/**
		* Returns the base 64 VLQ encoded value.
		*/
		exports.encode = function base64VLQ_encode(aValue) {
			let encoded = "";
			let digit;
			let vlq = toVLQSigned(aValue);
			do {
				digit = vlq & VLQ_BASE_MASK;
				vlq >>>= VLQ_BASE_SHIFT;
				if (vlq > 0) digit |= VLQ_CONTINUATION_BIT;
				encoded += base64.encode(digit);
			} while (vlq > 0);
			return encoded;
		};
	}));
	//#endregion
	//#region __vite-browser-external
	var require___vite_browser_external = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = {};
	}));
	//#endregion
	//#region node_modules/source-map/lib/url.js
	var require_url = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = typeof URL === "function" ? URL : require___vite_browser_external().URL;
	}));
	//#endregion
	//#region node_modules/source-map/lib/util.js
	var require_util = /* @__PURE__ */ __commonJSMin(((exports) => {
		var URL = require_url();
		/**
		* This is a helper function for getting values from parameter/options
		* objects.
		*
		* @param args The object we are extracting values from
		* @param name The name of the property we are getting.
		* @param defaultValue An optional value to return if the property is missing
		* from the object. If this is not specified and the property is missing, an
		* error will be thrown.
		*/
		function getArg(aArgs, aName, aDefaultValue) {
			if (aName in aArgs) return aArgs[aName];
			else if (arguments.length === 3) return aDefaultValue;
			throw new Error("\"" + aName + "\" is a required argument.");
		}
		exports.getArg = getArg;
		var supportsNullProto = (function() {
			return !("__proto__" in Object.create(null));
		})();
		function identity(s) {
			return s;
		}
		/**
		* Because behavior goes wacky when you set `__proto__` on objects, we
		* have to prefix all the strings in our set with an arbitrary character.
		*
		* See https://github.com/mozilla/source-map/pull/31 and
		* https://github.com/mozilla/source-map/issues/30
		*
		* @param String aStr
		*/
		function toSetString(aStr) {
			if (isProtoString(aStr)) return "$" + aStr;
			return aStr;
		}
		exports.toSetString = supportsNullProto ? identity : toSetString;
		function fromSetString(aStr) {
			if (isProtoString(aStr)) return aStr.slice(1);
			return aStr;
		}
		exports.fromSetString = supportsNullProto ? identity : fromSetString;
		function isProtoString(s) {
			if (!s) return false;
			const length = s.length;
			if (length < 9) return false;
			if (s.charCodeAt(length - 1) !== 95 || s.charCodeAt(length - 2) !== 95 || s.charCodeAt(length - 3) !== 111 || s.charCodeAt(length - 4) !== 116 || s.charCodeAt(length - 5) !== 111 || s.charCodeAt(length - 6) !== 114 || s.charCodeAt(length - 7) !== 112 || s.charCodeAt(length - 8) !== 95 || s.charCodeAt(length - 9) !== 95) return false;
			for (let i = length - 10; i >= 0; i--) if (s.charCodeAt(i) !== 36) return false;
			return true;
		}
		function strcmp(aStr1, aStr2) {
			if (aStr1 === aStr2) return 0;
			if (aStr1 === null) return 1;
			if (aStr2 === null) return -1;
			if (aStr1 > aStr2) return 1;
			return -1;
		}
		/**
		* Comparator between two mappings with inflated source and name strings where
		* the generated positions are compared.
		*/
		function compareByGeneratedPositionsInflated(mappingA, mappingB) {
			let cmp = mappingA.generatedLine - mappingB.generatedLine;
			if (cmp !== 0) return cmp;
			cmp = mappingA.generatedColumn - mappingB.generatedColumn;
			if (cmp !== 0) return cmp;
			cmp = strcmp(mappingA.source, mappingB.source);
			if (cmp !== 0) return cmp;
			cmp = mappingA.originalLine - mappingB.originalLine;
			if (cmp !== 0) return cmp;
			cmp = mappingA.originalColumn - mappingB.originalColumn;
			if (cmp !== 0) return cmp;
			return strcmp(mappingA.name, mappingB.name);
		}
		exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;
		/**
		* Strip any JSON XSSI avoidance prefix from the string (as documented
		* in the source maps specification), and then parse the string as
		* JSON.
		*/
		function parseSourceMapInput(str) {
			return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ""));
		}
		exports.parseSourceMapInput = parseSourceMapInput;
		var PROTOCOL_AND_HOST = `http://host`;
		/**
		* Make it easy to create small utilities that tweak a URL's path.
		*/
		function createSafeHandler(cb) {
			return (input) => {
				const type = getURLType(input);
				const base = buildSafeBase(input);
				const url = new URL(input, base);
				cb(url);
				const result = url.toString();
				if (type === "absolute") return result;
				else if (type === "scheme-relative") return result.slice(5);
				else if (type === "path-absolute") return result.slice(PROTOCOL_AND_HOST.length);
				return computeRelativeURL(base, result);
			};
		}
		function withBase(url, base) {
			return new URL(url, base).toString();
		}
		function buildUniqueSegment(prefix, str) {
			let id = 0;
			do {
				const ident = prefix + id++;
				if (str.indexOf(ident) === -1) return ident;
			} while (true);
		}
		function buildSafeBase(str) {
			const maxDotParts = str.split("..").length - 1;
			const segment = buildUniqueSegment("p", str);
			let base = `${PROTOCOL_AND_HOST}/`;
			for (let i = 0; i < maxDotParts; i++) base += `${segment}/`;
			return base;
		}
		var ABSOLUTE_SCHEME = /^[A-Za-z0-9\+\-\.]+:/;
		function getURLType(url) {
			if (url[0] === "/") {
				if (url[1] === "/") return "scheme-relative";
				return "path-absolute";
			}
			return ABSOLUTE_SCHEME.test(url) ? "absolute" : "path-relative";
		}
		/**
		* Given two URLs that are assumed to be on the same
		* protocol/host/user/password build a relative URL from the
		* path, params, and hash values.
		*
		* @param rootURL The root URL that the target will be relative to.
		* @param targetURL The target that the relative URL points to.
		* @return A rootURL-relative, normalized URL value.
		*/
		function computeRelativeURL(rootURL, targetURL) {
			if (typeof rootURL === "string") rootURL = new URL(rootURL);
			if (typeof targetURL === "string") targetURL = new URL(targetURL);
			const targetParts = targetURL.pathname.split("/");
			const rootParts = rootURL.pathname.split("/");
			if (rootParts.length > 0 && !rootParts[rootParts.length - 1]) rootParts.pop();
			while (targetParts.length > 0 && rootParts.length > 0 && targetParts[0] === rootParts[0]) {
				targetParts.shift();
				rootParts.shift();
			}
			return rootParts.map(() => "..").concat(targetParts).join("/") + targetURL.search + targetURL.hash;
		}
		/**
		* Given a URL, ensure that it is treated as a directory URL.
		*
		* @param url
		* @return A normalized URL value.
		*/
		var ensureDirectory = createSafeHandler((url) => {
			url.pathname = url.pathname.replace(/\/?$/, "/");
		});
		/**
		* Given a URL, strip off any filename if one is present.
		*
		* @param url
		* @return A normalized URL value.
		*/
		var trimFilename = createSafeHandler((url) => {
			url.href = new URL(".", url.toString()).toString();
		});
		/**
		* Normalize a given URL.
		* * Convert backslashes.
		* * Remove any ".." and "." segments.
		*
		* @param url
		* @return A normalized URL value.
		*/
		var normalize = createSafeHandler((url) => {});
		exports.normalize = normalize;
		/**
		* Joins two paths/URLs.
		*
		* All returned URLs will be normalized.
		*
		* @param aRoot The root path or URL. Assumed to reference a directory.
		* @param aPath The path or URL to be joined with the root.
		* @return A joined and normalized URL value.
		*/
		function join(aRoot, aPath) {
			const pathType = getURLType(aPath);
			const rootType = getURLType(aRoot);
			aRoot = ensureDirectory(aRoot);
			if (pathType === "absolute") return withBase(aPath, void 0);
			if (rootType === "absolute") return withBase(aPath, aRoot);
			if (pathType === "scheme-relative") return normalize(aPath);
			if (rootType === "scheme-relative") return withBase(aPath, withBase(aRoot, PROTOCOL_AND_HOST)).slice(5);
			if (pathType === "path-absolute") return normalize(aPath);
			if (rootType === "path-absolute") return withBase(aPath, withBase(aRoot, PROTOCOL_AND_HOST)).slice(PROTOCOL_AND_HOST.length);
			const base = buildSafeBase(aPath + aRoot);
			return computeRelativeURL(base, withBase(aPath, withBase(aRoot, base)));
		}
		exports.join = join;
		/**
		* Make a path relative to a URL or another path. If returning a
		* relative URL is not possible, the original target will be returned.
		* All returned URLs will be normalized.
		*
		* @param aRoot The root path or URL.
		* @param aPath The path or URL to be made relative to aRoot.
		* @return A rootURL-relative (if possible), normalized URL value.
		*/
		function relative(rootURL, targetURL) {
			const result = relativeIfPossible(rootURL, targetURL);
			return typeof result === "string" ? result : normalize(targetURL);
		}
		exports.relative = relative;
		function relativeIfPossible(rootURL, targetURL) {
			if (getURLType(rootURL) !== getURLType(targetURL)) return null;
			const base = buildSafeBase(rootURL + targetURL);
			const root = new URL(rootURL, base);
			const target = new URL(targetURL, base);
			try {
				new URL("", target.toString());
			} catch (err) {
				return null;
			}
			if (target.protocol !== root.protocol || target.user !== root.user || target.password !== root.password || target.hostname !== root.hostname || target.port !== root.port) return null;
			return computeRelativeURL(root, target);
		}
		/**
		* Compute the URL of a source given the the source root, the source's
		* URL, and the source map's URL.
		*/
		function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
			if (sourceRoot && getURLType(sourceURL) === "path-absolute") sourceURL = sourceURL.replace(/^\//, "");
			let url = normalize(sourceURL || "");
			if (sourceRoot) url = join(sourceRoot, url);
			if (sourceMapURL) url = join(trimFilename(sourceMapURL), url);
			return url;
		}
		exports.computeSourceURL = computeSourceURL;
	}));
	//#endregion
	//#region node_modules/source-map/lib/array-set.js
	var require_array_set = /* @__PURE__ */ __commonJSMin(((exports) => {
		exports.ArraySet = class ArraySet {
			constructor() {
				this._array = [];
				this._set = /* @__PURE__ */ new Map();
			}
			/**
			* Static method for creating ArraySet instances from an existing array.
			*/
			static fromArray(aArray, aAllowDuplicates) {
				const set = new ArraySet();
				for (let i = 0, len = aArray.length; i < len; i++) set.add(aArray[i], aAllowDuplicates);
				return set;
			}
			/**
			* Return how many unique items are in this ArraySet. If duplicates have been
			* added, than those do not count towards the size.
			*
			* @returns Number
			*/
			size() {
				return this._set.size;
			}
			/**
			* Add the given string to this set.
			*
			* @param String aStr
			*/
			add(aStr, aAllowDuplicates) {
				const isDuplicate = this.has(aStr);
				const idx = this._array.length;
				if (!isDuplicate || aAllowDuplicates) this._array.push(aStr);
				if (!isDuplicate) this._set.set(aStr, idx);
			}
			/**
			* Is the given string a member of this set?
			*
			* @param String aStr
			*/
			has(aStr) {
				return this._set.has(aStr);
			}
			/**
			* What is the index of the given string in the array?
			*
			* @param String aStr
			*/
			indexOf(aStr) {
				const idx = this._set.get(aStr);
				if (idx >= 0) return idx;
				throw new Error("\"" + aStr + "\" is not in the set.");
			}
			/**
			* What is the element at the given index?
			*
			* @param Number aIdx
			*/
			at(aIdx) {
				if (aIdx >= 0 && aIdx < this._array.length) return this._array[aIdx];
				throw new Error("No element indexed by " + aIdx);
			}
			/**
			* Returns the array representation of this set (which has the proper indices
			* indicated by indexOf). Note that this is a copy of the internal array used
			* for storing the members so that no one can mess with internal state.
			*/
			toArray() {
				return this._array.slice();
			}
		};
	}));
	//#endregion
	//#region node_modules/source-map/lib/mapping-list.js
	var require_mapping_list = /* @__PURE__ */ __commonJSMin(((exports) => {
		var util = require_util();
		/**
		* Determine whether mappingB is after mappingA with respect to generated
		* position.
		*/
		function generatedPositionAfter(mappingA, mappingB) {
			const lineA = mappingA.generatedLine;
			const lineB = mappingB.generatedLine;
			const columnA = mappingA.generatedColumn;
			const columnB = mappingB.generatedColumn;
			return lineB > lineA || lineB == lineA && columnB >= columnA || util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
		}
		/**
		* A data structure to provide a sorted view of accumulated mappings in a
		* performance conscious manner. It trades a negligible overhead in general
		* case for a large speedup in case of mappings being added in order.
		*/
		var MappingList = class {
			constructor() {
				this._array = [];
				this._sorted = true;
				this._last = {
					generatedLine: -1,
					generatedColumn: 0
				};
			}
			/**
			* Iterate through internal items. This method takes the same arguments that
			* `Array.prototype.forEach` takes.
			*
			* NOTE: The order of the mappings is NOT guaranteed.
			*/
			unsortedForEach(aCallback, aThisArg) {
				this._array.forEach(aCallback, aThisArg);
			}
			/**
			* Add the given source mapping.
			*
			* @param Object aMapping
			*/
			add(aMapping) {
				if (generatedPositionAfter(this._last, aMapping)) {
					this._last = aMapping;
					this._array.push(aMapping);
				} else {
					this._sorted = false;
					this._array.push(aMapping);
				}
			}
			/**
			* Returns the flat, sorted array of mappings. The mappings are sorted by
			* generated position.
			*
			* WARNING: This method returns internal data without copying, for
			* performance. The return value must NOT be mutated, and should be treated as
			* an immutable borrow. If you want to take ownership, you must make your own
			* copy.
			*/
			toArray() {
				if (!this._sorted) {
					this._array.sort(util.compareByGeneratedPositionsInflated);
					this._sorted = true;
				}
				return this._array;
			}
		};
		exports.MappingList = MappingList;
	}));
	//#endregion
	//#region node_modules/source-map/lib/source-map-generator.js
	var require_source_map_generator = /* @__PURE__ */ __commonJSMin(((exports) => {
		var base64VLQ = require_base64_vlq();
		var util = require_util();
		var ArraySet = require_array_set().ArraySet;
		var MappingList = require_mapping_list().MappingList;
		/**
		* An instance of the SourceMapGenerator represents a source map which is
		* being built incrementally. You may pass an object with the following
		* properties:
		*
		*   - file: The filename of the generated source.
		*   - sourceRoot: A root for all relative URLs in this source map.
		*/
		var SourceMapGenerator = class SourceMapGenerator {
			constructor(aArgs) {
				if (!aArgs) aArgs = {};
				this._file = util.getArg(aArgs, "file", null);
				this._sourceRoot = util.getArg(aArgs, "sourceRoot", null);
				this._skipValidation = util.getArg(aArgs, "skipValidation", false);
				this._sources = new ArraySet();
				this._names = new ArraySet();
				this._mappings = new MappingList();
				this._sourcesContents = null;
			}
			/**
			* Creates a new SourceMapGenerator based on a SourceMapConsumer
			*
			* @param aSourceMapConsumer The SourceMap.
			*/
			static fromSourceMap(aSourceMapConsumer) {
				const sourceRoot = aSourceMapConsumer.sourceRoot;
				const generator = new SourceMapGenerator({
					file: aSourceMapConsumer.file,
					sourceRoot
				});
				aSourceMapConsumer.eachMapping(function(mapping) {
					const newMapping = { generated: {
						line: mapping.generatedLine,
						column: mapping.generatedColumn
					} };
					if (mapping.source != null) {
						newMapping.source = mapping.source;
						if (sourceRoot != null) newMapping.source = util.relative(sourceRoot, newMapping.source);
						newMapping.original = {
							line: mapping.originalLine,
							column: mapping.originalColumn
						};
						if (mapping.name != null) newMapping.name = mapping.name;
					}
					generator.addMapping(newMapping);
				});
				aSourceMapConsumer.sources.forEach(function(sourceFile) {
					let sourceRelative = sourceFile;
					if (sourceRoot != null) sourceRelative = util.relative(sourceRoot, sourceFile);
					if (!generator._sources.has(sourceRelative)) generator._sources.add(sourceRelative);
					const content = aSourceMapConsumer.sourceContentFor(sourceFile);
					if (content != null) generator.setSourceContent(sourceFile, content);
				});
				return generator;
			}
			/**
			* Add a single mapping from original source line and column to the generated
			* source's line and column for this source map being created. The mapping
			* object should have the following properties:
			*
			*   - generated: An object with the generated line and column positions.
			*   - original: An object with the original line and column positions.
			*   - source: The original source file (relative to the sourceRoot).
			*   - name: An optional original token name for this mapping.
			*/
			addMapping(aArgs) {
				const generated = util.getArg(aArgs, "generated");
				const original = util.getArg(aArgs, "original", null);
				let source = util.getArg(aArgs, "source", null);
				let name = util.getArg(aArgs, "name", null);
				if (!this._skipValidation) this._validateMapping(generated, original, source, name);
				if (source != null) {
					source = String(source);
					if (!this._sources.has(source)) this._sources.add(source);
				}
				if (name != null) {
					name = String(name);
					if (!this._names.has(name)) this._names.add(name);
				}
				this._mappings.add({
					generatedLine: generated.line,
					generatedColumn: generated.column,
					originalLine: original && original.line,
					originalColumn: original && original.column,
					source,
					name
				});
			}
			/**
			* Set the source content for a source file.
			*/
			setSourceContent(aSourceFile, aSourceContent) {
				let source = aSourceFile;
				if (this._sourceRoot != null) source = util.relative(this._sourceRoot, source);
				if (aSourceContent != null) {
					if (!this._sourcesContents) this._sourcesContents = Object.create(null);
					this._sourcesContents[util.toSetString(source)] = aSourceContent;
				} else if (this._sourcesContents) {
					delete this._sourcesContents[util.toSetString(source)];
					if (Object.keys(this._sourcesContents).length === 0) this._sourcesContents = null;
				}
			}
			/**
			* Applies the mappings of a sub-source-map for a specific source file to the
			* source map being generated. Each mapping to the supplied source file is
			* rewritten using the supplied source map. Note: The resolution for the
			* resulting mappings is the minimium of this map and the supplied map.
			*
			* @param aSourceMapConsumer The source map to be applied.
			* @param aSourceFile Optional. The filename of the source file.
			*        If omitted, SourceMapConsumer's file property will be used.
			* @param aSourceMapPath Optional. The dirname of the path to the source map
			*        to be applied. If relative, it is relative to the SourceMapConsumer.
			*        This parameter is needed when the two source maps aren't in the same
			*        directory, and the source map to be applied contains relative source
			*        paths. If so, those relative source paths need to be rewritten
			*        relative to the SourceMapGenerator.
			*/
			applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
				let sourceFile = aSourceFile;
				if (aSourceFile == null) {
					if (aSourceMapConsumer.file == null) throw new Error("SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's \"file\" property. Both were omitted.");
					sourceFile = aSourceMapConsumer.file;
				}
				const sourceRoot = this._sourceRoot;
				if (sourceRoot != null) sourceFile = util.relative(sourceRoot, sourceFile);
				const newSources = this._mappings.toArray().length > 0 ? new ArraySet() : this._sources;
				const newNames = new ArraySet();
				this._mappings.unsortedForEach(function(mapping) {
					if (mapping.source === sourceFile && mapping.originalLine != null) {
						const original = aSourceMapConsumer.originalPositionFor({
							line: mapping.originalLine,
							column: mapping.originalColumn
						});
						if (original.source != null) {
							mapping.source = original.source;
							if (aSourceMapPath != null) mapping.source = util.join(aSourceMapPath, mapping.source);
							if (sourceRoot != null) mapping.source = util.relative(sourceRoot, mapping.source);
							mapping.originalLine = original.line;
							mapping.originalColumn = original.column;
							if (original.name != null) mapping.name = original.name;
						}
					}
					const source = mapping.source;
					if (source != null && !newSources.has(source)) newSources.add(source);
					const name = mapping.name;
					if (name != null && !newNames.has(name)) newNames.add(name);
				}, this);
				this._sources = newSources;
				this._names = newNames;
				aSourceMapConsumer.sources.forEach(function(srcFile) {
					const content = aSourceMapConsumer.sourceContentFor(srcFile);
					if (content != null) {
						if (aSourceMapPath != null) srcFile = util.join(aSourceMapPath, srcFile);
						if (sourceRoot != null) srcFile = util.relative(sourceRoot, srcFile);
						this.setSourceContent(srcFile, content);
					}
				}, this);
			}
			/**
			* A mapping can have one of the three levels of data:
			*
			*   1. Just the generated position.
			*   2. The Generated position, original position, and original source.
			*   3. Generated and original position, original source, as well as a name
			*      token.
			*
			* To maintain consistency, we validate that any new mapping being added falls
			* in to one of these categories.
			*/
			_validateMapping(aGenerated, aOriginal, aSource, aName) {
				if (aOriginal && typeof aOriginal.line !== "number" && typeof aOriginal.column !== "number") throw new Error("original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.");
				if (aGenerated && "line" in aGenerated && "column" in aGenerated && aGenerated.line > 0 && aGenerated.column >= 0 && !aOriginal && !aSource && !aName) {} else if (aGenerated && "line" in aGenerated && "column" in aGenerated && aOriginal && "line" in aOriginal && "column" in aOriginal && aGenerated.line > 0 && aGenerated.column >= 0 && aOriginal.line > 0 && aOriginal.column >= 0 && aSource) {} else throw new Error("Invalid mapping: " + JSON.stringify({
					generated: aGenerated,
					source: aSource,
					original: aOriginal,
					name: aName
				}));
			}
			/**
			* Serialize the accumulated mappings in to the stream of base 64 VLQs
			* specified by the source map format.
			*/
			_serializeMappings() {
				let previousGeneratedColumn = 0;
				let previousGeneratedLine = 1;
				let previousOriginalColumn = 0;
				let previousOriginalLine = 0;
				let previousName = 0;
				let previousSource = 0;
				let result = "";
				let next;
				let mapping;
				let nameIdx;
				let sourceIdx;
				const mappings = this._mappings.toArray();
				for (let i = 0, len = mappings.length; i < len; i++) {
					mapping = mappings[i];
					next = "";
					if (mapping.generatedLine !== previousGeneratedLine) {
						previousGeneratedColumn = 0;
						while (mapping.generatedLine !== previousGeneratedLine) {
							next += ";";
							previousGeneratedLine++;
						}
					} else if (i > 0) {
						if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) continue;
						next += ",";
					}
					next += base64VLQ.encode(mapping.generatedColumn - previousGeneratedColumn);
					previousGeneratedColumn = mapping.generatedColumn;
					if (mapping.source != null) {
						sourceIdx = this._sources.indexOf(mapping.source);
						next += base64VLQ.encode(sourceIdx - previousSource);
						previousSource = sourceIdx;
						next += base64VLQ.encode(mapping.originalLine - 1 - previousOriginalLine);
						previousOriginalLine = mapping.originalLine - 1;
						next += base64VLQ.encode(mapping.originalColumn - previousOriginalColumn);
						previousOriginalColumn = mapping.originalColumn;
						if (mapping.name != null) {
							nameIdx = this._names.indexOf(mapping.name);
							next += base64VLQ.encode(nameIdx - previousName);
							previousName = nameIdx;
						}
					}
					result += next;
				}
				return result;
			}
			_generateSourcesContent(aSources, aSourceRoot) {
				return aSources.map(function(source) {
					if (!this._sourcesContents) return null;
					if (aSourceRoot != null) source = util.relative(aSourceRoot, source);
					const key = util.toSetString(source);
					return Object.prototype.hasOwnProperty.call(this._sourcesContents, key) ? this._sourcesContents[key] : null;
				}, this);
			}
			/**
			* Externalize the source map.
			*/
			toJSON() {
				const map = {
					version: this._version,
					sources: this._sources.toArray(),
					names: this._names.toArray(),
					mappings: this._serializeMappings()
				};
				if (this._file != null) map.file = this._file;
				if (this._sourceRoot != null) map.sourceRoot = this._sourceRoot;
				if (this._sourcesContents) map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
				return map;
			}
			/**
			* Render the source map being generated to a string.
			*/
			toString() {
				return JSON.stringify(this.toJSON());
			}
		};
		SourceMapGenerator.prototype._version = 3;
		exports.SourceMapGenerator = SourceMapGenerator;
	}));
	//#endregion
	//#region node_modules/source-map/lib/binary-search.js
	var require_binary_search = /* @__PURE__ */ __commonJSMin(((exports) => {
		exports.GREATEST_LOWER_BOUND = 1;
		exports.LEAST_UPPER_BOUND = 2;
		/**
		* Recursive implementation of binary search.
		*
		* @param aLow Indices here and lower do not contain the needle.
		* @param aHigh Indices here and higher do not contain the needle.
		* @param aNeedle The element being searched for.
		* @param aHaystack The non-empty array being searched.
		* @param aCompare Function which takes two elements and returns -1, 0, or 1.
		* @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
		*     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
		*     closest element that is smaller than or greater than the one we are
		*     searching for, respectively, if the exact element cannot be found.
		*/
		function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
			const mid = Math.floor((aHigh - aLow) / 2) + aLow;
			const cmp = aCompare(aNeedle, aHaystack[mid], true);
			if (cmp === 0) return mid;
			else if (cmp > 0) {
				if (aHigh - mid > 1) return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
				if (aBias === exports.LEAST_UPPER_BOUND) return aHigh < aHaystack.length ? aHigh : -1;
				return mid;
			}
			if (mid - aLow > 1) return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
			if (aBias == exports.LEAST_UPPER_BOUND) return mid;
			return aLow < 0 ? -1 : aLow;
		}
		/**
		* This is an implementation of binary search which will always try and return
		* the index of the closest element if there is no exact hit. This is because
		* mappings between original and generated line/col pairs are single points,
		* and there is an implicit region between each of them, so a miss just means
		* that you aren't on the very start of a region.
		*
		* @param aNeedle The element you are looking for.
		* @param aHaystack The array that is being searched.
		* @param aCompare A function which takes the needle and an element in the
		*     array and returns -1, 0, or 1 depending on whether the needle is less
		*     than, equal to, or greater than the element, respectively.
		* @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
		*     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
		*     closest element that is smaller than or greater than the one we are
		*     searching for, respectively, if the exact element cannot be found.
		*     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
		*/
		exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
			if (aHaystack.length === 0) return -1;
			let index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack, aCompare, aBias || exports.GREATEST_LOWER_BOUND);
			if (index < 0) return -1;
			while (index - 1 >= 0) {
				if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) break;
				--index;
			}
			return index;
		};
	}));
	//#endregion
	//#region node_modules/source-map/lib/read-wasm-browser.js
	var require_read_wasm_browser = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var mappingsWasm = null;
		module.exports = function readWasm() {
			if (typeof mappingsWasm === "string") return fetch(mappingsWasm).then((response) => response.arrayBuffer());
			if (mappingsWasm instanceof ArrayBuffer) return Promise.resolve(mappingsWasm);
			throw new Error("You must provide the string URL or ArrayBuffer contents of lib/mappings.wasm by calling SourceMapConsumer.initialize({ 'lib/mappings.wasm': ... }) before using SourceMapConsumer");
		};
		module.exports.initialize = (input) => {
			mappingsWasm = input;
		};
	}));
	//#endregion
	//#region node_modules/source-map/lib/wasm.js
	var require_wasm = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var readWasm = require_read_wasm_browser();
		/**
		* Provide the JIT with a nice shape / hidden class.
		*/
		function Mapping() {
			this.generatedLine = 0;
			this.generatedColumn = 0;
			this.lastGeneratedColumn = null;
			this.source = null;
			this.originalLine = null;
			this.originalColumn = null;
			this.name = null;
		}
		var cachedWasm = null;
		module.exports = function wasm() {
			if (cachedWasm) return cachedWasm;
			const callbackStack = [];
			cachedWasm = readWasm().then((buffer) => {
				return WebAssembly.instantiate(buffer, { env: {
					mapping_callback(generatedLine, generatedColumn, hasLastGeneratedColumn, lastGeneratedColumn, hasOriginal, source, originalLine, originalColumn, hasName, name) {
						const mapping = new Mapping();
						mapping.generatedLine = generatedLine + 1;
						mapping.generatedColumn = generatedColumn;
						if (hasLastGeneratedColumn) mapping.lastGeneratedColumn = lastGeneratedColumn - 1;
						if (hasOriginal) {
							mapping.source = source;
							mapping.originalLine = originalLine + 1;
							mapping.originalColumn = originalColumn;
							if (hasName) mapping.name = name;
						}
						callbackStack[callbackStack.length - 1](mapping);
					},
					start_all_generated_locations_for() {
						console.time("all_generated_locations_for");
					},
					end_all_generated_locations_for() {
						console.timeEnd("all_generated_locations_for");
					},
					start_compute_column_spans() {
						console.time("compute_column_spans");
					},
					end_compute_column_spans() {
						console.timeEnd("compute_column_spans");
					},
					start_generated_location_for() {
						console.time("generated_location_for");
					},
					end_generated_location_for() {
						console.timeEnd("generated_location_for");
					},
					start_original_location_for() {
						console.time("original_location_for");
					},
					end_original_location_for() {
						console.timeEnd("original_location_for");
					},
					start_parse_mappings() {
						console.time("parse_mappings");
					},
					end_parse_mappings() {
						console.timeEnd("parse_mappings");
					},
					start_sort_by_generated_location() {
						console.time("sort_by_generated_location");
					},
					end_sort_by_generated_location() {
						console.timeEnd("sort_by_generated_location");
					},
					start_sort_by_original_location() {
						console.time("sort_by_original_location");
					},
					end_sort_by_original_location() {
						console.timeEnd("sort_by_original_location");
					}
				} });
			}).then((Wasm) => {
				return {
					exports: Wasm.instance.exports,
					withMappingCallback: (mappingCallback, f) => {
						callbackStack.push(mappingCallback);
						try {
							f();
						} finally {
							callbackStack.pop();
						}
					}
				};
			}).then(null, (e) => {
				cachedWasm = null;
				throw e;
			});
			return cachedWasm;
		};
	}));
	//#endregion
	//#region node_modules/source-map/lib/source-map-consumer.js
	var require_source_map_consumer = /* @__PURE__ */ __commonJSMin(((exports) => {
		var util = require_util();
		var binarySearch = require_binary_search();
		var ArraySet = require_array_set().ArraySet;
		require_base64_vlq();
		var readWasm = require_read_wasm_browser();
		var wasm = require_wasm();
		var INTERNAL = Symbol("smcInternal");
		var SourceMapConsumer = class SourceMapConsumer {
			constructor(aSourceMap, aSourceMapURL) {
				if (aSourceMap == INTERNAL) return Promise.resolve(this);
				return _factory(aSourceMap, aSourceMapURL);
			}
			static initialize(opts) {
				readWasm.initialize(opts["lib/mappings.wasm"]);
			}
			static fromSourceMap(aSourceMap, aSourceMapURL) {
				return _factoryBSM(aSourceMap, aSourceMapURL);
			}
			/**
			* Construct a new `SourceMapConsumer` from `rawSourceMap` and `sourceMapUrl`
			* (see the `SourceMapConsumer` constructor for details. Then, invoke the `async
			* function f(SourceMapConsumer) -> T` with the newly constructed consumer, wait
			* for `f` to complete, call `destroy` on the consumer, and return `f`'s return
			* value.
			*
			* You must not use the consumer after `f` completes!
			*
			* By using `with`, you do not have to remember to manually call `destroy` on
			* the consumer, since it will be called automatically once `f` completes.
			*
			* ```js
			* const xSquared = await SourceMapConsumer.with(
			*   myRawSourceMap,
			*   null,
			*   async function (consumer) {
			*     // Use `consumer` inside here and don't worry about remembering
			*     // to call `destroy`.
			*
			*     const x = await whatever(consumer);
			*     return x * x;
			*   }
			* );
			*
			* // You may not use that `consumer` anymore out here; it has
			* // been destroyed. But you can use `xSquared`.
			* console.log(xSquared);
			* ```
			*/
			static async with(rawSourceMap, sourceMapUrl, f) {
				const consumer = await new SourceMapConsumer(rawSourceMap, sourceMapUrl);
				try {
					return await f(consumer);
				} finally {
					consumer.destroy();
				}
			}
			/**
			* Iterate over each mapping between an original source/line/column and a
			* generated line/column in this source map.
			*
			* @param Function aCallback
			*        The function that is called with each mapping.
			* @param Object aContext
			*        Optional. If specified, this object will be the value of `this` every
			*        time that `aCallback` is called.
			* @param aOrder
			*        Either `SourceMapConsumer.GENERATED_ORDER` or
			*        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
			*        iterate over the mappings sorted by the generated file's line/column
			*        order or the original's source/line/column order, respectively. Defaults to
			*        `SourceMapConsumer.GENERATED_ORDER`.
			*/
			eachMapping(aCallback, aContext, aOrder) {
				throw new Error("Subclasses must implement eachMapping");
			}
			/**
			* Returns all generated line and column information for the original source,
			* line, and column provided. If no column is provided, returns all mappings
			* corresponding to a either the line we are searching for or the next
			* closest line that has any mappings. Otherwise, returns all mappings
			* corresponding to the given line and either the column we are searching for
			* or the next closest column that has any offsets.
			*
			* The only argument is an object with the following properties:
			*
			*   - source: The filename of the original source.
			*   - line: The line number in the original source.  The line number is 1-based.
			*   - column: Optional. the column number in the original source.
			*    The column number is 0-based.
			*
			* and an array of objects is returned, each with the following properties:
			*
			*   - line: The line number in the generated source, or null.  The
			*    line number is 1-based.
			*   - column: The column number in the generated source, or null.
			*    The column number is 0-based.
			*/
			allGeneratedPositionsFor(aArgs) {
				throw new Error("Subclasses must implement allGeneratedPositionsFor");
			}
			destroy() {
				throw new Error("Subclasses must implement destroy");
			}
		};
		/**
		* The version of the source mapping spec that we are consuming.
		*/
		SourceMapConsumer.prototype._version = 3;
		SourceMapConsumer.GENERATED_ORDER = 1;
		SourceMapConsumer.ORIGINAL_ORDER = 2;
		SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
		SourceMapConsumer.LEAST_UPPER_BOUND = 2;
		exports.SourceMapConsumer = SourceMapConsumer;
		/**
		* A BasicSourceMapConsumer instance represents a parsed source map which we can
		* query for information about the original file positions by giving it a file
		* position in the generated source.
		*
		* The first parameter is the raw source map (either as a JSON string, or
		* already parsed to an object). According to the spec, source maps have the
		* following attributes:
		*
		*   - version: Which version of the source map spec this map is following.
		*   - sources: An array of URLs to the original source files.
		*   - names: An array of identifiers which can be referenced by individual mappings.
		*   - sourceRoot: Optional. The URL root from which all sources are relative.
		*   - sourcesContent: Optional. An array of contents of the original source files.
		*   - mappings: A string of base64 VLQs which contain the actual mappings.
		*   - file: Optional. The generated file this source map is associated with.
		*
		* Here is an example source map, taken from the source map spec[0]:
		*
		*     {
		*       version : 3,
		*       file: "out.js",
		*       sourceRoot : "",
		*       sources: ["foo.js", "bar.js"],
		*       names: ["src", "maps", "are", "fun"],
		*       mappings: "AA,AB;;ABCDE;"
		*     }
		*
		* The second parameter, if given, is a string whose value is the URL
		* at which the source map was found.  This URL is used to compute the
		* sources array.
		*
		* [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
		*/
		var BasicSourceMapConsumer = class BasicSourceMapConsumer extends SourceMapConsumer {
			constructor(aSourceMap, aSourceMapURL) {
				return super(INTERNAL).then((that) => {
					let sourceMap = aSourceMap;
					if (typeof aSourceMap === "string") sourceMap = util.parseSourceMapInput(aSourceMap);
					const version = util.getArg(sourceMap, "version");
					const sources = util.getArg(sourceMap, "sources").map(String);
					const names = util.getArg(sourceMap, "names", []);
					const sourceRoot = util.getArg(sourceMap, "sourceRoot", null);
					const sourcesContent = util.getArg(sourceMap, "sourcesContent", null);
					const mappings = util.getArg(sourceMap, "mappings");
					const file = util.getArg(sourceMap, "file", null);
					const x_google_ignoreList = util.getArg(sourceMap, "x_google_ignoreList", null);
					if (version != that._version) throw new Error("Unsupported version: " + version);
					that._sourceLookupCache = /* @__PURE__ */ new Map();
					that._names = ArraySet.fromArray(names.map(String), true);
					that._sources = ArraySet.fromArray(sources, true);
					that._absoluteSources = ArraySet.fromArray(that._sources.toArray().map(function(s) {
						return util.computeSourceURL(sourceRoot, s, aSourceMapURL);
					}), true);
					that.sourceRoot = sourceRoot;
					that.sourcesContent = sourcesContent;
					that._mappings = mappings;
					that._sourceMapURL = aSourceMapURL;
					that.file = file;
					that.x_google_ignoreList = x_google_ignoreList;
					that._computedColumnSpans = false;
					that._mappingsPtr = 0;
					that._wasm = null;
					return wasm().then((w) => {
						that._wasm = w;
						return that;
					});
				});
			}
			/**
			* Utility function to find the index of a source.  Returns -1 if not
			* found.
			*/
			_findSourceIndex(aSource) {
				const cachedIndex = this._sourceLookupCache.get(aSource);
				if (typeof cachedIndex === "number") return cachedIndex;
				const sourceAsMapRelative = util.computeSourceURL(null, aSource, this._sourceMapURL);
				if (this._absoluteSources.has(sourceAsMapRelative)) {
					const index = this._absoluteSources.indexOf(sourceAsMapRelative);
					this._sourceLookupCache.set(aSource, index);
					return index;
				}
				const sourceAsSourceRootRelative = util.computeSourceURL(this.sourceRoot, aSource, this._sourceMapURL);
				if (this._absoluteSources.has(sourceAsSourceRootRelative)) {
					const index = this._absoluteSources.indexOf(sourceAsSourceRootRelative);
					this._sourceLookupCache.set(aSource, index);
					return index;
				}
				return -1;
			}
			/**
			* Create a BasicSourceMapConsumer from a SourceMapGenerator.
			*
			* @param SourceMapGenerator aSourceMap
			*        The source map that will be consumed.
			* @param String aSourceMapURL
			*        The URL at which the source map can be found (optional)
			* @returns BasicSourceMapConsumer
			*/
			static fromSourceMap(aSourceMap, aSourceMapURL) {
				return new BasicSourceMapConsumer(aSourceMap.toString());
			}
			get sources() {
				return this._absoluteSources.toArray();
			}
			_getMappingsPtr() {
				if (this._mappingsPtr === 0) this._parseMappings();
				return this._mappingsPtr;
			}
			/**
			* Parse the mappings in a string in to a data structure which we can easily
			* query (the ordered arrays in the `this.__generatedMappings` and
			* `this.__originalMappings` properties).
			*/
			_parseMappings() {
				const aStr = this._mappings;
				const size = aStr.length;
				const mappingsBufPtr = this._wasm.exports.allocate_mappings(size) >>> 0;
				const mappingsBuf = new Uint8Array(this._wasm.exports.memory.buffer, mappingsBufPtr, size);
				for (let i = 0; i < size; i++) mappingsBuf[i] = aStr.charCodeAt(i);
				const mappingsPtr = this._wasm.exports.parse_mappings(mappingsBufPtr);
				if (!mappingsPtr) {
					const error = this._wasm.exports.get_last_error();
					let msg = `Error parsing mappings (code ${error}): `;
					switch (error) {
						case 1:
							msg += "the mappings contained a negative line, column, source index, or name index";
							break;
						case 2:
							msg += "the mappings contained a number larger than 2**32";
							break;
						case 3:
							msg += "reached EOF while in the middle of parsing a VLQ";
							break;
						case 4:
							msg += "invalid base 64 character while parsing a VLQ";
							break;
						default:
							msg += "unknown error code";
							break;
					}
					throw new Error(msg);
				}
				this._mappingsPtr = mappingsPtr;
			}
			eachMapping(aCallback, aContext, aOrder) {
				const context = aContext || null;
				const order = aOrder || SourceMapConsumer.GENERATED_ORDER;
				this._wasm.withMappingCallback((mapping) => {
					if (mapping.source !== null) {
						mapping.source = this._absoluteSources.at(mapping.source);
						if (mapping.name !== null) mapping.name = this._names.at(mapping.name);
					}
					if (this._computedColumnSpans && mapping.lastGeneratedColumn === null) mapping.lastGeneratedColumn = Infinity;
					aCallback.call(context, mapping);
				}, () => {
					switch (order) {
						case SourceMapConsumer.GENERATED_ORDER:
							this._wasm.exports.by_generated_location(this._getMappingsPtr());
							break;
						case SourceMapConsumer.ORIGINAL_ORDER:
							this._wasm.exports.by_original_location(this._getMappingsPtr());
							break;
						default: throw new Error("Unknown order of iteration.");
					}
				});
			}
			allGeneratedPositionsFor(aArgs) {
				let source = util.getArg(aArgs, "source");
				const originalLine = util.getArg(aArgs, "line");
				const originalColumn = aArgs.column || 0;
				source = this._findSourceIndex(source);
				if (source < 0) return [];
				if (originalLine < 1) throw new Error("Line numbers must be >= 1");
				if (originalColumn < 0) throw new Error("Column numbers must be >= 0");
				const mappings = [];
				this._wasm.withMappingCallback((m) => {
					let lastColumn = m.lastGeneratedColumn;
					if (this._computedColumnSpans && lastColumn === null) lastColumn = Infinity;
					mappings.push({
						line: m.generatedLine,
						column: m.generatedColumn,
						lastColumn
					});
				}, () => {
					this._wasm.exports.all_generated_locations_for(this._getMappingsPtr(), source, originalLine - 1, "column" in aArgs, originalColumn);
				});
				return mappings;
			}
			destroy() {
				if (this._mappingsPtr !== 0) {
					this._wasm.exports.free_mappings(this._mappingsPtr);
					this._mappingsPtr = 0;
				}
			}
			/**
			* Compute the last column for each generated mapping. The last column is
			* inclusive.
			*/
			computeColumnSpans() {
				if (this._computedColumnSpans) return;
				this._wasm.exports.compute_column_spans(this._getMappingsPtr());
				this._computedColumnSpans = true;
			}
			/**
			* Returns the original source, line, and column information for the generated
			* source's line and column positions provided. The only argument is an object
			* with the following properties:
			*
			*   - line: The line number in the generated source.  The line number
			*     is 1-based.
			*   - column: The column number in the generated source.  The column
			*     number is 0-based.
			*   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
			*     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
			*     closest element that is smaller than or greater than the one we are
			*     searching for, respectively, if the exact element cannot be found.
			*     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
			*
			* and an object is returned with the following properties:
			*
			*   - source: The original source file, or null.
			*   - line: The line number in the original source, or null.  The
			*     line number is 1-based.
			*   - column: The column number in the original source, or null.  The
			*     column number is 0-based.
			*   - name: The original identifier, or null.
			*/
			originalPositionFor(aArgs) {
				const needle = {
					generatedLine: util.getArg(aArgs, "line"),
					generatedColumn: util.getArg(aArgs, "column")
				};
				if (needle.generatedLine < 1) throw new Error("Line numbers must be >= 1");
				if (needle.generatedColumn < 0) throw new Error("Column numbers must be >= 0");
				let bias = util.getArg(aArgs, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND);
				if (bias == null) bias = SourceMapConsumer.GREATEST_LOWER_BOUND;
				let mapping;
				this._wasm.withMappingCallback((m) => mapping = m, () => {
					this._wasm.exports.original_location_for(this._getMappingsPtr(), needle.generatedLine - 1, needle.generatedColumn, bias);
				});
				if (mapping) {
					if (mapping.generatedLine === needle.generatedLine) {
						let source = util.getArg(mapping, "source", null);
						if (source !== null) source = this._absoluteSources.at(source);
						let name = util.getArg(mapping, "name", null);
						if (name !== null) name = this._names.at(name);
						return {
							source,
							line: util.getArg(mapping, "originalLine", null),
							column: util.getArg(mapping, "originalColumn", null),
							name
						};
					}
				}
				return {
					source: null,
					line: null,
					column: null,
					name: null
				};
			}
			/**
			* Return true if we have the source content for every source in the source
			* map, false otherwise.
			*/
			hasContentsOfAllSources() {
				if (!this.sourcesContent) return false;
				return this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function(sc) {
					return sc == null;
				});
			}
			/**
			* Returns the original source content. The only argument is the url of the
			* original source file. Returns null if no original source content is
			* available.
			*/
			sourceContentFor(aSource, nullOnMissing) {
				if (!this.sourcesContent) return null;
				const index = this._findSourceIndex(aSource);
				if (index >= 0) return this.sourcesContent[index];
				if (nullOnMissing) return null;
				throw new Error("\"" + aSource + "\" is not in the SourceMap.");
			}
			/**
			* Returns the generated line and column information for the original source,
			* line, and column positions provided. The only argument is an object with
			* the following properties:
			*
			*   - source: The filename of the original source.
			*   - line: The line number in the original source.  The line number
			*     is 1-based.
			*   - column: The column number in the original source.  The column
			*     number is 0-based.
			*   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
			*     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
			*     closest element that is smaller than or greater than the one we are
			*     searching for, respectively, if the exact element cannot be found.
			*     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
			*
			* and an object is returned with the following properties:
			*
			*   - line: The line number in the generated source, or null.  The
			*     line number is 1-based.
			*   - column: The column number in the generated source, or null.
			*     The column number is 0-based.
			*/
			generatedPositionFor(aArgs) {
				let source = util.getArg(aArgs, "source");
				source = this._findSourceIndex(source);
				if (source < 0) return {
					line: null,
					column: null,
					lastColumn: null
				};
				const needle = {
					source,
					originalLine: util.getArg(aArgs, "line"),
					originalColumn: util.getArg(aArgs, "column")
				};
				if (needle.originalLine < 1) throw new Error("Line numbers must be >= 1");
				if (needle.originalColumn < 0) throw new Error("Column numbers must be >= 0");
				let bias = util.getArg(aArgs, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND);
				if (bias == null) bias = SourceMapConsumer.GREATEST_LOWER_BOUND;
				let mapping;
				this._wasm.withMappingCallback((m) => mapping = m, () => {
					this._wasm.exports.generated_location_for(this._getMappingsPtr(), needle.source, needle.originalLine - 1, needle.originalColumn, bias);
				});
				if (mapping) {
					if (mapping.source === needle.source) {
						let lastColumn = mapping.lastGeneratedColumn;
						if (this._computedColumnSpans && lastColumn === null) lastColumn = Infinity;
						return {
							line: util.getArg(mapping, "generatedLine", null),
							column: util.getArg(mapping, "generatedColumn", null),
							lastColumn
						};
					}
				}
				return {
					line: null,
					column: null,
					lastColumn: null
				};
			}
		};
		BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;
		exports.BasicSourceMapConsumer = BasicSourceMapConsumer;
		/**
		* An IndexedSourceMapConsumer instance represents a parsed source map which
		* we can query for information. It differs from BasicSourceMapConsumer in
		* that it takes "indexed" source maps (i.e. ones with a "sections" field) as
		* input.
		*
		* The first parameter is a raw source map (either as a JSON string, or already
		* parsed to an object). According to the spec for indexed source maps, they
		* have the following attributes:
		*
		*   - version: Which version of the source map spec this map is following.
		*   - file: Optional. The generated file this source map is associated with.
		*   - sections: A list of section definitions.
		*
		* Each value under the "sections" field has two fields:
		*   - offset: The offset into the original specified at which this section
		*       begins to apply, defined as an object with a "line" and "column"
		*       field.
		*   - map: A source map definition. This source map could also be indexed,
		*       but doesn't have to be.
		*
		* Instead of the "map" field, it's also possible to have a "url" field
		* specifying a URL to retrieve a source map from, but that's currently
		* unsupported.
		*
		* Here's an example source map, taken from the source map spec[0], but
		* modified to omit a section which uses the "url" field.
		*
		*  {
		*    version : 3,
		*    file: "app.js",
		*    sections: [{
		*      offset: {line:100, column:10},
		*      map: {
		*        version : 3,
		*        file: "section.js",
		*        sources: ["foo.js", "bar.js"],
		*        names: ["src", "maps", "are", "fun"],
		*        mappings: "AAAA,E;;ABCDE;"
		*      }
		*    }],
		*  }
		*
		* The second parameter, if given, is a string whose value is the URL
		* at which the source map was found.  This URL is used to compute the
		* sources array.
		*
		* [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
		*/
		var IndexedSourceMapConsumer = class extends SourceMapConsumer {
			constructor(aSourceMap, aSourceMapURL) {
				return super(INTERNAL).then((that) => {
					let sourceMap = aSourceMap;
					if (typeof aSourceMap === "string") sourceMap = util.parseSourceMapInput(aSourceMap);
					const version = util.getArg(sourceMap, "version");
					const sections = util.getArg(sourceMap, "sections");
					if (version != that._version) throw new Error("Unsupported version: " + version);
					let lastOffset = {
						line: -1,
						column: 0
					};
					return Promise.all(sections.map((s) => {
						if (s.url) throw new Error("Support for url field in sections not implemented.");
						const offset = util.getArg(s, "offset");
						const offsetLine = util.getArg(offset, "line");
						const offsetColumn = util.getArg(offset, "column");
						if (offsetLine < lastOffset.line || offsetLine === lastOffset.line && offsetColumn < lastOffset.column) throw new Error("Section offsets must be ordered and non-overlapping.");
						lastOffset = offset;
						return new SourceMapConsumer(util.getArg(s, "map"), aSourceMapURL).then((consumer) => {
							return {
								generatedOffset: {
									generatedLine: offsetLine + 1,
									generatedColumn: offsetColumn + 1
								},
								consumer
							};
						});
					})).then((s) => {
						that._sections = s;
						return that;
					});
				});
			}
			/**
			* The list of original sources.
			*/
			get sources() {
				const sources = [];
				for (let i = 0; i < this._sections.length; i++) for (let j = 0; j < this._sections[i].consumer.sources.length; j++) sources.push(this._sections[i].consumer.sources[j]);
				return sources;
			}
			/**
			* Returns the original source, line, and column information for the generated
			* source's line and column positions provided. The only argument is an object
			* with the following properties:
			*
			*   - line: The line number in the generated source.  The line number
			*     is 1-based.
			*   - column: The column number in the generated source.  The column
			*     number is 0-based.
			*
			* and an object is returned with the following properties:
			*
			*   - source: The original source file, or null.
			*   - line: The line number in the original source, or null.  The
			*     line number is 1-based.
			*   - column: The column number in the original source, or null.  The
			*     column number is 0-based.
			*   - name: The original identifier, or null.
			*/
			originalPositionFor(aArgs) {
				const needle = {
					generatedLine: util.getArg(aArgs, "line"),
					generatedColumn: util.getArg(aArgs, "column")
				};
				const sectionIndex = binarySearch.search(needle, this._sections, function(aNeedle, section) {
					const cmp = aNeedle.generatedLine - section.generatedOffset.generatedLine;
					if (cmp) return cmp;
					return aNeedle.generatedColumn - (section.generatedOffset.generatedColumn - 1);
				});
				const section = this._sections[sectionIndex];
				if (!section) return {
					source: null,
					line: null,
					column: null,
					name: null
				};
				return section.consumer.originalPositionFor({
					line: needle.generatedLine - (section.generatedOffset.generatedLine - 1),
					column: needle.generatedColumn - (section.generatedOffset.generatedLine === needle.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
					bias: aArgs.bias
				});
			}
			/**
			* Return true if we have the source content for every source in the source
			* map, false otherwise.
			*/
			hasContentsOfAllSources() {
				return this._sections.every(function(s) {
					return s.consumer.hasContentsOfAllSources();
				});
			}
			/**
			* Returns the original source content. The only argument is the url of the
			* original source file. Returns null if no original source content is
			* available.
			*/
			sourceContentFor(aSource, nullOnMissing) {
				for (let i = 0; i < this._sections.length; i++) {
					const content = this._sections[i].consumer.sourceContentFor(aSource, true);
					if (content) return content;
				}
				if (nullOnMissing) return null;
				throw new Error("\"" + aSource + "\" is not in the SourceMap.");
			}
			_findSectionIndex(source) {
				for (let i = 0; i < this._sections.length; i++) {
					const { consumer } = this._sections[i];
					if (consumer._findSourceIndex(source) !== -1) return i;
				}
				return -1;
			}
			/**
			* Returns the generated line and column information for the original source,
			* line, and column positions provided. The only argument is an object with
			* the following properties:
			*
			*   - source: The filename of the original source.
			*   - line: The line number in the original source.  The line number
			*     is 1-based.
			*   - column: The column number in the original source.  The column
			*     number is 0-based.
			*
			* and an object is returned with the following properties:
			*
			*   - line: The line number in the generated source, or null.  The
			*     line number is 1-based.
			*   - column: The column number in the generated source, or null.
			*     The column number is 0-based.
			*/
			generatedPositionFor(aArgs) {
				const index = this._findSectionIndex(util.getArg(aArgs, "source"));
				const section = index >= 0 ? this._sections[index] : null;
				const nextSection = index >= 0 && index + 1 < this._sections.length ? this._sections[index + 1] : null;
				const generatedPosition = section && section.consumer.generatedPositionFor(aArgs);
				if (generatedPosition && generatedPosition.line !== null) {
					const lineShift = section.generatedOffset.generatedLine - 1;
					const columnShift = section.generatedOffset.generatedColumn - 1;
					if (generatedPosition.line === 1) {
						generatedPosition.column += columnShift;
						if (typeof generatedPosition.lastColumn === "number") generatedPosition.lastColumn += columnShift;
					}
					if (generatedPosition.lastColumn === Infinity && nextSection && generatedPosition.line === nextSection.generatedOffset.generatedLine) generatedPosition.lastColumn = nextSection.generatedOffset.generatedColumn - 2;
					generatedPosition.line += lineShift;
					return generatedPosition;
				}
				return {
					line: null,
					column: null,
					lastColumn: null
				};
			}
			allGeneratedPositionsFor(aArgs) {
				const index = this._findSectionIndex(util.getArg(aArgs, "source"));
				const section = index >= 0 ? this._sections[index] : null;
				const nextSection = index >= 0 && index + 1 < this._sections.length ? this._sections[index + 1] : null;
				if (!section) return [];
				return section.consumer.allGeneratedPositionsFor(aArgs).map((generatedPosition) => {
					const lineShift = section.generatedOffset.generatedLine - 1;
					const columnShift = section.generatedOffset.generatedColumn - 1;
					if (generatedPosition.line === 1) {
						generatedPosition.column += columnShift;
						if (typeof generatedPosition.lastColumn === "number") generatedPosition.lastColumn += columnShift;
					}
					if (generatedPosition.lastColumn === Infinity && nextSection && generatedPosition.line === nextSection.generatedOffset.generatedLine) generatedPosition.lastColumn = nextSection.generatedOffset.generatedColumn - 2;
					generatedPosition.line += lineShift;
					return generatedPosition;
				});
			}
			eachMapping(aCallback, aContext, aOrder) {
				this._sections.forEach((section, index) => {
					const nextSection = index + 1 < this._sections.length ? this._sections[index + 1] : null;
					const { generatedOffset } = section;
					const lineShift = generatedOffset.generatedLine - 1;
					const columnShift = generatedOffset.generatedColumn - 1;
					section.consumer.eachMapping(function(mapping) {
						if (mapping.generatedLine === 1) {
							mapping.generatedColumn += columnShift;
							if (typeof mapping.lastGeneratedColumn === "number") mapping.lastGeneratedColumn += columnShift;
						}
						if (mapping.lastGeneratedColumn === Infinity && nextSection && mapping.generatedLine === nextSection.generatedOffset.generatedLine) mapping.lastGeneratedColumn = nextSection.generatedOffset.generatedColumn - 2;
						mapping.generatedLine += lineShift;
						aCallback.call(this, mapping);
					}, aContext, aOrder);
				});
			}
			computeColumnSpans() {
				for (let i = 0; i < this._sections.length; i++) this._sections[i].consumer.computeColumnSpans();
			}
			destroy() {
				for (let i = 0; i < this._sections.length; i++) this._sections[i].consumer.destroy();
			}
		};
		exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer;
		function _factory(aSourceMap, aSourceMapURL) {
			let sourceMap = aSourceMap;
			if (typeof aSourceMap === "string") sourceMap = util.parseSourceMapInput(aSourceMap);
			const consumer = sourceMap.sections != null ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL) : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
			return Promise.resolve(consumer);
		}
		function _factoryBSM(aSourceMap, aSourceMapURL) {
			return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
		}
	}));
	//#endregion
	//#region node_modules/source-map/lib/source-node.js
	var require_source_node = /* @__PURE__ */ __commonJSMin(((exports) => {
		var SourceMapGenerator = require_source_map_generator().SourceMapGenerator;
		var util = require_util();
		var REGEX_NEWLINE = /(\r?\n)/;
		var NEWLINE_CODE = 10;
		var isSourceNode = "$$$isSourceNode$$$";
		exports.SourceNode = class SourceNode {
			constructor(aLine, aColumn, aSource, aChunks, aName) {
				this.children = [];
				this.sourceContents = {};
				this.line = aLine == null ? null : aLine;
				this.column = aColumn == null ? null : aColumn;
				this.source = aSource == null ? null : aSource;
				this.name = aName == null ? null : aName;
				this[isSourceNode] = true;
				if (aChunks != null) this.add(aChunks);
			}
			/**
			* Creates a SourceNode from generated code and a SourceMapConsumer.
			*
			* @param aGeneratedCode The generated code
			* @param aSourceMapConsumer The SourceMap for the generated code
			* @param aRelativePath Optional. The path that relative sources in the
			*        SourceMapConsumer should be relative to.
			*/
			static fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
				const node = new SourceNode();
				const remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
				let remainingLinesIndex = 0;
				const shiftNextLine = function() {
					return getNextLine() + (getNextLine() || "");
					function getNextLine() {
						return remainingLinesIndex < remainingLines.length ? remainingLines[remainingLinesIndex++] : void 0;
					}
				};
				let lastGeneratedLine = 1, lastGeneratedColumn = 0;
				let lastMapping = null;
				let nextLine;
				aSourceMapConsumer.eachMapping(function(mapping) {
					if (lastMapping !== null) if (lastGeneratedLine < mapping.generatedLine) {
						addMappingWithCode(lastMapping, shiftNextLine());
						lastGeneratedLine++;
						lastGeneratedColumn = 0;
					} else {
						nextLine = remainingLines[remainingLinesIndex] || "";
						const code = nextLine.substr(0, mapping.generatedColumn - lastGeneratedColumn);
						remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn - lastGeneratedColumn);
						lastGeneratedColumn = mapping.generatedColumn;
						addMappingWithCode(lastMapping, code);
						lastMapping = mapping;
						return;
					}
					while (lastGeneratedLine < mapping.generatedLine) {
						node.add(shiftNextLine());
						lastGeneratedLine++;
					}
					if (lastGeneratedColumn < mapping.generatedColumn) {
						nextLine = remainingLines[remainingLinesIndex] || "";
						node.add(nextLine.substr(0, mapping.generatedColumn));
						remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn);
						lastGeneratedColumn = mapping.generatedColumn;
					}
					lastMapping = mapping;
				}, this);
				if (remainingLinesIndex < remainingLines.length) {
					if (lastMapping) addMappingWithCode(lastMapping, shiftNextLine());
					node.add(remainingLines.splice(remainingLinesIndex).join(""));
				}
				aSourceMapConsumer.sources.forEach(function(sourceFile) {
					const content = aSourceMapConsumer.sourceContentFor(sourceFile);
					if (content != null) {
						if (aRelativePath != null) sourceFile = util.join(aRelativePath, sourceFile);
						node.setSourceContent(sourceFile, content);
					}
				});
				return node;
				function addMappingWithCode(mapping, code) {
					if (mapping === null || mapping.source === void 0) node.add(code);
					else {
						const source = aRelativePath ? util.join(aRelativePath, mapping.source) : mapping.source;
						node.add(new SourceNode(mapping.originalLine, mapping.originalColumn, source, code, mapping.name));
					}
				}
			}
			/**
			* Add a chunk of generated JS to this source node.
			*
			* @param aChunk A string snippet of generated JS code, another instance of
			*        SourceNode, or an array where each member is one of those things.
			*/
			add(aChunk) {
				if (Array.isArray(aChunk)) aChunk.forEach(function(chunk) {
					this.add(chunk);
				}, this);
				else if (aChunk[isSourceNode] || typeof aChunk === "string") {
					if (aChunk) this.children.push(aChunk);
				} else throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk);
				return this;
			}
			/**
			* Add a chunk of generated JS to the beginning of this source node.
			*
			* @param aChunk A string snippet of generated JS code, another instance of
			*        SourceNode, or an array where each member is one of those things.
			*/
			prepend(aChunk) {
				if (Array.isArray(aChunk)) for (let i = aChunk.length - 1; i >= 0; i--) this.prepend(aChunk[i]);
				else if (aChunk[isSourceNode] || typeof aChunk === "string") this.children.unshift(aChunk);
				else throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk);
				return this;
			}
			/**
			* Walk over the tree of JS snippets in this node and its children. The
			* walking function is called once for each snippet of JS and is passed that
			* snippet and the its original associated source's line/column location.
			*
			* @param aFn The traversal function.
			*/
			walk(aFn) {
				let chunk;
				for (let i = 0, len = this.children.length; i < len; i++) {
					chunk = this.children[i];
					if (chunk[isSourceNode]) chunk.walk(aFn);
					else if (chunk !== "") aFn(chunk, {
						source: this.source,
						line: this.line,
						column: this.column,
						name: this.name
					});
				}
			}
			/**
			* Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
			* each of `this.children`.
			*
			* @param aSep The separator.
			*/
			join(aSep) {
				let newChildren;
				let i;
				const len = this.children.length;
				if (len > 0) {
					newChildren = [];
					for (i = 0; i < len - 1; i++) {
						newChildren.push(this.children[i]);
						newChildren.push(aSep);
					}
					newChildren.push(this.children[i]);
					this.children = newChildren;
				}
				return this;
			}
			/**
			* Call String.prototype.replace on the very right-most source snippet. Useful
			* for trimming whitespace from the end of a source node, etc.
			*
			* @param aPattern The pattern to replace.
			* @param aReplacement The thing to replace the pattern with.
			*/
			replaceRight(aPattern, aReplacement) {
				const lastChild = this.children[this.children.length - 1];
				if (lastChild[isSourceNode]) lastChild.replaceRight(aPattern, aReplacement);
				else if (typeof lastChild === "string") this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
				else this.children.push("".replace(aPattern, aReplacement));
				return this;
			}
			/**
			* Set the source content for a source file. This will be added to the SourceMapGenerator
			* in the sourcesContent field.
			*
			* @param aSourceFile The filename of the source file
			* @param aSourceContent The content of the source file
			*/
			setSourceContent(aSourceFile, aSourceContent) {
				this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
			}
			/**
			* Walk over the tree of SourceNodes. The walking function is called for each
			* source file content and is passed the filename and source content.
			*
			* @param aFn The traversal function.
			*/
			walkSourceContents(aFn) {
				for (let i = 0, len = this.children.length; i < len; i++) if (this.children[i][isSourceNode]) this.children[i].walkSourceContents(aFn);
				const sources = Object.keys(this.sourceContents);
				for (let i = 0, len = sources.length; i < len; i++) aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
			}
			/**
			* Return the string representation of this source node. Walks over the tree
			* and concatenates all the various snippets together to one string.
			*/
			toString() {
				let str = "";
				this.walk(function(chunk) {
					str += chunk;
				});
				return str;
			}
			/**
			* Returns the string representation of this source node along with a source
			* map.
			*/
			toStringWithSourceMap(aArgs) {
				const generated = {
					code: "",
					line: 1,
					column: 0
				};
				const map = new SourceMapGenerator(aArgs);
				let sourceMappingActive = false;
				let lastOriginalSource = null;
				let lastOriginalLine = null;
				let lastOriginalColumn = null;
				let lastOriginalName = null;
				this.walk(function(chunk, original) {
					generated.code += chunk;
					if (original.source !== null && original.line !== null && original.column !== null) {
						if (lastOriginalSource !== original.source || lastOriginalLine !== original.line || lastOriginalColumn !== original.column || lastOriginalName !== original.name) map.addMapping({
							source: original.source,
							original: {
								line: original.line,
								column: original.column
							},
							generated: {
								line: generated.line,
								column: generated.column
							},
							name: original.name
						});
						lastOriginalSource = original.source;
						lastOriginalLine = original.line;
						lastOriginalColumn = original.column;
						lastOriginalName = original.name;
						sourceMappingActive = true;
					} else if (sourceMappingActive) {
						map.addMapping({ generated: {
							line: generated.line,
							column: generated.column
						} });
						lastOriginalSource = null;
						sourceMappingActive = false;
					}
					for (let idx = 0, length = chunk.length; idx < length; idx++) if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
						generated.line++;
						generated.column = 0;
						if (idx + 1 === length) {
							lastOriginalSource = null;
							sourceMappingActive = false;
						} else if (sourceMappingActive) map.addMapping({
							source: original.source,
							original: {
								line: original.line,
								column: original.column
							},
							generated: {
								line: generated.line,
								column: generated.column
							},
							name: original.name
						});
					} else generated.column++;
				});
				this.walkSourceContents(function(sourceFile, sourceContent) {
					map.setSourceContent(sourceFile, sourceContent);
				});
				return {
					code: generated.code,
					map
				};
			}
		};
	}));
	//#endregion
	//#region extension/utils/services/SourceService.ts
	var import_source_map = (/* @__PURE__ */ __commonJSMin(((exports) => {
		exports.SourceMapGenerator = require_source_map_generator().SourceMapGenerator;
		exports.SourceMapConsumer = require_source_map_consumer().SourceMapConsumer;
		exports.SourceNode = require_source_node().SourceNode;
	})))();
	var SourceService = class {
		sourceMapConsumer = null;
		constructor() {
			this.initializeSourceMap().then(() => {});
		}
		async initializeSourceMap() {
			import_source_map.SourceMapConsumer.initialize({ "lib/mappings.wasm": "https://unpkg.com/source-map@0.7.6/lib/mappings.wasm" });
			const name = browser$1.runtime.getURL("/content-scripts/extension.js.map");
			this.sourceMapConsumer = await new import_source_map.SourceMapConsumer(await fetch(name).then((res) => res.json()));
		}
		mappedStack(stack) {
			return stack.split("\n").map((line) => {
				if (line.trimStart().startsWith("at")) {
					const methodMatched = line.match(/at (.*) \(chrome-extension:\/\/.*\/content-scripts\/extension.js:(\d+):(\d+)\)/);
					if (methodMatched) {
						const [, method, lineString, columnString] = methodMatched;
						const line = parseInt(lineString);
						const column = parseInt(columnString);
						const location = this.fromSource(line, column);
						if (location) return `    at ${method} (${location.path}:${location.line}:${location.column})`;
					}
					const matched = line.match(/at chrome-extension:\/\/.*\/content-scripts\/extension.js:(\d+):(\d+)/);
					if (matched) {
						const [, lineString, columnString] = matched;
						const line = parseInt(lineString);
						const column = parseInt(columnString);
						const location = this.fromSource(line, column);
						if (location) return `    at ${location.path}:${location.line}:${location.column}`;
					}
				}
				return line;
			}).join("\n");
		}
		fromSource(line, column) {
			const position = this.sourceMapConsumer.originalPositionFor({
				line,
				column
			});
			return this.convertLocation(position);
		}
		convertLocation(raw) {
			if (raw.source === null || raw.line === null || raw.column === null) return null;
			const splitPath = raw.source.split("/");
			const cleanedPath = `/${splitPath.filter((p) => p !== "..").join("/")}`;
			return {
				rawPath: raw.source,
				path: cleanedPath,
				file: splitPath[splitPath.length - 1],
				line: raw.line,
				column: raw.column
			};
		}
	};
	//#endregion
	//#region extension/entrypoints/background/index.ts
	var _initPromise = null;
	function ensureInitialised() {
		if (!_initPromise) _initPromise = (async () => {
			try {
				await migrateDatabase(false);
				initializeDatabase();
			} catch (err) {
				console.error("TT - onInitialisation seeding failed:", err);
			}
		})();
		return _initPromise;
	}
	async function onInitialisation() {
		await ensureInitialised();
		browser$1.alarms.getAll().then((currentAlarms) => {
			if (currentAlarms.length === 4) return;
			resetAlarms();
		});
	}
	async function onInstall() {
		await ensureInitialised();
		checkUpdate();
		resetAlarms();
		clearUsage();
		clearCache();
		await timedUpdates();
		showIconBars();
		storageListeners.settings.push(showIconBars);
	}
	async function checkUpdate() {
		const oldVersion = version.oldVersion;
		const newVersion = browser$1.runtime.getManifest().version;
		const change = { version: { oldVersion: newVersion } };
		if (oldVersion !== newVersion) {
			console.log("New version detected!", newVersion);
			change.version.showNotice = true;
		}
		await ttStorage.change(change);
	}
	async function onStartup() {
		await ensureInitialised();
		checkUpdate();
		clearUsage();
		clearCache();
		await timedUpdates();
		showIconBars();
		storageListeners.settings.push(showIconBars);
	}
	var ALARM_NAMES = {
		CLEAR_CACHE: "clear-cache-alarm",
		CLEAR_USAGE: "clear-usage-alarm",
		DATA_UPDATE_AND_NOTIFICATIONS: "data-update-and-notifications-alarm",
		NOTIFICATIONS: "notifications-alarm"
	};
	async function onAlarm(alarm) {
		await loadDatabase();
		switch (alarm.name) {
			case ALARM_NAMES.CLEAR_CACHE:
				clearCache();
				break;
			case ALARM_NAMES.CLEAR_USAGE:
				clearUsage();
				break;
			case ALARM_NAMES.DATA_UPDATE_AND_NOTIFICATIONS:
				await timedUpdates();
				await sendNotifications();
				break;
			case ALARM_NAMES.NOTIFICATIONS:
				await sendNotifications();
				break;
			default: throw new Error(`Undefined alarm name: ${alarm.name}`);
		}
	}
	function clearCache() {
		ttCache.refresh().catch((error) => console.error("Error while clearing cache.", error));
	}
	function clearUsage() {
		ttUsage.refresh().catch((error) => console.error("Error while clearing API usage data.", error));
	}
	async function resetAlarms() {
		await browser$1.alarms.clearAll();
		browser$1.alarms.create(ALARM_NAMES.CLEAR_CACHE, { periodInMinutes: 60 });
		browser$1.alarms.create(ALARM_NAMES.CLEAR_USAGE, { periodInMinutes: 1440 });
		browser$1.alarms.create(ALARM_NAMES.DATA_UPDATE_AND_NOTIFICATIONS, { periodInMinutes: .52 });
		browser$1.alarms.create(ALARM_NAMES.NOTIFICATIONS, { periodInMinutes: .08 });
	}
	function onNotificationClicked(id) {
		if (id in notificationRelations) browser$1.tabs.create({ url: notificationRelations[id] });
	}
	var background_default = defineBackground(() => {
		onInitialisation();
		browser$1.runtime.onInstalled.addListener(onInstall);
		browser$1.runtime.onStartup.addListener(onStartup);
		browser$1.alarms.onAlarm.addListener(onAlarm);
		browser$1.notifications.onClicked.addListener(onNotificationClicked);
		const backgroundService = new BackgroundService();
		registerService(BACKGROUND_SERVICE_KEY, backgroundService);
		registerService(SOURCE_SERVICE_KEY, new SourceService());
		if ("connection" in navigator) navigator.connection.addEventListener("change", async () => {
			if (navigator.onLine) await timedUpdates();
		});
		else if (typeof window !== "undefined") window.addEventListener("online", timedUpdates);
		else self.addEventListener("online", timedUpdates);
		exposeDebugObjects(backgroundService);
		console.log("Background script loaded");
	});
	//#endregion
	//#region node_modules/@webext-core/match-patterns/lib/index.js
	var _MatchPattern = class {
		constructor(matchPattern) {
			if (matchPattern === "<all_urls>") {
				this.isAllUrls = true;
				this.protocolMatches = [..._MatchPattern.PROTOCOLS];
				this.hostnameMatch = "*";
				this.pathnameMatch = "*";
			} else {
				const groups = /(.*):\/\/(.*?)(\/.*)/.exec(matchPattern);
				if (groups == null) throw new InvalidMatchPattern(matchPattern, "Incorrect format");
				const [_, protocol, hostname, pathname] = groups;
				validateProtocol(matchPattern, protocol);
				validateHostname(matchPattern, hostname);
				validatePathname(matchPattern, pathname);
				this.protocolMatches = protocol === "*" ? ["http", "https"] : [protocol];
				this.hostnameMatch = hostname;
				this.pathnameMatch = pathname;
			}
		}
		includes(url) {
			if (this.isAllUrls) return true;
			const u = typeof url === "string" ? new URL(url) : url instanceof Location ? new URL(url.href) : url;
			return !!this.protocolMatches.find((protocol) => {
				if (protocol === "http") return this.isHttpMatch(u);
				if (protocol === "https") return this.isHttpsMatch(u);
				if (protocol === "file") return this.isFileMatch(u);
				if (protocol === "ftp") return this.isFtpMatch(u);
				if (protocol === "urn") return this.isUrnMatch(u);
			});
		}
		isHttpMatch(url) {
			return url.protocol === "http:" && this.isHostPathMatch(url);
		}
		isHttpsMatch(url) {
			return url.protocol === "https:" && this.isHostPathMatch(url);
		}
		isHostPathMatch(url) {
			if (!this.hostnameMatch || !this.pathnameMatch) return false;
			const hostnameMatchRegexs = [this.convertPatternToRegex(this.hostnameMatch), this.convertPatternToRegex(this.hostnameMatch.replace(/^\*\./, ""))];
			const pathnameMatchRegex = this.convertPatternToRegex(this.pathnameMatch);
			return !!hostnameMatchRegexs.find((regex) => regex.test(url.hostname)) && pathnameMatchRegex.test(url.pathname);
		}
		isFileMatch(url) {
			throw Error("Not implemented: file:// pattern matching. Open a PR to add support");
		}
		isFtpMatch(url) {
			throw Error("Not implemented: ftp:// pattern matching. Open a PR to add support");
		}
		isUrnMatch(url) {
			throw Error("Not implemented: urn:// pattern matching. Open a PR to add support");
		}
		convertPatternToRegex(pattern) {
			const starsReplaced = this.escapeForRegex(pattern).replace(/\\\*/g, ".*");
			return RegExp(`^${starsReplaced}$`);
		}
		escapeForRegex(string) {
			return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		}
	};
	var MatchPattern = _MatchPattern;
	MatchPattern.PROTOCOLS = [
		"http",
		"https",
		"file",
		"ftp",
		"urn"
	];
	var InvalidMatchPattern = class extends Error {
		constructor(matchPattern, reason) {
			super(`Invalid match pattern "${matchPattern}": ${reason}`);
		}
	};
	function validateProtocol(matchPattern, protocol) {
		if (!MatchPattern.PROTOCOLS.includes(protocol) && protocol !== "*") throw new InvalidMatchPattern(matchPattern, `${protocol} not a valid protocol (${MatchPattern.PROTOCOLS.join(", ")})`);
	}
	function validateHostname(matchPattern, hostname) {
		if (hostname.includes(":")) throw new InvalidMatchPattern(matchPattern, `Hostname cannot include a port`);
		if (hostname.includes("*") && hostname.length > 1 && !hostname.startsWith("*.")) throw new InvalidMatchPattern(matchPattern, `If using a wildcard (*), it must go at the start of the hostname`);
	}
	function validatePathname(matchPattern, pathname) {}
	//#endregion
	//#region \0virtual:wxt-background-entrypoint?/Users/zachwozniak/Desktop/torntools_extension/extension/entrypoints/background/index.ts
	function print(method, ...args) {}
	/** Wrapper around `console` with a "[wxt]" prefix */
	var logger = {
		debug: (...args) => print(console.debug, ...args),
		log: (...args) => print(console.log, ...args),
		warn: (...args) => print(console.warn, ...args),
		error: (...args) => print(console.error, ...args)
	};
	var result;
	try {
		result = background_default.main();
		if (result instanceof Promise) console.warn("The background's main() function return a promise, but it must be synchronous");
	} catch (err) {
		logger.error("The background crashed on startup!");
		throw err;
	}
	//#endregion
	return result;
})();

//# sourceMappingURL=background.js.map