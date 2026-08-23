import svgAssets from "@content/modules/svg-assets";
import { getStorage, setStorage } from "@content/modules/utilities/storage";
type TypefullyBoxOptions = {
  withArrow?: boolean;
  className?: string;
};
export default async function addTypefullyBox(
  rootElement: Element,
  innerHTML: string,
  options: TypefullyBoxOptions = {},
): Promise<void> {
  const { withArrow, className } = options ?? {};
  const key = "tp-box-seen:typefully-callout";
  const seen = await getStorage(key);
  if (seen !== "true") {
    const typefullyBox = document.createElement("div");
    typefullyBox.id = "typefully-callout-box";
    typefullyBox.className = className ?? "typefully-box";
    typefullyBox.innerHTML = innerHTML;
    // Create svg element for the close button
    const closeButton = document.createElement("div");
    closeButton.id = "box-close-button";
    closeButton.innerHTML = svgAssets.typefullyBox.close;
    typefullyBox.appendChild(closeButton);
    if (withArrow) {
      const arrow = document.createElement("div");
      arrow.id = "box-arrow";
      arrow.innerHTML = svgAssets.typefullyBox.arrow;
      typefullyBox.appendChild(arrow);
    }
    function markSeen() {
      setStorage({ [key]: "true" }).then(() => {
        if (typefullyBox) typefullyBox.remove();
      });
    }
    closeButton.addEventListener("click", markSeen);
    rootElement.appendChild(typefullyBox);
  }
}
