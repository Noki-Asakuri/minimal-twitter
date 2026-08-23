import { removeElementById } from "@content/modules/utilities/remove-element";
export default function addStyles(id: string, css: string): void {
  removeElementById("mt-style-" + id);
  const style = document.createElement("style");
  style.id = "mt-style-" + id;
  style.textContent = css.trim().split("\n").join("");
  document.head.appendChild(style);
}
export function removeStyles(id: string): void {
  removeElementById("mt-style-" + id);
}
export function stylesExist(id: string): HTMLElement | null {
  return document.getElementById("mt-style-" + id);
}
