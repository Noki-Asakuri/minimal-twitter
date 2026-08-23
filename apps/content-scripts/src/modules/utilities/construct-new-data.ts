// Utility function to create data for `applyStaticFeatures()`.
export default function constructNewData(
  changes: Record<string, chrome.storage.StorageChange>,
): Record<string, string | number | undefined> {
  const newData: Record<string, string | number | undefined> = {};
  for (const [key, change] of Object.entries(changes)) {
    const value = change.newValue;
    if (typeof value === "string" || typeof value === "number" || value === undefined) {
      newData[key] = value;
    }
  }
  return newData;
}
