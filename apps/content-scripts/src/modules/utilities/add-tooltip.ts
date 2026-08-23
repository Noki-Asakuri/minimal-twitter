type TooltipOptions = {
  id: string;
  title?: string;
  description?: string;
};
export default function addTooltip(element: HTMLElement | null, options: TooltipOptions): void {
  const { id, title, description } = options ?? {};
  if (!element) return;
  let tooltip = document.getElementById(id);
  if (!tooltip) {
    // Create tooltip if if doesn't exist
    tooltip = document.createElement("div");
    tooltip.id = id;
    tooltip.classList.add("mt-tooltip", "hidden");
    tooltip.innerHTML = `${title ? `<span class="title">${title}</span>` : ""}
${description ? `<span class="description">${description}</span>` : ""}`;
    document.body.appendChild(tooltip);
  } else {
    // Update tooltip content if it already exists
    const newInnerHtml = `${title ? `<span class="title">${title}</span>` : ""}
${description ? `<span class="description">${description}</span>` : ""}`;
    tooltip.innerHTML = newInnerHtml;
    // Hide the tooltip by default if the content changed
    if (tooltip.innerHTML !== newInnerHtml) {
      tooltip.classList.add("hidden");
    }
  }
  const currentTooltip = tooltip;
  const currentElement = element;
  function showTooltip(): void {
    currentTooltip.classList.remove("hidden");
    const rect = currentElement.getBoundingClientRect();
    // Account for scroll position
    const scrollX = window.scrollX || document.documentElement.scrollLeft;
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    currentTooltip.style.top = `${rect.bottom + scrollY + 10}px`;
    currentTooltip.style.left = `${rect.left + scrollX + rect.width / 2 - currentTooltip.offsetWidth / 2}px`;
    currentTooltip.style.right = "auto";
    // If the tooltip is outside the viewport, move it inside with 10px margin
    const viewportWidth = window.innerWidth;
    if (currentTooltip.offsetLeft < scrollX + 10) {
      currentTooltip.style.left = `${scrollX + 10}px`;
      currentTooltip.style.right = "auto";
    } else if (
      currentTooltip.offsetLeft + currentTooltip.offsetWidth >
      scrollX + viewportWidth - 10
    ) {
      currentTooltip.style.right = "10px";
      currentTooltip.style.left = "auto";
    }
  }
  element.onmouseenter = showTooltip;
  element.onmouseover = showTooltip;
  element.onmouseleave = () => {
    currentTooltip.classList.add("hidden");
  };
}
export function hideAllTooltips(): void {
  const tooltips = document.querySelectorAll(".mt-tooltip");
  tooltips.forEach((tooltip) => {
    tooltip.classList.add("hidden");
  });
}
