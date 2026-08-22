import { useEffect, useState } from "react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import type { StorageKey } from "@/utilities/chromeStorage";
import { getStorage, setStorage, storageDefaults } from "@/utilities/chromeStorage";

type Segment = {
  value: string;
  label: string;
};

type SegmentedControlProps = {
  segments: readonly Segment[];
  storageKey: StorageKey;
};

export function SegmentedControl({ segments, storageKey }: SegmentedControlProps) {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    getStorage(storageKey).then((storedValue) => {
      if (typeof storedValue === "string") {
        setValue(storedValue);
      } else {
        const defaultValue = storageDefaults[storageKey];
        setValue(typeof defaultValue === "string" ? defaultValue : (segments[0]?.value ?? null));
      }
    });
  }, [storageKey, segments]);

  const handleValueChange = async (newValues: string[]) => {
    const newValue = newValues[0];
    if (!newValue) {
      return;
    }

    setValue(newValue);

    await setStorage({ [storageKey]: newValue });
  };

  if (segments.length === 0) {
    return null;
  }

  return (
    <ToggleGroup
      value={[value ?? segments[0].value]}
      onValueChange={handleValueChange}
      variant="outline"
      size="sm"
      spacing={0}
      className="w-full bg-muted p-0.5"
    >
      {segments.map((segment) => (
        <ToggleGroupItem
          key={segment.value}
          value={segment.value}
          className="flex-1 border-0 data-pressed:bg-background data-pressed:text-primary data-pressed:shadow-xs"
        >
          {segment.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
