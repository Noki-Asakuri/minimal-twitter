function transformShareLink(text: string): string {
  const settings = document.documentElement?.dataset;
  const useFixupx = settings?.minimalTwitterUseFixupx === "on";
  const removeTracking = settings?.minimalTwitterRemoveShareLinkTracking === "on";

  if (
    (!useFixupx && !removeTracking) ||
    !/^https:\/\/(?:x|twitter|mobile\.twitter)\.com\//.test(text)
  ) {
    return text;
  }

  let url: URL;
  try {
    url = new URL(text);
  } catch {
    return text;
  }

  if (!/^\/(?:[^/]+\/status|i\/(?:web\/)?status)\/\d+(?:\/|$)/.test(url.pathname)) {
    return text;
  }

  if (useFixupx) url.hostname = "fixupx.com";
  if (removeTracking) {
    url.searchParams.delete("a");
    url.searchParams.delete("s");
  }
  return url.href;
}

const clipboard = navigator.clipboard;

if (clipboard) {
  const writeText = clipboard.writeText;

  // Run in MAIN so X's own copy handler writes the transformed URL only once.
  clipboard.writeText = function (text) {
    if (navigator.userActivation.isActive && typeof text === "string") {
      text = transformShareLink(text);
    }

    return writeText.call(this, text);
  };
}

// Also handle selected links copied through execCommand or the browser's Copy action.
window.addEventListener(
  "copy",
  (event) => {
    if (!event.isTrusted || !event.clipboardData) return;

    const activeElement = document.activeElement;
    const selection =
      activeElement instanceof HTMLInputElement || activeElement instanceof HTMLTextAreaElement
        ? activeElement.value.slice(
            activeElement.selectionStart ?? 0,
            activeElement.selectionEnd ?? 0,
          )
        : window.getSelection()?.toString();
    const text = event.clipboardData.getData("text/plain") || selection || "";
    const transformed = transformShareLink(text);
    if (transformed === text) return;

    event.clipboardData.setData("text/plain", transformed);
    event.preventDefault();
    event.stopImmediatePropagation();
  },
  true,
);
