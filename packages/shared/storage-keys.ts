export const KeyExtensionStatus = "extensionStatus";
export const KeyListsButton = "listsButton";
export const KeyCommunitiesButton = "communitiesButton";
export const KeyTopicsButton = "topicsButton";
export const KeyXPremiumButton = "xPremiumButton";
export const KeyVerifiedOrgsButton = "verifiedOrgsButton";
export const KeyTypefullyGrowTab = "typefullyGrowTab";
export const KeyGrokButton = "grokButton";
export const KeyTrendsHomeTimeline = "trendsHomeTimeline";
export const KeyRemoveTimelineTabs = "removeTimelineTabs";
export const KeyWriterMode = "writerMode";
export const KeyTimelineWidth = "timelineWidth";
export const KeyRemoveTimelineBorders = "timelineBorders";
export const KeyRemoveTweetBorders = "tweetBorders";
export const KeyStickyHeader = "stickyHeader";
export const KeySidebarLogo = "sidebarLogo";
export const KeyHomeButton = "homeButton";
export const KeyExploreButton = "exploreButton";
export const KeyNotificationsButton = "notificationsButton";
export const KeyMessagesButton = "messagesButton";
export const KeyBookmarksButton = "bookmarksButton";
export const KeyCreatorStudioButton = "creatorStudioButton";
export const KeyJobsButton = "jobsButton";
export const KeyArticlesButton = "articles";
export const KeyMoreButton = "moreButton";
export const KeyProfileButton = "profileButton";
export const KeyNavigationButtonsLabels = "navigationButtonsLabels";
export const KeyNavigationCenter = "navigationCenter";
export const KeyUnreadCountBadge = "unreadCountBadge";
export const KeyAllVanity = "allVanity";
export const KeyReplyCount = "replyCount";
export const KeyRetweetCount = "retweetCount";
export const KeyLikeCount = "likeCount";
export const KeyFollowCount = "followCount";
export const KeyTweetButton = "tweetButton";
export const KeyChatDrawerButton = "chatDrawerButton";
export const KeySearchBar = "searchBar";
export const KeyTransparentSearch = "transparentSearch";
export const KeyRemovePromotedPosts = "removePromotedPosts";
export const KeyRemoveTopicsToFollow = "removeTopicsToFollow";
export const KeyHideSameAuthorReposts = "hideSameAuthorReposts";
export const KeyHideOldReposts = "hideOldReposts";
export const KeyHideReactionTweets = "hideReactionTweets";
export const KeyTypefullyEnhancementsButtons = "typefullyEnhancementsButtons";
export const KeyInterFont = "interFont";
export const KeyTitleNotifications = "titleNotifications";
export const KeyCustomCss = "customCss";
export const KeyHideViewCount = "hideViewCount";
export const KeyHideGrokDrawer = "hideGrokDrawer";
export const KeySendViaChatShareMenu = "sendViaChatShareMenu";
export const KeySendViaDirectMessageShareMenu = "sendViaDirectMessageShareMenu";
export const KeySharePostViaShareMenu = "sharePostViaShareMenu";
export const KeyPostVideoShareMenu = "postVideoShareMenu";
export const KeyDownloadVideoShareMenu = "downloadVideoShareMenu";

export const allSettingsKeys = [
  // Extension Status
  KeyExtensionStatus,

  // Timeline Features
  KeyTimelineWidth,
  KeyRemoveTimelineBorders,
  KeyRemoveTweetBorders,
  KeyStickyHeader,
  KeyWriterMode,
  KeyHideViewCount,
  KeyHideSameAuthorReposts,
  KeyHideOldReposts,
  KeyHideReactionTweets,
  KeyTrendsHomeTimeline,
  KeyRemovePromotedPosts,
  KeyRemoveTopicsToFollow,
  KeyRemoveTimelineTabs,
  KeyTypefullyEnhancementsButtons,
  KeyFollowCount,
  KeyReplyCount,
  KeyRetweetCount,
  KeyLikeCount,

  // Navigation Features
  KeySidebarLogo,
  KeyNavigationButtonsLabels,
  KeyNavigationCenter,
  KeyUnreadCountBadge,
  KeyHideGrokDrawer,

  // Interface Features
  KeyInterFont,
  KeySearchBar,
  KeyTransparentSearch,
  KeyTitleNotifications,
  KeyTweetButton,
  KeyChatDrawerButton,

  // Sidebar Features
  KeyHomeButton,
  KeyExploreButton,
  KeyNotificationsButton,
  KeyMessagesButton,
  KeyGrokButton,
  KeyXPremiumButton,
  KeyListsButton,
  KeyBookmarksButton,
  KeyCreatorStudioButton,
  KeyJobsButton,
  KeyCommunitiesButton,
  KeyArticlesButton,
  KeyTopicsButton,
  KeyVerifiedOrgsButton,
  KeyTypefullyGrowTab,
  KeyProfileButton,
  KeyMoreButton,

  // Share Menu Features
  KeySendViaDirectMessageShareMenu,
  KeySendViaChatShareMenu,
  KeySharePostViaShareMenu,
  KeyPostVideoShareMenu,
  KeyDownloadVideoShareMenu,

  // Advanced Features
  KeyCustomCss,

  // Legacy/Unused
  KeyAllVanity,
] as const;

export const defaultPreferences = {
  // Extension Status
  [KeyExtensionStatus]: "on",

  // Timeline Features
  [KeyTimelineWidth]: 700,
  [KeyRemoveTimelineBorders]: "off",
  [KeyRemoveTweetBorders]: "off",
  [KeyStickyHeader]: "on",
  [KeyWriterMode]: "off",
  [KeyHideViewCount]: "off",
  [KeyHideSameAuthorReposts]: "off",
  [KeyHideOldReposts]: "off",
  [KeyHideReactionTweets]: "off",
  [KeyTrendsHomeTimeline]: "off",
  [KeyRemovePromotedPosts]: "on",
  [KeyRemoveTopicsToFollow]: "on",
  [KeyRemoveTimelineTabs]: "off",
  [KeyTypefullyEnhancementsButtons]: "on",
  [KeyFollowCount]: "on",
  [KeyReplyCount]: "on",
  [KeyRetweetCount]: "on",
  [KeyLikeCount]: "on",

  // Navigation Features
  [KeySidebarLogo]: "off",
  [KeyNavigationButtonsLabels]: "never",
  [KeyNavigationCenter]: "off",
  [KeyUnreadCountBadge]: "off",
  [KeyHideGrokDrawer]: "on",

  // Interface Features
  [KeyInterFont]: "off",
  [KeySearchBar]: "on",
  [KeyTransparentSearch]: "off",
  [KeyTitleNotifications]: "on",
  [KeyTweetButton]: "on",
  [KeyChatDrawerButton]: "on",

  // Sidebar Features
  [KeyHomeButton]: "on",
  [KeyExploreButton]: "on",
  [KeyNotificationsButton]: "on",
  [KeyMessagesButton]: "on",
  [KeyGrokButton]: "on",
  [KeyXPremiumButton]: "off",
  [KeyListsButton]: "on",
  [KeyBookmarksButton]: "on",
  [KeyCreatorStudioButton]: "on",
  [KeyJobsButton]: "off",
  [KeyCommunitiesButton]: "on",
  [KeyArticlesButton]: "off",
  [KeyTopicsButton]: "off",
  [KeyVerifiedOrgsButton]: "off",
  [KeyTypefullyGrowTab]: "on",
  [KeyProfileButton]: "on",
  [KeyMoreButton]: "on",

  // Share Menu Features
  [KeySendViaDirectMessageShareMenu]: "on",
  [KeySendViaChatShareMenu]: "on",
  [KeySharePostViaShareMenu]: "on",
  [KeyPostVideoShareMenu]: "on",
  [KeyDownloadVideoShareMenu]: "on",

  // Advanced Features
  [KeyCustomCss]: "",
};

export type PreferenceKey = keyof typeof defaultPreferences;
export type Preferences = {
  [Key in PreferenceKey]: (typeof defaultPreferences)[Key] extends number ? number : string;
};
