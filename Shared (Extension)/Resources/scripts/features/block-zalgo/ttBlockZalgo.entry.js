"use strict";

(async () => {
	featureManager.registerFeature(
		"Block Zalgo",
		"chat",
		() => settings.pages.chat.blockZalgo,
		null,
		hideZalgo,
		showZalgo,
		{
			storage: ["settings.pages.chat.blockZalgo"],
		},
		null
	);

	async function hideZalgo() {
		const root = await requireElement("#chatRoot");

		root.classList.add("no-zalgo");
	}

	async function showZalgo() {
		const root = document.find("#chatRoot");
		if (!root) return;

		root.classList.remove("no-zalgo");
	}
})();
