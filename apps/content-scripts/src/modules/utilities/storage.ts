import { defaultPreferences } from "@minimal-twitter/shared";
import type { PreferenceKey, Preferences } from "@minimal-twitter/shared";
type StorageKey = PreferenceKey | (string & {});
type StorageValue = string | number;
type StorageRecord = Record<string, StorageValue>;
/*--
- Docs: https://developer.chrome.com/docs/extensions/reference/storage/
- Use storage.local to allow user to store customizations
--*/
export function getStorage<Key extends PreferenceKey>(storageKey: Key): Promise<Preferences[Key]>;
export function getStorage<const Keys extends readonly PreferenceKey[]>(
  storageKeys: Keys,
): Promise<Pick<Preferences, Keys[number]>>;
export function getStorage(storageKey: StorageKey): Promise<StorageValue>;
export function getStorage(storageKeys: readonly StorageKey[]): Promise<StorageRecord>;
export function getStorage(
  storageKeyOrKeys: StorageKey | readonly StorageKey[],
): Promise<StorageValue | StorageRecord> {
  return Array.isArray(storageKeyOrKeys)
    ? getMultipleStorageKeys(storageKeyOrKeys)
    : getSingleStorageKey(storageKeyOrKeys as StorageKey);
}
function getSingleStorageKey(key: StorageKey): Promise<StorageValue> {
  return new Promise((resolve) => {
    chrome?.storage?.local.get([key], (data) => {
      const value = data[key] ?? defaultPreferences[key as PreferenceKey];
      resolve(value as StorageValue);
    });
  });
}
function getMultipleStorageKeys(keysArray: readonly StorageKey[]): Promise<StorageRecord> {
  return new Promise((resolve) => {
    chrome?.storage?.local.get([...keysArray], (data) => {
      const res: StorageRecord = {};
      for (const key of keysArray) {
        res[key] = (data[key] ?? defaultPreferences[key as PreferenceKey]) as StorageValue;
      }
      resolve(res);
    });
  });
}
/*--
- Set storage with storage.local
- kv => {key: value} (Single key value pair)
- Throttle function to prevent hitting API limits
- The maximum number of set, remove, or clear operations = 120
  - 1 min = 60000 ms
  - 60000 ms / 120 operations = 500 ms/operation
--*/
export function setStorage(kv: StorageRecord): Promise<StorageRecord> {
  return new Promise((resolve) => {
    chrome?.storage?.local.set(kv, () => {
      resolve(kv);
    });
  });
}
