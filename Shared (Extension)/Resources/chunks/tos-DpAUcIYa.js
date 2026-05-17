import { d as loadDatabase, t as getPageTheme, y as storageListeners } from "./pages-DbN4bb4V.js";
import "./browser-DV2XfOQj.js";
/* empty css               */
//#region extension/entrypoints/tos/tos.ts
(async () => {
	await loadDatabase();
	document.body.classList.add(getPageTheme());
	storageListeners.settings.push(() => {
		document.body.classList.remove("dark", "light");
		document.body.classList.add(getPageTheme());
	});
})();
//#endregion

//# sourceMappingURL=tos-DpAUcIYa.js.map