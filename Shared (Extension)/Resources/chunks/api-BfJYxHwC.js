import { F as getCookie, I as isIntNumber, N as SCRIPT_TYPE, O as formatNumber, P as TO_MILLIS, S as ttUsage, a as BACKGROUND_SERVICE, b as torndata, g as settings, o as api, rt as ttStorage, x as userdata } from "./pages-DbN4bb4V.js";
import { t as browser } from "./browser-DV2XfOQj.js";
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
	browser.action.setBadgeText({ text: badge.text || "" });
	if (badge.color) browser.action.setBadgeBackgroundColor({ color: badge.color });
	return true;
}
function getBadgeText() {
	if (SCRIPT_TYPE !== "BACKGROUND") return Promise.resolve(null);
	return browser.action.getBadgeText({});
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
var ALL_ICONS = [
	{
		id: 1,
		icon: "icon1",
		description: "Online"
	},
	{
		id: 62,
		icon: "icon62",
		description: "Idle"
	},
	{
		id: 2,
		icon: "icon2",
		description: "Offline"
	},
	{
		id: 6,
		icon: "icon6",
		description: "Male"
	},
	{
		id: 7,
		icon: "icon7",
		description: "Female"
	},
	{
		id: 87,
		icon: "icon87",
		description: "Enby"
	},
	{
		id: 72,
		icon: "icon72",
		description: "New player"
	},
	{
		id: 3,
		icon: "icon3",
		description: "Donator",
		url: LINKS.donator
	},
	{
		id: 4,
		icon: "icon4",
		description: "Subscriber",
		url: LINKS.donator
	},
	{
		id: 11,
		icon: "icon11",
		description: "Staff",
		url: LINKS.staff
	},
	{
		id: 10,
		icon: "icon10",
		description: "Committee",
		url: LINKS.committee
	},
	{
		id: 8,
		icon: "icon8",
		description: "Marriage",
		url: LINKS.church
	},
	{
		id: 5,
		icon: "icon5",
		description: "Level 100"
	},
	{
		id: 21,
		icon: "icon21",
		description: "Army job",
		url: LINKS.jobs
	},
	{
		id: 22,
		icon: "icon22",
		description: "Casino job",
		url: LINKS.jobs
	},
	{
		id: 23,
		icon: "icon23",
		description: "Medical job",
		url: LINKS.jobs
	},
	{
		id: 24,
		icon: "icon24",
		description: "Grocer job",
		url: LINKS.jobs
	},
	{
		id: 25,
		icon: "icon25",
		description: "Lawyer job",
		url: LINKS.jobs
	},
	{
		id: 26,
		icon: "icon26",
		description: "Education job",
		url: LINKS.jobs
	},
	{
		id: 73,
		icon: "icon73",
		description: "Company director",
		url: LINKS.companies
	},
	{
		id: 27,
		icon: "icon27",
		description: "Company employee",
		url: LINKS.companies
	},
	{
		id: 83,
		icon: "icon83",
		description: "Company recruit",
		url: LINKS.companies
	},
	{
		id: 74,
		icon: "icon74",
		description: "Faction leader / co-leader",
		url: LINKS.faction
	},
	{
		id: 9,
		icon: "icon9",
		description: "Faction member",
		url: LINKS.faction
	},
	{
		id: 81,
		icon: "icon81",
		description: "Faction recruit",
		url: LINKS.faction
	},
	{
		id: 75,
		icon: "icon75",
		description: "Territory war (defending)",
		url: LINKS.faction
	},
	{
		id: 76,
		icon: "icon76",
		description: "Territory war (assaulting)",
		url: LINKS.faction
	},
	{
		id: 19,
		icon: "icon19",
		description: "Education in progress",
		url: LINKS.education
	},
	{
		id: 20,
		icon: "icon20",
		description: "Education completed",
		url: LINKS.education
	},
	{
		id: 29,
		icon: "icon29",
		description: "Investment in progress",
		url: LINKS.bank
	},
	{
		id: 30,
		icon: "icon30",
		description: "Investment completed",
		url: LINKS.bank
	},
	{
		id: 31,
		icon: "icon31",
		description: "Cayman islands bank",
		url: LINKS.travelagency
	},
	{
		id: 32,
		icon: "icon32",
		description: "Property vault",
		url: LINKS.property_vault
	},
	{
		id: 33,
		icon: "icon33",
		description: "Loan",
		url: LINKS.loan
	},
	{
		id: 34,
		icon: "icon34",
		description: "Items in auction",
		url: LINKS.auction
	},
	{
		id: 35,
		icon: "icon35",
		description: "Items in bazaar",
		url: LINKS.bazaar
	},
	{
		id: 36,
		icon: "icon36",
		description: "Items in item market",
		url: LINKS.itemmarket
	},
	{
		id: 54,
		icon: "icon54",
		description: "Points market",
		url: LINKS.pointsmarket
	},
	{
		id: 38,
		icon: "icon38",
		description: "Stocks owned",
		url: LINKS.stocks
	},
	{
		id: 84,
		icon: "icon84",
		description: "Dividend collection ready",
		url: LINKS.stocks
	},
	{
		id: 37,
		icon: "icon37",
		description: "Trade in progress",
		url: LINKS.trade
	},
	{
		id: 68,
		icon: "icon68",
		description: "Reading book"
	},
	{
		id: 71,
		icon: "icon71",
		description: "Traveling",
		url: LINKS.homepage
	},
	{
		id: 17,
		icon: "icon17",
		description: "Racing in progress",
		url: LINKS.raceway
	},
	{
		id: 18,
		icon: "icon18",
		description: "Racing completed",
		url: LINKS.raceway
	},
	{
		id: 85,
		icon: "icon85",
		description: "Organized crime being planned",
		url: LINKS.faction_oc
	},
	{
		id: 86,
		icon: "icon86",
		description: "Organized crime ready",
		url: LINKS.faction_oc
	},
	{
		id: 89,
		icon: "icon89",
		description: "Organized crime recruiting",
		url: LINKS.faction_oc
	},
	{
		id: 90,
		icon: "icon90",
		description: "Organized crime completed",
		url: LINKS.faction_oc
	},
	{
		id: 13,
		icon: "icon13",
		description: "Bounty",
		url: LINKS.bounties
	},
	{
		id: 28,
		icon: "icon28",
		description: "Cashier's checks",
		url: LINKS.bank
	},
	{
		id: 55,
		icon: "icon55",
		description: "Auction high bidder",
		url: LINKS.auction
	},
	{
		id: 56,
		icon: "icon56",
		description: "Auction outbid",
		url: LINKS.auction
	},
	{
		id: 15,
		icon: "icon15",
		description: "Hospital",
		url: LINKS.hospital
	},
	{
		id: 82,
		icon: "icon82",
		description: "Hospital early discharge",
		url: LINKS.hospital
	},
	{
		id: 91,
		icon: "icon91",
		description: "Hospital radiation poisoning",
		url: LINKS.hospital
	},
	{
		id: 16,
		icon: "icon16",
		description: "Jail",
		url: LINKS.jailview
	},
	{
		id: 70,
		icon: "icon70",
		description: "Federal jail"
	},
	{
		id: 12,
		icon: "icon12",
		description: "Low life",
		url: LINKS.hospital
	},
	{
		id: 39,
		icon: "icon39",
		description: "Booster cooldown (0-6hr)",
		url: LINKS.items_booster
	},
	{
		id: 40,
		icon: "icon40",
		description: "Booster cooldown (6-12hr)",
		url: LINKS.items_booster
	},
	{
		id: 41,
		icon: "icon41",
		description: "Booster cooldown (12-18hr)",
		url: LINKS.items_booster
	},
	{
		id: 42,
		icon: "icon42",
		description: "Booster cooldown (18-24hr)",
		url: LINKS.items_booster
	},
	{
		id: 43,
		icon: "icon43",
		description: "Booster cooldown (24hr+)",
		url: LINKS.items_booster
	},
	{
		id: 44,
		icon: "icon44",
		description: "Medical cooldown (0-90m)",
		url: LINKS.items_medical
	},
	{
		id: 45,
		icon: "icon45",
		description: "Medical cooldown (90-180m)",
		url: LINKS.items_medical
	},
	{
		id: 46,
		icon: "icon46",
		description: "Medical cooldown (180m-270m)",
		url: LINKS.items_medical
	},
	{
		id: 47,
		icon: "icon47",
		description: "Medical cooldown (270-360m)",
		url: LINKS.items_medical
	},
	{
		id: 48,
		icon: "icon48",
		description: "Medical cooldown (360m+)",
		url: LINKS.items_medical
	},
	{
		id: 49,
		icon: "icon49",
		description: "Drug cooldown (0-10m)",
		url: LINKS.items_drug
	},
	{
		id: 50,
		icon: "icon50",
		description: "Drug cooldown (10-60m)",
		url: LINKS.items_drug
	},
	{
		id: 51,
		icon: "icon51",
		description: "Drug cooldown (1-2hr)",
		url: LINKS.items_drug
	},
	{
		id: 52,
		icon: "icon52",
		description: "Drug cooldown (2-5hr)",
		url: LINKS.items_drug
	},
	{
		id: 53,
		icon: "icon53",
		description: "Drug cooldown (5hr+)",
		url: LINKS.items_drug
	},
	{
		id: 57,
		icon: "icon57",
		description: "Drug addiction (1-4%)",
		url: LINKS.travelagency
	},
	{
		id: 58,
		icon: "icon58",
		description: "Drug addiction (5-9%)",
		url: LINKS.travelagency
	},
	{
		id: 59,
		icon: "icon59",
		description: "Drug addiction (10-19%)",
		url: LINKS.travelagency
	},
	{
		id: 60,
		icon: "icon60",
		description: "Drug addiction (20-29%)",
		url: LINKS.travelagency
	},
	{
		id: 61,
		icon: "icon61",
		description: "Drug addiction (30%+)",
		url: LINKS.travelagency
	},
	{
		id: 63,
		icon: "icon63",
		description: "Radiation sickness (1-17%)",
		url: LINKS.items_medical
	},
	{
		id: 64,
		icon: "icon64",
		description: "Radiation sickness (18-34%)",
		url: LINKS.items_medical
	},
	{
		id: 65,
		icon: "icon65",
		description: "Radiation sickness (35-50%)",
		url: LINKS.items_medical
	},
	{
		id: 66,
		icon: "icon66",
		description: "Radiation sickness (51-67%)",
		url: LINKS.items_medical
	},
	{
		id: 67,
		icon: "icon67",
		description: "Radiation sickness (68%+)",
		url: LINKS.items_medical
	},
	{
		id: 78,
		icon: "icon78",
		description: "Upkeep due (4-6%)",
		url: LINKS.property_upkeep
	},
	{
		id: 79,
		icon: "icon79",
		description: "Upkeep due (6-8%)",
		url: LINKS.property_upkeep
	},
	{
		id: 80,
		icon: "icon80",
		description: "Upkeep due (8%+)",
		url: LINKS.property_upkeep
	}
];
var ALL_AREAS = [
	{
		class: "home",
		text: "Home"
	},
	{
		class: "items",
		text: "Items"
	},
	{
		class: "city",
		text: "City"
	},
	{
		class: "job",
		text: "Job"
	},
	{
		class: "gym",
		text: "Gym"
	},
	{
		class: "properties",
		text: "Properties"
	},
	{
		class: "education",
		text: "Education"
	},
	{
		class: "crimes",
		text: "Crimes"
	},
	{
		class: "missions",
		text: "Missions"
	},
	{
		class: "newspaper",
		text: "Newspaper"
	},
	{
		class: "jail",
		text: "Jail"
	},
	{
		class: "hospital",
		text: "Hospital"
	},
	{
		class: "casino",
		text: "Casino"
	},
	{
		class: "forums",
		text: "Forums"
	},
	{
		class: "hall_of_fame",
		text: "Hall of Fame"
	},
	{
		class: "faction",
		text: "My Faction"
	},
	{
		class: "recruit_citizens",
		text: "Recruit Citizens"
	},
	{
		class: "competitions",
		text: "Competitions"
	},
	{
		class: "community_events",
		text: "Community Events"
	}
];
var CASINO_GAMES = [
	"slots",
	"roulette",
	"high-low",
	"keno",
	"craps",
	"bookie",
	"lottery",
	"blackjack",
	"poker",
	"r-roulete",
	"spin-the-wheel"
];
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
function isSellable(id) {
	if (!torndata?.itemsMap) return true;
	const item = torndata.itemsMap[id];
	return item && !["Book", "Unused"].includes(item.type) && ![
		373,
		374,
		375,
		376,
		472,
		473,
		474,
		475,
		476,
		477,
		478,
		583,
		584,
		585,
		820,
		920,
		1003,
		1004,
		1005,
		1006,
		1007,
		1008,
		1009,
		1010,
		1011,
		1149
	].includes(parseInt(id.toString()));
}
function getRFC() {
	const rfc = getCookie("rfc_v");
	if (!rfc) for (const cookie of document.cookie.split("; ")) {
		const parts = cookie.split("=");
		if (parts[0] === "rfc_v") return parts[1];
	}
	return rfc;
}
function hasDarkMode() {
	return location.host === browser.runtime.id ? document.body.classList.contains("dark") : document.body.classList.contains("dark-mode");
}
function isDividendStock(id) {
	let _id;
	if (typeof id === "number") _id = id;
	else if (isIntNumber(id)) _id = parseInt(id);
	else return false;
	return [
		1,
		4,
		5,
		6,
		7,
		9,
		10,
		12,
		15,
		16,
		17,
		18,
		19,
		22,
		24,
		27,
		28,
		29,
		31,
		32,
		33,
		35
	].includes(_id);
}
function getRequiredStocks(required, increment) {
	return (2 ** increment - 1) * required;
}
function getStockIncrement(required, stocks) {
	return Math.log2(Math.floor(stocks / required) + 1);
}
function getStockReward(reward, increment) {
	let value;
	if (reward.startsWith("$")) value = formatNumber(parseInt(reward.replace("$", "").replaceAll(",", "")) * increment, { currency: true });
	else if (reward.match(/^\d+x? /i)) {
		const splitBenefit = reward.split(" ");
		const hasX = splitBenefit[0].endsWith("x");
		const amount = parseInt(splitBenefit.shift().replace("x", "")) * increment;
		const item = splitBenefit.join(" ");
		value = `${formatNumber(amount)}${hasX ? "x" : ""} ${item}`;
	} else value = "Unknown, please report this!";
	return value;
}
function getRewardValue(reward) {
	let value;
	if (reward.startsWith("$")) value = parseInt(reward.replace("$", "").replaceAll(",", ""));
	else if (reward.match(/^\d+x? /i)) {
		const rewardItem = reward.split(" ").slice(1).join(" ");
		const item = torndata.items.find(({ name }) => name === rewardItem);
		if (item) value = item ? item.value.market_price : -1;
		else {
			let prices;
			switch (rewardItem) {
				case "Ammunition Pack": break;
				case "Clothing Cache":
					prices = [
						1057,
						1112,
						1113,
						1114,
						1115,
						1116,
						1117
					].map((id) => torndata.itemsMap[id].value.market_price);
					break;
				case "Random Property":
					prices = torndata.properties.map((property) => property.cost).filter((price) => !!price).map((price) => price * .75);
					break;
				case "points":
					value = torndata.stats.points_averagecost * 100;
					break;
				case "happiness":
				case "energy":
				case "nerve": break;
				default:
					value = -1;
					break;
			}
			if (prices !== void 0) value = prices.reduce((a, b) => a + b, 0) / prices.length;
		}
	} else value = -1;
	return value;
}
function getStockBoughtPrice(stock) {
	const boughtTotal = Object.values(stock.transactions).reduce((prev, trans) => prev + trans.price * trans.shares, 0);
	return {
		boughtTotal,
		boughtPrice: boughtTotal / stock.shares
	};
}
var CUSTOM_LINKS_PRESET = {
	"Auction House": { link: "https://www.torn.com/amarket.php" },
	"Bazaar : Management": { link: "https://www.torn.com/bazaar.php#/manage" },
	"Christmas Town : Maps": { link: "https://www.torn.com/christmas_town.php#/mymaps" },
	"Faction : Armory": { link: "https://www.torn.com/factions.php?step=your#/tab=armoury" },
	"Faction : Organized Crimes": { link: "https://www.torn.com/factions.php?step=your#/tab=crimes" },
	"Item Market": { link: "https://www.torn.com/page.php?sid=ItemMarket" },
	Museum: { link: "https://www.torn.com/museum.php" },
	Pharmacy: { link: "https://www.torn.com/shops.php?step=pharmacy" },
	"Points Market": { link: "https://www.torn.com/pmarket.php" },
	Raceway: { link: "https://www.torn.com/page.php?sid=racing" },
	"Travel Agency": { link: "https://www.torn.com/page.php?sid=travel" }
};
var HIGHLIGHT_PLACEHOLDERS = [{
	name: "$player",
	value: () => userdata?.profile?.name ?? null,
	description: "Your player name."
}];
var CHAT_TITLE_COLORS = {
	blue: ["rgb(10,60,173)", "rgb(22,109,236)"],
	brown: ["rgb(109,53,4)", "rgb(146,69,4)"],
	orange: ["rgb(227,130,5)", "rgb(234,164,50)"],
	purple: ["rgb(94,7,119)", "rgb(184,9,241)"],
	red: ["rgb(123,4,4)", "rgb(255,3,3)"]
};
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
async function checkAPIPermission(key) {
	try {
		const { type, faction, company } = (await fetchData("tornv2", {
			section: "key",
			selections: ["info"],
			key,
			silent: true
		})).info.access;
		if (type === "Limited Access" || type === "Full Access") return {
			access: true,
			faction,
			company
		};
		else return { access: false };
	} catch (error) {
		throw error.error;
	}
}
async function changeAPIKey(key) {
	try {
		await fetchData("tornv2", {
			section: "user",
			selections: ["basic"],
			key,
			silent: true
		});
		await ttStorage.change({ api: { torn: { key } } });
		await BACKGROUND_SERVICE.initialize();
	} catch (error) {
		throw error.error;
	}
}
function hasAPIData() {
	const hasKey = !!api?.torn?.key;
	const hasError = !!api?.torn?.error && !api.torn.error.includes("Backend error") && api.torn.error !== "Network issues";
	const hasUserdata = !!(userdata && Object.keys(userdata).length);
	return hasKey && !hasError && hasUserdata;
}
async function hasOrigins(...origins) {
	origins = origins.map((origin) => origin.replaceAll("api.torn.com", "torn.com"));
	return browser.permissions.contains({ origins });
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
//#endregion
export { getStockReward as _, hasAPIData as a, isSellable as b, CASINO_GAMES as c, HIGHLIGHT_PLACEHOLDERS as d, getNextChainBonus as f, getStockIncrement as g, getStockBoughtPrice as h, fetchData as i, CHAT_TITLE_COLORS as l, getRewardValue as m, changeAPIKey as n, ALL_AREAS as o, getRequiredStocks as p, checkAPIPermission as r, ALL_ICONS as s, FETCH_PLATFORMS as t, CUSTOM_LINKS_PRESET as u, hasDarkMode as v, isDividendStock as y };

//# sourceMappingURL=api-BfJYxHwC.js.map