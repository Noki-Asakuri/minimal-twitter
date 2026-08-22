import type { ReactNode } from "react";

import { Field, FieldLabel } from "@/components/ui/field";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";

import type { StorageKey } from "@/utilities/chromeStorage";
import useStorageKeyState from "@/utilities/useStorageKeyState";

type SwitchControlProps = {
  label: ReactNode;
  disabled?: boolean;
  storageKey: StorageKey;
  onChange?: (checked: boolean) => void;
};

export default function SwitchControl({
  label,
  disabled,
  storageKey,
  onChange,
}: SwitchControlProps) {
  const [checked, setChecked, loaded] = useStorageKeyState(storageKey);

  return (
    <Field orientation="horizontal" data-disabled={disabled || undefined}>
      <FieldLabel htmlFor={storageKey}>{label}</FieldLabel>
      {loaded ? (
        <Switch
          onCheckedChange={(checked) => {
            setChecked(checked);
            onChange?.(checked);
          }}
          checked={checked}
          disabled={disabled}
          id={storageKey}
          aria-label={typeof label === "string" ? label : undefined}
        />
      ) : (
        <Skeleton className="h-[18px] w-8 rounded-full" aria-hidden="true" />
      )}
    </Field>
  );
}
