import addStyles, { removeStyles } from "@content/modules/utilities/add-styles";
const sendViaDirectMessageMenuItem =
  'div[role="menuitem"]:has(path[clip-rule="evenodd"][d^="M8.902"])';
const sendViaChatMenuItem =
  'div[role="menuitem"]:has(path[clip-rule="evenodd"][d^="M12 4c-4.418"])';
const sharePostViaMenuItem = 'div[role="menuitem"]:has(path[d^="M12 2.59"])';
const postVideoMenuItem = 'div[role="menuitem"]:has(path[d^="M10.938 4.5"])';
const downloadVideoMenuItem = 'div[role="menuitem"]:has(path[d^="M11.99 16"])';
export function changeSendViaDirectMessageShareMenu(sendViaDirectMessageShareMenu?: string): void {
  switch (sendViaDirectMessageShareMenu) {
    case "off":
      addStyles(
        "sendViaDirectMessageShareMenu",
        `
        ${sendViaDirectMessageMenuItem} {
          display: none !important;
        }
        `,
      );
      break;
    case "on":
      removeStyles("sendViaDirectMessageShareMenu");
      break;
  }
}
export function changeSendViaChatShareMenu(sendViaChatShareMenu?: string): void {
  switch (sendViaChatShareMenu) {
    case "off":
      addStyles(
        "sendViaChatShareMenu",
        `
        ${sendViaChatMenuItem} {
          display: none !important;
        }
        `,
      );
      break;
    case "on":
      removeStyles("sendViaChatShareMenu");
      break;
  }
}
export function changeSharePostViaShareMenu(sharePostViaShareMenu?: string): void {
  switch (sharePostViaShareMenu) {
    case "off":
      addStyles(
        "sharePostViaShareMenu",
        `
        ${sharePostViaMenuItem} {
          display: none !important;
        }
        `,
      );
      break;
    case "on":
      removeStyles("sharePostViaShareMenu");
      break;
  }
}
export function changePostVideoShareMenu(postVideoShareMenu?: string): void {
  switch (postVideoShareMenu) {
    case "off":
      addStyles(
        "postVideoShareMenu",
        `
        ${postVideoMenuItem} {
          display: none !important;
        }
        `,
      );
      break;
    case "on":
      removeStyles("postVideoShareMenu");
      break;
  }
}
export function changeDownloadVideoShareMenu(downloadVideoShareMenu?: string): void {
  switch (downloadVideoShareMenu) {
    case "off":
      addStyles(
        "downloadVideoShareMenu",
        `
        ${downloadVideoMenuItem} {
          display: none !important;
        }
        `,
      );
      break;
    case "on":
      removeStyles("downloadVideoShareMenu");
      break;
  }
}
