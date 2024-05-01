"use strict";

let settings,
	filters,
	version,
	api,
	userdata,
	torndata,
	stakeouts,
	attackHistory,
	notes,
	factiondata,
	quick,
	localdata,
	npcs,
	notificationHistory,
	stockdata,
	factionStakeouts;
let databaseLoaded = false;
let databaseLoading = false;
const storageListeners = {
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
	npcs: [],
};

async function loadDatabase() {
    if (databaseLoaded) return Promise.resolve();
    if ((databaseLoaded && !settings) || databaseLoading) {
        await sleep(75);
        return await loadDatabase();
    }

    try {
        databaseLoading = true;
        const database = await ttStorage.get();
        console.log("Data retrieved from storage:", database);  // Log the raw data retrieved
        settings = database.settings;
        console.log(settings);
        if (!settings || Object.keys(settings).length === 0) {
            console.log("Settings are missing or empty, initializing...");
            // console.log("Resetting TT Settings");
            console.log(DEFAULT_STORAGE)
            newStorage = await ttStorage.reset();  // Using the simplified reset and initialize method
            console.log("New settings initialized:", newStorage);
            settings = database.settings;
        }
        if (!settings) {
            console.error(database)
            console.error("Settings are missing in the loaded data.");
        }

        // Assign other data similarly, with checks and logs as necessary
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
        ttCache.cache = database.cache;
        ttUsage.usage = database.usage;
        npcs = database.npcs;
        stockdata = database.stockdata;
        factionStakeouts = database.factionStakeouts;
        

        console.log("TT - Database loaded.", database);
        databaseLoaded = true;
        return database;
    } catch (error) {
        console.error("Failed to load database:", error);
        databaseLoading = false;
        throw error;  // Rethrow the error to be handled by caller
    }
}

chrome.storage.onChanged.addListener((changes, area) => {
	if (area === "local") {
		for (const key in changes) {
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
					if (typeof notificationHistory !== "undefined") notificationHistory = changes.notificationHistory.newValue;
					break;
				case "factionStakeouts":
					factionStakeouts = changes.factionStakeouts.newValue;
					break;
			}
			if (storageListeners[key]) storageListeners[key].forEach((listener) => listener(changes[key].oldValue));
		}
	}
});

async function resetAndInitialize(defaultStorage) {
    console.log("Attempting to reset TT Settings...");

    try {
        // Assume ttStorage.reset() is an async operation that needs to be awaited
        // console.log("TT Settings reset successfully.");

        // Initialize new storage based on default values
        const apiKey = api ? api.torn.key : undefined;
        const newStorage = {};

        for (const key in defaultStorage) {
            if (typeof defaultStorage[key] === "object") {
                newStorage[key] = {};

                if (defaultStorage[key] instanceof DefaultSetting) {
                    switch (typeof defaultStorage[key].defaultValue) {
                        case "function":
                            newStorage[key] = defaultStorage[key].defaultValue();
                            break;
                        case "boolean":
                            newStorage[key] = defaultStorage[key].defaultValue;
                            break;
                        default:
                            newStorage[key] = defaultStorage[key].defaultValue;
                            break;
                    }
                } else {
                    // Recursive call to handle nested default settings
                    
                }
            } else {
                // Handle non-object settings directly
                newStorage[key] = defaultStorage[key];
            }
        }
        // browser.runtime.sendMessage({ action: "initialize" });

        return newStorage;
    } catch (error) {
        console.error("An error occurred during the reset and initialization process:", error);
        // Optionally, notify the user interface of the error
        sendMessage(`Error: ${error.message}`, false);
        throw error; // Rethrow the error to be handled by the caller or further up in the chain
    }
}

