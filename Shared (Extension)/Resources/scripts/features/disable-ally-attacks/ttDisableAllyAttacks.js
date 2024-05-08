"use strict";

(async () => {
	if (!getPageStatus().access) return;
	if (isOwnProfile()) return;

	const feature = featureManager.registerFeature(
		"Disable Ally Attacks",
		"profile",
		() => settings.pages.profile.disableAllyAttacks,
		startObserver,
		disableAttackButton,
		enableButton,
		{
			storage: ["settings.pages.profile.disableAllyAttacks", "settings.alliedFactions"],
		},
		null
	);

	async function startObserver() {
		// noinspection JSCheckFunctionSignatures
		new MutationObserver(() => {
			if (feature.enabled()) disableAttackButton();
		}).observe(await requireElement(".profile-container"), { childList: true });
	}

	function listenerFunction(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		if (confirm("Are you sure you want to attack this ally?")) {
			location = document.find(".profile-buttons .profile-button-attack").href;
		}
	}

	async function disableAttackButton() {
		const factionLink = await requireElement(".user-info-value [href*='/factions.php']");

		enableButton();

		const factionID = new URLSearchParams(factionLink.href).get("ID").getNumber();
		const factionName = factionLink.textContent.trim();
		if (
			(hasAPIData() && factionID === userdata.faction.faction_id) ||
			settings.alliedFactions.some((ally) => {
				if (isIntNumber(ally)) return ally === factionID || ally.toString() === factionName;
				else return ally.trim() === factionName;
			})
		) {
			const attackButton = document.find(".profile-buttons .profile-button-attack");
			if (attackButton.classList.contains("cross")) return;
            const img = document.createElement("img")
            img.src = chrome.runtime.getURL("resource/images/svg-icons/cross.svg");

            img.classList.add("tt-disable-ally");
            img.style = "width: 35px; height: 40px; transform: translate(-7%, -100%); position: absolute; padding: 7px;";
            img.title = "Blocked by Torn Tools";
            attackButton.appendChild(img);
			const crossSvgNode = crossSvg();
			crossSvgNode.classList.add("tt-disable-ally");
			attackButton.insertAdjacentElement("beforeend", crossSvgNode);
			crossSvgNode.addEventListener("click", listenerFunction, { capture: true });
		}
	}

	function enableButton() {
		document.findAll("#profileroot .tt-disable-ally.tt-cross").forEach((x) => x.remove());
	}
})();
