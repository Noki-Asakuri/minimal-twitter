// Utility function to remove DOM element
export function removeElementById(id: string): void {
  const element = document.getElementById(id);
  element && element.remove();
}
