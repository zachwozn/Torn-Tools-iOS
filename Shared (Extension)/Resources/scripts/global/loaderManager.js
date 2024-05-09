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
			"matches": ["https://www.torn.com/loader.php?sid=missions*"],
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
		},
        {
            "matches": ["https://www.torn.com/page.php?sid=education*"],
            "css": ["scripts/features/grey-completed-courses/ttGreyCompletedCourses.css"],
            "js": ["scripts/features/grey-completed-courses/ttGreyCompletedCourses.js", "scripts/features/education-finish-time/ttEducationFinishTime.js"],
            "run_at": "document_end"
        },
        {
            "matches": ["https://www.torn.com/index.php?page=people*"],
            "css": ["scripts/features/stats-estimate/ttStatsEstimate.css"],
            "js": [
                "scripts/features/abroad-people-filter/ttPeopleFilter.js",
                "scripts/features/stats-estimate/statsEstimate.js",
                "scripts/features/stats-estimate/ttStatsEstimateAbroad.js"
            ],
            "run_at": "document_end"
        },
        {
            "matches": ["https://www.torn.com/page.php?sid=stocks*"],
            "css": [
                "scripts/global/functions/filters.css",
                "scripts/features/stocks-filter/ttStocksFilter.css",
                "scripts/features/stock-acronyms/ttStockAcronyms.css",
                "scripts/features/total-portfolio-value/ttTotalPortfolioValue.css",
                "scripts/features/hide-stocks/ttHideStocks.css"
            ],
            "js": [
                "scripts/global/functions/filters.js",
                "scripts/features/stocks-filter/ttStocksFilter.js",
                "scripts/features/stock-acronyms/ttStockAcronyms.js",
                "scripts/features/total-portfolio-value/ttTotalPortfolioValue.js",
                "scripts/features/hide-stocks/ttHideStocks.js"
            ],
            "run_at": "document_end"
        },
        {
            "matches": ["https://www.torn.com/page.php?sid=UserList*"],
            "css": ["scripts/global/functions/filters.css", "scripts/features/stats-estimate/ttStatsEstimate.css"],
            "js": [
                "scripts/global/functions/filters.js",
                "scripts/content/userlist/ttUserlist.js",
                "scripts/features/userlist-filter/ttUserlistFilter.js",
                "scripts/features/stats-estimate/statsEstimate.js",
                "scripts/features/stats-estimate/ttStatsEstimateUserlist.js",
                "scripts/features/user-alias/ttUserAliasUserlist.js"
            ],
            "run_at": "document_end"
        },
        {
            "matches": ["https://www.torn.com/war.php?step=warreport*"],
            "css": ["scripts/features/csv-war-report/ttCSVWarReport.css"],
            "js": ["scripts/features/csv-war-report/ttCSVWarReport.js"],
            "run_at": "document_end"
        },
        {
            "matches": ["https://www.torn.com/war.php?step=rankreport*"],
            "css": ["scripts/features/csv-ranked-war-report/ttCSVRankedWarReport.css"],
            "js": ["scripts/features/csv-ranked-war-report/ttCSVRankedWarReport.js"],
            "run_at": "document_end"
        },
        {
            "matches": ["https://www.torn.com/war.php?step=raidreport*"],
            "css": ["scripts/features/csv-raid-report/ttCSVRaidReport.css"],
            "js": ["scripts/features/csv-raid-report/ttCSVRaidReport.js"],
            "run_at": "document_end"
        },
        {
            "matches": ["https://www.torn.com/war.php?step=chainreport*"],
            "css": ["scripts/features/csv-chain-report/ttCSVChainReport.css"],
            "js": ["scripts/features/csv-chain-report/ttCSVChainReport.js"],
            "run_at": "document_end"
        },
        {
            "matches": ["https://www.torn.com/page.php?sid=blackjack*"],
            "css": ["scripts/features/blackjack-strategy/ttBlackjackStrategy.css"],
            "js": ["scripts/features/blackjack-strategy/ttBlackjackStrategy.js"],
            "run_at": "document_end"
        },
        {
            "matches": ["https://www.torn.com/page.php?sid=highlow*"],
            "css": ["scripts/features/high-low-helper/ttHighLowHelper.css"],
            "js": ["scripts/features/high-low-helper/ttHighLowHelper.js"],
            "run_at": "document_end"
        }];

loadDatabase().then(() => {
    while (typeof featureManager === "undefined") {};
    console.log("[TornTools] LoaderManager is running.");
    for (const scriptInfo of scripts) {
        const requiredURL = scriptInfo.matches[0].replace("*", "");
        if (settings.developer) {
            console.log(requiredURL, window.location.href)
        }
        if (window.location.href.startsWith(requiredURL)) {
            console.log(`[TornTools] LoaderManager - Inserted ${scriptInfo.js} files.`);
            chrome.runtime.sendMessage({
                action: "injectScripts",
                cssFiles: scriptInfo.css,
                jsFiles: scriptInfo.js,
                jsInjectImmediately: scriptInfo.run_at === "document_start"
            });
        }
    }
});
