"use script";

class FeatureManager {
	constructor() {
		this.logPadding = "[TornTools] FeatureManager - ";
		this.containerID = "tt-page-status";
		this.container = null;
		this.features = [];
		this.initialized = [];

		this.popupLoaded = false;
		this.resultQueue = [];
		this.errorCount = 0;
		this.earlyErrors = [];

        this.logInfo = async (...params) => {
            const checkAndLog = async (retryCount = 0) => {
                if (!settings) {
                    console.warn("Settings not found!");
                    if (retryCount < 5) { // Retry up to 5 times
                        await new Promise(resolve => setTimeout(resolve, 200)); // Wait 200ms before retrying
                        await loadDatabase().then(maybeLog.bind(this)); // Ensure database is loaded before retrying
                        await checkAndLog(retryCount + 1);
                    } else {
                        console.error("Settings not loaded after several attempts.");
                    }
                    return;
                }
                maybeLog();
            };

            const maybeLog = () => {
                if (settings.developer) { // Check if developer mode is enabled
                    params[0] = this.logPadding + params[0]; // Prepend log padding to the first parameter
                    console.log(...params); // Log the parameters
                }
            };

            await checkAndLog();
        };

		this.logError = async (info, error) => {
			if (error?.message === "Maximum cycles reached." && !settings.developer) return;

			this.errorCount = this.errorCount + 1;
			if (Array.isArray(info)) {
				info[0] = this.logPadding + info[0];
			} else {
				info = [this.logPadding + info];
			}
			info.push(error.stack);
			console.error(...info);
			// this.container.find(".error-messages")
			/*
			<div class="error-messages">
				<div class="error">
					<div class="name">Uncaught Error: Error Name.</div>
					<pre class="stack">	at sample.js:90
						at otherSample.js:100
					</pre>
				</div>
			</div>*/

			if (!this.container) {
				this.earlyErrors.push(error);
			} else {
				if (this.errorCount > 25) this.container.setAttribute("error-count", "25+");
				else {
					this.container.setAttribute("error-count", this.errorCount);
					this.addErrorToPopup(error);
				}
			}
		};
		this.addErrorToPopup = (error) => {
			this.container.setAttribute("error-count", this.errorCount);
			this.container.find(".error-messages").appendChild(
				document.newElement({
					type: "div",
					class: "error",
					children: [
						document.newElement({ type: "div", class: "name", text: `${error.name}: ${error.message}` }),
						document.newElement({ type: "pre", class: "stack", text: error.stack }),
					],
				})
			);
		};
		this.clearEarlyErrors = () => {
			this.earlyErrors.forEach((error) => this.addErrorToPopup(error));
			this.earlyErrors = [];
		};

		window.isfeatureManagerLoaded = true;

		loadDatabase().then(() => {
			if (settings.developer) return;

			console.log(
				"%cTorn%cTools %cis running.",
				"font-size: 30px; font-weight: 600; color: green;",
				"font-size: 30px; font-weight: 600; color: #000;",
				"font-size: 30px;"
			);
		});
	}

	registerFeature(name, scope, enabled, initialise, execute, cleanup, loadListeners, requirements, options) {
		options = {
			triggerCallback: false,
			liveReload: false,
			...options,
		};

		const oldFeature = this.findFeature(name);
		if (oldFeature) throw "Feature already registered.";

		const newFeature = {
			name,
			scope,
			enabled: () => getValue(enabled),
			initialise,
			execute,
			cleanup,
			loadListeners,
			requirements,
			options,
		};

		this.logInfo("Registered new feature.", newFeature.name).then(() => {});
		this.features.push(newFeature);
		this.showResult(newFeature, "registered", { message: "Loaded. Starting feature." });

		this.startFeature(newFeature).catch((error) => this.logError(`Failed to start "${name}".`, error));
		this.startLoadListeners(newFeature);

		return newFeature;
	}

	adjustFeature(name, initialise, execute, cleanup) {
		const feature = this.findFeature(name);
		if (!feature) throw "Feature not found.";

		for (const [key, func] of [
			["initialise", initialise],
			["execute", execute],
			["cleanup", cleanup],
		]) {
			if (!feature[key]) feature[key] = [func];
			else if (Array.isArray(feature[key])) feature[key].push(func);
			else feature[key] = [feature[key], func];
		}

		if (feature.hasLoaded && getValue(feature.enabled)) {
			this.executeFunction(initialise).catch((error) => this.logError(`Failed to (adjust)initialise "${name}".`, error));
			this.executeFunction(execute).catch((error) => this.logError(`Failed to (adjust)start "${name}".`, error));
		}

		this.logInfo("Adjusted feature.", feature.name).then(() => {});
		return feature;
	}

	findFeature(name) {
		return this.features.find((feature) => feature.name === name);
	}

	async startFeature(feature, liveReload) {
		await loadDatabase();
		try {
			if (getValue(feature.enabled)) {
				this.logInfo("Starting feature.", feature.name).then(() => {});
				if ("requirements" in feature) {
					const requirements = await getValueAsync(feature.requirements);

					if (typeof requirements === "string") {
						await this.executeFunction(feature.cleanup).catch((error) =>
							this.logError(`Failed to (string requirements)cleanup "${feature.name}".`, error)
						);

						this.showResult(feature, "information", { message: requirements });
						return;
					}
				}

				if (!this.initialized.includes(feature.name)) {
					await this.executeFunction(feature.initialise);
					this.initialized.push(feature.name);
				}
				if (liveReload && feature.options.liveReload) {
					await this.executeFunction(feature.execute, liveReload);
				} else {
					await this.executeFunction(feature.execute);
				}

				this.showResult(feature, "loaded");

				if (feature.options.triggerCallback) {
					triggerCustomListener(EVENT_CHANNELS.FEATURE_ENABLED, { name: feature.name });
				}
			} else {
				if (feature.hasLoaded) {
					this.logInfo("Disabling feature.", feature).then(() => {});
					await this.executeFunction(feature.cleanup);
					if (feature.options.triggerCallback) {
						triggerCustomListener(EVENT_CHANNELS.FEATURE_DISABLED, { name: feature.name });
					}
				}

				this.showResult(feature, "disabled");
			}
		} catch (error) {
			await this.executeFunction(feature.cleanup).catch((error) => this.logError(`Failed to cleanup in a failed start of "${feature.name}".`, error));

			this.showResult(feature, "failed");
			this.logError(`Failed to start "${feature.name}".`, error).then(() => {});
		}
		feature.hasLoaded = true;
	}

	startLoadListeners(feature) {
		if (!feature.loadListeners) return;

		if (feature.loadListeners.storage) {
			const storageKeys = feature.loadListeners.storage.reduce((previousValue, currentValue) => {
				const path = currentValue.split(".");
				const area = path[0];
				if (!previousValue[area]) previousValue[area] = [];
				previousValue[area].push(path.slice(1));
				return previousValue;
			}, {});

			for (const [key, getter] of [
				["settings", () => settings],
				["userdata", () => userdata],
				["version", () => version],
				["factiondata", () => factiondata],
				["localdata", () => localdata],
				["npcs", () => npcs],
			]) {
				if (!(key in storageKeys)) continue;

				storageListeners[key].push((oldSettings) => {
					if (
						!storageKeys[key].some((path) => {
							const newValue = rec(getter(), path);
							const oldValue = rec(oldSettings, path);

							if (Array.isArray(newValue) && Array.isArray(oldValue)) return !newValue.equals(oldValue);
							else if (newValue instanceof Object && oldValue instanceof Object) return !newValue.equals(oldValue);

							return newValue !== oldValue;
						})
					)
						return;

					this.startFeature(feature, "liveReload").catch((error) => this.logError(`Failed to start "${feature.name}" during live reload.`, error));
				});
			}
		}

		function rec(parent, path) {
			if (!parent) return false;
			if (path.length > 1) return rec(parent[path[0]], path.slice(1));

			return parent[path[0]];
		}
	}

	async executeFunction(func, liveReload) {
		if (!func) return;

		if (Array.isArray(func)) {
			for (const f of func) {
				await this.executeFunction(f);
			}
			return;
		}

		if (liveReload) {
			if (func.constructor.name === "AsyncFunction") await func(liveReload);
			else func(liveReload);
		} else {
			if (func.constructor.name === "AsyncFunction") await func();
			else func();
		}
	}

	showResult(feature, status, options = {}) {
		if (!this.popupLoaded) {
			this.resultQueue.push([feature, status, options]);
			return;
		}

		new Promise(async (resolve) => {
			let row = this.container.find(`[feature-name*="${feature.name}"]`);
			if (row) {
				row.setAttribute("status", status);

				const statusIcon = row.find("i");
				statusIcon.setClass(getIconClass(status));

				if (options.message) statusIcon.setAttribute("title", options.message);
				else statusIcon.removeAttribute("title");
			} else {
				row = document.newElement({
					type: "div",
					class: "tt-feature",
					attributes: { "feature-name": feature.name, status: status },
					children: [
						document.newElement({
							type: "i",
							class: getIconClass(status),
							...(options.message ? { attributes: { title: options.message } } : {}),
						}),
						document.newElement({ type: "span", text: feature.name }),
					],
				});

				let scopeEl = this.container.find(`[scope*="${feature.scope}"]`);
				if (!scopeEl) {
					scopeEl = document.newElement({
						type: "div",
						attributes: { scope: feature.scope },
						children: [document.newElement({ type: "div", text: `— ${feature.scope} —` })],
					});
					this.container.find(".tt-features-list").appendChild(scopeEl);
				}
				scopeEl.appendChild(row);
			}
			this.hideEmptyScopes();
		}).catch((error) => {
			this.logError(`Couldn't log result for ${feature.name}: ${JSON.stringify(options)}`, error).then(() => {});
		});

		function getIconClass(status) {
			let className = "fas ";
			switch (status) {
				case "disabled":
				case "failed":
					className += "fa-times-circle";
					break;
				case "loaded":
					className += "fa-check";
					break;
				case "registered":
					className += "fa-spinner";
					break;
				case "information":
				default:
					className += "fa-question-circle";
			}
			return className;
		}
	}

	display() {
		if (!this.container) return;

		this.container.setClass(
			settings.featureDisplay ? "" : "tt-hidden",
			settings.featureDisplayOnlyFailed ? "only-fails" : "",
			settings.featureDisplayHideDisabled ? "hide-disabled" : "",
			settings.featureDisplayHideEmpty ? "hide-empty" : ""
		);
		this.hideEmptyScopes();
		this.clearEarlyErrors();
	}

    async createPopup() {
        await loadDatabase();

        const popup = document.createElement('div');
        popup.id = this.containerID;
        popup.tabIndex = 0;  // Make :focus-within work on div elements
        popup.setAttribute('error-count', '0');

        const buttonContainer = document.createElement('div');
        const button = document.createElement('button');
        button.style.backgroundImage = `url(${browser.runtime.getURL("resource/images/icon_128.png")})`;
        button.addEventListener('click', (e) => {
            const title = e.target.closest(`#${this.containerID}`);
            if (title.classList.toggle('open'))
                button.style.backgroundImage = `url(${browser.runtime.getURL("resource/images/svg-icons/cross.svg")})`;
            else
                button.style.backgroundImage = `url(${browser.runtime.getURL("resource/images/icon_128.png")})`;
        });
        buttonContainer.appendChild(button);

        const featuresListDiv = document.createElement('div');
        featuresListDiv.className = 'tt-features-list';

        const errorMessagesDiv = document.createElement('div'); // Correct creation of a div for error messages
        errorMessagesDiv.className = 'error-messages';
        featuresListDiv.appendChild(errorMessagesDiv); // Append the properly created div

        popup.appendChild(buttonContainer);
        popup.appendChild(featuresListDiv);
        document.body.appendChild(popup);

        this.container = popup;
        this.popupLoaded = true;
        this.display();

        for (const item of this.resultQueue) {
            const [feature, status, options] = item;
            this.showResult(feature, status, options);
        }
    }


	hideEmptyScopes() {
		if (!settings.featureDisplay) return;

		this.container.findAll(".tt-features-list > div[scope]").forEach((scopeDiv) => {
			let hideScope = false;
			if (settings.featureDisplayOnlyFailed && scopeDiv.findAll(":scope > .tt-feature[status*='failed']").length === 0) hideScope = true;
			if (settings.featureDisplayHideDisabled && scopeDiv.findAll(":scope > .tt-feature:not([status*='disabled'])").length === 0) hideScope = true;
			scopeDiv.classList[hideScope ? "add" : "remove"]("no-content");
		});
		if (!this.container.find(".tt-features-list > div[scope]:not(.no-content)")) this.container.classList.add("no-content");
		else this.container.classList.remove("no-content");
	}
}

async function initFeatures() {
    try {
        await loadDatabase();  // Ensure the database is loaded

        if (!settings) {
            console.error("Settings are not loaded.");
            return; // Stop initialization if settings are not loaded
        }
        if (!settings.chat || typeof settings.chat.enableFontSize === 'undefined') {
            console.error("Chat settings are not properly configured.");
            return; // Stop initialization if chat settings are not correctly configured
        }

        // Initialize features after confirming settings are loaded
        featureManager.createPopup();
        featureManager.registerFeature("Chat Font Size", "chat", settings.chat.enableFontSize, setupFontSize, applyFontSize, clearFontSize);
    } catch (error) {
        console.error("Failed to initialize features:", error);
    }
}


// Call the initialization function on script start or after ensuring all dependencies are loaded
initFeatures();

const featureManager = new FeatureManager();
