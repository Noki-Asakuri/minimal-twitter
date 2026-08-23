import { Combobox } from "@base-ui/react/combobox";
import { CheckIcon, ChevronsUpDownIcon, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldDescription } from "@/components/ui/field";
import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";
import { getStorage, setStorage } from "@/utilities/chromeStorage";
import { KeyFontFamily } from "@minimal-twitter/shared";

type FontOption = {
  label: string;
  value: string;
};

type FontGroup = {
  items: FontOption[];
  label: string;
  value: string;
};

const includedFonts = [
  { label: "X default", value: "default" },
  { label: "Inter", value: "builtin:inter" },
  { label: "Geist", value: "builtin:geist" },
] satisfies FontOption[];

function getPreviewFontFamily(font: FontOption): string | undefined {
  if (font.value === "default") return undefined;
  if (font.value === "builtin:inter") return undefined;
  if (font.value === "builtin:geist") return '"Geist Variable", sans-serif';
  return `${JSON.stringify(font.label)}, "Geist Variable", sans-serif`;
}

function FontSelector() {
  const [fontFamily, setFontFamily] = useState<string | null>(null);
  const [installedFonts, setInstalledFonts] = useState<FontOption[]>([]);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getStorage(KeyFontFamily)
      .then(setFontFamily)
      .catch((error) => console.warn(error));
  }, []);

  useEffect(() => {
    if (typeof chrome === "undefined" || !chrome.fontSettings?.getFontList) return;

    let active = true;

    chrome.fontSettings
      .getFontList()
      .then((fonts) => {
        if (!active) return;

        const uniqueFonts = new Map<string, FontOption>();
        for (const font of fonts) {
          if (!uniqueFonts.has(font.fontId)) {
            uniqueFonts.set(font.fontId, {
              label: font.displayName,
              value: font.fontId,
            });
          }
        }

        setInstalledFonts(
          [...uniqueFonts.values()].sort((first, second) =>
            first.label.localeCompare(second.label),
          ),
        );
      })
      .catch((error) => console.warn(error));

    return () => {
      active = false;
    };
  }, []);

  if (fontFamily === null) {
    return (
      <Field>
        <FieldContent>
          <div className="text-sm font-medium">Font</div>
          <FieldDescription>Included or system font.</FieldDescription>
        </FieldContent>
        <Skeleton className="h-8 w-full rounded-lg" aria-hidden="true" />
      </Field>
    );
  }

  const normalizedQuery = query.trim();
  const allKnownFonts = [...includedFonts, ...installedFonts];
  const selectedFont = allKnownFonts.find((font) => font.value === fontFamily) ?? {
    label: fontFamily,
    value: fontFamily,
  };
  const queryMatchesKnownFont = allKnownFonts.some(
    (font) => font.label.toLocaleLowerCase() === normalizedQuery.toLocaleLowerCase(),
  );
  const customFonts: FontOption[] = [];

  if (!allKnownFonts.some((font) => font.value === fontFamily)) {
    customFonts.push(selectedFont);
  }

  if (
    normalizedQuery &&
    !queryMatchesKnownFont &&
    !customFonts.some((font) => font.value === normalizedQuery)
  ) {
    customFonts.push({ label: normalizedQuery, value: normalizedQuery });
  }

  const groups = [
    { label: "Included", value: "included", items: includedFonts },
    ...(installedFonts.length
      ? [{ label: "Installed", value: "installed", items: installedFonts }]
      : []),
    ...(customFonts.length ? [{ label: "Custom", value: "custom", items: customFonts }] : []),
  ] satisfies FontGroup[];

  function handleFontChange(font: FontOption | null) {
    if (!font) return;

    setFontFamily(font.value);
    setOpen(false);
    setQuery("");
    void setStorage({ [KeyFontFamily]: font.value });
  }

  return (
    <Combobox.Root
      items={groups}
      value={selectedFont}
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) setQuery("");
      }}
      onValueChange={handleFontChange}
      inputValue={query}
      onInputValueChange={(nextQuery, details) => {
        if (details.reason !== "item-press") setQuery(nextQuery);
      }}
      itemToStringLabel={(font: FontOption) => font.label}
      itemToStringValue={(font: FontOption) => font.value}
      isItemEqualToValue={(font, value) => font.value === value.value}
      autoHighlight
    >
      <Field>
        <FieldContent>
          <Combobox.Label className="text-sm font-medium">Font</Combobox.Label>
          <FieldDescription>
            Choose an included font or type an installed font name.
          </FieldDescription>
        </FieldContent>
        <Combobox.Trigger render={<Button variant="outline" />} className="w-full justify-between">
          <span className="truncate" style={{ fontFamily: getPreviewFontFamily(selectedFont) }}>
            <Combobox.Value />
          </span>
          <ChevronsUpDownIcon data-icon="inline-end" />
        </Combobox.Trigger>
      </Field>

      <Combobox.Portal>
        <Combobox.Positioner
          sideOffset={6}
          align="end"
          collisionAvoidance={{ side: "shift", align: "shift", fallbackAxisSide: "none" }}
          className="isolate z-50 outline-none"
        >
          <Combobox.Popup className="w-[min(22rem,var(--available-width))] origin-[var(--transform-origin)] overflow-hidden rounded-lg bg-popover text-popover-foreground shadow-[0_8px_24px_-12px_rgb(15_20_25_/_35%)] transition-[transform,opacity] duration-100 data-ending-style:translate-y-1 data-ending-style:opacity-0 data-starting-style:translate-y-1 data-starting-style:opacity-0">
            <div className="flex h-10 items-center gap-2 border-b border-border px-3 focus-within:border-ring">
              <SearchIcon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              <Combobox.Input
                autoFocus
                placeholder="Search or type a font..."
                className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            <Combobox.Empty />
            <Combobox.List className="max-h-64 overflow-y-auto overscroll-contain p-1 outline-none">
              {(group: FontGroup) => (
                <Combobox.Group key={group.value} items={group.items} className="pb-1 last:pb-0">
                  <Combobox.GroupLabel className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                    {group.label}
                  </Combobox.GroupLabel>
                  <Combobox.Collection>
                    {(font: FontOption) => (
                      <Combobox.Item
                        key={font.value}
                        value={font}
                        className="relative flex h-8 cursor-default items-center rounded-md px-2 pr-8 text-sm outline-none select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground"
                      >
                        <span
                          className="truncate"
                          style={{ fontFamily: getPreviewFontFamily(font) }}
                        >
                          {group.value === "custom" && font.value === normalizedQuery
                            ? `Use “${font.label}”`
                            : font.label}
                        </span>
                        <Combobox.ItemIndicator
                          className={cn(
                            "absolute right-2 flex size-4 items-center justify-center",
                            font.value !== fontFamily && "hidden",
                          )}
                        >
                          <CheckIcon aria-hidden="true" />
                        </Combobox.ItemIndicator>
                      </Combobox.Item>
                    )}
                  </Combobox.Collection>
                </Combobox.Group>
              )}
            </Combobox.List>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  );
}

export default FontSelector;
