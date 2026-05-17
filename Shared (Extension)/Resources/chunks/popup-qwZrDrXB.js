import { $ as PHFillCaretDown, C as applyPlural, D as formatDate, E as dropDecimals, G as isHTMLElement, H as elementBuilder, K as rotateElement, O as formatNumber, P as TO_MILLIS, Q as PHFillBellSlash, R as isToday, U as findAllElements, Y as PHCaretDown, Z as PHFillBell, _ as stakeouts, b as torndata, c as factionStakeouts, d as loadDatabase, et as PHFillCaretRight, f as localdata, g as settings, j as toSeconds, k as formatTime, m as notificationHistory, nt as ttCache, o as api, q as showLoadingPlaceholder, rt as ttStorage, t as getPageTheme, tt as PHTrash, u as initializeDatabase, v as stockdata, w as capitalizeText, x as userdata, y as storageListeners, z as sleep } from "./pages-DbN4bb4V.js";
import { t as browser } from "./browser-DV2XfOQj.js";
import { _ as getStockReward, b as isSellable, f as getNextChainBonus, g as getStockIncrement, h as getStockBoughtPrice, i as fetchData, m as getRewardValue, n as changeAPIKey, p as getRequiredStocks, r as checkAPIPermission, s as ALL_ICONS, y as isDividendStock } from "./api-BfJYxHwC.js";
//#region extension/entrypoints/popup/popup.ts
var SETUP_PAGES = {
	initialize: setupInitialize,
	dashboard: setupDashboard,
	market: setupMarketSearch,
	calculator: setupCalculator,
	stocks: setupStocksOverview,
	notifications: setupNotifications
};
var LOAD_PAGES = {
	market: loadMarketSearch,
	calculator: loadCalculator
};
var initiatedPages = [];
(async () => {
	document.body.style.minWidth = `${Math.min(416, screen.availWidth * .8)}px`;
	showLoadingPlaceholder(document.body, true);
	initializeDatabase();
	await loadDatabase();
	document.body.classList.add(getPageTheme());
	handleAPIError();
	storageListeners.api.push(handleAPIError);
	console.log("Popup - Settings available:", settings);
	for (const navigation of findAllElements("#pages .main-nav li:not([to='settings'])")) navigation.addEventListener("click", async () => {
		await showPage(navigation.getAttribute("to"));
	});
	document.querySelector("#pages li[to='settings']").addEventListener("click", () => browser.runtime.openOptionsPage());
	if (!settings?.pages?.popup?.dashboard) document.querySelector("#pages li[to='dashboard']").classList.add("tt-hidden");
	if (!settings?.pages?.popup?.marketSearch) document.querySelector("#pages li[to='market']").classList.add("tt-hidden");
	if (!settings?.pages?.popup?.calculator) document.querySelector("#pages li[to='calculator']").classList.add("tt-hidden");
	if (!settings?.pages?.popup?.stocksOverview) document.querySelector("#pages li[to='stocks']").classList.add("tt-hidden");
	if (!settings?.pages?.popup?.notifications) document.querySelector("#pages li[to='notifications']").classList.add("tt-hidden");
	if (!api.torn.key) await showPage("initialize");
	else await showPage(settings.pages.popup.defaultTab);
	showLoadingPlaceholder(document.body, false);
	document.body.classList.remove("loading");
	function handleAPIError() {
		if (api.torn.error) {
			document.querySelector(".error").classList.remove("tt-hidden");
			document.querySelector(".error").textContent = api.torn.error;
		} else {
			document.querySelector(".error").classList.add("tt-hidden");
			document.querySelector(".error").textContent = "";
		}
	}
})();
async function showPage(name) {
	document.querySelector(`#${name}`).classList.add("active");
	for (const active of findAllElements("body > main.subpage.active, #pages li.active")) active.classList.remove("active");
	if (document.querySelector(`#pages li[to="${name}"]`)) document.querySelector(`#pages li[to="${name}"]`).classList.add("active");
	document.querySelector(`#${name}`).classList.add("active");
	if (name in SETUP_PAGES && !initiatedPages.includes(name)) {
		await SETUP_PAGES[name]();
		initiatedPages.push(name);
	}
	if (name in LOAD_PAGES) await LOAD_PAGES[name]();
}
async function setupInitialize() {
	document.querySelector("#pages").classList.add("tt-hidden");
	document.querySelector("#tos").href = browser.runtime.getURL("/tos.html");
	document.querySelector("#import-previous-settings").addEventListener("click", () => window.open(browser.runtime.getURL("/options.html?page=export")));
	document.querySelector("#set_api_key").addEventListener("click", () => {
		const key = document.querySelector("#api_key").value;
		checkAPIPermission(key).then(({ access }) => {
			if (!access) {
				const permissionError = document.querySelector(".permission-error");
				permissionError.classList.remove("tt-hidden");
				permissionError.textContent = "TornTools needs a limited access key. Your API key is not the correct API level. This will affect a lot of features.";
				setTimeout(() => {
					permissionError.classList.add("tt-hidden");
					permissionError.textContent = "";
				}, 10 * TO_MILLIS.SECONDS);
				return;
			}
			changeAPIKey(key).then(async () => {
				document.querySelector("#pages").classList.remove("tt-hidden");
				console.log("TT just got initialised, initial popup data load.");
				new Promise(async () => {
					while (!(await loadDatabase()).userdata.timestamp) await sleep(TO_MILLIS.SECONDS);
					await showPage(settings.pages.popup.defaultTab);
				});
			}).catch((error) => showError(error.error));
		}).catch((error) => showError(error.error));
	});
	document.querySelector("#api_quicklink").addEventListener("click", () => {
		browser.tabs.update({ url: "https://www.torn.com/preferences.php#tab=api" });
	});
	function showError(message) {
		document.querySelector(".error").classList.remove("tt-hidden");
		document.querySelector(".error").textContent = message;
	}
}
async function setupDashboard() {
	const dashboard = document.querySelector("#dashboard");
	const iconsWrap = dashboard.querySelector(".icons-wrap");
	for (const { icon, id, description, ...r } of ALL_ICONS) {
		const url = "url" in r ? r.url : null;
		iconsWrap.appendChild(elementBuilder({
			type: url ? "a" : "div",
			class: [
				"icon",
				"tt-hidden",
				"hover_tooltip"
			],
			children: [elementBuilder({
				type: "div",
				class: icon,
				style: { backgroundPosition: `-${(id - 1) * 18}px 0` }
			}), elementBuilder({
				type: "span",
				class: "hover_tooltip_text",
				text: description
			})],
			attributes: url ? {
				href: url,
				target: "_blank"
			} : {},
			dataset: { id }
		}));
	}
	dashboard.querySelector("#mute-notifications").classList.add(settings.notifications.types.global ? "enabled" : "disabled");
	const muteIcon = settings.notifications.types.global ? PHFillBell() : PHFillBellSlash();
	dashboard.querySelector("#mute-notifications .icon-placeholder").replaceWith(muteIcon);
	dashboard.querySelector("#mute-notifications span").textContent = settings.notifications.types.global ? "Notifications enabled" : "Notifications disabled";
	dashboard.querySelector("#mute-notifications").addEventListener("click", () => {
		const newStatus = !settings.notifications.types.global;
		ttStorage.change({ settings: { notifications: { types: { global: newStatus } } } });
		if (newStatus) {
			dashboard.querySelector("#mute-notifications").classList.add("enabled");
			dashboard.querySelector("#mute-notifications").classList.remove("disabled");
			dashboard.querySelector("#mute-notifications svg")?.replaceWith(PHFillBell());
			dashboard.querySelector("#mute-notifications span").textContent = "Notifications enabled";
		} else {
			dashboard.querySelector("#mute-notifications").classList.remove("enabled");
			dashboard.querySelector("#mute-notifications").classList.add("disabled");
			dashboard.querySelector("#mute-notifications svg")?.replaceWith(PHFillBellSlash());
			dashboard.querySelector("#mute-notifications span").textContent = "Notifications disabled";
		}
	});
	updateDashboard();
	storageListeners.userdata.push(updateDashboard);
	updateStakeouts();
	storageListeners.stakeouts.push(updateStakeouts);
	updateFactionStakeouts();
	storageListeners.factionStakeouts.push(updateFactionStakeouts);
	setInterval(() => {
		if (settings.apiUsage.user.bars) for (const bar of findAllElements(".bar", dashboard)) updateBarTimer(bar);
		if (settings.apiUsage.user.cooldowns) for (const cooldown of findAllElements(".cooldowns .cooldown", dashboard)) updateCooldownTimer(cooldown);
		updateUpdateTimer();
		updateStatusTimer();
		const now = Date.now();
		for (const countdown of findAllElements(".countdown.automatic[data-seconds], .countdown.automatic[data-end]")) {
			let seconds;
			if (countdown.dataset.end) seconds = parseInt(((parseInt(countdown.dataset.end) - now) / 1e3).toString());
			else seconds = parseInt(countdown.dataset.seconds) - 1;
			if (seconds <= 0) {
				countdown.textContent = countdown.dataset.doneText || "Ready";
				delete countdown.dataset.seconds;
			} else {
				countdown.textContent = formatTime({ seconds }, JSON.parse(countdown.dataset.timeSettings));
				countdown.dataset.seconds = seconds.toString();
			}
		}
	}, 1e3);
	dashboard.querySelector(".stakeouts .heading a").href = `${browser.runtime.getURL("/targets.html")}?page=stakeouts`;
	dashboard.querySelector(".stakeouts .heading .icon-placeholder").replaceWith(PHFillCaretDown());
	dashboard.querySelector(".stakeouts .heading .icon-wrapper").addEventListener("click", () => {
		const stakeoutSection = dashboard.querySelector(".stakeouts .stakeout-list");
		if (stakeoutSection.classList.contains("tt-hidden")) {
			stakeoutSection.classList.remove("tt-hidden");
			dashboard.querySelector(".stakeouts .heading svg").innerHTML = PHFillCaretDown().innerHTML;
		} else {
			stakeoutSection.classList.add("tt-hidden");
			dashboard.querySelector(".stakeouts .heading svg").innerHTML = PHFillCaretRight().innerHTML;
		}
	});
	dashboard.querySelector(".faction-stakeouts .heading .icon-placeholder").replaceWith(PHFillCaretDown());
	dashboard.querySelector(".faction-stakeouts .heading .icon-wrapper").addEventListener("click", () => {
		const factionStakeoutSection = dashboard.querySelector(".faction-stakeouts .stakeout-list");
		if (factionStakeoutSection.classList.contains("tt-hidden")) {
			factionStakeoutSection.classList.remove("tt-hidden");
			dashboard.querySelector(".faction-stakeouts .heading svg").replaceWith(PHFillCaretDown());
		} else {
			factionStakeoutSection.classList.add("tt-hidden");
			dashboard.querySelector(".faction-stakeouts .heading svg").replaceWith(PHFillCaretRight());
		}
	});
	function updateDashboard() {
		if (settings.apiUsage.user.travel) updateStatus();
		if (settings.apiUsage.user.icons) updateIcons();
		if (settings.apiUsage.user.bars) {
			updateBar("energy", userdata.energy);
			updateBar("nerve", userdata.nerve);
			updateBar("happy", userdata.happy);
			updateBar("life", userdata.life);
			updateChainBar(userdata.chain);
		}
		if (settings.apiUsage.user.travel) updateTravelBar();
		if (settings.apiUsage.user.cooldowns) {
			updateCooldown("drug", userdata.cooldowns.drug);
			updateCooldown("booster", userdata.cooldowns.booster);
			updateCooldown("medical", userdata.cooldowns.medical);
		}
		updateExtra();
		updateActions();
		setupStakeouts();
		setupFactionStakeouts();
		function updateStatus() {
			if (userdata.travel.time_left) {
				dashboard.querySelector("#country").textContent = `Traveling to ${userdata.travel.destination}`;
				dashboard.querySelector(".status-wrap").classList.add("tt-hidden");
			} else {
				dashboard.querySelector("#country").textContent = userdata.travel.destination;
				const status = userdata.profile.status.state.toLowerCase() === "abroad" ? "okay" : userdata.profile.status.state.toLowerCase();
				dashboard.querySelector("#status").textContent = capitalizeText(status);
				dashboard.querySelector("#status").setAttribute("class", status);
				dashboard.querySelector(".status-wrap").classList.remove("tt-hidden");
				if (userdata.profile.status.until) dashboard.querySelector("#status").dataset.until = (userdata.profile.status.until * 1e3).toString();
				else delete dashboard.querySelector("#status").dataset.until;
				updateStatusTimer();
			}
		}
		function updateIcons() {
			if (!settings.pages.popup.showIcons) {
				iconsWrap.classList.add("tt-hidden");
				findAllElements(".countdown.automatic").forEach((x) => x.classList.remove("countdown"));
				return;
			}
			iconsWrap.classList.remove("tt-hidden");
			Array.from(iconsWrap.children).filter(isHTMLElement).forEach((icon) => {
				if (settings.hideIcons.includes(icon.children[0].className)) {
					icon.classList.add("tt-hidden");
					return;
				}
				const userdataIcon = userdata.icons.find((i) => i.id === parseInt(icon.dataset.id));
				if (!userdataIcon) {
					icon.classList.add("tt-hidden");
					return;
				}
				icon.classList.remove("tt-hidden");
				const parts = [userdataIcon.title, userdataIcon.description];
				if (userdataIcon.until) {
					const time = userdataIcon.until * 1e3;
					const settings = {
						type: "wordTimer",
						showDays: true
					};
					parts.push(`
							<span class="countdown automatic" data-end="${time}" data-time-settings='${JSON.stringify(settings)}'>
								${formatTime(time - Date.now(), settings)}
							</span>
						`);
				}
				icon.children[1].innerHTML = parts.filter((x) => !!x).join(" - ");
			});
		}
		function updateBar(name, bar) {
			const current = bar ? bar.current : 0;
			const maximum = bar ? bar.maximum : 100;
			const tickAt = (userdata.server_time + (bar ? bar.ticktime : 0)) * 1e3;
			let fullAt = (userdata.server_time + bar.fulltime) * 1e3;
			if (current === maximum) fullAt = "full";
			else if (current > maximum) fullAt = "over";
			dashboard.querySelector(`#${name} .progress .value`).style.width = `${current / maximum * 100}%`;
			dashboard.querySelector(`#${name} .bar-info .bar-label`).textContent = `${current}/${maximum}`;
			dashboard.querySelector(`#${name} .bar-info`).dataset.full_at = fullAt.toString();
			dashboard.querySelector(`#${name} .bar-info`).dataset.tick_at = tickAt.toString();
			if (bar.interval) dashboard.querySelector(`#${name} .bar-info`).dataset.tick_time = (bar.interval * 1e3).toString();
			updateBarTimer(dashboard.querySelector(`#${name}`));
		}
		function updateChainBar(bar) {
			const current = bar ? bar.current : 0;
			if (current === 0) {
				dashboard.querySelector("#chain").classList.add("tt-hidden");
				return;
			}
			dashboard.querySelector("#chain").classList.remove("tt-hidden");
			let maximum = bar ? bar.maximum : 100;
			if (current !== maximum) maximum = getNextChainBonus(current);
			let tickAt;
			let fullAt;
			if (bar.cooldown !== 0) {
				dashboard.querySelector("#chain").classList.add("cooldown");
				fullAt = (userdata.server_time + bar.cooldown) * 1e3;
				tickAt = (userdata.server_time + bar.cooldown) * 1e3;
			} else {
				dashboard.querySelector("#chain").classList.remove("cooldown");
				fullAt = (userdata.server_time + bar.timeout) * 1e3;
				tickAt = (userdata.server_time + bar.timeout) * 1e3;
			}
			dashboard.querySelector(`#chain .progress .value`).style.width = `${current / maximum * 100}%`;
			dashboard.querySelector(`#chain .bar-info .bar-label`).textContent = `${current}/${maximum}`;
			dashboard.querySelector(`#chain .bar-info`).dataset.full_at = fullAt.toString();
			dashboard.querySelector(`#chain .bar-info`).dataset.tick_at = tickAt.toString();
			updateBarTimer(dashboard.querySelector("#chain"));
		}
		function updateTravelBar() {
			if (!userdata.travel.time_left) {
				dashboard.querySelector("#traveling").classList.add("tt-hidden");
				return;
			}
			dashboard.querySelector("#traveling").classList.remove("tt-hidden");
			const maximum = userdata.travel.arrival_at - userdata.travel.departed_at;
			const current = maximum - userdata.travel.time_left;
			dashboard.querySelector("#traveling .progress .value").style.width = `${current / maximum * 100}%`;
			dashboard.querySelector("#traveling .bar-info .bar-label").textContent = formatTime(userdata.travel.arrival_at * 1e3);
			dashboard.querySelector("#traveling .bar-info").dataset.tick_at = (userdata.travel.arrival_at * 1e3).toString();
			dashboard.querySelector("#traveling .bar-info").dataset.full_at = (userdata.travel.arrival_at * 1e3).toString();
			updateBarTimer(dashboard.querySelector("#traveling"));
		}
		function updateCooldown(name, cooldown) {
			dashboard.querySelector(`#${name}-cooldown`).dataset.completed_at = (userdata.timestamp && cooldown ? (userdata.timestamp + cooldown) * 1e3 : 0).toString();
			updateCooldownTimer(dashboard.querySelector(`#${name}-cooldown`));
		}
		function updateExtra() {
			if (settings.apiUsage.user.newevents) dashboard.querySelector(".extra .events .count").textContent = userdata.notifications.events.toString();
			if (settings.apiUsage.user.newmessages) dashboard.querySelector(".extra .messages .count").textContent = userdata.messages.filter((message) => !message.seen).length.toString();
			if (settings.apiUsage.user.money) dashboard.querySelector(".extra .wallet .count").textContent = `$${formatNumber(userdata.money.wallet)}`;
		}
		function updateActions() {
			dashboard.querySelector("#last-update").dataset.updated_at = userdata.date.toString();
			updateUpdateTimer();
		}
		function setupStakeouts() {
			if (settings.pages.popup.showStakeouts && Object.keys(stakeouts).length && !(Object.keys(stakeouts).length === 2 && stakeouts.date && stakeouts.order)) dashboard.querySelector(".stakeouts").classList.remove("tt-hidden");
			else dashboard.querySelector(".stakeouts").classList.add("tt-hidden");
		}
		function setupFactionStakeouts() {
			if (settings.pages.popup.showStakeouts && Object.keys(factionStakeouts).length && !(Object.keys(factionStakeouts).length === 1 && factionStakeouts.date)) dashboard.querySelector(".faction-stakeouts").classList.remove("tt-hidden");
			else dashboard.querySelector(".faction-stakeouts").classList.add("tt-hidden");
		}
	}
	function updateStatusTimer() {
		const current = Date.now();
		const status = dashboard.querySelector("#status");
		if (!status.dataset.until) return;
		const until = parseInt(status.dataset.until);
		if (until < current) return;
		if (status.classList.contains("jail")) status.textContent = `Jailed for ${formatTime({ milliseconds: until - current }, {
			type: "timer",
			showDays: true,
			short: true
		})}`;
		else if (status.classList.contains("hospital")) status.textContent = `Hospitalized for ${formatTime({ milliseconds: until - current }, {
			type: "timer",
			showDays: true,
			short: true
		})}`;
	}
	function updateBarTimer(bar) {
		const name = bar.id;
		const current = Date.now();
		const barInfo = bar.querySelector(".bar-info");
		const dataset = barInfo.dataset;
		let full_at = parseInt(dataset.full_at) || dataset.full_at;
		let tick_at = parseInt(dataset.tick_at);
		if (typeof full_at === "number" && full_at <= current) full_at = "full";
		if (tick_at <= current) if (name === "traveling" || name === "chain") tick_at = current;
		else tick_at += parseInt(dataset.tick_time);
		let full;
		if (name === "happy" && full_at === "over") full = `${formatTime({ seconds: toSeconds(tick_at - current) }, {
			type: "timer",
			hideHours: true
		})}`;
		else if (typeof full_at === "string") full = "FULL";
		else if (name === "chain" && bar.classList.contains("cooldown")) full = `Cooldown over in ${formatTime({ seconds: toSeconds(full_at - current) }, {
			type: "timer",
			daysToHours: true
		})}`;
		else if (name === "chain") full = `${formatTime({ seconds: toSeconds(full_at - current) }, {
			type: "timer",
			hideHours: true
		})}`;
		else if (name === "traveling") full = `Landing in ${formatTime({ seconds: toSeconds(full_at - current) }, { type: "timer" })}`;
		else {
			full = `Full in ${formatTime({ seconds: toSeconds(full_at - current) }, {
				type: "timer",
				daysToHours: true
			})}`;
			if (settings.pages.popup.hoverBarTime) full += ` (${formatTime({ milliseconds: full_at }, { type: "normal" })})`;
		}
		let tick;
		if (name === "traveling") tick = formatTime({ seconds: toSeconds(tick_at - current) }, { type: "timer" });
		else if (name === "chain" && bar.classList.contains("cooldown")) tick = formatTime({ seconds: toSeconds(tick_at - current) }, {
			type: "timer",
			daysToHours: true
		});
		else tick = formatTime({ seconds: toSeconds(tick_at - current) }, {
			type: "timer",
			hideHours: true
		});
		if (name === "happy") if (full_at === "over") {
			full = `Resets in ${full}`;
			barInfo.classList.add("reset-timer");
		} else barInfo.classList.remove("reset-timer");
		dataset.full = full;
		dataset.tick = tick;
	}
	function updateCooldownTimer(cooldown) {
		const dataset = cooldown.dataset;
		const current = Date.now();
		const completed_at = !Number.isNaN(parseInt(dataset.completed_at)) ? parseInt(dataset.completed_at) : false;
		cooldown.querySelector(".cooldown-label").textContent = formatTime({ milliseconds: completed_at ? Math.max(completed_at - current, 0) : 0 }, {
			type: "timer",
			daysToHours: true
		});
	}
	function updateUpdateTimer() {
		const updatedAt = parseInt(dashboard.querySelector("#last-update").dataset.updated_at);
		dashboard.querySelector("#last-update").textContent = formatTime({ milliseconds: updatedAt }, {
			type: "ago",
			agoFilter: TO_MILLIS.SECONDS
		});
	}
	function updateStakeouts() {
		if (!settings.pages.popup.showStakeouts || !Object.keys(stakeouts).filter((k) => k !== "order" && k !== "date").length) {
			dashboard.querySelector(".stakeouts").classList.add("tt-hidden");
			return;
		}
		dashboard.querySelector(".stakeouts").classList.remove("tt-hidden");
		const stakeoutList = dashboard.querySelector(".stakeouts .stakeout-list");
		stakeoutList.innerHTML = "";
		for (const id of stakeouts.order) {
			const stakeout = stakeouts[id];
			if (!stakeout || typeof stakeout !== "object" || Array.isArray(stakeout)) continue;
			let activity, label, name, lastAction, lifeCurrent, lifeMaximum, state, stateColor;
			if (stakeout.info) {
				activity = stakeout.info.last_action.status;
				label = stakeout.label;
				name = stakeout.info.name;
				lastAction = stakeout.info.last_action.relative;
				lifeCurrent = stakeout.info.life.current;
				lifeMaximum = stakeout.info.life.maximum;
				state = stakeout.info.status.description;
				stateColor = stakeout.info.status.color;
			} else {
				activity = "N/A";
				label = "";
				name = id;
				lastAction = "N/A";
				lifeCurrent = 0;
				lifeMaximum = 100;
				state = "Unknown";
				stateColor = "gray";
			}
			const removeStakeoutButton = elementBuilder({
				type: "div",
				class: "delete-stakeout-wrap",
				children: [PHTrash({ class: "delete-stakeout" })]
			});
			removeStakeoutButton.addEventListener("click", () => {
				delete stakeouts[id];
				stakeouts.order = Object.keys(stakeouts).filter((stakeoutID) => !Number.isNaN(parseInt(stakeoutID)));
				ttStorage.set({ stakeouts });
			});
			const lifeBar = elementBuilder({
				type: "div",
				children: [elementBuilder({
					type: "span",
					text: "Life: "
				}), elementBuilder({
					type: "div",
					class: "progress",
					children: [elementBuilder({
						type: "div",
						class: "value",
						style: { width: `${(lifeCurrent / lifeMaximum * 100).toFixed(0)}%` }
					})]
				})]
			});
			stakeoutList.appendChild(elementBuilder({
				type: "div",
				class: "user",
				children: [
					elementBuilder({
						type: "div",
						class: "row information",
						children: [elementBuilder({
							type: "div",
							class: "activity",
							children: [
								elementBuilder({
									type: "span",
									class: `status ${activity.toLowerCase()}`
								}),
								elementBuilder({
									type: "a",
									href: `https://www.torn.com/profiles.php?XID=${id}`,
									text: name,
									attributes: { target: "_blank" }
								}),
								label ? elementBuilder({
									type: "span",
									text: ` (${label})`
								}) : null
							]
						}), removeStakeoutButton]
					}),
					elementBuilder({
						type: "div",
						class: "row detailed",
						children: [lifeBar, elementBuilder({
							type: "span",
							class: "lastAction",
							text: `Last action: ${lastAction}`
						})]
					}),
					elementBuilder({
						type: "div",
						class: `row state ${stateColor}`,
						children: [elementBuilder({
							type: "span",
							class: "state ",
							text: state
						})]
					})
				]
			}));
		}
	}
	function updateFactionStakeouts() {
		if (!settings.pages.popup.showStakeouts || !Object.keys(factionStakeouts).filter((k) => k !== "date").length) {
			dashboard.querySelector(".faction-stakeouts").classList.add("tt-hidden");
			return;
		}
		dashboard.querySelector(".faction-stakeouts").classList.remove("tt-hidden");
		const stakeoutList = dashboard.querySelector(".faction-stakeouts .stakeout-list");
		stakeoutList.innerHTML = "";
		for (const factionId in factionStakeouts) {
			if (Number.isNaN(parseInt(factionId)) || typeof factionStakeouts[factionId] === "number") continue;
			let name, chain, members, maxMembers;
			if (factionStakeouts[factionId].info && Object.keys(factionStakeouts[factionId].info).length) {
				name = factionStakeouts[factionId].info.name;
				chain = factionStakeouts[factionId].info.chain;
				members = factionStakeouts[factionId].info.members.current;
				maxMembers = factionStakeouts[factionId].info.members.maximum;
			} else {
				name = factionId;
				chain = "N/A";
				members = "N/A";
				maxMembers = "N/A";
			}
			const removeStakeoutButton = elementBuilder({
				type: "div",
				class: "delete-stakeout-wrap",
				children: [PHTrash({ class: "delete-stakeout" })]
			});
			removeStakeoutButton.addEventListener("click", () => {
				delete factionStakeouts[factionId];
				ttStorage.set({ factionStakeouts });
			});
			stakeoutList.appendChild(elementBuilder({
				type: "div",
				class: "faction",
				children: [elementBuilder({
					type: "div",
					class: "row information",
					children: [
						elementBuilder({
							type: "a",
							href: `https://www.torn.com/factions.php?step=profile&ID=${factionId}#/`,
							text: name,
							attributes: { target: "_blank" }
						}),
						elementBuilder({
							type: "div",
							class: "members",
							text: members !== "N/A" ? `${members} of ${maxMembers} members` : "unknown members"
						}),
						elementBuilder({
							type: "div",
							class: "chain",
							text: chain ? `${chain} chain` : "no chain"
						}),
						removeStakeoutButton
					]
				})]
			}));
		}
	}
}
async function setupMarketSearch() {
	const itemSelection = document.querySelector("#market .item-list");
	torndata.items.forEach((item) => {
		const name = item.name;
		const div = elementBuilder({
			type: "li",
			class: "item",
			id: name.toLowerCase().replace(/\s+/g, "").replace(":", "_"),
			text: name,
			dataset: { id: item.id.toString() }
		});
		itemSelection.appendChild(div);
		div.addEventListener("click", async () => {
			itemSelection.classList.add("tt-hidden");
			showMarketInfo(item);
		});
	});
	document.querySelector("#market #search-bar").addEventListener("keyup", (event) => {
		const keyword = event.target.value.toLowerCase();
		if (!keyword) {
			itemSelection.classList.add("tt-hidden");
			return;
		}
		let id;
		if (!Number.isNaN(parseInt(keyword))) id = parseInt(keyword);
		for (const item of findAllElements("#market .item-list li")) if (item.textContent.toLowerCase().includes(keyword) || id && parseInt(item.dataset.id) === id) {
			item.classList.remove("tt-hidden");
			itemSelection.classList.remove("tt-hidden");
		} else item.classList.add("tt-hidden");
	});
	document.querySelector("#market #search-bar").addEventListener("click", (event) => {
		event.target.value = "";
		document.querySelector("#market .item-list").classList.add("tt-hidden");
		document.querySelector("#market #item-information").classList.add("tt-hidden");
	});
	function showMarketInfo(item) {
		const viewItem = document.querySelector("#market #item-information");
		viewItem.querySelector(".market").classList.add("tt-hidden");
		viewItem.querySelector(".circulation").textContent = formatNumber(item.circulation);
		viewItem.querySelector(".value").textContent = `$${formatNumber(item.value.market_price)}`;
		viewItem.querySelector(".name").textContent = item.name;
		viewItem.querySelector(".name").href = `https://www.torn.com/page.php?sid=ItemMarket#/market/view=search&itemID=${item.id}&itemName=${item.name}&itemType=${item.type}`;
		viewItem.querySelector(".image").src = item.image;
		viewItem.classList.remove("tt-hidden");
		showLoadingPlaceholder(viewItem.querySelector(".market").parentElement, true);
		Promise.all([ttCache.hasValue("livePrice", item.id) ? Promise.resolve(ttCache.get("livePrice", item.id)) : fetchData("tornv2", {
			section: "market",
			id: item.id,
			selections: ["itemmarket"],
			params: { limit: 3 }
		}).then((result) => {
			ttCache.set({ [item.id]: result }, TO_MILLIS.SECONDS * 30, "livePrice");
			return result;
		}), settings.pages.popup.bazaarUsingExternal && settings.external.tornw3b ? ttCache.hasValue("tornw3bPrice", item.id) ? Promise.resolve(ttCache.get("tornw3bPrice", item.id)) : fetchData("tornw3b", { section: `marketplace/${item.id}` }).then((result) => {
			ttCache.set({ [item.id]: result }, TO_MILLIS.SECONDS * 60, "tornw3bPrice");
			return result;
		}) : Promise.resolve({ listings: [] })]).then(([tornResult, tornw3bResult]) => {
			handleMarket(tornResult, tornw3bResult);
		}).catch((error) => {
			document.querySelector(".error").classList.remove("tt-hidden");
			document.querySelector(".error").textContent = error.message;
		}).finally(() => showLoadingPlaceholder(viewItem.querySelector(".market").parentElement, false));
		function handleMarket(tornResult, tornw3bResult) {
			const list = viewItem.querySelector(".market");
			list.innerHTML = "";
			if (!isSellable(item.id) && !tornResult.itemmarket.listings.length) {
				list.classList.add("untradable");
				list.innerHTML = "Item is not sellable!";
			} else {
				const itemMarketWrap = elementBuilder({ type: "div" });
				itemMarketWrap.appendChild(elementBuilder({
					type: "h4",
					text: "Item Market"
				}));
				if (tornResult.itemmarket?.listings?.length) for (const item of tornResult.itemmarket.listings) itemMarketWrap.appendChild(elementBuilder({
					type: "div",
					class: "price",
					text: `${item.amount}x | $${formatNumber(item.price)}`
				}));
				else itemMarketWrap.appendChild(elementBuilder({
					type: "div",
					class: "price no-price",
					text: "No listings found."
				}));
				list.appendChild(itemMarketWrap);
				const bazaarWrap = elementBuilder({ type: "div" });
				bazaarWrap.appendChild(elementBuilder({
					type: "h4",
					text: "Bazaars"
				}));
				if (settings.pages.popup.bazaarUsingExternal && settings.external.tornw3b && tornw3bResult?.listings?.length) for (const item of tornw3bResult.listings.slice(0, 3)) bazaarWrap.appendChild(elementBuilder({
					type: "div",
					class: "price",
					text: `${item.quantity}x | $${formatNumber(item.price)}`
				}));
				else bazaarWrap.appendChild(elementBuilder({
					type: "div",
					class: "price no-price",
					text: "No listings found."
				}));
				if (settings.pages.popup.bazaarUsingExternal && settings.external.tornw3b) list.appendChild(bazaarWrap);
			}
			viewItem.querySelector(".market").classList.remove("tt-hidden");
		}
	}
}
async function loadMarketSearch() {
	document.querySelector("#market #search-bar").focus();
}
async function setupCalculator() {
	const calculator = document.querySelector("#calculator");
	const itemSelection = calculator.querySelector(".item-list");
	let selectedItems = localdata.popup.calculatorItems;
	torndata.items.forEach(({ id, name }) => {
		const identifier = `calculator-${id}`;
		itemSelection.appendChild(elementBuilder({
			type: "li",
			class: "item",
			id: name.toLowerCase().replace(/\s+/g, "").replace(":", "_"),
			children: [elementBuilder({
				type: "label",
				text: name,
				attributes: { for: identifier }
			}), elementBuilder({
				type: "input",
				id: identifier,
				attributes: { type: "number" },
				events: { input(event) {
					let item = selectedItems.find((i) => i.id === id.toString());
					const amount = event.target.value;
					if (amount === "") {
						if (item) {
							selectedItems = selectedItems.filter((i) => i.id !== id.toString());
							updateSelection();
						}
						return;
					}
					if (!item) {
						item = {
							id: id.toString(),
							amount: -1
						};
						selectedItems.push(item);
					}
					item.amount = parseInt(amount);
					updateSelection();
				} }
			})]
		}));
	});
	const search = calculator.querySelector(".search");
	search.addEventListener("keyup", (event) => {
		const keyword = event.target.value.toLowerCase();
		if (!keyword) {
			itemSelection.classList.add("tt-hidden");
			return;
		}
		for (const item of findAllElements(".item-list > li", calculator)) if (item.textContent.toLowerCase().includes(keyword)) {
			item.classList.remove("tt-hidden");
			itemSelection.classList.remove("tt-hidden");
		} else item.classList.add("tt-hidden");
	});
	search.addEventListener("click", (event) => {
		event.target.value = "";
		calculator.querySelector(".item-list").classList.add("tt-hidden");
	});
	const clear = calculator.querySelector(".clear");
	clear.addEventListener("click", () => {
		selectedItems = [];
		updateSelection();
	});
	updateSelection();
	function updateSelection() {
		const receipt = calculator.querySelector(".receipt");
		receipt.innerHTML = "";
		if (!selectedItems.length) {
			clear.classList.add("tt-hidden");
			ttStorage.change({ localdata: { popup: { calculatorItems: [] } } });
			return;
		}
		clear.classList.remove("tt-hidden");
		const items = elementBuilder({ type: "ul" });
		let totalValue = 0;
		for (const { id, amount } of selectedItems) {
			const { value: { market_price: value }, name } = torndata.itemsMap[id];
			const price = amount * value;
			items.appendChild(elementBuilder({
				type: "li",
				children: [
					elementBuilder({
						type: "span",
						class: "amount",
						text: `${formatNumber(amount)}x`
					}),
					elementBuilder({
						type: "span",
						class: "item",
						text: name
					}),
					document.createTextNode("="),
					elementBuilder({
						type: "span",
						class: "price",
						text: formatNumber(price, { currency: true })
					})
				]
			}));
			totalValue += price;
		}
		receipt.appendChild(items);
		receipt.appendChild(elementBuilder({
			type: "div",
			class: "total",
			text: `Total: ${formatNumber(totalValue, { currency: true })}`
		}));
		ttStorage.change({ localdata: { popup: { calculatorItems: selectedItems } } });
	}
}
async function loadCalculator() {
	document.querySelector("#calculator .search").focus();
}
async function setupStocksOverview() {
	const stocksOverview = document.querySelector("#stocks");
	const allStocks = stocksOverview.querySelector("#all-stocks");
	for (const id in stockdata) {
		if (id === "date") continue;
		allStocks.appendChild(buildSection(parseInt(id)));
	}
	stocksOverview.querySelector("#stock-search-bar").addEventListener("keyup", (event) => {
		const keyword = event.target.value.toLowerCase();
		if (!keyword) {
			for (const item of findAllElements(".stock-wrap[data-user='false']", allStocks)) item.classList.add("tt-hidden");
			for (const item of findAllElements(".stock-wrap[data-user='true']", allStocks)) item.classList.remove("tt-hidden");
			return;
		}
		for (const item of findAllElements(".stock-wrap", allStocks)) if (keyword === "*" || item.dataset.name.includes(keyword)) item.classList.remove("tt-hidden");
		else item.classList.add("tt-hidden");
	});
	stocksOverview.querySelector("#stock-search-bar").addEventListener("click", (event) => {
		event.target.value = "";
		for (const item of findAllElements(".stock-wrap[data-user='false']", allStocks)) item.classList.add("tt-hidden");
		for (const item of findAllElements(".stock-wrap[data-user='true']", allStocks)) item.classList.remove("tt-hidden");
	});
	for (const item of findAllElements(".stock-wrap[data-user='false']", allStocks)) item.classList.add("tt-hidden");
	function buildSection(id) {
		const stock = typeof stockdata[id] === "number" ? null : stockdata[id];
		if (stock === null) return null;
		const userStock = settings.apiUsage.user.stocks ? userdata.stocks.find((s) => s.id === id) ?? null : null;
		const wrapper = elementBuilder({
			type: "div",
			class: "stock-wrap",
			dataset: {
				name: `${stock.name} (${stock.acronym})`.toLowerCase(),
				user: !!userStock
			},
			children: [elementBuilder("hr")]
		});
		let boughtPrice, profit;
		if (userStock) {
			boughtPrice = getStockBoughtPrice(userStock).boughtPrice;
			profit = dropDecimals((stock.current_price - boughtPrice) * userStock.shares);
		}
		createHeading();
		createPriceInformation();
		createBenefitInformation();
		createAlertsSection();
		return wrapper;
		function createHeading() {
			const heading = elementBuilder({
				type: "a",
				class: "heading",
				href: `https://www.torn.com/stockexchange.php?stock=${stock.acronym}`,
				attributes: { target: "_blank" },
				children: [elementBuilder({
					type: "span",
					class: "name",
					text: `${stock[stock.name.length > 35 ? "acronym" : "name"]}`
				}), elementBuilder("br")]
			});
			wrapper.appendChild(heading);
			if (userStock) {
				heading.appendChild(elementBuilder({
					type: "span",
					class: "quantity",
					text: `(${formatNumber(userStock.shares, { shorten: 2 })} share${applyPlural(userStock.shares)})`
				}));
				heading.appendChild(elementBuilder({
					type: "div",
					class: `profit ${getProfitClass(profit)}`,
					text: `${getProfitIndicator(profit)}${formatNumber(Math.abs(profit), { currency: true })}`
				}));
			}
			function getProfitClass(profit) {
				return profit > 0 ? "positive" : profit < 0 ? "negative" : "";
			}
			function getProfitIndicator(profit) {
				return profit > 0 ? "+" : profit < 0 ? "-" : "";
			}
		}
		function createPriceInformation() {
			const priceContent = elementBuilder({
				type: "div",
				class: "content price tt-hidden",
				children: [elementBuilder({
					type: "span",
					text: `Current price: ${formatNumber(stock.current_price, {
						decimals: 3,
						currency: true
					})}`
				}), elementBuilder({
					type: "span",
					text: `Total shares: ${formatNumber(stock.total_shares)}`
				})]
			});
			wrapper.append(elementBuilder({
				type: "div",
				class: "information-section",
				children: [getHeadingElement("Price Information", priceContent), priceContent]
			}));
			if (userStock) {
				priceContent.appendChild(elementBuilder({
					type: "div",
					class: "flex-break"
				}));
				priceContent.appendChild(elementBuilder({
					type: "span",
					text: `Bought at: ${formatNumber(boughtPrice, {
						decimals: 3,
						currency: true
					})}`
				}));
			}
		}
		function createBenefitInformation() {
			const benefitContent = elementBuilder({
				type: "div",
				class: "content benefit tt-hidden",
				children: []
			});
			wrapper.append(elementBuilder({
				type: "div",
				class: "information-section",
				children: [getHeadingElement("Benefit Information", benefitContent), benefitContent]
			}));
			if (userStock) if (isDividendStock(id)) {
				benefitContent.appendChild(elementBuilder({
					type: "span",
					text: userStock.bonus ? userStock.bonus.available ? "Ready now!" : `Available in ${stock.benefit.frequency - userStock.bonus.progress}/${stock.benefit.frequency} days.` : `Available every ${stock.benefit.frequency} days.`
				}));
				benefitContent.appendChild(createRoiTable(stock, userStock));
			} else {
				benefitContent.appendChild(elementBuilder({
					type: "span",
					text: `Required stocks: ${formatNumber(userStock.shares)}/${formatNumber(stock.benefit.requirement)}`
				}));
				benefitContent.appendChild(elementBuilder("br"));
				let color;
				let duration;
				if (userStock.bonus) if (userStock.bonus.available) color = "completed";
				else {
					color = "awaiting";
					duration = `in ${userStock.bonus.progress}/${stock.benefit.frequency} days.`;
				}
				else {
					color = "not-completed";
					duration = `after ${stock.benefit.frequency} days.`;
				}
				benefitContent.appendChild(elementBuilder({
					type: "span",
					class: `description ${color}`,
					text: `${stock.benefit.description}`
				}));
				if (duration) benefitContent.appendChild(elementBuilder({
					type: "span",
					class: "duration",
					text: duration
				}));
			}
			else if (isDividendStock(id)) {
				benefitContent.appendChild(elementBuilder({
					type: "span",
					text: `Available every ${stock.benefit.frequency} days.`
				}));
				benefitContent.appendChild(createRoiTable(stock, void 0));
			} else {
				benefitContent.appendChild(elementBuilder({
					type: "span",
					text: `Required stocks: ${formatNumber(stock.benefit.requirement)}`
				}));
				benefitContent.appendChild(elementBuilder("br"));
				benefitContent.appendChild(elementBuilder({
					type: "span",
					class: "description not-completed",
					text: `${stock.benefit.description}`
				}));
				benefitContent.appendChild(elementBuilder({
					type: "span",
					class: "duration",
					text: `after ${stock.benefit.frequency} days.`
				}));
			}
		}
		function createAlertsSection() {
			const alertsContent = elementBuilder({
				type: "div",
				class: "content alerts tt-hidden",
				children: []
			});
			wrapper.append(elementBuilder({
				type: "div",
				class: "information-section",
				children: [getHeadingElement("Alerts", alertsContent), alertsContent]
			}));
			alertsContent.appendChild(elementBuilder({
				type: "span",
				class: "title",
				text: "Price"
			}));
			alertsContent.appendChild(elementBuilder({
				type: "div",
				children: [elementBuilder({
					type: "label",
					attributes: { for: `stock-${id}-alert__reaches` },
					text: "reaches"
				}), elementBuilder({
					type: "input",
					id: `stock-${id}-alert__reaches`,
					attributes: {
						type: "number",
						min: 0
					},
					value: () => {
						if (!(id in settings.notifications.types.stocks)) return "";
						return settings.notifications.types.stocks[id].priceReaches || "";
					},
					events: { change: async (event) => {
						await ttStorage.change({ settings: { notifications: { types: { stocks: { [id]: { priceReaches: parseFloat(event.target.value) } } } } } });
					} }
				})]
			}));
			alertsContent.appendChild(elementBuilder({
				type: "div",
				children: [elementBuilder({
					type: "label",
					attributes: { for: `stock-${id}-alert__falls` },
					text: "falls to"
				}), elementBuilder({
					type: "input",
					id: `stock-${id}-alert__falls`,
					attributes: {
						type: "number",
						min: 0
					},
					value: () => {
						if (!(id in settings.notifications.types.stocks)) return "";
						return settings.notifications.types.stocks[id].priceFalls || "";
					},
					events: { change: async (event) => {
						await ttStorage.change({ settings: { notifications: { types: { stocks: { [id]: { priceFalls: parseFloat(event.target.value) } } } } } });
					} }
				})]
			}));
		}
		function getHeadingElement(title, content) {
			return elementBuilder({
				type: "div",
				class: "heading",
				children: [elementBuilder({
					type: "span",
					class: "title",
					text: title
				}), PHCaretDown()],
				events: { click: (event) => {
					content.classList[content.classList.contains("tt-hidden") ? "remove" : "add"]("tt-hidden");
					const target = event.target;
					rotateElement((target.classList.contains("heading") ? target : target.parentElement).querySelector("svg"), 180);
				} }
			});
		}
		function createRoiTable(stock, userStock) {
			const benefitTable = elementBuilder({
				type: "table",
				children: [elementBuilder({
					type: "tr",
					children: [
						elementBuilder({
							type: "th",
							text: "Increment"
						}),
						elementBuilder({
							type: "th",
							text: "Stocks"
						}),
						elementBuilder({
							type: "th",
							text: "Cost"
						}),
						elementBuilder({
							type: "th",
							text: "Reward"
						}),
						elementBuilder({
							type: "th",
							text: "ROI"
						})
					]
				})]
			});
			let ownedLevel, activeLevel;
			if (userStock) {
				ownedLevel = getStockIncrement(stock.benefit.requirement, userStock.shares);
				activeLevel = userStock.bonus.increment ? userStock.bonus.increment : 0;
			} else {
				ownedLevel = 0;
				activeLevel = 0;
			}
			const rewardValue = getRewardValue(stock.benefit.description);
			const yearlyValue = rewardValue / stock.benefit.frequency * 365;
			for (let i = 0; i < 5; i++) {
				const level = i + 1;
				const stocks = getRequiredStocks(stock.benefit.requirement, level);
				const previousStocks = getRequiredStocks(stock.benefit.requirement, level - 1);
				const reward = getStockReward(stock.benefit.description, level);
				const roi = yearlyValue / ((stocks - previousStocks) * stock.current_price) * 100;
				benefitTable.appendChild(elementBuilder({
					type: "tr",
					class: ["increment", level <= ownedLevel ? level <= activeLevel ? "completed" : "awaiting" : ""],
					children: [
						elementBuilder({
							type: "td",
							text: level
						}),
						elementBuilder({
							type: "td",
							text: formatNumber(stocks)
						}),
						elementBuilder({
							type: "td",
							text: formatNumber(stocks * stock.current_price, { currency: true })
						}),
						elementBuilder({
							type: "td",
							text: reward
						}),
						elementBuilder({
							type: "td",
							text: rewardValue > 0 ? `${formatNumber(roi, { decimals: 1 })}%` : "N/A"
						})
					]
				}));
			}
			return benefitTable;
		}
	}
}
async function setupNotifications() {
	const notifications = document.querySelector("#notifications ul");
	notificationHistory.map(createEntry).filter((element) => element !== null).forEach((entry) => notifications.appendChild(entry));
	function createEntry(notification) {
		if ("combined" in notification) return null;
		const { message, date, url } = notification;
		const title = notification.title.replace("TornTools - ", "");
		const period = isToday(date) ? formatTime(date) : `${formatDate(date)} ${formatTime(date)}`;
		return elementBuilder({
			type: "li",
			children: [elementBuilder({
				type: "a",
				href: url,
				children: [elementBuilder({
					type: "div",
					class: "title",
					children: [elementBuilder({
						type: "span",
						text: title
					}), elementBuilder({
						type: "span",
						text: period
					})]
				}), elementBuilder({
					type: "span",
					text: message
				})],
				attributes: { target: "_blank" }
			})]
		});
	}
}
//#endregion

//# sourceMappingURL=popup-qwZrDrXB.js.map