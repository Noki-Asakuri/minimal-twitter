import { KeyWriterMode } from "@minimal-twitter/shared";
import selectors from "@content/selectors";
import svgAssets from "@content/modules/svg-assets";
import {
  createTypefullyLinkElement,
  createTypefullyLogo,
  getCurrentTextAndSendToTypefully,
} from "@content/modules/typefully-plugs";
import addStyles, { removeStyles, stylesExist } from "@content/modules/utilities/add-styles";
import addTooltip, { hideAllTooltips } from "@content/modules/utilities/add-tooltip";
import addTypefullyBox from "@content/modules/utilities/add-typefully-box";
import { createTypefullyUrl } from "@content/modules/utilities/create-typefully-url";
import { getStorage, setStorage } from "@content/modules/utilities/storage";
async function escKeyListener(event: KeyboardEvent): Promise<void> {
  if (event.key === "Escape") {
    event.preventDefault();
    toggleWriterMode();
  }
}
let t: ReturnType<typeof setTimeout> | undefined;
let zt1: ReturnType<typeof setTimeout> | undefined;
let zt2: ReturnType<typeof setTimeout> | undefined;
export function changeWriterMode(writerMode?: string): void {
  if (
    window.location.pathname.includes("/home") ||
    window.location.pathname === "/" ||
    window.location.pathname.includes("/compose/tweet")
  ) {
    switch (writerMode) {
      case "on":
        document.addEventListener("keydown", escKeyListener);
        if (stylesExist("writerMode")) return;
        clearTimeout(zt1);
        zt1 = setTimeout(() => {
          document.title = "Writer Mode";
        }, 500);
        addStyles(
          "writerMode",
          `
            body {
              padding-left: 0;
              overflow: hidden;
            }
            ${selectors.mainColumn} {
              border-style: hidden;
              padding-top: 3vh;
              margin: 0 auto;
            }
            ${selectors.mainWrapper} {
              flex-basis: 100%;
            }
            ${selectors.mainWrapper} > div {
              width: 100%;
              max-width: 100%;
            }
            ${selectors.leftSidebar},
            ${selectors.rightSidebar},
            ${selectors.mainColumn} > div > div:not(:nth-of-type(1)):not(:nth-of-type(2)):not(:nth-of-type(3)) {
              overflow: hidden;
              visibility: hidden;
              opacity: 0;
              width: 0;
              height: 0;
            }
            ${selectors.topHeader} {
              visibility: hidden;
            }
            ${selectors.modalWrapper} {
              width: 100vw;
              max-width: 100vw;
              top: 0;
              border-radius: 0;
            }
            div[role="group"] > div:empty {
              background-color: var(--body-bg-color);
            }
            ${selectors.modalUi} {
              border-radius: 0;
            }
            ${selectors.modalWrapper} > div > div > div {
              padding-bottom: 10vh;
            }
            `,
        );
        clearTimeout(t);
        t = setTimeout(() => {
          addTypefullyPlugToWriterMode();
        }, 100);
        break;
      case "off":
        document.removeEventListener("keydown", escKeyListener);
        if (!stylesExist("writerMode")) break;
        clearTimeout(zt2);
        zt2 = setTimeout(() => {
          document.title = "Twitter";
        }, 500);
        removeStyles("writerMode");
        removeTypefullyPlugFromWriterMode();
        break;
    }
  } else {
    removeStyles("writerMode");
    removeTypefullyPlugFromWriterMode();
    return;
  }
}
async function addTypefullyPlugToWriterMode(): Promise<void> {
  if (window.location.pathname.includes("/home") || window.location.pathname === "/") {
    const main = document.querySelector('main[role="main"]');
    if (!main) return;
    if (document.getElementById("typefully-writermode-link")) return;
    /* ---------------------------- Typefully Button ---------------------------- */
    const typefullyLinkElement = createTypefullyLinkElement(
      "typefully-writermode-link",
      "typefully-save-draft-button ghost",
    );
    typefullyLinkElement.addEventListener("click", () => {
      getCurrentTextAndSendToTypefully();
    });
    const typefullyLogo = createTypefullyLogo();
    const typefullyText = document.createElement("span");
    typefullyText.innerText = "Save draft to Typefully";
    typefullyLinkElement.appendChild(typefullyLogo);
    typefullyLinkElement.appendChild(typefullyText);
    /* ----------------- Typefully box callout with explanation ---------------- */
    const url = createTypefullyUrl({
      utm_content: "writer-mode-callout",
    });
    const innerHTML = `<ul>
  <li>💬 Share your drafts and get comments</li>
  <li>🤖 Improve your tweets with AI</li>
  <li>📈 Track your growth with insights and metrics</li>
  <li>📆 Schedule for later</li>
</ul>
<p>Powered by <a href="${url}" target="_blank">Typefully</a>, the makers of the Minimal Twitter extension.</p>`;
    addTypefullyBox(main, innerHTML, {
      withArrow: true,
    });
    main.appendChild(typefullyLinkElement);
  }
}
function removeTypefullyPlugFromWriterMode(): void {
  const typefullyLinkElement = document.getElementById("typefully-writermode-link");
  typefullyLinkElement && typefullyLinkElement.remove();
  const typefullyBox = document.getElementById("typefully-callout-box");
  typefullyBox && typefullyBox.remove();
}
async function toggleWriterMode(): Promise<void> {
  const userSetting = await getStorage(KeyWriterMode);
  const writerModeButton = document.querySelector<HTMLElement>("#mt-writer-mode-composer-button");
  try {
    await setStorage({ writerMode: userSetting === "off" ? "on" : "off" });
  } catch (error) {
    console.error(error);
  }
  if (!writerModeButton) return;
  hideAllTooltips();
  if (userSetting === "off") {
    const icon = writerModeButton.firstElementChild?.firstElementChild?.firstElementChild;
    if (icon) icon.innerHTML = svgAssets.composerWriterMode.selected;
    addTooltip(writerModeButton, {
      id: "writer-mode",
      title: "Close Zen Writer Mode",
    });
  } else {
    const icon = writerModeButton.firstElementChild?.firstElementChild?.firstElementChild;
    if (icon) icon.innerHTML = svgAssets.composerWriterMode.normal;
    addTooltip(writerModeButton, {
      id: "writer-mode",
      title: "Zen Writer Mode",
      description: "Added by Minimal Twitter.",
    });
    // scroll body to top
    document.body.scrollTop = 0;
  }
}
