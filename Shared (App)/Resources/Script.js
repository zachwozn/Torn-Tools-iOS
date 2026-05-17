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

function renderState(state) {
    if (!state) return;

    const syncEl = document.getElementById("tt-sync");
    if (syncEl) {
        if (state.lastSyncDate) {
            const d = new Date(state.lastSyncDate * 1000);
            syncEl.textContent = `Last sync: ${d.toLocaleString()}`;
        } else {
            syncEl.textContent = "No sync yet — open Safari on a torn.com tab so the extension can push data.";
        }
    }

    const bars = document.getElementById("tt-bars");
    if (bars) {
        bars.innerHTML = "";
        const stats = state.stats || {};
        function addBar(label, b) {
            if (!b) return;
            const pct = b.maximum > 0 ? Math.round((b.current / b.maximum) * 100) : 0;
            const li = document.createElement("li");
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

// Swift can push updates by calling window.__ttState(state)
window.__ttState = renderState;
