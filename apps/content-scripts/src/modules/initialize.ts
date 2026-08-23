import { allSettingsKeys } from "@minimal-twitter/shared";
import { runDynamicFeatures } from "@content/modules/features/dynamic";
import { applyStaticFeatures } from "@content/modules/features/static";
import addStyleSheet from "@content/modules/utilities/add-style-sheet";
import { extractColorsAsRootVars } from "@content/modules/utilities/colors";
import debounce from "@content/modules/utilities/debounce";
import { isDevelopmentMode } from "@content/modules/utilities/is-development-mode";
import isMutationSkippable from "@content/modules/utilities/is-mutation-skippable";
import { getStorage } from "@content/modules/utilities/storage";
/**
 * Initialization:
 * - Sets up MutationObserver for dynamic features
 * - Adds load/resize event listeners
 * - Loads and caches required stylesheets
 * - Extracts Twitter theme colors
 */
async function addStylesheets(): Promise<void> {
  addStyleSheet("main", chrome.runtime.getURL("css/main.css"));
  addStyleSheet("typefully", chrome.runtime.getURL("css/typefully.css"));
  // Only fetch from CDN in production
  if (!(await isDevelopmentMode())) {
    try {
      const mainStylesheetFromCDN = await fetch(
        "https://raw.githubusercontent.com/typefully/minimal-twitter/main/assets/css/main.css",
      );
      const typefullyStylesheetFromCDN = await fetch(
        "https://raw.githubusercontent.com/typefully/minimal-twitter/main/assets/css/typefully.css",
      );
      const mainText = (await mainStylesheetFromCDN.text()).trim();
      const typefullyText = (await typefullyStylesheetFromCDN.text()).trim();
      addStyleSheet("external", undefined, mainText.concat("\n\n").concat(typefullyText));
    } catch (error) {
      console.error("Can't fetch stylesheets from CDN", error);
    }
  } else {
    console.log("🚧 Development mode, not adding CDN-cached stylesheets");
  }
}
function addMutationObserver() {
  const observer = new MutationObserver((mutations) => {
    if (!mutations.length || isMutationSkippable(mutations)) return;
    runDynamicFeatures();
  });
  observer.observe(document, {
    childList: true,
    subtree: true,
  });
}
function addPageLoadListener() {
  document.addEventListener("DOMContentLoaded", () => {
    runDynamicFeatures();
  });
}
function addResizeListener() {
  window.addEventListener(
    "resize",
    debounce(() => {
      runDynamicFeatures();
    }, 50),
  );
}
export async function initializeExtension(): Promise<void> {
  await addStylesheets();
  const allData = await getStorage(allSettingsKeys);
  applyStaticFeatures(allData);
  runDynamicFeatures();
  addMutationObserver();
  addPageLoadListener();
  addResizeListener();
  extractColorsAsRootVars();
  setTimeout(() => {
    // Let's extract colors when the page is likely fully loaded again
    extractColorsAsRootVars();
  }, 3000);
}
