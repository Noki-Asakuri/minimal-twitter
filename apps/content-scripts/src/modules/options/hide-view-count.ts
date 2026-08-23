import selectors from "@content/selectors";
export default async function changeHideViewCounts(setting?: string): Promise<void> {
  const viewCounts = Array.from(document.querySelectorAll(selectors.viewCount));
  if (!viewCounts.length) return;
  if (setting === "off") {
    viewCounts.forEach((el) => {
      el.parentElement && (el.parentElement.style.display = "flex");
    });
  } else if (setting === "on") {
    viewCounts.forEach((el) => {
      el.parentElement && (el.parentElement.style.display = "none");
    });
  }
}
