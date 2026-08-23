type SidebarButtonOptions = {
  name: string;
  href?: string;
  userHref?: string;
  onClick?: (element: HTMLElement) => void;
  svgAsset: string;
};
type NewSidebarButtonOptions = SidebarButtonOptions & {
  profileNode: HTMLAnchorElement;
};
export function addSidebarButton(options: SidebarButtonOptions): void {
  const { name, href, userHref, onClick, svgAsset } = options;
  // Let's find all sidebar buttons with the same name
  const existingElements = [
    ...document.querySelectorAll(`nav[role="navigation"] > [aria-label="${name}"]`),
    ...document.querySelectorAll(`nav[role="navigation"] > [aria-label="${name.toLowerCase()}"]`),
  ];
  // We base new sidebar buttons on the existing "Profile" one, so let's get it:
  const profileNode = document.querySelector<HTMLAnchorElement>(
    'nav[role="navigation"] > a[role="link"][data-testid="AppTabBar_Profile_Link"]',
  );
  if (!profileNode) {
    return;
  }
  // It might happen when resizing the page that a sidebar button is added by X
  // again dynamically while we also added it — so when we find more than one,
  // we remove all but the first one to fix this:
  if (existingElements.length > 1) {
    existingElements.slice(1).forEach((element) => element.remove());
  }
  // We're left with a single existing element:
  const existingElement = existingElements[0];
  if (existingElement) {
    const hasChanged =
      (profileNode.querySelector("span") && !existingElement.querySelector("span")) ||
      (!profileNode.querySelector("span") && existingElement.querySelector("span"));
    if (!hasChanged) {
      return;
    }
    const newNode = createNewElement({ name, href, userHref, onClick, svgAsset, profileNode });
    existingElement.replaceWith(newNode);
  } else {
    const newNode = createNewElement({ name, href, userHref, onClick, svgAsset, profileNode });
    profileNode.insertAdjacentElement("beforebegin", newNode);
  }
}
function createNewElement(options: NewSidebarButtonOptions): HTMLElement {
  const { profileNode, name, href, userHref, onClick, svgAsset } = options;
  let newNode: HTMLElement | undefined;
  try {
    if (href || userHref) {
      newNode = profileNode.cloneNode(true) as HTMLAnchorElement;
      if (href) (newNode as HTMLAnchorElement).href = href;
      if (userHref) (newNode as HTMLAnchorElement).href += userHref;
    } else if (onClick) {
      newNode = document.createElement("div");
      newNode.innerHTML = profileNode.innerHTML;
      newNode.style.cursor = "pointer";
      newNode.onclick = () => onClick(newNode!);
    }
    if (!newNode) throw new Error("Sidebar button needs a destination or click handler");
    newNode.setAttribute("aria-label", name);
    newNode.removeAttribute("data-testid");
    newNode.classList.add("mt-sidebar-button"); // To style it in main.css
    const icon = newNode.firstElementChild?.firstElementChild?.firstElementChild;
    const label = newNode.firstElementChild?.lastElementChild?.firstElementChild;
    if (icon) icon.innerHTML = svgAsset;
    if (label instanceof HTMLElement) label.innerText = name;
  } catch (error) {
    console.log(`❌ Error creating ${name} sidebar button`);
    console.warn(error);
  }
  if (!newNode) throw new Error(`Could not create ${name} sidebar button`);
  return newNode;
}
