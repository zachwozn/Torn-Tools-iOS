"use strict";

const scripts = [
		{
			"matches": ["https://www.torn.com/loader.php?sid=attack&*"],
			"css": ["scripts/features/disable-ally-attacks/ttDisableAllyAttacks.css"],
			"js": ["scripts/features/disable-ally-attacks/ttDisableAllyAttacksLoader.entry.js", "scripts/features/hide-attack-buttons/ttHideAttackButtons.js"],
			"run_at": "document_start"
		},
		{
			"matches": ["https://www.torn.com/loader.php?sid=attack&*"],
			"css": ["scripts/features/stats-estimate/ttStatsEstimate.css", "scripts/features/weapon-experience/ttWeaponExperience.css"],
			"js": [
				"scripts/features/attack-timeout-warning/ttAttackTimeoutWarning.js",
				"scripts/features/stats-estimate/statsEstimate.js",
				"scripts/features/stats-estimate/ttStatsEstimateAttacks.js",
				"scripts/features/fair-attack/ttFairAttack.js",
				"scripts/features/weapon-experience/ttWeaponExperience.js",
				"scripts/features/page-title/ttPageTitleAttack.js"
			],
			"run_at": "document_end"
		},
		{
			"matches": ["https://www.torn.com/loader.php?sid=view*"],
			"css": ["scripts/features/casino-net-total/ttCasinoNetTotal.css"],
			"js": ["scripts/features/casino-net-total/ttCasinoNetTotal.js"],
			"run_at": "document_end"
		},
		{
			"matches": ["https://www.torn.com/loader.php?sid=racing*"],
			"css": ["scripts/features/racing-upgrades/ttRacingUpgrades.css"],
			"js": ["scripts/features/car-win-percentage/ttCarWinPercentage.js", "scripts/features/racing-upgrades/ttRacingUpgrades.js"],
			"run_at": "document_end"
		},
		{
			"matches": ["https://www.torn.com/loader.php?sid=missions"],
			"css": ["scripts/features/mission-hints/ttMissionHints.css", "scripts/features/mission-rewards/ttMissionRewards.css"],
			"js": [
				"scripts/content/missions/ttMissions.js",
				"scripts/features/mission-hints/ttMissionHints.js",
				"scripts/features/mission-rewards/ttMissionRewards.js"
			],
			"run_at": "document_end"
		},
		{
			"matches": ["https://www.torn.com/loader.php?sid=attackLog*"],
			"css": ["scripts/features/weapon-bonus-information/ttWeaponBonusInformation.css"],
			"js": ["scripts/features/weapon-bonus-information/ttWeaponBonusInformation.js"],
			"run_at": "document_end"
		}];

while (typeof featureManager === "undefined") {};
console.log("[TornTools] LoaderManager is running.");
for (const scriptInfo of scripts) {
    const requiredURL = scriptInfo.matches[0].replace("*", "");

    if (window.location.href.beginsWith(requiredURL)) {
        console.log(`[TornTools] LoaderManager - Inserted ${scriptInfo.js} files.`);
        chrome.runtime.sendMessage({
            action: "injectScripts",
            cssFiles: scriptInfo.css,
            jsFiles: scriptInfo.js,
            jsInjectImmediately: scriptInfo.run_at === "document_start"
        });

    }
}
