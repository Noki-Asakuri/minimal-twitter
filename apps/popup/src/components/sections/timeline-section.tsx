import { LocalStorageCheckboxControl } from "@/components/ui/checkboxes";
import ControlsWrapper from "@/components/ui/controls-wrapper";
import SectionLabel from "@/components/ui/section-label";
import { Skeleton } from "@/components/ui/skeleton";
import SwitchControl from "@/components/ui/switch-control";

import useMounted from "@/utilities/hooks/useMounted";

import TimelineWidthSlider from "../controls/timeline-width-slider";
import VanityCheckboxes from "../controls/vanity-checkboxes";

import {
  KeyHideOldReposts,
  KeyHideReactionTweets,
  KeyHideSameAuthorReposts,
  KeyHideViewCount,
  KeyRemovePromotedPosts,
  KeyRemoveTimelineBorders,
  KeyRemoveTimelineTabs,
  KeyRemoveTopicsToFollow,
  KeyRemoveTweetBorders,
  KeyStickyHeader,
  KeyTrendsHomeTimeline,
  KeyWriterMode,
} from "@minimal-twitter/shared";

function TimelineSection() {
  const mounted = useMounted();

  return (
    <section className="flex flex-col gap-4" aria-labelledby="user-control-timeline-label">
      <SectionLabel
        htmlFor="user-control-timeline"
        description="Shape what you see. Leave the distractions out."
      >
        Your feed
      </SectionLabel>
      {mounted ? (
        <>
          <ControlsWrapper id="user-control-timeline">
            <h3 className="settings-group-title">Layout & reading</h3>
            <TimelineWidthSlider />
            <SwitchControl label="Zen Writer Mode" storageKey={KeyWriterMode} />
            <SwitchControl label="Sticky Header" storageKey={KeyStickyHeader} />
            <SwitchControl label="Trends on Home Timeline" storageKey={KeyTrendsHomeTimeline} />
          </ControlsWrapper>
          <ControlsWrapper id="user-control-feed-filters">
            <h3 className="settings-group-title">Hide distractions</h3>
            <VanityCheckboxes />
            <LocalStorageCheckboxControl
              label="View Count from Tweets"
              storageKey={KeyHideViewCount}
              crossedIcon
            />
            <LocalStorageCheckboxControl
              label="Repeated reposts from the same author"
              storageKey={KeyHideSameAuthorReposts}
              crossedIcon
            />
            <LocalStorageCheckboxControl
              label="Reposts older than a year"
              storageKey={KeyHideOldReposts}
              crossedIcon
            />
            <LocalStorageCheckboxControl
              label="Reaction Tweets"
              storageKey={KeyHideReactionTweets}
              crossedIcon
            />
            <LocalStorageCheckboxControl
              label="Promoted Posts"
              storageKey={KeyRemovePromotedPosts}
              crossedIcon
            />
            <LocalStorageCheckboxControl
              label="Topics to Follow Suggestions"
              storageKey={KeyRemoveTopicsToFollow}
              crossedIcon
            />
            <LocalStorageCheckboxControl
              label={`Timeline Tabs (For you, Following, lists...)`}
              storageKey={KeyRemoveTimelineTabs}
              crossedIcon
            />
            <LocalStorageCheckboxControl
              label="Timeline Borders"
              storageKey={KeyRemoveTimelineBorders}
              crossedIcon
            />
            <LocalStorageCheckboxControl
              label="Tweet Borders"
              storageKey={KeyRemoveTweetBorders}
              crossedIcon
            />
          </ControlsWrapper>
        </>
      ) : (
        <ControlsWrapper className="h-[116px]">
          <Skeleton className="h-full w-full" />
        </ControlsWrapper>
      )}
      <p className="text-xs leading-5 text-muted-foreground">
        <a
          href="https://x.com/i/display"
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-primary underline-offset-4 hover:underline"
        >
          Open X display settings
        </a>
      </p>
    </section>
  );
}

export default TimelineSection;
