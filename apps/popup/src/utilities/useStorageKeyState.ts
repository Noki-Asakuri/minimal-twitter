import type { Dispatch, SetStateAction } from "react";
import { useEffect, useRef, useState } from "react";

import {
  getStorage,
  setStorage,
  storageDefaults,
  type StorageKey,
  type StorageValue,
} from "./chromeStorage";

export default function useStorageKeyState(
  storageKey: StorageKey,
): [boolean, Dispatch<SetStateAction<boolean>>, boolean] {
  const [state, setState] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getInitialState = async () => {
      try {
        const savedSetting = await getStorage(storageKey);
        if (savedSetting !== undefined) {
          setState(savedSetting === "on" ? true : false);
        }
      } catch (error) {
        console.warn(error);
      }

      setLoaded(true);
    };

    getInitialState();
  }, [storageKey]);

  const prevState = useRef(state);

  useEffect(() => {
    const updateStorage = async () => {
      try {
        await setStorage({ [storageKey]: state ? "on" : "off" });
      } catch (error) {
        console.warn(error);
      }
    };

    if (prevState.current !== state) {
      updateStorage();
    }

    prevState.current = state;
  }, [storageKey, state]);

  return [state, setState, loaded];
}

export function useStorageValue<Key extends StorageKey>(storageKey: Key): StorageValue<Key> {
  const [value, setValue] = useState<StorageValue<Key>>(storageDefaults[storageKey]);

  useEffect(() => {
    const getInitialState = async () => {
      try {
        const savedSetting = await getStorage(storageKey);
        if (savedSetting !== undefined) {
          setValue(savedSetting);
        }
      } catch (error) {
        console.warn(error);
      }
    };

    getInitialState();
  }, [storageKey]);

  return value;
}
