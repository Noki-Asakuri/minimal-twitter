/**
 * Static features are UI modifications that only need to be applied:
 * - Once when the extension loads
 * - When user changes related settings
 * These changes persist until the next settings update.
 */
import {
  KeyArticlesButton,
  KeyBookmarksButton,
  KeyChatDrawerButton,
  KeyCommunitiesButton,
  KeyCreatorStudioButton,
  KeyCustomCss,
  KeyDownloadVideoShareMenu,
  KeyExploreButton,
  KeyFollowCount,
  KeyGrokButton,
  KeyHideGrokDrawer,
  KeyHideOldReposts,
  KeyHideReactionTweets,
  KeyHideSameAuthorReposts,
  KeyHideViewCount,
  KeyHomeButton,
  KeyFontFamily,
  KeyJobsButton,
  KeyLikeCount,
  KeyListsButton,
  KeyMessagesButton,
  KeyMoreButton,
  KeyNavigationButtonsLabels,
  KeyNavigationCenter,
  KeyNotificationsButton,
  KeyPostVideoShareMenu,
  KeyProfileButton,
  KeyRemovePromotedPosts,
  KeyRemoveTimelineBorders,
  KeyRemoveTimelineTabs,
  KeyRemoveTopicsToFollow,
  KeyRemoveTweetBorders,
  KeyReplyCount,
  KeyRetweetCount,
  KeySearchBar,
  KeySendViaChatShareMenu,
  KeySendViaDirectMessageShareMenu,
  KeySharePostViaShareMenu,
  KeySidebarLogo,
  KeyStickyHeader,
  KeyTimelineWidth,
  KeyTitleNotifications,
  KeyTopicsButton,
  KeyTransparentSearch,
  KeyTrendsHomeTimeline,
  KeyTweetButton,
  KeyTypefullyEnhancementsButtons,
  KeyTypefullyGrowTab,
  KeyUnreadCountBadge,
  KeyVerifiedOrgsButton,
  KeyWriterMode,
  KeyXPremiumButton,
} from "@minimal-twitter/shared";
import type { Preferences } from "@minimal-twitter/shared";
import { changeCustomCss } from "@content/modules/options/custom-css";
import {
  changeFollowingAndFollowersCounts,
  changeLikeCount,
  changeReplyCount,
  changeRetweetCount,
} from "@content/modules/options/hide-vanity-counts";
import changeHideViewCounts from "@content/modules/options/hide-view-count";
import {
  changeChatDrawerButton,
  changeHideSearchBar,
  changeFontFamily,
  changeTitleNotifications,
  changeTransparentSearchBar,
  changeTweetButton,
} from "@content/modules/options/interface";
import {
  changeAnalyticsButton,
  changeArticlesButton,
  changeBookmarksButton,
  changeCommunitiesButton,
  changeCreatorStudioButton,
  changeExploreButton,
  changeGrokButton,
  changeHomeButton,
  changeJobsButton,
  changeListsButton,
  changeMessagesButton,
  changeMoreButton,
  changeNavigationButtonsLabels,
  changeNavigationCenter,
  changeNotificationsButton,
  changeProfileButton,
  changeSidebarLogo,
  changeTopicsButton,
  changeUnreadCountBadge,
  changeVerifiedOrgsButton,
  changeXPremiumButton,
  hideGrokDrawer,
} from "@content/modules/options/navigation";
import { changeRepostFilters } from "@content/modules/options/reposts";
import {
  changeDownloadVideoShareMenu,
  changePostVideoShareMenu,
  changeSendViaChatShareMenu,
  changeSendViaDirectMessageShareMenu,
  changeSharePostViaShareMenu,
} from "@content/modules/options/share-menu";
import {
  changePromotedPosts,
  changeStickyHeader,
  changeTimelineBorders,
  changeTimelineTabs,
  changeTimelineWidth,
  changeTopicsToFollow,
  changeTrendsHomeTimeline,
  changeTweetBorders,
} from "@content/modules/options/timeline";
import { changeTypefullyEnhancementsButtons } from "@content/modules/options/typefully";
import { changeWriterMode } from "@content/modules/options/writer-mode";
const staticFeatures = {
  timeline(data: Partial<Preferences>) {
    changeTimelineWidth(data[KeyTimelineWidth]);
    changeTimelineBorders(data[KeyRemoveTimelineBorders]);
    changeTweetBorders(data[KeyRemoveTweetBorders]);
    changeStickyHeader(data[KeyStickyHeader]);
    changeWriterMode(data[KeyWriterMode]);
    changeHideViewCounts(data[KeyHideViewCount]);
    changeRepostFilters({
      hideSameAuthorReposts: data[KeyHideSameAuthorReposts],
      hideOldReposts: data[KeyHideOldReposts],
      hideReactionTweets: data[KeyHideReactionTweets],
    });
    changeTrendsHomeTimeline(data[KeyTrendsHomeTimeline], data[KeyWriterMode]);
    changePromotedPosts(data[KeyRemovePromotedPosts]);
    changeTopicsToFollow(data[KeyRemoveTopicsToFollow]);
    changeTimelineTabs(data[KeyRemoveTimelineTabs], data[KeyWriterMode]);
    changeTypefullyEnhancementsButtons(data[KeyTypefullyEnhancementsButtons]);
    changeFollowingAndFollowersCounts(data[KeyFollowCount]);
    changeReplyCount(data[KeyReplyCount]);
    changeRetweetCount(data[KeyRetweetCount]);
    changeLikeCount(data[KeyLikeCount]);
  },
  navigation(data: Partial<Preferences>) {
    changeSidebarLogo(data[KeySidebarLogo]);
    changeNavigationButtonsLabels(data[KeyNavigationButtonsLabels]);
    changeNavigationCenter(data[KeyNavigationCenter]);
    changeUnreadCountBadge(data[KeyUnreadCountBadge]);
    hideGrokDrawer(data[KeyHideGrokDrawer]);
  },
  interface(data: Partial<Preferences>) {
    changeFontFamily(data[KeyFontFamily]);
    changeHideSearchBar(data[KeySearchBar]);
    changeTransparentSearchBar(data[KeyTransparentSearch]);
    changeTitleNotifications(data[KeyTitleNotifications]);
    changeTweetButton(data[KeyTweetButton]);
    changeChatDrawerButton(data[KeyChatDrawerButton]);
  },
  sidebar(data: Partial<Preferences>) {
    changeHomeButton(data[KeyHomeButton]);
    changeExploreButton(data[KeyExploreButton]);
    changeNotificationsButton(data[KeyNotificationsButton]);
    changeMessagesButton(data[KeyMessagesButton]);
    changeBookmarksButton(data[KeyBookmarksButton]);
    changeCreatorStudioButton(data[KeyCreatorStudioButton]);
    changeJobsButton(data[KeyJobsButton]);
    changeArticlesButton(data[KeyArticlesButton]);
    changeCommunitiesButton(data[KeyCommunitiesButton]);
    changeTopicsButton(data[KeyTopicsButton]);
    changeListsButton(data[KeyListsButton]);
    changeProfileButton(data[KeyProfileButton]);
    changeXPremiumButton(data[KeyXPremiumButton]);
    changeGrokButton(data[KeyGrokButton]);
    changeVerifiedOrgsButton(data[KeyVerifiedOrgsButton]);
    changeAnalyticsButton(data[KeyTypefullyGrowTab]);
    changeMoreButton(data[KeyMoreButton]);
  },
  advanced(data: Partial<Preferences>) {
    changeCustomCss(data[KeyCustomCss]);
  },
  shareMenu(data: Partial<Preferences>) {
    changeSendViaDirectMessageShareMenu(data[KeySendViaDirectMessageShareMenu]);
    changeSendViaChatShareMenu(data[KeySendViaChatShareMenu]);
    changeSharePostViaShareMenu(data[KeySharePostViaShareMenu]);
    changePostVideoShareMenu(data[KeyPostVideoShareMenu]);
    changeDownloadVideoShareMenu(data[KeyDownloadVideoShareMenu]);
  },
};
export function applyStaticFeatures(data: Partial<Preferences>): void {
  for (const feature of Object.values(staticFeatures)) feature(data);
}
