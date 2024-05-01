"use strict";

(async () => {
	const feature = featureManager.registerFeature(
		"Cooldown End Times",
		"sidebar",
		() => settings.pages.sidebar.cooldownEndTimes,
		null,
		addEndTimes,
		removeEndTimes,
		{
			storage: ["settings.pages.sidebar.cooldownEndTimes"],
		},
		null
	);

	const iconRegex = /1[97]|39|4\d|5[0-3]/m;
	async function addEndTimes() {
		const statusIcons = await requireElement("#sidebarroot [class*='status-icons__']");
		statusIcons.addEventListener("mouseover", listener);
		let tooltipPortal;

		async function listener(event) {
			if (!event.target.closest("li")?.matches("[class*='icon']")) return;

			const tooltip = (await requireElement("body > [id*='floating-ui-']")).find("[class*='tooltip__']");
			const tooltipName = tooltip.getElementsByTagName("b")[0]?.textContent;
			if (
				["Education", "Reading Book", "Racing", "Drug Cooldown", "Booster Cooldown", "Medical Cooldown", "Organized Crime", "Bank Investment"].includes(
					tooltipName
				)
			) {
				removeEndTimes(tooltip);
				const time =
					Date.now() + textToTime(tooltip.find("[class*='static-width___']")?.firstChild?.textContent ?? tooltip.find("p:not([class])").textContent);
				tooltip.appendChild(
					document.newElement({
						type: "div",
						class: "tt-tooltip-end-times",
						text: `${formatDate(time, { showYear: true })} ${formatTime(time)}`,
					})
				);
			}
		}
	}

	function removeEndTimes(parent = document) {
		[...parent.getElementsByClassName("tt-tooltip-end-times")].forEach((x) => x.remove());
	}
})();
