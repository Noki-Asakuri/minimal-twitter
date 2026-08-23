import selectors from "@content/selectors";
import svgAssets from "@content/modules/svg-assets";
import addStyles, { removeStyles, stylesExist } from "@content/modules/utilities/add-styles";
import { createTypefullyUrl } from "@content/modules/utilities/create-typefully-url";
import { addSidebarButton } from "@content/modules/utilities/sidebar";
// Utilities
type SidebarSelector = keyof typeof selectors.sidebarLinks;
function changeSidebarSetting(
  sidebarSelector: SidebarSelector,
  state?: string,
  onAdd?: () => void,
): void {
  switch (state) {
    case "off":
      addStyles(
        sidebarSelector,
        `${selectors.sidebarLinks[sidebarSelector]} {
          display: none;
        }`,
      );
      break;
    case "on":
      removeStyles(sidebarSelector);
      onAdd?.();
      break;
  }
}
// Functions
export function changeSidebarLogo(state?: string): void {
  changeSidebarSetting("logo", state);
}
export function changeHomeButton(state?: string): void {
  changeSidebarSetting("home", state);
}
export function changeExploreButton(state?: string): void {
  changeSidebarSetting("explore", state);
}
export function changeNotificationsButton(state?: string): void {
  changeSidebarSetting("notifications", state);
}
export function changeMessagesButton(state?: string): void {
  changeSidebarSetting("messages", state);
}
export function changeBookmarksButton(state?: string): void {
  changeSidebarSetting("bookmarks", state);
}
export function changeCreatorStudioButton(state?: string): void {
  changeSidebarSetting("creatorStudio", state);
}
export function changeJobsButton(state?: string): void {
  changeSidebarSetting("jobs", state);
}
export function changeArticlesButton(state?: string): void {
  changeSidebarSetting("articles", state);
}
export function changeVerifiedOrgsButton(state?: string): void {
  changeSidebarSetting("verifiedOrgs", state);
}
export function changeProfileButton(state?: string): void {
  changeSidebarSetting("profile", state);
}
export function changeXPremiumButton(state?: string): void {
  changeSidebarSetting("xPremium", state, addXPremiumButton);
}
export function changeGrokButton(state?: string): void {
  changeSidebarSetting("grok", state);
}
export function changeMoreButton(state?: string): void {
  changeSidebarSetting("more", state);
}
export function changeTopicsButton(state?: string): void {
  changeSidebarSetting("topics", state, addTopicsButton);
}
export function changeCommunitiesButton(state?: string): void {
  changeSidebarSetting("communities", state, addCommunitiesButton);
}
export function changeListsButton(state?: string): void {
  changeSidebarSetting("lists", state, addListsButton);
}
export function changeAnalyticsButton(state?: string): void {
  changeSidebarSetting("analytics", state, addAnalyticsButton);
}
let tm1: ReturnType<typeof setTimeout> | undefined;
export function addXPremiumButton(): void {
  clearTimeout(tm1);
  tm1 = setTimeout(() => {
    addSidebarButton({
      name: "Premium",
      href: "/settings/premium",
      svgAsset: svgAssets.xPremium.normal,
    });
  }, 100);
}
let tm2: ReturnType<typeof setTimeout> | undefined;
export function addAnalyticsButton(): void {
  clearTimeout(tm2);
  tm2 = setTimeout(() => {
    addSidebarButton({
      name: "Analytics",
      svgAsset: svgAssets.grow.normal,
      onClick: () => {
        const screenName = document
          .querySelector(`a[role="link"][data-testid="AppTabBar_Profile_Link"]`)
          ?.getAttribute("href")
          ?.replace("/", "");
        if (!screenName) return;
        const url = createTypefullyUrl(
          {
            utm_content: "sidebar-grow-button",
            "mt-screen-name": screenName,
          },
          "grow",
        );
        if (screenName) window.open(url, "_blank");
      },
    });
  }, 200);
}
export function addTopicsButton(): void {
  addSidebarButton({
    name: "Topics",
    userHref: "/topics",
    svgAsset: svgAssets.topics.normal,
  });
}
export function addCommunitiesButton(): void {
  addSidebarButton({
    name: "Communities",
    userHref: "/communities",
    svgAsset: svgAssets.communities.normal,
  });
}
export function addListsButton(): void {
  addSidebarButton({
    name: "Lists",
    userHref: "/lists",
    svgAsset: svgAssets.lists.normal,
  });
}
export function changeUnreadCountBadge(unreadCountBadge?: string): void {
  switch (unreadCountBadge) {
    case "on":
      removeStyles("unreadCountBadge");
      break;
    case "off":
      addStyles(
        "unreadCountBadge",
        `${selectors.leftSidebarUnreadBadge} {
          display: none;
        }
        ${selectors.accountSwitcherButton} > div > svg+div[aria-label] {
          display: none;
        }`,
      );
      break;
  }
}
function addStyleToRemoveLabels() {
  addStyles(
    "removeLabels",
    `
    ${selectors.leftSidebarLinks} > * > div > div + div:last-child {
      display: none;
    }
    ${selectors.accountSwitcherLabel} {
      display: none;
    }
    `,
  );
}
function addStyleToShowLabelsOnHover() {
  addStyles(
    "hideLabels",
    `
    ${selectors.leftSidebarLabel},
    ${selectors.accountSwitcherLabel} {
      display: inline-block;
      opacity: 0;
      transition: 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    `,
  );
  addStyles(
    "showLabelsOnHover",
    `
    ${selectors.leftSidebarLabel_hover},
    ${selectors.accountSwitcherLabel_hover} {
      opacity: 1;
    }
    `,
  );
}
export async function changeNavigationButtonsLabels(setting?: string): Promise<void> {
  const isMessagesPage = window.location.pathname.startsWith("/messages");
  const isSearchPage = window.location.pathname.startsWith("/search");
  if (isMessagesPage || isSearchPage) {
    removeStyles("navigation-position");
    if (!stylesExist("customDMsAndSearchStyle")) {
      addStyles(
        "customDMsAndSearchStyle",
        `
${selectors.leftSidebar} {
flex: 0.5 1 auto;
}
@media only screen and (min-width: 1200px) {
  ${selectors.leftSidebar} {
    flex: 0.3 1 auto;
  }
}
${selectors.mainWrapper} {
align-items: flex-start;
}
`,
      );
    }
  } else {
    removeStyles("customDMsAndSearchStyle");
  }
  switch (setting) {
    case "never":
      addStyleToRemoveLabels();
      removeStyles("showLabelsOnHover");
      break;
    case "always":
      removeStyles("hideLabels");
      removeStyles("removeLabels");
      removeStyles("showLabelsOnHover");
      break;
    case "hover":
      removeStyles("removeLabels");
      addStyleToShowLabelsOnHover();
      break;
  }
}
export function changeNavigationCenter(navigationCenter?: string): void {
  switch (navigationCenter) {
    case "on":
      addStyles(
        "navigationCenter",
        `
        ${selectors.leftSidebar} > div > div > div {
          justify-content: center;
          padding-top: 0;
        }
        `,
      );
      break;
    case "off":
      removeStyles("navigationCenter");
      break;
  }
}
export function hideGrokDrawer(state?: string): void {
  switch (state) {
    case "on":
      // If typefully-grok-drawer-enabled class is present because we added it when grok button from a post is clicked.
      // We don't want to hide the drawer in this case.
      addStyles(
        "grokDrawer",
        `${selectors.grokDrawer}:not(.typefully-grok-drawer-enabled) {
          display: none !important;
        }`,
      );
      break;
    case "off":
      removeStyles("grokDrawer");
      break;
  }
}
