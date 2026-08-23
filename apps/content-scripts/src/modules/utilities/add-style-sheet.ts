export default function addStyleSheet(
  id: string,
  href?: string,
  text?: string,
): HTMLLinkElement | HTMLStyleElement | undefined {
  let stylesheet: HTMLLinkElement | HTMLStyleElement;
  if (href) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    stylesheet = link;
  } else if (text) {
    stylesheet = document.createElement("style");
    stylesheet.appendChild(document.createTextNode(text));
  } else return;
  stylesheet.id = `mt-${id}-stylesheet`;
  document.head.appendChild(stylesheet);
  return stylesheet;
}
