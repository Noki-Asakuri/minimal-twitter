import throttle from "lodash.throttle";

import { defaultPreferences, KeyAllVanity } from "../../../storage-keys";

type StorageSchema = typeof defaultPreferences & {
  [KeyAllVanity]: string | undefined;
};

export const storageDefaults: StorageSchema = {
  ...defaultPreferences,
  [KeyAllVanity]: undefined,
};

export type StorageKey = keyof StorageSchema;
export type StorageValue<Key extends StorageKey> = StorageSchema[Key];
export type StorageUpdates = Partial<StorageSchema>;

/*--
- Docs: https://developer.chrome.com/docs/extensions/reference/storage/
- Use storage.local to allow user to store customizations
--*/

export function getStorage<Key extends StorageKey>(storageKey: Key): Promise<StorageValue<Key>>;
export function getStorage<Key extends StorageKey>(
  storageKeys: readonly Key[],
): Promise<Pick<StorageSchema, Key>>;
export function getStorage(storageKeyOrKeys: StorageKey | readonly StorageKey[]) {
  if (typeof storageKeyOrKeys === "string") {
    return getSingleStorageKey(storageKeyOrKeys);
  }

  return getMultipleStorageKeys(storageKeyOrKeys);
}

function getSingleStorageKey<Key extends StorageKey>(key: Key): Promise<StorageValue<Key>> {
  return new Promise((resolve) => {
    chrome?.storage?.local.get([key], (data) => {
      resolve((data[key] ?? storageDefaults[key]) as StorageValue<Key>);
    });
  });
}

function getMultipleStorageKeys<Key extends StorageKey>(
  keys: readonly Key[],
): Promise<Pick<StorageSchema, Key>> {
  return new Promise((resolve) => {
    chrome?.storage?.local.get([...keys], (data) => {
      const entries = keys.map((key) => [key, data[key] ?? storageDefaults[key]]);
      resolve(Object.fromEntries(entries) as Pick<StorageSchema, Key>);
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
export const setStorage = throttle((values: StorageUpdates): Promise<StorageUpdates> => {
  return new Promise((resolve) => {
    chrome?.storage?.local.set(values, () => {
      resolve(values);
    });
  });
}, 500);
