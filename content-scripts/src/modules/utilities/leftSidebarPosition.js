import selectors from "../../selectors";
import addStyles, { removeStyles, stylesExist } from "./addStyles";

export function updateLeftSidebarPositioning() {
  const usesCustomPageLayout =
    window.location.pathname.startsWith("/messages") ||
    window.location.pathname.startsWith("/search");

  if (usesCustomPageLayout) {
    removeStyles("navigation-position");
    return;
  }

  if (stylesExist("navigation-position")) return;

  addStyles(
    "navigation-position",
    `@media only screen and (min-width: 1000px) {
        ${selectors.leftSidebar} {
          position: fixed;
          left: 0;
        }
      }
      /* Add padding equal to navigation size when between 1000px-1265px */
      @media only screen and (min-width: 1000px) and (max-width: 1265px) {
        body {
          padding-left: 88px;
        }
      }`,
  );
}
