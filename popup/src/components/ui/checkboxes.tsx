import { XIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "@/components/ui/field";

import type { StorageKey } from "@/utilities/chromeStorage";
import useStorageKeyState from "@/utilities/useStorageKeyState";

type CheckboxControlProps = {
  id: string;
  label: ReactNode;
  labelExtras?: ReactNode;
  onCheckedChange: (checked: boolean) => void;
  checked: boolean;
  crossedIcon?: boolean;
};

export const CheckboxControl = ({
  id,
  label,
  labelExtras,
  onCheckedChange,
  checked,
  crossedIcon,
}: CheckboxControlProps) => (
  <Field orientation="horizontal">
    <div className="flex min-w-0 flex-auto items-center gap-1">
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      {labelExtras}
    </div>
    <Checkbox
      onCheckedChange={onCheckedChange}
      checked={checked}
      id={id}
      indicator={crossedIcon ? <XIcon /> : undefined}
    />
  </Field>
);

type LocalStorageCheckboxControlProps = {
  label: ReactNode;
  storageKey: StorageKey;
  crossedIcon?: boolean;
};

export const LocalStorageCheckboxControl = ({
  label,
  storageKey,
  crossedIcon,
}: LocalStorageCheckboxControlProps) => {
  const [checked, setChecked] = useStorageKeyState(storageKey);

  return (
    <CheckboxControl
      id={storageKey}
      label={label}
      onCheckedChange={setChecked}
      checked={checked}
      crossedIcon={crossedIcon}
    />
  );
};
