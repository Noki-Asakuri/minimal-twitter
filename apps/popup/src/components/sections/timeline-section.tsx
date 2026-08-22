import { LocalStorageCheckboxControl } from "@/components/ui/checkboxes";
import ControlsWrapper from "@/components/ui/controls-wrapper";
import SectionLabel from "@/components/ui/section-label";
import { Separator } from "@/components/ui/separator";
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
    <section className="flex flex-col gap-2" aria-labelledby="user-control-timeline-label">
      <SectionLabel htmlFor="user-control-timeline">Timeline</SectionLabel>
      {mounted ? (
        <ControlsWrapper id="user-control-timeline">
          <TimelineWidthSlider />
          <Separator />
          <SwitchControl label="Zen Writer Mode" storageKey={KeyWriterMode} />
          <SwitchControl label="Sticky Header" storageKey={KeyStickyHeader} />
          <SwitchControl label="Trends on Home Timeline" storageKey={KeyTrendsHomeTimeline} />
          <Separator />
          <h3 className="text-xs font-semibold tracking-wide text-muted-foreground">
            Remove Distracting Elements
          </h3>
          <VanityCheckboxes />
          <LocalStorageCheckboxControl
            label="View Count from Tweets"
            storageKey={KeyHideViewCount}
            crossedIcon
          />
          <LocalStorageCheckboxControl
            label="Reposts from Same Author"
            storageKey={KeyHideSameAuthorReposts}
            crossedIcon
          />
          <LocalStorageCheckboxControl
            label="Reposts Older Than a Year"
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
      ) : (
        <ControlsWrapper className="h-[116px]">
          <Skeleton className="h-full w-full" />
        </ControlsWrapper>
      )}
      <p className="px-3 pt-1 pb-2 text-center text-xs leading-5 font-medium text-muted-foreground">
        View more 𝕏 display settings{" "}
        <a
          href="https://twitter.com/i/display"
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-primary underline-offset-4 hover:underline"
        >
          here
        </a>
        .
      </p>
    </section>
  );
}

export default TimelineSection;
