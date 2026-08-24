const mainWrapper = `main[role="main"]`;
const mainColumn = `[data-testid="primaryColumn"]`;
const leftSidebar = `header[role="banner"]`;
const leftSidebarLinks = `${leftSidebar} nav[role="navigation"]`;
const accountSwitcherButton = `[data-testid="SideNav_AccountSwitcher_Button"]`;
const rightSidebar = `[data-testid="sidebarColumn"]`;
const tweetCounts = `[role="group"][id*="id__"]:only-child`;
const tweet = `[data-testid="tweet"][role="article"]`;
const searchBox = `${rightSidebar} form[role="search"]`;
const modalExternalWrapper = `div[role="group"]`;
const modalWrapper = `div[aria-labelledby="modal-header"][role="dialog"]`;
const selectors = {
  // Layout
  mainWrapper,
  mainColumn,
  topHeader: `${mainColumn} > div > div:nth-of-type(1)`,
  timelineTabs: `${mainColumn} > div:first-child > div:first-child > div:first-child > div:only-child > nav:only-child`,
  leftSidebar,
  leftSidebarLinks,
  leftSidebarUnreadBadge: `${leftSidebarLinks} a svg + div[aria-label]:only-of-type`,
  sidebarLinks: {
    logo: `${leftSidebar} div:first-child > div:first-child div:first-child > div:first-child > h1:only-child[role="heading"]`,
    home: `${leftSidebar} [data-testid="AppTabBar_Home_Link"]`,
    explore: `${leftSidebar} [data-testid="AppTabBar_Explore_Link"]`,
    notifications: `${leftSidebar} [data-testid="AppTabBar_Notifications_Link"]`,
    messages: `${leftSidebar} [data-testid="AppTabBar_DirectMessage_Link"]`,
    bookmarks: `${leftSidebar} a[href*="bookmarks"]`,
    creatorStudio: `${leftSidebar} a[href*="/i/jf/creators/studio"][role="link"][aria-label]`,
    jobs: `${leftSidebar} a[href*="jobs"]`,
    articles: 'a[href="/compose/articles"]',
    topics: `${leftSidebar} a[href*=topics]`,
    circles: `${leftSidebar} a[href*=circles]`,
    communities: `${leftSidebar} a[href*=communities]`,
    profile: `${leftSidebar} [data-testid="AppTabBar_Profile_Link"]`,
    lists: `${leftSidebar} a[href*="lists"][role="link"][aria-label]`,
    xPremium: `${leftSidebar} a[href*="premium"][role="link"][aria-label]`,
    verifiedOrgs: `${leftSidebar} a[href*="verified-orgs"][role="link"][aria-label]`,
    analytics: `${leftSidebar} .mt-sidebar-button[aria-label="Analytics"]`,
    grok: `${leftSidebar} a[href*="grok"][role="link"][aria-label]`,
    more: `${leftSidebar} [data-testid="AppTabBar_More_Menu"]`,
  },
  accountSwitcherButton,
  leftSidebarLabel: `${leftSidebarLinks} > * > div > div + div:last-child`,
  accountSwitcherLabel: `${accountSwitcherButton} > div:not(:first-child)`,
  leftSidebarLabel_hover: `${leftSidebarLinks}:hover > * > div > div + div:last-child`,
  accountSwitcherLabel_hover: `${accountSwitcherButton}:hover > div:not(:first-child)`,
  rightSidebar,
  grokDrawer: `[data-testid="GrokDrawer"]`,
  grokDrawerHeader: `div[data-testid="GrokDrawerHeader"]`,
  // Timeline
  timelineTablist: `div[data-testid='ScrollSnap-List'][role='tablist']`,
  timelineTab: `div[role='tab']`,
  timelineOptions: `div[aria-label='Timeline options']`,
  topTweetsOn: `div[aria-label='Top Tweets on']`,
  newPostsPill: `[data-testid="pill-container"]`,
  menuItem: `div[role='menuitem'][tabindex='0']`,
  tweetCounts,
  viewCount: tweetCounts + " a[href*='/analytics']",
  tweet,
  tweetSpan: `${tweet} div > div:only-child > span:only-child > span`,
  grokSvg:
    'svg:has(path[d="M12.745 20.54l10.97-8.19c.539-.4 1.307-.244 1.564.38 1.349 3.288.746 7.241-1.938 9.955-2.683 2.714-6.417 3.31-9.83 1.954l-3.728 1.745c5.347 3.697 11.84 2.782 15.898-1.324 3.219-3.255 4.216-7.692 3.284-11.693l.008.009c-1.351-5.878.332-8.227 3.782-13.031L33 0l-4.54 4.59v-.014L12.743 20.544m-2.263 1.987c-3.837-3.707-3.175-9.446.1-12.755 2.42-2.449 6.388-3.448 9.852-1.979l3.72-1.737c-.67-.49-1.53-1.017-2.515-1.387-4.455-1.854-9.789-.931-13.41 2.728-3.483 3.523-4.579 8.94-2.697 13.561 1.405 3.454-.899 5.898-3.22 8.364C1.49 30.2.666 31.074 0 32l10.478-9.466"])',
  // Search
  searchBox,
  searchBoxInput: `${searchBox} input:only-child`,
  searchListBox: `${searchBox} div[role="listbox"]`,
  // Modals
  modalExternalWrapper,
  modalBackground: `${modalExternalWrapper} > div:empty`,
  modalWrapper,
  modalUi: `${modalWrapper} > div`,
  tweetButton: `[data-testid="SideNav_NewTweet_Button"]`,
  chatDrawerButton: `[data-testid="chat-drawer-main"], [data-testid="chat-drawer-root"]`,
  // Settings
  securityAndAccountAccess: `[data-testid="accountAccessScreen"]`,
};
export default selectors;
