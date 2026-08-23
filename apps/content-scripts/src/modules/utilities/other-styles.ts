import selectors from "@content/selectors";
import addStyles, { removeStyles } from "@content/modules/utilities/add-styles";
export function addSmallerSearchBarStyle(): void {
  const searchInput = document.querySelector(selectors.searchBoxInput);
  if (!searchInput) return;
  if (window.location.pathname.includes("/search") || window.location.pathname.includes("/explore"))
    return;
  if (document.activeElement === searchInput) return;
  const searchBarPlaceholderWidth = searchInput.getAttribute("placeholder")?.length ?? 0;
  addStyles(
    "searchInputWidth",
    `${selectors.searchBoxInput} {
      width: ${searchBarPlaceholderWidth + 4}ch;
    }`,
  );
  handleSidebarSearchWidthStyle();
}
function handleSidebarSearchWidthStyle(): void {
  const sidebarSearchForm = document.querySelector(selectors.searchBox);
  if (!sidebarSearchForm) return;
  function applyWidthStyle(): void {
    addStyles("sidebarSearchWidth", `${selectors.searchBox} { width: 374px; }`);
  }
  if (document.querySelector(selectors.searchListBox)) applyWidthStyle();
  sidebarSearchForm.addEventListener("focusin", applyWidthStyle);
  sidebarSearchForm.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest('[role="listbox"]')) {
      applyWidthStyle();
    }
  });
  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element) || !event.target.closest(selectors.searchBox)) {
      removeStyles("sidebarSearchWidth");
    }
  });
}
