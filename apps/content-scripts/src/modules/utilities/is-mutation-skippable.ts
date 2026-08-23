export default function isMutationSkippable(mutationsList: MutationRecord[]): boolean {
  const addedNode = mutationsList[0]?.addedNodes[0];
  const removedNode = mutationsList[0]?.removedNodes[0];
  const targetNode = mutationsList[0]?.target;
  const elementNode = addedNode || removedNode;
  const a = addedNode instanceof Element ? addedNode : null;
  const r = removedNode instanceof Element ? removedNode : null;
  const t = targetNode instanceof Element ? targetNode : null;
  const el = a || r; // Element
  try {
    // Minimal Twitter injected elements
    if (
      el?.id?.startsWith("mt-") ||
      t?.id?.startsWith("mt-") ||
      el?.id?.startsWith("typefully-") ||
      t?.className?.startsWith("mt-") // For example .mt-tooltip ends up here
    )
      return true;
    // Engagement counts
    if (
      t?.closest(`[data-testid="like"]`) ||
      t?.closest(`[data-testid="retweet"]`) ||
      t?.closest(`[data-testid="reply"]`)
    ) {
      return true;
    }
    // Inside the sidebar
    if (t?.closest(`nav[role="navigation"]`)) return true;
    // Sidebar itself
    if (t?.nodeName === "NAV" && t?.getAttribute("role") === "navigation") return true;
    // <head> changes
    if (t?.closest("head")) return true;
    // User Avatar changes
    if (
      el?.closest("[data-testid^='UserAvatar-Container']") ||
      t?.closest("[data-testid^='UserAvatar-Container']")
    )
      return true;
    // Post media
    if (el?.closest("[data-testid='tweetPhoto']")) return true;
    // Images and videos
    if (
      el?.nodeName === "IMG" ||
      t?.nodeName === "IMG" ||
      el?.nodeName === "VIDEO" ||
      el?.firstChild?.nodeName === "VIDEO" ||
      el?.querySelector(":scope > img") ||
      el?.getAttribute("data-testid") === "tweetPhoto" ||
      (el?.parentElement?.getAttribute("data-testid") ?? null) === "tweetPhoto" ||
      t?.closest("[data-testid='videoPlayer']")
    ) {
      return true;
    }
    // Links previews (inside a data-testid="card.wrapper")
    if (el?.closest("[data-testid='card.wrapper']")) {
      return true;
    }
    // Added or removed scripts
    if (el?.nodeName === "SCRIPT") return true;
    // Added or removed styles
    if (el?.nodeName === "STYLE") return true;
    // DM drawer
    if (el?.closest("[data-testid='DMDrawer']") || t?.closest("[data-testid='DMDrawer']"))
      return true;
    // Trends drawer
    if (el?.closest("[data-testid='sidebarColumn']") || t?.closest("[data-testid='sidebarColumn']"))
      return true;
    // Ignore text only nodes
    if (elementNode?.nodeName === "#text") return true;
    // Ignore info button on tweets
    // it's a > div > div > div[data-testid="caret"]
    if (
      el?.nodeName === "DIV" &&
      el?.firstElementChild?.firstElementChild?.firstElementChild?.getAttribute("data-testid") ===
        "caret"
    ) {
      return true;
    }
    // SVG changes
    if (el?.nodeName === "path") return true;
    return false;
  } catch (e) {}
  return false;
}
