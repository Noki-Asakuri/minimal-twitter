/**
 * Static features are UI modifications that only need to be applied:
 * - Once when the extension loads
 * - When user changes related settings
 * These changes persist until the next settings update.
 */

import {
  KeyArticlesButton,
  KeyBookmarksButton,
  KeyCommunitiesButton,
  KeyCreatorStudioButton,
  KeyChatDrawerButton,
  KeyCustomCss,
  KeyExploreButton,
  KeyFollowCount,
  KeyFollowingTimeline,
  KeyGrokButton,
  KeyHideGrokDrawer,
  KeyHideOldReposts,
  KeyHideSameAuthorReposts,
  KeyHideViewCount,
  KeyHomeButton,
  KeyInterFont,
  KeyJobsButton,
  KeyLikeCount,
  KeyListsButton,
  KeyMessagesButton,
  KeyMoreButton,
  KeyNavigationButtonsLabels,
  KeyNavigationCenter,
  KeyNotificationsButton,
  KeyProfileButton,
  KeyRecentMedia,
  KeyRemovePromotedPosts,
  KeyRemoveTimelineBorders,
  KeyRemoveTimelineTabs,
  KeyRemoveTopicsToFollow,
  KeyRemoveTweetBorders,
  KeyReplyCount,
  KeyRetweetCount,
  KeySearchBar,
  KeyDownloadVideoShareMenu,
  KeyPostVideoShareMenu,
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
} from "../../../../storage-keys";
import { changeCustomCss } from "../options/customCss";
import { changeFollowingAndFollowersCounts, changeLikeCount, changeReplyCount, changeRetweetCount } from "../options/hideVanityCounts";
import changeHideViewCounts from "../options/hideViewCount";
import {
  changeChatDrawerButton,
  changeHideSearchBar,
  changeInterFont,
  changeTitleNotifications,
  changeTransparentSearchBar,
  changeTweetButton,
} from "../options/interface";
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
} from "../options/navigation";
import {
  changeFollowingTimeline,
  changePromotedPosts,
  changeRecentMedia,
  changeStickyHeader,
  changeTimelineBorders,
  changeTimelineTabs,
  changeTimelineWidth,
  changeTopicsToFollow,
  changeTrendsHomeTimeline,
  changeTweetBorders,
} from "../options/timeline";
import { changeTypefullyEnhancementsButtons } from "../options/typefully";
import { changeWriterMode } from "../options/writerMode";
import {
  changeDownloadVideoShareMenu,
  changePostVideoShareMenu,
  changeSendViaChatShareMenu,
  changeSendViaDirectMessageShareMenu,
  changeSharePostViaShareMenu,
} from "../options/shareMenu";
import { changeRepostFilters } from "../options/reposts";

export const staticFeatures = {
  timeline: (data) => {
    changeTimelineWidth(data[KeyTimelineWidth]);
    changeTimelineBorders(data[KeyRemoveTimelineBorders]);
    changeTweetBorders(data[KeyRemoveTweetBorders]);
    changeStickyHeader(data[KeyStickyHeader]);
    changeWriterMode(data[KeyWriterMode]);
    changeFollowingTimeline(data[KeyFollowingTimeline]);
    changeHideViewCounts(data[KeyHideViewCount]);
    changeRepostFilters({
      hideSameAuthorReposts: data[KeyHideSameAuthorReposts],
      hideOldReposts: data[KeyHideOldReposts],
    });
    changeRecentMedia(data[KeyRecentMedia]);
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
  navigation: (data) => {
    changeSidebarLogo(data[KeySidebarLogo]);
    changeNavigationButtonsLabels(data[KeyNavigationButtonsLabels]);
    changeNavigationCenter(data[KeyNavigationCenter]);
    changeUnreadCountBadge(data[KeyUnreadCountBadge]);
    hideGrokDrawer(data[KeyHideGrokDrawer]);
  },
  interface: (data) => {
    changeInterFont(data[KeyInterFont]);
    changeHideSearchBar(data[KeySearchBar]);
    changeTransparentSearchBar(data[KeyTransparentSearch]);
    changeTitleNotifications(data[KeyTitleNotifications]);
    changeTweetButton(data[KeyTweetButton]);
    changeChatDrawerButton(data[KeyChatDrawerButton]);
  },
  sidebar: (data) => {
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
  advanced: (data) => {
    changeCustomCss(data[KeyCustomCss]);
  },
  shareMenu: (data) => {
    changeSendViaDirectMessageShareMenu(data[KeySendViaDirectMessageShareMenu]);
    changeSendViaChatShareMenu(data[KeySendViaChatShareMenu]);
    changeSharePostViaShareMenu(data[KeySharePostViaShareMenu]);
    changePostVideoShareMenu(data[KeyPostVideoShareMenu]);
    changeDownloadVideoShareMenu(data[KeyDownloadVideoShareMenu]);
  },
};

export const applyStaticFeatures = async (data) => {
  Object.values(staticFeatures).forEach((feature) => feature(data));
};
