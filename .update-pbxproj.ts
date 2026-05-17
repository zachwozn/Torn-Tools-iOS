/**
 * One-shot pbxproj surgery for v9.0.5 upgrade.
 *
 * Strategy:
 *  1. Repurpose 5 existing folder refs (_locales/pages/scripts/vendor/resource)
 *     by renaming them to the new top-level folders we need:
 *       _locales  -> assets
 *       pages     -> audio
 *       scripts   -> content-scripts
 *       vendor    -> icons
 *       resource  -> chunks
 *     (`images`, `manifest.json`, `changelog.json` already exist and keep their refs.)
 *  2. Add new top-level file refs for the HTML pages and inject JS files
 *     that the v9.0.5 build introduces, wiring them into both extension targets.
 */
import { readFileSync, writeFileSync } from "node:fs";

const PBXPROJ = "/Users/zachwozniak/Desktop/Test/TornTools.xcodeproj/project.pbxproj";

const RENAMES: Array<{ from: string; to: string }> = [
	{ from: "_locales", to: "assets" },
	{ from: "pages", to: "audio" },
	{ from: "scripts", to: "content-scripts" },
	{ from: "vendor", to: "icons" },
	{ from: "resource", to: "chunks" },
];

// New top-level files that need to be added to the Resources of both extension targets.
// Source maps (.js.map) are intentionally omitted — they aren't required at runtime.
const NEW_FILES: Array<{ name: string; type: string }> = [
	{ name: "background.js", type: "sourcecode.javascript" },
	{ name: "service-worker.js", type: "sourcecode.javascript" },
	{ name: "offscreen.html", type: "text.html" },
	{ name: "options.html", type: "text.html" },
	{ name: "popup.html", type: "text.html" },
	{ name: "targets.html", type: "text.html" },
	{ name: "tos.html", type: "text.html" },
	{ name: "add-debug-info--inject.js", type: "sourcecode.javascript" },
	{ name: "api-key-focus--inject.js", type: "sourcecode.javascript" },
	{ name: "efficient-rehab--inject.js", type: "sourcecode.javascript" },
	{ name: "fetch--inject.js", type: "sourcecode.javascript" },
	{ name: "item-no-confirm--inject.js", type: "sourcecode.javascript" },
	{ name: "no-outside-link-alert--inject.js", type: "sourcecode.javascript" },
	{ name: "points-value--inject.js", type: "sourcecode.javascript" },
	{ name: "trade-open-chat--inject.js", type: "sourcecode.javascript" },
	{ name: "xhr--inject.js", type: "sourcecode.javascript" },
];

// Existing well-known IDs for the Resources group and the two extension Resources build phases.
const RESOURCES_GROUP_ID = "E10643ED2BDF1F4C00064FC7";
const IOS_EXT_RESOURCES_PHASE_ID = "E155A0D12BDB494500CBCFD4";
const MAC_EXT_RESOURCES_PHASE_ID = "E155A0DB2BDB494500CBCFD4";

let counter = 0x100;
function uuid(): string {
	// Generate a 24-char hex UUID in a project-local namespace.
	// Prefix F0 avoids collision with existing E1...-prefixed IDs.
	const tail = (counter++).toString(16).toUpperCase().padStart(8, "0");
	return `F0${"0".repeat(14)}${tail}`;
}

let src = readFileSync(PBXPROJ, "utf8");

// 1) Rename folder refs in-place. Each old name appears as:
//    - the comment /* oldName */
//    - the path = oldName; value
//    Both are scoped to lines that mention the folder reference.
for (const { from, to } of RENAMES) {
	// path = X; (with optional trailing space)
	src = src.replace(new RegExp(`path = ${from};`, "g"), `path = ${to};`);
	// /* X */ comment marker — scoped enough that we won't accidentally match unrelated strings.
	src = src.replace(new RegExp(`/\\* ${from} \\*/`, "g"), `/* ${to} */`);
	// "X in Resources" comments (for build files)
	src = src.replace(new RegExp(`/\\* ${from} in Resources \\*/`, "g"), `/* ${to} in Resources */`);
}

// 2) Generate new entries for HTMLs and inject JS files.
//    Each file needs:
//    - 1 PBXFileReference
//    - 2 PBXBuildFile (one for iOS Ext, one for macOS Ext)
//    - 1 line in the Resources group children
//    - 1 line in each of the 2 Resources build phases

const fileRefLines: string[] = [];
const buildFileLines: string[] = [];
const groupChildLines: string[] = [];
const iosPhaseLines: string[] = [];
const macPhaseLines: string[] = [];

for (const file of NEW_FILES) {
	const fileRefId = uuid();
	const iosBuildId = uuid();
	const macBuildId = uuid();

	fileRefLines.push(
		`\t\t${fileRefId} /* ${file.name} */ = {isa = PBXFileReference; lastKnownFileType = ${file.type}; path = "${file.name}"; sourceTree = "<group>"; };`,
	);
	buildFileLines.push(
		`\t\t${iosBuildId} /* ${file.name} in Resources */ = {isa = PBXBuildFile; fileRef = ${fileRefId} /* ${file.name} */; };`,
	);
	buildFileLines.push(
		`\t\t${macBuildId} /* ${file.name} in Resources */ = {isa = PBXBuildFile; fileRef = ${fileRefId} /* ${file.name} */; };`,
	);
	groupChildLines.push(`\t\t\t\t${fileRefId} /* ${file.name} */,`);
	iosPhaseLines.push(`\t\t\t\t${iosBuildId} /* ${file.name} in Resources */,`);
	macPhaseLines.push(`\t\t\t\t${macBuildId} /* ${file.name} in Resources */,`);
}

// 3) Splice the new lines into the right sections.

// Insert into PBXBuildFile section — just before "/* End PBXBuildFile section */"
src = src.replace(
	"/* End PBXBuildFile section */",
	`${buildFileLines.join("\n")}\n/* End PBXBuildFile section */`,
);

// Insert into PBXFileReference section — just before "/* End PBXFileReference section */"
src = src.replace(
	"/* End PBXFileReference section */",
	`${fileRefLines.join("\n")}\n/* End PBXFileReference section */`,
);

// Insert into Resources group children — find the group block and append before the closing );
const resourcesGroupRegex = new RegExp(
	`(${RESOURCES_GROUP_ID} /\\* Resources \\*/ = \\{[\\s\\S]*?children = \\(\\n)([\\s\\S]*?)(\\t\\t\\t\\);[\\s\\S]*?path = Resources;)`,
);
src = src.replace(resourcesGroupRegex, (_match, head, existing, tail) => {
	return `${head}${existing}${groupChildLines.join("\n")}\n${tail}`;
});

// Insert into iOS Extension Resources build phase
const iosPhaseRegex = new RegExp(
	`(${IOS_EXT_RESOURCES_PHASE_ID} /\\* Resources \\*/ = \\{[\\s\\S]*?files = \\(\\n)([\\s\\S]*?)(\\t\\t\\t\\);)`,
);
src = src.replace(iosPhaseRegex, (_match, head, existing, tail) => {
	return `${head}${existing}${iosPhaseLines.join("\n")}\n${tail}`;
});

// Insert into macOS Extension Resources build phase
const macPhaseRegex = new RegExp(
	`(${MAC_EXT_RESOURCES_PHASE_ID} /\\* Resources \\*/ = \\{[\\s\\S]*?files = \\(\\n)([\\s\\S]*?)(\\t\\t\\t\\);)`,
);
src = src.replace(macPhaseRegex, (_match, head, existing, tail) => {
	return `${head}${existing}${macPhaseLines.join("\n")}\n${tail}`;
});

writeFileSync(PBXPROJ, src);

console.log(`Renamed ${RENAMES.length} folder refs.`);
console.log(`Added ${NEW_FILES.length} file refs (each with 2 build file entries).`);
console.log(`Total new lines: file refs=${fileRefLines.length}, build files=${buildFileLines.length}, group=${groupChildLines.length}, ios phase=${iosPhaseLines.length}, mac phase=${macPhaseLines.length}`);
