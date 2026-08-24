/**
 * Dynamic features that respond to Twitter's DOM updates:
 * - Writer mode
 * - Navigation buttons
 * - Timeline customizations
 * - View counts
 * - Typefully integration
 * Applied via MutationObserver on relevant DOM changes
 */
import {
  KeyCommunitiesButton,
  KeyHideGrokDrawer,
  KeyHideOldReposts,
  KeyHideReactionTweets,
  KeyHideSameAuthorReposts,
  KeyHideViewCount,
  KeyListsButton,
  KeyNavigationButtonsLabels,
  KeyProfileMediaDefaultView,
  KeyRemoveTimelineTabs,
  KeyTopicsButton,
  KeyTrendsHomeTimeline,
  KeyTypefullyGrowTab,
  KeyWriterMode,
  KeyXPremiumButton,
} from "@minimal-twitter/shared";
import type { Preferences } from "@minimal-twitter/shared";
import changeHideViewCounts from "@content/modules/options/hide-view-count";
import {
  addAnalyticsButton,
  addCommunitiesButton,
  addListsButton,
  addTopicsButton,
  addXPremiumButton,
  changeNavigationButtonsLabels,
  hideGrokDrawer,
} from "@content/modules/options/navigation";
import { filterReposts } from "@content/modules/options/reposts";
import {
  addNewPostsPillCloseButton,
  changeProfileMediaDefaultView,
  changeTimelineTabs,
  changeTrendsHomeTimeline,
  enableGrokDrawerOnGrokButtonClick,
} from "@content/modules/options/timeline";
import { changeWriterMode } from "@content/modules/options/writer-mode";
import {
  addTypefullyComposerPlug,
  addTypefullyReplyPlug,
  addTypefullySchedulePlug,
  addTypefullySecurityAndAccountAccessPlug,
  saveCurrentReplyToLink,
} from "@content/modules/typefully-plugs";
import hideRightSidebar from "@content/modules/utilities/hide-right-sidebar";
import { updateLeftSidebarPositioning } from "@content/modules/utilities/left-sidebar-position";
import { addSmallerSearchBarStyle } from "@content/modules/utilities/other-styles";
import { getStorage } from "@content/modules/utilities/storage";
import throttle from "@content/modules/utilities/throttle";
const dynamicFeatures = {
  async general() {
    const data = await getStorage([
      KeyHideViewCount,
      KeyHideGrokDrawer,
      KeyHideSameAuthorReposts,
      KeyHideOldReposts,
      KeyHideReactionTweets,
      KeyProfileMediaDefaultView,
    ]);
    changeHideViewCounts(data[KeyHideViewCount]);
    filterReposts({
      hideSameAuthorReposts: data[KeyHideSameAuthorReposts],
      hideOldReposts: data[KeyHideOldReposts],
      hideReactionTweets: data[KeyHideReactionTweets],
    });
    hideRightSidebar();
    addSmallerSearchBarStyle();
    updateLeftSidebarPositioning();
    changeProfileMediaDefaultView(data[KeyProfileMediaDefaultView]);
    addNewPostsPillCloseButton();
    enableGrokDrawerOnGrokButtonClick(data[KeyHideGrokDrawer]);
  },
  typefullyPlugs() {
    saveCurrentReplyToLink();
    addTypefullyReplyPlug();
    addTypefullyComposerPlug();
    addTypefullySecurityAndAccountAccessPlug();
    addTypefullySchedulePlug();
  },
  navigation(data: Pick<Preferences, typeof KeyNavigationButtonsLabels>) {
    changeNavigationButtonsLabels(data[KeyNavigationButtonsLabels]);
  },
  async sidebarButtons() {
    const data = await getStorage([
      KeyListsButton,
      KeyCommunitiesButton,
      KeyTopicsButton,
      KeyXPremiumButton,
      KeyTypefullyGrowTab,
    ]);
    if (!data) return;
    if (data[KeyListsButton] === "on") addListsButton();
    if (data[KeyCommunitiesButton] === "on") addCommunitiesButton();
    if (data[KeyTopicsButton] === "on") addTopicsButton();
    if (data[KeyXPremiumButton] === "on") addXPremiumButton();
    if (data[KeyTypefullyGrowTab] === "on") addAnalyticsButton();
  },
  async writerMode(
    data: Pick<
      Preferences,
      typeof KeyWriterMode | typeof KeyRemoveTimelineTabs | typeof KeyTrendsHomeTimeline
    >,
  ) {
    if (data[KeyWriterMode] === "on") {
      changeWriterMode(data[KeyWriterMode]);
    } else {
      changeTimelineTabs(data[KeyRemoveTimelineTabs], data[KeyWriterMode]);
      changeTrendsHomeTimeline(data[KeyTrendsHomeTimeline], data[KeyWriterMode]);
    }
  },
};
async function applyDynamicFeatures(): Promise<void> {
  const data = await getStorage([
    KeyWriterMode,
    KeyTrendsHomeTimeline,
    KeyRemoveTimelineTabs,
    KeyHideGrokDrawer,
    KeyNavigationButtonsLabels,
  ]);
  if (data) {
    dynamicFeatures.general();
    dynamicFeatures.typefullyPlugs();
    await dynamicFeatures.sidebarButtons();
    await dynamicFeatures.writerMode(data);
    dynamicFeatures.navigation(data);
    // The Grok drawer appears dynamically, so we need to handle it here as well
    // as in the static features module
    hideGrokDrawer(data?.[KeyHideGrokDrawer]);
  }
}

const throttledRunDynamicFeatures = throttle(applyDynamicFeatures, 50);

export function runDynamicFeatures(): void {
  throttledRunDynamicFeatures();
}
