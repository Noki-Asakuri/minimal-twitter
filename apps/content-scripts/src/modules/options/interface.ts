import { KeyTitleNotifications } from "@minimal-twitter/shared";
import selectors from "@content/selectors";
import addStyles, { removeStyles } from "@content/modules/utilities/add-styles";
import { getStorage } from "@content/modules/utilities/storage";
// Function to change the title notification count
let nt: ReturnType<typeof setTimeout> | undefined;
export function changeTitleNotifications(tf?: string): void {
  async function run() {
    let setting = tf;
    if (!tf) {
      setting = await getStorage(KeyTitleNotifications);
    }
    const favicon = document.querySelector<HTMLLinkElement>('link[rel="shortcut icon"]');
    if (!favicon) return;
    if (setting === "on") {
      favicon.setAttribute("href", favicon.href.replace("twitter.ico", "twitter-pip.2.ico"));
    } else {
      if (document.title.charAt(0) === "(") {
        document.title = document.title.split(" ").slice(1).join(" ");
      }
      if (document.title.charAt(0) === "(") {
        document.title = document.title.split(" ").slice(1).join(" ");
      }
      clearTimeout(nt);
      nt = setTimeout(() => {
        favicon.setAttribute("href", favicon.href.replace("-pip.2", ""));
      });
    }
  }
  run();
  const observer = new MutationObserver(() => {
    run();
  });
  const config = { subtree: true, characterData: true, childList: true };
  const target = document.querySelector("title");
  if (target) observer.observe(target, config);
}
export function changeFontFamily(fontFamily?: string): void {
  if (!fontFamily || fontFamily === "default") {
    removeStyles("fontFamily");
    return;
  }

  let fontFace = "";
  let selectedFontFamily = JSON.stringify(fontFamily);

  if (fontFamily === "builtin:inter") {
    selectedFontFamily = '"Minimal Twitter Inter"';
    fontFace = `
      @font-face {
        font-family: "Minimal Twitter Inter";
        src: url("${chrome.runtime.getURL("fonts/inter-subset.woff2")}") format("woff2");
        font-style: normal;
        font-weight: 100 900;
        font-display: swap;
      }
    `;
  }

  if (fontFamily === "builtin:geist") {
    selectedFontFamily = '"Minimal Twitter Geist"';
    fontFace = `
      @font-face {
        font-family: "Minimal Twitter Geist";
        src: url("${chrome.runtime.getURL("fonts/geist-latin.woff2")}") format("woff2");
        font-style: normal;
        font-weight: 100 900;
        font-display: swap;
      }
    `;
  }

  addStyles(
    "fontFamily",
    `
      ${fontFace}

      body, div, span, input, textarea, button, select {
        font-family: ${selectedFontFamily}, TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
      }
    `,
  );
}
// Function to change Tweet Button
export function changeTweetButton(tweetButton?: string): void {
  switch (tweetButton) {
    case "off":
      addStyles(
        "tweetButton",
        `
        ${selectors.tweetButton} {
          visibility: hidden;
        }
        `,
      );
      break;
    case "on":
      removeStyles("tweetButton");
      break;
  }
}
export function changeChatDrawerButton(chatDrawerButton?: string): void {
  switch (chatDrawerButton) {
    case "off":
      addStyles(
        "chatDrawerButton",
        `
        ${selectors.chatDrawerButton} {
          display: none !important;
          visibility: hidden !important;
        }
        `,
      );
      break;
    case "on":
      removeStyles("chatDrawerButton");
      break;
  }
}
export function changeHideSearchBar(searchBar?: string): void {
  switch (searchBar) {
    case "off":
      addStyles(
        "searchBar",
        `${selectors.searchBox} {
          display: none;
          visibility: hidden;
        }`,
      );
      addStyles(
        "trendsHomeTimeline-more",
        `@media only screen and (min-width: 1265px) {
          ${selectors.rightSidebar} section[aria-labelledby^="accessible-list-"] {
            top: 12px !important;
          }
        }`,
      );
      break;
    case "on":
      removeStyles("searchBar");
      addStyles(
        "trendsHomeTimeline-more",
        `@media only screen and (min-width: 1265px) {
          ${selectors.rightSidebar} section[aria-labelledby^="accessible-list-"] {
            top: unset;
          }
        }`,
      );
      break;
  }
}
export function changeTransparentSearchBar(transparentSearch?: string): void {
  switch (transparentSearch) {
    case "on":
      addStyles(
        "transparentSearch",
        `
        ${selectors.searchBox} > div:nth-child(1) > div {
          background-color: transparent;
          /* Keep the border's dimensions so toggling this setting never shifts the search layout. */
          border-color: transparent;
        }
        `,
      );
      break;
    case "off":
      removeStyles("transparentSearch");
      break;
  }
}
