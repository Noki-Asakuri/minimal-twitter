import { KeyHideGrokDrawer } from "@minimal-twitter/shared";
import selectors from "@content/selectors";
import addStyles, { removeStyles, stylesExist } from "@content/modules/utilities/add-styles";
import { getStorage } from "@content/modules/utilities/storage";
const newPostsPillCloseButtonClass = "mt-new-posts-pill-close";
const newPostsPillDismissedClass = "mt-new-posts-pill-dismissed";

export function addNewPostsPillCloseButton(): void {
  const pillContainers = document.querySelectorAll<HTMLElement>(selectors.newPostsPill);
  for (const pillContainer of pillContainers) {
    if (
      pillContainer.classList.contains(newPostsPillDismissedClass) ||
      pillContainer.querySelector(`.${newPostsPillCloseButtonClass}`)
    )
      continue;

    const pillButton = pillContainer.matches("button, [role='button']")
      ? pillContainer
      : pillContainer.querySelector<HTMLElement>("button, [role='button']");
    if (!pillButton) continue;

    pillContainer.classList.add("mt-new-posts-pill");
    pillButton.classList.add("mt-new-posts-pill-native-button");

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = newPostsPillCloseButtonClass;
    closeButton.setAttribute("aria-label", "Dismiss new posts");
    closeButton.title = "Dismiss";
    closeButton.addEventListener("pointerdown", (event) => event.stopPropagation());
    closeButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      pillContainer.classList.add(newPostsPillDismissedClass);
      pillContainer.setAttribute("aria-hidden", "true");
    });
    pillContainer.append(closeButton);
  }
}

export function changeProfileMediaDefaultView(defaultView?: string): void {
  const mediaTab = Array.from(
    document.querySelectorAll<HTMLElement>(`${selectors.mainColumn} [role="tab"][href]`),
  ).find((tab) => {
    const href = tab.getAttribute("href");
    if (!href) return false;
    const url = new URL(href, window.location.origin);
    return /^\/[A-Za-z0-9_]+\/media\/?$/.test(url.pathname);
  });
  if (!mediaTab) return;
  const mediaHref = mediaTab.getAttribute("href");
  if (!mediaHref) return;
  const mediaUrl = new URL(mediaHref, window.location.origin);
  if (defaultView === "images") mediaUrl.searchParams.set("filter", "photo");
  else mediaUrl.searchParams.delete("filter");
  mediaTab.setAttribute("href", `${mediaUrl.pathname}${mediaUrl.search}`);
}
export function changeTimelineWidth(timelineWidth?: number): void {
  switch (timelineWidth) {
    case 600:
      addStyles(
        "timelineWidth",
        `
        @media only screen and (min-width: 988px) {
          ${selectors.mainColumn} {
            width: 600px;
            max-width: 600px;
          }
        }
        `,
      );
      break;
    case 650:
      addStyles(
        "timelineWidth",
        `
        @media only screen and (min-width: 988px) {
          ${selectors.mainColumn} {
            width: 650px;
            max-width: 650px;
          }
        }
        `,
      );
      break;
    case 700:
      addStyles(
        "timelineWidth",
        `
        @media only screen and (min-width: 988px) {
          ${selectors.mainColumn} {
            width: 700px;
            max-width: 700px;
          }
        }
        `,
      );
      break;
    case 750:
      addStyles(
        "timelineWidth",
        `
        @media only screen and (min-width: 988px) {
          ${selectors.mainColumn} {
            width: 750px;
            max-width: 750px;
          }
        }
        `,
      );
      break;
    case 800:
      addStyles(
        "timelineWidth",
        `
        @media only screen and (min-width: 988px) {
          ${selectors.mainColumn} {
            width: 800px;
            max-width: 800px;
          }
        }
        `,
      );
      break;
  }
}
export function changeTimelineBorders(timelineBorders?: string): void {
  switch (timelineBorders) {
    case "off":
      removeStyles("timelineBorders");
      break;
    case "on":
      addStyles(
        "timelineBorders",
        `
        @media only screen and (min-width: 988px) {
          div${selectors.mainColumn} {
            border-style: hidden;
          }
        }
        `.trim(),
      );
      break;
  }
}
export function changeTweetBorders(tweetBorders?: string): void {
  switch (tweetBorders) {
    case "off":
      removeStyles("tweetBorders");
      break;
    case "on":
      addStyles(
        "tweetBorders",
        `
        ${selectors.mainWrapper} section > div > div > div > div[role="separator"] {
          display: none;
        }
        ${selectors.mainColumn} > div > div:empty {
          background: transparent;
        }
        `.trim(),
      );
      break;
  }
}
export function changeStickyHeader(stickyHeader?: string): void {
  switch (stickyHeader) {
    case "on":
      removeStyles("stickyHeader");
      break;
    case "off":
      addStyles(
        "stickyHeader",
        `
        ${selectors.mainColumn} > div > div {
          position: unset;
        }
        `,
      );
      break;
  }
}
export function changePromotedPosts(removePromotedPosts?: string): void {
  switch (removePromotedPosts) {
    case "off":
      addStyles(
        "removePromotedPosts",
        `
        [data-testid="placementTracking"] article {
          display: flex;
        }
        `,
      );
      break;
    case "on":
      removeStyles("removePromotedPosts");
      break;
  }
}
export function changeTopicsToFollow(removeTopicsToFollow?: string): void {
  switch (removeTopicsToFollow) {
    case "off":
      removeStyles("removeTopicsToFollow");
      break;
    case "on":
      addStyles(
        "removeTopicsToFollow",
        `
        ${selectors.mainColumn} section[aria-labelledby^="accessible-list-"] > div[aria-label$="Carousel"],
        ${selectors.mainColumn} a[href*="/i/flow/topics_selector"],
        ${selectors.mainColumn} a[href*="/i/topics/picker/home"] {
          display: none;
        }
        [aria-label="Lists timeline"] section[aria-labelledby^="accessible-list-"] > div[aria-label$="Carousel"] {
          display: flex;
        }
        `,
      );
      break;
  }
}
export function changeTimelineTabs(removeTimelineTabs?: string, writerMode?: string): void {
  if (
    writerMode === "on" ||
    window.location.pathname.includes("compose/tweet") ||
    !window.location.pathname.includes("/home")
  ) {
    removeStyles("removeTimelineTabs");
    return;
  }
  switch (removeTimelineTabs) {
    case "off":
      removeStyles("removeTimelineTabs");
      break;
    case "on":
      if (stylesExist("removeTimelineTabs")) return;
      addStyles(
        "removeTimelineTabs",
        `
        ${selectors.timelineTabs} {
          display: none;
        }
        `,
      );
      break;
  }
}
export function changeTrendsHomeTimeline(trendsHomeTimeline?: string, writerMode?: string): void {
  if (
    writerMode === "on" ||
    window.location.pathname.includes("compose/tweet") ||
    !window.location.pathname.includes("/home")
  ) {
    removeStyles("trendsHomeTimeline");
    return;
  }
  switch (trendsHomeTimeline) {
    case "off":
      removeStyles("trendsHomeTimeline");
      break;
    case "on":
      if (stylesExist("trendsHomeTimeline")) return;
      addStyles(
        "trendsHomeTimeline",
        `
          @keyframes render {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
              transform: none;
            }
          }
          @media only screen and (min-width: 1265px) {
            ${selectors.rightSidebar} section[aria-labelledby^="accessible-list-"] {
              visibility: visible;
              position: fixed;
              right: 16px;
              top: 66px;
              max-height: 78vh;
              overflow: auto;
              width: 300px;
              border-radius: 16px;
              border-color: var(--border-color);
              border-width: 1px;
              background-color: var(--body-bg-color);
              opacity: 0;
              will-change: opacity;
              animation-name: render;
              animation-duration: 0s;
              animation-fill-mode: forwards;
              animation-delay: 500ms;
              margin-top: 4px;
            }

            [data-testid="primaryColumn"] {
              transform: translateX(-64px);
            }
          }
          `,
      );
      break;
  }
}
export function enableGrokDrawerOnGrokButtonClick(hideGrokDrawer: string): void {
  function grokClickListener() {
    const grokDrawer = document.querySelector(selectors.grokDrawer);
    grokDrawer?.classList.add("typefully-grok-drawer-enabled");
  }
  if (hideGrokDrawer === "off") {
    // remove event click listener from all grok buttons, when hideGrokDrawer is off
    const grokSvgs = document.querySelectorAll(selectors.grokSvg);
    grokSvgs.forEach((svg) => {
      const grokButton = svg.closest("button");
      if (grokButton) {
        grokButton.removeEventListener("click", grokClickListener);
      }
    });
    return;
  }
  const grokSvgs = Array.from(document.querySelectorAll(selectors.grokSvg)).filter((svg) =>
    svg.closest("button"),
  );
  grokSvgs.forEach((svg) => {
    const grokButton = svg.closest("button");
    if (!grokButton) return;
    grokButton.addEventListener("click", grokClickListener);
  });
  const grokDrawer = document.querySelector(selectors.grokDrawer);
  if (!grokDrawer) return;
  const grokDrawerHeader = document.querySelector(selectors.grokDrawerHeader);
  if (!grokDrawerHeader) return;
  const observer = new ResizeObserver(async (entries) => {
    const entry = entries[0];
    // if entry has one child and it is a button, it means the drawer is closed.
    // Remove the drawer if hideGrokDrawer is on.
    if (entry.target.children.length === 1 && entry.target.children[0].tagName === "BUTTON") {
      grokDrawer.classList.remove("typefully-grok-drawer-enabled");
      const currentHideGrokDrawer = await getStorage(KeyHideGrokDrawer);
      if (currentHideGrokDrawer === "on") {
        addStyles(
          "grokDrawer",
          `${selectors.grokDrawer} {
          display: none !important;
        }`,
        );
      }
      observer.disconnect();
    }
  });
  // observe the grok drawer header to determine if the drawer has to be hidden or not.
  if (grokDrawerHeader) {
    observer.observe(grokDrawerHeader);
  }
}
