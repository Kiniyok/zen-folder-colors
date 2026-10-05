// Folder Colors — Zen native folders
// X-Plane = green, Personnel = pastel orange, Autres = pastel blue.
// The script watches folder labels, so renaming/creating folders updates automatically.

(() => {
  const STYLE_ID = "folder-colors-openai-style";
  const ATTR = "data-folder-color";

  const colors = {
    "X-Plane": "xplane",
    "Personnel": "personnel",
    "Autres": "autres",
  };

  function normalize(text) {
    return (text || "").replace(/\s+/g, " ").trim();
  }

  function ensureStyle() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      /* Folder Colors: X-Plane */
      zen-folder[${ATTR}="xplane"] > .tab-group-label-container,
      zen-folder[${ATTR}="xplane"] > .tab-group-label-container > label {
        background: rgba(80, 125, 80, 0.55) !important;
        background-color: rgba(80, 125, 80, 0.55) !important;
      }

      zen-folder[${ATTR}="xplane"] .tabbrowser-tab > .tab-stack > .tab-background {
        background: rgba(80, 125, 80, 0.55) !important;
        background-color: rgba(80, 125, 80, 0.55) !important;
        border-radius: 7px !important;
      }

      zen-folder[${ATTR}="xplane"] .tabbrowser-tab:is([selected], [visuallyselected]) > .tab-stack > .tab-background {
        background: rgba(70, 115, 70, 0.55) !important;
        background-color: rgba(70, 115, 70, 0.55) !important;
      }

      /* Folder Colors: Personnel */
      zen-folder[${ATTR}="personnel"] > .tab-group-label-container,
      zen-folder[${ATTR}="personnel"] > .tab-group-label-container > label {
        background: rgba(235, 190, 145, 0.30) !important;
        background-color: rgba(235, 190, 145, 0.30) !important;
      }

      zen-folder[${ATTR}="personnel"] .tabbrowser-tab > .tab-stack > .tab-background {
        background: rgba(235, 190, 145, 0.30) !important;
        background-color: rgba(235, 190, 145, 0.30) !important;
        border-radius: 7px !important;
      }

      zen-folder[${ATTR}="personnel"] .tabbrowser-tab:is([selected], [visuallyselected]) > .tab-stack > .tab-background {
        background: rgba(215, 165, 115, 0.55) !important;
        background-color: rgba(215, 165, 115, 0.55) !important;
      }

      /* Folder Colors: Autres */
      zen-folder[${ATTR}="autres"] > .tab-group-label-container,
      zen-folder[${ATTR}="autres"] > .tab-group-label-container > label {
        background: rgba(155, 190, 225, 0.30) !important;
        background-color: rgba(155, 190, 225, 0.30) !important;
      }

      zen-folder[${ATTR}="autres"] .tabbrowser-tab > .tab-stack > .tab-background {
        background: rgba(155, 190, 225, 0.30) !important;
        background-color: rgba(155, 190, 225, 0.30) !important;
        border-radius: 7px !important;
      }

      zen-folder[${ATTR}="autres"] .tabbrowser-tab:is([selected], [visuallyselected]) > .tab-stack > .tab-background {
        background: rgba(125, 165, 205, 0.55) !important;
        background-color: rgba(125, 165, 205, 0.55) !important;
      }
    `;
    document.documentElement.appendChild(style);
  }

  function applyFolder(folder) {
    const label = folder.querySelector(":scope > .tab-group-label-container > label");
    const name = normalize(label?.textContent);
    const value = colors[name];

    if (value) {
      folder.setAttribute(ATTR, value);
    } else {
      folder.removeAttribute(ATTR);
    }
  }

  function scan() {
    ensureStyle();
    document.querySelectorAll("zen-folder").forEach(applyFolder);
  }

  // Remove a previous instance cleanly if the script is reloaded.
  if (window.__folderColorsCleanup) {
    try { window.__folderColorsCleanup(); } catch (_) {}
  }

  const observer = new MutationObserver(() => scan());
  observer.observe(document.documentElement, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: ["label", "value"]
  });

  scan();

  window.__folderColorsCleanup = () => {
    observer.disconnect();
    document.getElementById(STYLE_ID)?.remove();
    document.querySelectorAll(`zen-folder[${ATTR}]`).forEach(el => el.removeAttribute(ATTR));
    delete window.__folderColorsCleanup;
  };
})();
