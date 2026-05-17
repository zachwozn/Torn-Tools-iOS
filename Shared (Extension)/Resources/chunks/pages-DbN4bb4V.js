import { t as browser$1 } from "./browser-DV2XfOQj.js";
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
//#region extension/utils/common/functions/requires.ts
function requireDOMInteractive() {
	return new Promise((resolve) => {
		if (document.readyState === "loading") document.addEventListener("readystatechange", () => resolve(), { once: true });
		else resolve();
	});
}
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
//#endregion
//#region extension/utils/common/icons/phosphor-icons.ts
var PHCaretDown = svgImport(caret_down_default);
var PHDotsSix = svgImport(dots_six_default);
svgImport(eye_default);
svgImport(eye_slash_default);
svgImport(plus_default);
var PHTrash = svgImport(trash_default);
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
var PHFillBell = svgImport(bell_fill_default);
var PHFillBellSlash = svgImport(bell_slash_fill_default);
var PHFillCaretDown = svgImport(caret_down_fill_default);
var PHFillCaretRight = svgImport(caret_right_fill_default);
var PHFillCaretUp = svgImport(caret_up_fill_default);
svgImport(info_fill_default);
svgImport(funnel_fill_default);
svgImport(funnel_x_fill_default);
svgImport(gear_fill_default);
svgImport(plus_fill_default);
svgImport(stethoscope_fill_default);
svgImport(table_fill_default);
//#endregion
//#region extension/utils/common/functions/dom.ts
var rotatingElements = {};
var mobile;
var tablet;
var hasSidebar;
var tabletHorizontal;
var tabletVertical;
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
function findAllElements(selector, parent = document) {
	return Array.from(parent.querySelectorAll(selector));
}
async function checkDevice() {
	await requireDOMInteractive();
	const innerWidth = window.innerWidth;
	mobile = innerWidth <= 600;
	tablet = innerWidth <= 1e3 && innerWidth >= 600;
	hasSidebar = innerWidth > 1e3;
	tabletHorizontal = tablet && innerWidth >= 784;
	tabletVertical = tablet && !tabletHorizontal;
	return {
		mobile,
		tablet,
		tabletHorizontal,
		tabletVertical,
		hasSidebar
	};
}
function getSearchParameters(input) {
	if (!input) input = location.href;
	try {
		return new URL(input).searchParams;
	} catch {
		return new URL(location.href).searchParams;
	}
}
function findParent(element, options = {}) {
	options = {
		tag: void 0,
		class: void 0,
		partialClass: void 0,
		id: void 0,
		hasAttribute: void 0,
		maxAttempts: -1,
		currentAttempt: 1,
		...options
	};
	if (!element?.parentElement) return void 0;
	if (options.maxAttempts !== -1 && options.currentAttempt > options.maxAttempts) return void 0;
	if (options.tag && element.parentElement.tagName === options.tag) return element.parentElement;
	if (options.id && element.parentElement.id === options.id) return element.parentElement;
	if (options.class && (Array.isArray(options.class) && options.class.some((c) => element.parentElement.classList.contains(c)) || !Array.isArray(options.class) && element.parentElement.classList.contains(options.class))) return element.parentElement;
	if (options.partialClass && Array.from(element.parentElement.classList).some((c) => c.startsWith(options.partialClass))) return element.parentElement;
	if (options.hasAttribute && element.parentElement.getAttribute(options.hasAttribute) !== null) return element.parentElement;
	return findParent(element.parentElement, {
		...options,
		currentAttempt: options.currentAttempt + 1
	});
}
function rotateElement(element, degrees) {
	let uuid;
	if (element.hasAttribute("rotate-id")) uuid = element.getAttribute("rotate-id");
	else {
		uuid = getUUID();
		element.setAttribute("rotate-id", uuid);
	}
	if (rotatingElements[uuid]) {
		clearInterval(rotatingElements[uuid].interval);
		element.style.transform = `rotate(${rotatingElements[uuid].totalDegrees}deg)`;
	}
	const startDegrees = (element.style.transform ? parseInt(element.style.transform.replace("rotate(", "").replace("deg)", "")) : 0) % 360;
	element.style.transform = `rotate(${startDegrees}deg)`;
	const totalDegrees = startDegrees + degrees;
	const step = 1e3 / degrees;
	rotatingElements[uuid] = {
		interval: setInterval(() => {
			const currentRotation = element.style.transform ? parseInt(element.style.transform.replace("rotate(", "").replace("deg)", "")) : 0;
			let newRotation = currentRotation + step;
			if (currentRotation < totalDegrees && newRotation > totalDegrees) {
				newRotation = totalDegrees;
				clearInterval(rotatingElements[uuid].interval);
			}
			element.style.transform = `rotate(${newRotation}deg)`;
		}, 1),
		totalDegrees
	};
}
function sortTable(table, columnPlace, order) {
	const header = table.querySelector(`th:nth-child(${columnPlace}), .row.header > :nth-child(${columnPlace})`);
	let icon = header.querySelector("svg");
	if (order) if (icon) switch (order) {
		case "asc":
			icon.innerHTML = PHFillCaretUp().innerHTML;
			break;
		case "desc":
			icon.innerHTML = PHFillCaretDown().innerHTML;
			break;
		default:
			icon.remove();
			break;
	}
	else switch (order) {
		case "asc":
			icon = PHFillCaretUp();
			header.appendChild(icon);
			break;
		case "desc":
			icon = PHFillCaretDown();
			header.appendChild(icon);
			break;
	}
	else if (icon) {
		if (icon.dataset.order === "desc") {
			icon.innerHTML = PHFillCaretUp().innerHTML;
			order = "asc";
		} else if (icon.dataset.order === "asc") {
			icon.innerHTML = PHFillCaretDown().innerHTML;
			order = "desc";
		}
	} else {
		icon = PHFillCaretUp();
		header.appendChild(icon);
		order = "asc";
	}
	icon.dataset.order = order;
	table.dataset.ttSortColumn = columnPlace.toString();
	table.dataset.ttSortOrder = order;
	for (const h of findAllElements("th, .row.header > *", table)) {
		if (h === header) continue;
		h.querySelector("i")?.remove();
	}
	let rows;
	if (!table.querySelector("tr:not(.heading), .row:not(.header)")) rows = [];
	else {
		rows = findAllElements("tr:not(.header), .row:not(.header)", table);
		rows = sortRows(rows);
	}
	for (const row of rows) table.appendChild(row);
	function sortRows(rows) {
		if (order === "asc") rows.sort((a, b) => {
			const helper = sortHelper(a, b);
			return helper.a - helper.b;
		});
		else if (order === "desc") rows.sort((a, b) => {
			const helper = sortHelper(a, b);
			return helper.b - helper.a;
		});
		return rows;
		function sortHelper(elementA, elementB) {
			elementA = elementA.querySelector(`:scope > *:nth-child(${columnPlace})`);
			elementB = elementB.querySelector(`:scope > *:nth-child(${columnPlace})`);
			let valueA, valueB;
			if (elementA.hasAttribute("sort-type")) switch (elementA.getAttribute("sort-type")) {
				case "date":
					valueA = elementA.getAttribute("value");
					valueB = elementB.getAttribute("value");
					if (Date.parse(valueA)) valueA = Date.parse(valueA).toString();
					if (Date.parse(valueB)) valueA = Date.parse(valueB).toString();
					break;
				case "css-dataset":
					valueA = elementA.dataset[getComputedStyle(elementA).getPropertyValue("--currentValue").match(/attr\(data-(.*)\)/i)[1]];
					valueB = elementB.dataset[getComputedStyle(elementB).getPropertyValue("--currentValue").match(/attr\(data-(.*)\)/i)[1]];
					break;
				default:
					console.warn("Attempting to sort by a non-existing type.", elementA.getAttribute("sort-type"));
					return {
						a: 0,
						b: 0
					};
			}
			else if (elementA.hasAttribute("value")) {
				valueA = elementA.getAttribute("value");
				valueB = elementB.getAttribute("value");
			} else {
				valueA = elementA.textContent;
				valueB = elementB.textContent;
			}
			let a, b;
			if (Number.isNaN(parseFloat(valueA))) if (valueA.includes("$")) {
				a = parseFloat(valueA.replace("$", "").replace(/,/g, ""));
				b = parseFloat(valueB.replace("$", "").replace(/,/g, ""));
			} else {
				a = valueA.toLowerCase().localeCompare(valueB.toLowerCase());
				b = 0;
			}
			else {
				a = parseFloat(valueA);
				b = parseFloat(valueB);
			}
			return {
				a,
				b
			};
		}
	}
}
function showLoadingPlaceholder(element, show) {
	const placeholder = element.querySelector(".tt-loading-placeholder");
	if (show) if (placeholder) placeholder.classList.add("active");
	else element.appendChild(elementBuilder({
		type: "div",
		class: "tt-loading-placeholder active"
	}));
	else if (placeholder) placeholder.classList.remove("active");
}
function isElement(node) {
	return node && "nodeType" in node && node.nodeType === Node.ELEMENT_NODE && typeof node.className === "string";
}
function isHTMLElement(node) {
	return isElement(node) && "dataset" in node && "title" in node;
}
function isElementOfTag(node, tag) {
	return isHTMLElement(node) && node.tagName.toLowerCase() === tag;
}
function isSVGElement(node) {
	return node && "nodeType" in node && node.nodeType === Node.ELEMENT_NODE && "ownerSVGElement" in node;
}
//#endregion
//#region extension/utils/common/functions/utilities.ts
var MONTHS = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];
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
function isIntNumber(number) {
	if (number === null) return false;
	if (number.match(/[a-zA-Z]/)) return false;
	const _number = parseFloat(number.toString());
	return !Number.isNaN(_number) && Number.isFinite(_number) && _number % 1 === 0;
}
function isToday(timestamp) {
	return (/* @__PURE__ */ new Date()).getDate() === new Date(timestamp).getDate();
}
function getUUID() {
	return `_${Math.random().toString(36).substr(2, 9)}`;
}
function getCookie(cname) {
	const name = `${cname}=`;
	for (let cookie of decodeURIComponent(document.cookie).split(";")) {
		cookie = cookie.trimStart();
		if (cookie.includes(name)) return cookie.substring(name.length);
	}
	return "";
}
function toClipboard(text) {
	if (navigator?.clipboard?.writeText) navigator.clipboard.writeText(text).then(() => {});
	else {
		const textarea = elementBuilder({
			type: "textarea",
			value: text,
			style: {
				position: "absolute",
				left: "-9999px"
			},
			attributes: { readonly: "" }
		});
		document.body.appendChild(textarea);
		textarea.select();
		document.execCommand("copy");
		document.body.removeChild(textarea);
	}
}
function toNumericVersion(version) {
	return parseInt(version.split(".").map((part) => part.padStart(3, "0")).join("").padEnd(9, "9"));
}
function isNumber(x) {
	return typeof x === "number";
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
function toSeconds(milliseconds) {
	if (!milliseconds) return toSeconds(Date.now());
	else if (typeof milliseconds === "object" && milliseconds instanceof Date) return toSeconds(milliseconds.getTime());
	else if (!Number.isNaN(milliseconds)) return Math.trunc(milliseconds / 1e3);
	else return toSeconds(Date.now());
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
function formatDate(date, partialOptions = {}) {
	if (typeof date === "number") return formatDate({ milliseconds: date }, partialOptions);
	else if (date instanceof Date) return formatDate({ milliseconds: date.getTime() }, partialOptions);
	const options = {
		showYear: false,
		...partialOptions
	};
	let millis;
	if ("milliseconds" in date) millis = date.milliseconds;
	else if ("seconds" in date) millis = date.seconds * 1e3;
	const _date = new Date(millis);
	let day, month, year;
	if (settings.formatting.tct) {
		day = _date.getUTCDate();
		month = _date.getUTCMonth() + 1;
		year = _date.getUTCFullYear();
	} else {
		day = _date.getDate();
		month = _date.getMonth() + 1;
		year = _date.getFullYear();
	}
	const parts = [];
	let separator;
	switch (settings.formatting.date) {
		case "us":
			separator = "/";
			parts.push(month, day);
			if (options.showYear) parts.push(year);
			break;
		case "iso":
			separator = "-";
			if (options.showYear) parts.push(year);
			parts.push(month, day);
			break;
		case "eu":
			separator = ".";
			parts.push(day, month);
			if (options.showYear) parts.push(year);
			break;
	}
	return parts.map((p) => toMultipleDigits(p)).join(separator);
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
function daySuffix(number) {
	const last = number % 10, double = number % 100;
	if (last === 1 && double !== 11) return `${number}st`;
	else if (last === 2 && double !== 12) return `${number}nd`;
	else if (last === 3 && double !== 13) return `${number}rd`;
	else return `${number}th`;
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
//#endregion
//#region extension/utils/services/proxy-service-keys.ts
var SOURCE_SERVICE_KEY = "source-service";
var BACKGROUND_SERVICE_KEY = "background-service";
createProxyService(SOURCE_SERVICE_KEY);
var BACKGROUND_SERVICE = createProxyService(BACKGROUND_SERVICE_KEY);
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
//#region extension/utils/common/functions/pages.ts
function initializeInternalPage(partialOptions = {}) {
	const options = {
		sortTables: false,
		...partialOptions
	};
	exposeDebugObjects(BACKGROUND_SERVICE);
	checkDevice().then(({ mobile, tablet }) => {
		if (mobile) document.body.classList.add("tt-mobile");
		else document.body.classList.remove("tt-mobile");
		if (tablet) document.body.classList.add("tt-tablet");
		else document.body.classList.remove("tt-tablet");
	});
	if (options.sortTables) document.addEventListener("click", (event) => {
		const clickedElement = event.target;
		if (isElementOfTag(clickedElement, "th")) {
			if (clickedElement.getAttribute("class")?.split(" ").includes("no-sorting")) return;
			const table = findParent(clickedElement, { tag: "TABLE" });
			if (!table?.classList.contains("sortable")) return;
			sortTable(table, findAllElements("th", table).indexOf(clickedElement) + 1);
		}
	});
}
function loadConfirmationPopup(partialOptions = {}) {
	const options = {
		title: "Title",
		message: "A message here.",
		execute: false,
		variables: {},
		...partialOptions
	};
	return new Promise((resolve, reject) => {
		const popup = document.querySelector("#tt-confirmation-popup");
		const message = popup.querySelector(".message");
		document.querySelector("#tt-black-overlay").classList.remove("tt-hidden");
		popup.classList.remove("tt-hidden");
		document.body.classList.add("tt-unscrollable");
		popup.querySelector(".title").textContent = options.title;
		message.innerHTML = options.message;
		if (options.execute) options.execute(message, options.variables);
		popup.querySelector("#popupConfirm").addEventListener("click", () => {
			document.querySelector("#tt-black-overlay").classList.add("tt-hidden");
			popup.classList.add("tt-hidden");
			document.body.classList.remove("tt-unscrollable");
			const data = {};
			for (const input of findAllElements("textarea, input", message)) {
				let type = "value";
				if (input.tagName === "INPUT") {
					if (input.type === "checkbox") type = "checked";
				}
				data[input.getAttribute("name")] = input[type];
			}
			resolve(data);
		});
		popup.querySelector("#popupCancel").addEventListener("click", () => {
			document.querySelector("#tt-black-overlay").classList.add("tt-hidden");
			popup.classList.add("tt-hidden");
			document.body.classList.remove("tt-unscrollable");
			reject();
		});
	});
}
function sendMessage(text, good, partialOptions = {}) {
	const options = {
		reload: false,
		...partialOptions
	};
	const message = document.querySelector("#message");
	if (!message) return;
	message.classList.remove("tt-hidden");
	message.textContent = text;
	message.style.backgroundColor = good ? "#30e202" : "#ff19199e";
	message.style.maxHeight = `${message.scrollHeight}px`;
	if (options.reload) setTimeout(() => {
		location.reload();
	}, 1200);
	else setTimeout(() => {
		message.textContent = "";
		message.classList.add("tt-hidden");
	}, 1500);
}
function getPageTheme() {
	const theme = settings.themes.pages;
	if (theme === "default") {
		if (window.matchMedia) return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
		return "light";
	}
	return theme;
}
//#endregion
export { PHFillCaretDown as $, toMultipleDigits as A, toClipboard as B, applyPlural as C, formatDate as D, dropDecimals as E, getCookie as F, isHTMLElement as G, elementBuilder as H, isIntNumber as I, sortTable as J, rotateElement as K, isNumber as L, MONTHS as M, SCRIPT_TYPE as N, formatNumber as O, TO_MILLIS as P, PHFillBellSlash as Q, isToday as R, ttUsage as S, daySuffix as T, findAllElements as U, checkDevice as V, getSearchParameters as W, PHDotsSix as X, PHCaretDown as Y, PHFillBell as Z, stakeouts as _, BACKGROUND_SERVICE as a, torndata as b, factionStakeouts as c, loadDatabase as d, PHFillCaretRight as et, localdata as f, settings as g, npcs as h, sendMessage as i, toSeconds as j, formatTime as k, factiondata as l, notificationHistory as m, initializeInternalPage as n, ttCache as nt, api as o, migrateDatabase as p, showLoadingPlaceholder as q, loadConfirmationPopup as r, ttStorage as rt, attackHistory as s, getPageTheme as t, PHTrash as tt, initializeDatabase as u, stockdata as v, capitalizeText as w, userdata as x, storageListeners as y, sleep as z };

//# sourceMappingURL=pages-DbN4bb4V.js.map