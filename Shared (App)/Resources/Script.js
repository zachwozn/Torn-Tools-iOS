function show(platform, enabled, useSettingsInsteadOfPreferences) {
    document.body.classList.add(`platform-${platform}`);

    if (useSettingsInsteadOfPreferences) {
        document.getElementsByClassName('platform-mac state-on')[0].innerText = "Test’s extension is currently on. You can turn it off in the Extensions section of Safari Settings.";
        document.getElementsByClassName('platform-mac state-off')[0].innerText = "Test’s extension is currently off. You can turn it on in the Extensions section of Safari Settings.";
        document.getElementsByClassName('platform-mac state-unknown')[0].innerText = "You can turn on Test’s extension in the Extensions section of Safari Settings.";
        document.getElementsByClassName('platform-mac open-preferences')[0].innerText = "Quit and Open Safari Settings…";
    }

    if (typeof enabled === "boolean") {
        document.body.classList.toggle(`state-on`, enabled);
        document.body.classList.toggle(`state-off`, !enabled);
    } else {
        document.body.classList.remove(`state-on`);
        document.body.classList.remove(`state-off`);
    }
}

function openPreferences() {
    webkit.messageHandlers.controller.postMessage("open-preferences");
}

document.querySelector("button.open-preferences").addEventListener("click", openPreferences);

// --- Native TornTools status panel (iOS only) -------------------------------

function refreshNow() {
    webkit.messageHandlers.controller.postMessage("refresh-now");
}

function saveApiKey() {
    const input = document.getElementById("tt-api-key");
    if (!input) return;
    webkit.messageHandlers.controller.postMessage("set-api-key:" + input.value.trim());
}

function testNotification() {
    webkit.messageHandlers.controller.postMessage("test-notification");
}

function renderState(state) {
    if (!state) return;

    const diagEl = document.getElementById("tt-diag");
    if (diagEl) diagEl.textContent = state.diagnostics || "(no diagnostics)";

    const schedEl = document.getElementById("tt-sched-log");
    if (schedEl) schedEl.textContent = state.schedulerLog || "(scheduler hasn't run yet — tap Refresh now)";

    if (state.thresholds) applyThresholdsToUI(state.thresholds);

    const keyStatus = document.getElementById("tt-api-key-status");
    if (keyStatus) {
        keyStatus.textContent = state.hasApiKey
            ? "API key is set."
            : "No API key set — Refresh Now will fail until you paste one here.";
    }

    const syncEl = document.getElementById("tt-sync");
    if (syncEl) {
        if (state.error) {
            syncEl.innerHTML = "";
            const e = document.createElement("strong"); e.style.color = "tomato"; e.textContent = "Error: ";
            const m = document.createElement("span"); m.textContent = state.error;
            syncEl.append(e, m);
        } else if (state.lastSyncDate) {
            const d = new Date(state.lastSyncDate * 1000);
            syncEl.textContent = `Last sync: ${d.toLocaleString()}`;
        } else {
            syncEl.textContent = "No sync yet — open Safari on a torn.com tab so the extension can push data.";
        }
    }

    const bars = document.getElementById("tt-bars");
    const stats = state.stats || {};
    if (bars) {
        bars.innerHTML = "";
        // Bar-specific colors loosely matching Torn's UI palette.
        const palette = {
            Energy: "#3aa776",  // green
            Nerve:  "#c84141",  // red
            Happy:  "#e8b73d",  // yellow
            Life:   "#5586d8",  // blue
        };
        function addBar(label, b) {
            if (!b) return;
            const pct = b.maximum > 0 ? Math.round((b.current / b.maximum) * 100) : 0;
            const li = document.createElement("li");
            li.style.setProperty("--pct", `${pct}%`);
            li.style.setProperty("--fill", palette[label] || "#888");
            const lbl = document.createElement("span"); lbl.className = "label"; lbl.textContent = label;
            const val = document.createElement("span"); val.className = "value"; val.textContent = `${b.current} / ${b.maximum}`;
            const p = document.createElement("span"); p.className = "pct"; p.textContent = `${pct}%`;
            li.append(lbl, val, p);
            bars.appendChild(li);
        }
        addBar("Energy", stats.energy);
        addBar("Nerve", stats.nerve);
        addBar("Happy", stats.happy);
        addBar("Life", stats.life);
    }

    const cooldowns = document.getElementById("tt-cooldowns");
    if (cooldowns) {
        cooldowns.innerHTML = "";
        function fmtDuration(seconds) {
            if (seconds <= 0) return "ready";
            const h = Math.floor(seconds / 3600);
            const m = Math.floor((seconds % 3600) / 60);
            if (h > 0) return `${h}h ${m}m`;
            if (m > 0) return `${m}m`;
            return `${seconds}s`;
        }
        function addCooldown(label, seconds) {
            if (seconds === undefined || seconds === null) return;
            const li = document.createElement("li");
            const lbl = document.createElement("span"); lbl.className = "label"; lbl.textContent = label;
            const status = document.createElement("span");
            status.className = "status " + (seconds <= 0 ? "ready" : "active");
            status.textContent = fmtDuration(seconds);
            li.append(lbl, status);
            cooldowns.appendChild(li);
        }
        addCooldown("Drug", stats.cooldownDrug);
        addCooldown("Medical", stats.cooldownMedical);
        addCooldown("Booster", stats.cooldownBooster);
    }

    const history = document.getElementById("tt-history");
    if (history) {
        history.innerHTML = "";
        const items = (state.history || []).slice().reverse();
        for (const rec of items) {
            const li = document.createElement("li");
            const title = document.createElement("strong"); title.textContent = rec.title;
            const body = document.createElement("span"); body.textContent = ` — ${rec.body}`;
            const when = document.createElement("span"); when.className = "when";
            when.textContent = new Date(rec.date * 1000).toLocaleString();
            li.append(title, body, when);
            history.appendChild(li);
        }
    }
}

document.getElementById("tt-refresh")?.addEventListener("click", refreshNow);
document.getElementById("tt-api-key-save")?.addEventListener("click", saveApiKey);
document.getElementById("tt-test-notification")?.addEventListener("click", testNotification);

// --- Notifications settings -------------------------------------------------

const THRESHOLD_BUCKETS = ["25%", "50%", "75%", "90%", "100%"];

let currentThresholds = null;

function buildBarBucketRows() {
    // For each .bar-row, populate threshold buckets if not yet populated.
    document.querySelectorAll(".notif-panel .bar-row").forEach((row) => {
        const bar = row.getAttribute("data-bar");
        const container = row.querySelector(".thr-buckets");
        if (!container || container.dataset.built === "1") return;
        for (const bucket of THRESHOLD_BUCKETS) {
            const label = document.createElement("label");
            label.className = "thr-bucket";
            const cb = document.createElement("input");
            cb.type = "checkbox";
            cb.dataset.bar = bar;
            cb.dataset.bucket = bucket;
            cb.addEventListener("change", onThresholdToggle);
            label.append(cb, document.createTextNode(bucket));
            container.appendChild(label);
        }
        container.dataset.built = "1";
    });
}

function applyThresholdsToUI(thresholds) {
    if (!thresholds) return;
    currentThresholds = thresholds;
    buildBarBucketRows();
    // Per-bar buckets
    document.querySelectorAll(".notif-panel input[data-bar][data-bucket]").forEach((cb) => {
        const bar = cb.dataset.bar;
        const bucket = cb.dataset.bucket;
        const list = thresholds[bar] || [];
        cb.checked = list.includes(bucket);
    });
    // Boolean flags
    document.querySelectorAll(".notif-panel input[data-flag]").forEach((cb) => {
        const flag = cb.dataset.flag;
        cb.checked = !!thresholds[flag];
        if (!cb.dataset.bound) {
            cb.dataset.bound = "1";
            cb.addEventListener("change", onFlagToggle);
        }
    });
    // Sound
    const sound = document.getElementById("tt-sound");
    if (sound) {
        sound.value = thresholds.sound || "default";
        if (!sound.dataset.bound) {
            sound.dataset.bound = "1";
            sound.addEventListener("change", onSoundChange);
        }
    }
}

function postThresholds() {
    if (!currentThresholds) return;
    webkit.messageHandlers.controller.postMessage("set-thresholds:" + JSON.stringify(currentThresholds));
}

function onThresholdToggle(e) {
    if (!currentThresholds) return;
    const bar = e.target.dataset.bar;
    const bucket = e.target.dataset.bucket;
    const list = new Set(currentThresholds[bar] || []);
    if (e.target.checked) list.add(bucket); else list.delete(bucket);
    // Preserve a stable ordering matching THRESHOLD_BUCKETS.
    currentThresholds[bar] = THRESHOLD_BUCKETS.filter((b) => list.has(b));
    postThresholds();
}

function onFlagToggle(e) {
    if (!currentThresholds) return;
    currentThresholds[e.target.dataset.flag] = !!e.target.checked;
    postThresholds();
}

function onSoundChange(e) {
    if (!currentThresholds) return;
    currentThresholds.sound = e.target.value;
    postThresholds();
}

// Swift can push updates by calling window.__ttState(state)
window.__ttState = renderState;
