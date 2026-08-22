import { useEffect, useState } from "react";

import { Field, FieldLabel } from "@/components/ui/field";
import { Slider } from "@/components/ui/slider";

import { getStorage, setStorage } from "../../utilities/chromeStorage";

import { KeyTimelineWidth } from "@minimal-twitter/shared";

const trackDots = [600, 650, 700, 750, 800];

function TimelineWidthSlider() {
  const [userTrack, setUserTrack] = useState(700);

  useEffect(() => {
    const getUserDefaultTimelineWidth = async () => {
      try {
        const userDefaultTimelineWidth = await getStorage(KeyTimelineWidth);
        if (userDefaultTimelineWidth) {
          setUserTrack(userDefaultTimelineWidth);
        }
      } catch (error) {
        console.warn(error);
      }
    };

    getUserDefaultTimelineWidth();
  }, []);

  return (
    <Field className="gap-3">
      <div className="flex items-center justify-between">
        <FieldLabel htmlFor="timeline-width">Timeline Width</FieldLabel>
        <output
          htmlFor="timeline-width"
          className="rounded-md bg-muted px-2 py-0.5 text-xs font-semibold tabular-nums text-primary"
        >
          {userTrack}px
        </output>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs font-medium tabular-nums text-muted-foreground">600</span>
        <div className="relative flex-1">
          <Slider
            id="timeline-width"
            onValueChange={async (value) => {
              if (typeof value === "number") {
                setUserTrack(value);
                try {
                  await setStorage({ [KeyTimelineWidth]: value });
                } catch (error) {
                  console.warn(error);
                }
              }
            }}
            value={userTrack}
            min={600}
            max={800}
            step={50}
            aria-label="Timeline width"
          />
          <div
            className="pointer-events-none absolute inset-x-1.5 top-1/2 -translate-y-1/2"
            aria-hidden="true"
          >
            {trackDots.map((track) => (
              <span
                key={track}
                style={{
                  left: `${Math.abs(((800 - track) / 200) * 100 - 100)}%`,
                }}
                className="absolute size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background ring-1 ring-primary/40"
              />
            ))}
          </div>
        </div>
        <span className="text-xs font-medium tabular-nums text-muted-foreground">800</span>
      </div>
    </Field>
  );
}

export default TimelineWidthSlider;
