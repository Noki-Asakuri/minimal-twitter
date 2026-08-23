export function changeCustomCss(cssText?: string): void {
  const existingStyleEl = document.getElementById("custom-css");
  if (existingStyleEl) {
    existingStyleEl.textContent = cssText ?? "";
  } else {
    const externalStylesheet = document.getElementById("mt-external-stylesheet");
    if (!externalStylesheet) return;
    const styleEl = document.createElement("style");
    styleEl.id = "custom-css";
    styleEl.textContent = cssText ?? "";
    document.head.insertBefore(styleEl, externalStylesheet.nextSibling);
  }
}
