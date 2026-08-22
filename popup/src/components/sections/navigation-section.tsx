import startCase from "lodash.startcase";
import type { ReactNode } from "react";

import ControlsWrapper from "@/components/ui/controls-wrapper";
import { Field, FieldLabel } from "@/components/ui/field";
import SectionLabel from "@/components/ui/section-label";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { Separator } from "@/components/ui/separator";
import SwitchControl from "@/components/ui/switch-control";
import { Toggle } from "@/components/ui/toggle";

import { cn } from "@/lib/utils";

import type { StorageKey } from "../../utilities/chromeStorage";
import useStorageKeyState from "../../utilities/useStorageKeyState";

import {
  KeyArticlesButton,
  KeyBookmarksButton,
  KeyCommunitiesButton,
  KeyCreatorStudioButton,
  KeyExploreButton,
  KeyGrokButton,
  KeyHideGrokDrawer,
  KeyHomeButton,
  KeyJobsButton,
  KeyListsButton,
  KeyMessagesButton,
  KeyMoreButton,
  KeyNavigationButtonsLabels,
  KeyNavigationCenter,
  KeyNotificationsButton,
  KeyProfileButton,
  KeySidebarLogo,
  KeyTopicsButton,
  KeyTypefullyGrowTab,
  KeyUnreadCountBadge,
  KeyVerifiedOrgsButton,
  KeyXPremiumButton,
} from "../../../../storage-keys";

type IconButtonProps = {
  storageKey: StorageKey;
  label: string;
  viewBox?: string;
  children: ReactNode;
};

function IconButton({ storageKey, label, viewBox = "0 0 24 24", children }: IconButtonProps) {
  const [pressed, setPressed] = useStorageKeyState(storageKey);

  return (
    <div className="flex flex-col items-center gap-0.5">
      <Toggle
        onPressedChange={setPressed}
        pressed={pressed}
        title={`Toggle ${startCase(storageKey)}`}
        aria-label={`Toggle ${startCase(storageKey)}`}
        variant="outline"
        className="size-11 rounded-full p-2.5 text-foreground opacity-55 hover:opacity-100 aria-pressed:border-primary aria-pressed:bg-primary/10 aria-pressed:text-primary aria-pressed:opacity-100"
      >
        <svg className="size-6" aria-hidden="true" viewBox={viewBox}>
          {children}
        </svg>
      </Toggle>
      <span
        className={cn(
          "max-w-16 text-center text-[11px] leading-tight tracking-tight text-muted-foreground",
          pressed && "font-semibold text-primary",
        )}
      >
        {label}
      </span>
    </div>
  );
}

function Home() {
  return (
    <IconButton storageKey={KeyHomeButton} label="Home">
      <path
        className="fill-current"
        d="M10.059 2.593c1.175-.784 2.707-.784 3.882 0l6.5 4.333C21.415 7.575 22 8.668 22 9.838V18.5c0 1.933-1.567 3.5-3.5 3.5h-4.25v-5.25c0-1.243-1.007-2.25-2.25-2.25s-2.25 1.007-2.25 2.25V22H5.5C3.567 22 2 20.433 2 18.5V9.838c0-1.17.585-2.263 1.559-2.912l6.5-4.333z"
      />
    </IconButton>
  );
}

function Explore() {
  return (
    <IconButton storageKey={KeyExploreButton} label="Explore">
      <path
        className="fill-current"
        d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"
      ></path>
    </IconButton>
  );
}

function Notifications() {
  return (
    <IconButton storageKey={KeyNotificationsButton} label="Notifications">
      <path
        className="fill-current"
        d="M19.993 9.042C19.48 5.017 16.054 2 11.996 2s-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958zM12 20c-1.306 0-2.417-.835-2.829-2h5.658c-.412 1.165-1.523 2-2.829 2zm-6.866-4l.847-6.698C6.364 6.272 8.941 4 11.996 4s5.627 2.268 6.013 5.295L18.864 16H5.134z"
      />
    </IconButton>
  );
}

function Messages() {
  return (
    <IconButton storageKey={KeyMessagesButton} label="Messages">
      <path
        className="fill-current"
        d="M20.7 11.7c0-4.48-3.844-8.2-8.699-8.2-4.854 0-8.698 3.72-8.698 8.2v.015l-.001.014c-.02.667.09 1.225.25 1.767.083.28.176.545.276.839.098.285.202.595.288.918.177.663.284 1.401.156 2.271-.086.582-.274 1.191-.582 1.855 1.264.375 2.55.053 4.013-.599l.455-.203.437.242c1.07.594 1.917 1.08 3.406 1.08 4.855 0 8.7-3.72 8.7-8.199zm2 0c0 5.683-4.84 10.2-10.699 10.2-1.784 0-2.96-.555-3.95-1.095-1.876.768-4.02 1.2-6.245-.075l-.885-.505.524-.875c.54-.904.77-1.581.848-2.118.078-.526.02-.98-.11-1.463-.066-.25-.15-.502-.247-.788-.095-.277-.204-.59-.301-.92-.199-.674-.36-1.449-.332-2.39C1.322 6.002 6.154 1.5 12.002 1.5c5.859 0 10.7 4.518 10.7 10.2z"
      />
    </IconButton>
  );
}

function CreatorStudio() {
  return (
    <IconButton storageKey={KeyCreatorStudioButton} label="Creator Studio">
      <path
        className="fill-current"
        clipRule="evenodd"
        d="M21.002 5.611c0 2.689-1.085 5.259-3 7.137v4.01c0 1.06-.422 2.078-1.172 2.828l-4.265 4.266-1.937-5.812-4.667-4.667-5.81-1.935 4.265-4.266C5.166 6.422 6.183 6 7.244 6h4.01c1.878-1.915 4.448-3 7.137-3h2.611v2.611zm-8.35 12.179l.787 2.358 1.977-1.976c.375-.375.586-.884.586-1.414v-2.12l-3.35 3.152zM18.391 5c-2.206 0-4.314.91-5.826 2.517l-4.67 4.962 3.628 3.627 4.962-4.67c1.606-1.511 2.517-3.619 2.517-5.825V5h-.611zM7.244 8c-.53 0-1.039.211-1.414.586l-1.977 1.976 2.358.787L9.364 8h-2.12z"
        fillRule="evenodd"
      />
      <path
        className="fill-current"
        d="M5.47 16.241v.003l-.003.013-.014.06-.053.236c-.044.206-.103.504-.163.861-.074.447-.144.978-.188 1.537.56-.045 1.091-.113 1.538-.187.357-.06.654-.12.86-.163.103-.022.183-.04.236-.053l.06-.014.012-.004h.003l.484 1.94H8.24l-.006.003c-.005 0-.011.002-.02.005l-.075.017c-.064.015-.156.036-.272.06-.23.05-.559.116-.951.181-.779.13-1.838.264-2.913.264h-1v-1c0-1.075.133-2.135.263-2.914.065-.392.13-.72.18-.951.024-.116.045-.208.06-.272l.017-.074.005-.021.002-.006v-.003l1.942.482z"
      />
    </IconButton>
  );
}

function Bookmarks() {
  return (
    <IconButton storageKey={KeyBookmarksButton} label="Bookmarks">
      <path
        className="fill-current"
        d="M4 4.5A2.5 2.5 0 016.5 2h11A2.5 2.5 0 0120 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"
      />
    </IconButton>
  );
}

function Articles() {
  return (
    <IconButton storageKey={KeyArticlesButton} label="Articles">
      <path
        className="fill-current"
        d="M7.164 2c-.53 0-1.039.21-1.414.586L2.586 5.75C2.21 6.125 2 6.634 2 7.164V21c0 .552.448 1 1 1h5.25c.552 0 1-.448 1-1s-.448-1-1-1H4V7.164L7.164 4h9.586v3.25c0 .552.448 1 1 1s1-.448 1-1V3c0-.552-.448-1-1-1H7.164z"
      ></path>
      <path
        className="fill-current"
        d="M7.75 6.25c-.552 0-1 .448-1 1s.448 1 1 1h6.5c.552 0 1-.448 1-1s-.448-1-1-1h-6.5zm-2.5 4.5c0-.552.448-1 1-1h6.5c.552 0 1 .448 1 1s-.448 1-1 1h-6.5c-.552 0-1-.448-1-1z"
      ></path>
      <path
        className="fill-current"
        clipRule="evenodd"
        d="M18.75 9.086l4.414 4.414-8.5 8.5H10.25v-4.414l8.5-8.5zm1.586 4.414l-1.586-1.586L17.664 13l1.586 1.586 1.086-1.086zm-8.086 4.914l4-4L17.836 16l-4 4H12.25v-1.586z"
        fillRule="evenodd"
      ></path>
    </IconButton>
  );
}

function Communities() {
  return (
    <IconButton storageKey={KeyCommunitiesButton} label="Communities">
      <path
        className="fill-current"
        d="M7.501 19.917L7.471 21H.472l.029-1.027c.184-6.618 3.736-8.977 7-8.977.963 0 1.95.212 2.87.672a9.115 9.115 0 00-1.212 1.656 4.388 4.388 0 00-1.658-.329c-2.767 0-4.57 2.223-4.938 6.004H7.56c-.023.302-.05.599-.059.917zm15.998.056L23.528 21H9.472l.029-1.027c.184-6.618 3.736-8.977 7-8.977s6.816 2.358 7 8.977zM21.437 19c-.367-3.781-2.17-6.004-4.938-6.004s-4.57 2.223-4.938 6.004h9.875zm-4.938-9a3.467 3.467 0 01-2.116-.73 3.483 3.483 0 01-1.384-2.77c0-1.93 1.567-3.5 3.5-3.5s3.5 1.57 3.5 3.5c0 1.132-.548 2.13-1.384 2.77a3.467 3.467 0 01-2.116.73zm-1.5-3.5c0 .827.673 1.5 1.5 1.5s1.5-.673 1.5-1.5-.673-1.5-1.5-1.5-1.5.673-1.5 1.5zM7.5 3C9.433 3 11 4.57 11 6.5S9.433 10 7.5 10 4 8.43 4 6.5 5.567 3 7.5 3zm0 2C6.673 5 6 5.673 6 6.5S6.673 8 7.5 8 9 7.327 9 6.5 8.327 5 7.5 5z"
      />
    </IconButton>
  );
}

function Lists() {
  return (
    <IconButton storageKey={KeyListsButton} label="Lists">
      <path
        className="fill-current"
        d="M3 4.5A2.5 2.5 0 015.5 2h13A2.5 2.5 0 0121 4.5v15a2.5 2.5 0 01-2.5 2.5h-13A2.5 2.5 0 013 19.5v-15zM5.5 4c-.28 0-.5.22-.5.5v15c0 .28.22.5.5.5h13c.28 0 .5-.22.5-.5v-15c0-.28-.22-.5-.5-.5h-13zM16 10H8V8h8v2zm-8 2h8v2H8v-2z"
      />
    </IconButton>
  );
}

function Topics() {
  return (
    <IconButton storageKey={KeyTopicsButton} label="Topics">
      <path
        className="fill-current"
        d="M12 3.75C7.99 3.75 4.75 7 4.75 11s3.24 7.25 7.25 7.25h1v2.44c1.13-.45 2.42-1.3 3.54-2.54 1.52-1.67 2.66-3.95 2.71-6.67.07-4.46-3.28-7.73-7.25-7.73zM2.75 11c0-5.11 4.14-9.25 9.25-9.25s9.34 4.23 9.25 9.77c-.06 3.28-1.44 6.01-3.23 7.97-1.76 1.94-3.99 3.21-5.87 3.5l-1.15.17V20.2c-4.64-.5-8.25-4.43-8.25-9.2zM15 10H9V8h6v2zm-2 4H9v-2h4v2z"
      ></path>
    </IconButton>
  );
}

function XPremium() {
  return (
    <IconButton storageKey={KeyXPremiumButton} label="Premium">
      <path
        className="fill-current"
        d="M8.52 3.59c.8-1.1 2.04-1.84 3.48-1.84s2.68.74 3.49 1.84c1.34-.21 2.74.14 3.76 1.16s1.37 2.42 1.16 3.77c1.1.8 1.84 2.04 1.84 3.48s-.74 2.68-1.84 3.48c.21 1.34-.14 2.75-1.16 3.77s-2.42 1.37-3.76 1.16c-.8 1.1-2.05 1.84-3.49 1.84s-2.68-.74-3.48-1.84c-1.34.21-2.75-.14-3.77-1.16-1.01-1.02-1.37-2.42-1.16-3.77-1.09-.8-1.84-2.04-1.84-3.48s.75-2.68 1.84-3.48c-.21-1.35.14-2.75 1.16-3.77s2.43-1.37 3.77-1.16zm3.48.16c-.85 0-1.66.53-2.12 1.43l-.38.77-.82-.27c-.96-.32-1.91-.12-2.51.49-.6.6-.8 1.54-.49 2.51l.27.81-.77.39c-.9.46-1.43 1.27-1.43 2.12s.53 1.66 1.43 2.12l.77.39-.27.81c-.31.97-.11 1.91.49 2.51.6.61 1.55.81 2.51.49l.82-.27.38.77c.46.9 1.27 1.43 2.12 1.43s1.66-.53 2.12-1.43l.39-.77.82.27c.96.32 1.9.12 2.51-.49.6-.6.8-1.55.48-2.51l-.26-.81.76-.39c.91-.46 1.43-1.27 1.43-2.12s-.52-1.66-1.43-2.12l-.77-.39.27-.81c.32-.97.12-1.91-.48-2.51-.61-.61-1.55-.81-2.51-.49l-.82.27-.39-.77c-.46-.9-1.27-1.43-2.12-1.43zm4.74 5.68l-6.2 6.77-3.74-3.74 1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36z"
      ></path>
    </IconButton>
  );
}

function Grok() {
  return (
    <IconButton storageKey={KeyGrokButton} label="Grok" viewBox="0 0 33 32">
      <path
        className="fill-current"
        d="M12.745 20.54l10.97-8.19c.539-.4 1.307-.244 1.564.38 1.349 3.288.746 7.241-1.938 9.955-2.683 2.714-6.417 3.31-9.83 1.954l-3.728 1.745c5.347 3.697 11.84 2.782 15.898-1.324 3.219-3.255 4.216-7.692 3.284-11.693l.008.009c-1.351-5.878.332-8.227 3.782-13.031L33 0l-4.54 4.59v-.014L12.743 20.544m-2.263 1.987c-3.837-3.707-3.175-9.446.1-12.755 2.42-2.449 6.388-3.448 9.852-1.979l3.72-1.737c-.67-.49-1.53-1.027-2.515-1.387-4.455-1.854-9.789-.931-13.41 2.728-3.483 3.523-4.579 8.94-2.697 13.561 1.405 3.454-.899 5.898-3.22 8.364C1.49 30.2.666 31.074 0 32l10.478-9.466"
      ></path>
    </IconButton>
  );
}

function VerifiedOrgs() {
  return (
    <IconButton storageKey={KeyVerifiedOrgsButton} label="Verified Orgs">
      <path
        className="fill-current"
        d="M7.323 2h11.443l-3 5h6.648L6.586 22.83 7.847 14H2.523l4.8-12zm1.354 2l-3.2 8h4.676l-.739 5.17L17.586 9h-5.352l3-5H8.677z"
      ></path>
    </IconButton>
  );
}

function Profile() {
  return (
    <IconButton storageKey={KeyProfileButton} label="Profile">
      <path
        className="fill-current"
        d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"
      />
    </IconButton>
  );
}

function TypefullyGrow() {
  return (
    <IconButton storageKey={KeyTypefullyGrowTab} label="Typefully Analytics">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="currentColor"
        d="M5 5h14a1 1 0 011 1v.586l-8 8-3.293-3.293L8 10.586l-.707.707L4 14.586V6a1 1 0 011-1zM4 17.414V18a1 1 0 001 1h14a1 1 0 001-1V9.414l-7.293 7.293-.707.707-.707-.707L8 13.414l-4 4zM2 6a3 3 0 013-3h14a3 3 0 013 3v12a3 3 0 01-3 3H5a3 3 0 01-3-3V6z"
      />
    </IconButton>
  );
}

function More() {
  return (
    <IconButton storageKey={KeyMoreButton} label="More">
      <path
        className="fill-current"
        d="M3.75 12c0-4.56 3.69-8.25 8.25-8.25s8.25 3.69 8.25 8.25-3.69 8.25-8.25 8.25S3.75 16.56 3.75 12zM12 1.75C6.34 1.75 1.75 6.34 1.75 12S6.34 22.25 12 22.25 22.25 17.66 22.25 12 17.66 1.75 12 1.75zm-4.75 11.5c.69 0 1.25-.56 1.25-1.25s-.56-1.25-1.25-1.25S6 11.31 6 12s.56 1.25 1.25 1.25zm9.5 0c.69 0 1.25-.56 1.25-1.25s-.56-1.25-1.25-1.25-1.25.56-1.25 1.25.56 1.25 1.25 1.25zM13.25 12c0 .69-.56 1.25-1.25 1.25s-1.25-.56-1.25-1.25.56-1.25 1.25-1.25 1.25.56 1.25 1.25z"
      />
    </IconButton>
  );
}

function Jobs() {
  return (
    <IconButton storageKey={KeyJobsButton} label="Jobs">
      <path
        className="fill-current"
        d="M19.5 6H17V4.5C17 3.12 15.88 2 14.5 2h-5C8.12 2 7 3.12 7 4.5V6H4.5C3.12 6 2 7.12 2 8.5v10C2 19.88 3.12 21 4.5 21h15c1.38 0 2.5-1.12 2.5-2.5v-10C22 7.12 20.88 6 19.5 6zM9 4.5c0-.28.23-.5.5-.5h5c.28 0 .5.22.5.5V6H9V4.5zm11 14c0 .28-.22.5-.5.5h-15c-.27 0-.5-.22-.5-.5v-3.04c.59.35 1.27.54 2 .54h5v1h2v-1h5c.73 0 1.41-.19 2-.54v3.04zm0-6.49c0 1.1-.9 1.99-2 1.99h-5v-1h-2v1H6c-1.1 0-2-.9-2-2V8.5c0-.28.23-.5.5-.5h15c.28 0 .5.22.5.5v3.51z"
      />
    </IconButton>
  );
}

function NavigationSection() {
  return (
    <section className="flex flex-col gap-2" aria-labelledby="user-control-navigation-label">
      <SectionLabel htmlFor="user-control-navigation">Left Navigation</SectionLabel>
      <ControlsWrapper id="user-control-navigation">
        <div className="grid grid-cols-5 gap-x-3 gap-y-3">
          <Home />
          <Explore />
          <Notifications />
          <Messages />
          <Grok />
          <XPremium />
          <Bookmarks />
          <CreatorStudio />
          <Lists />
          <Jobs />
          <Communities />
          <Articles />
          <Topics />
          <VerifiedOrgs />
          <TypefullyGrow />
          <Profile />
          <More />
        </div>
        <div className="flex flex-col gap-4">
          <Separator />
          <SwitchControl label="𝕏 Logo" storageKey={KeySidebarLogo} />
          <Field orientation="horizontal">
            <FieldLabel className="whitespace-nowrap">Show Labels</FieldLabel>
            <SegmentedControl
              storageKey={KeyNavigationButtonsLabels}
              segments={[
                {
                  value: "never",
                  label: "Never",
                },
                {
                  value: "hover",
                  label: "On Hover",
                },
                {
                  value: "always",
                  label: "Always",
                },
              ]}
            />
          </Field>
          <SwitchControl label="Center Vertically" storageKey={KeyNavigationCenter} />
          <SwitchControl label="Unread Count Badge" storageKey={KeyUnreadCountBadge} />
          <SwitchControl label="Hide Grok Drawer Button" storageKey={KeyHideGrokDrawer} />
        </div>
      </ControlsWrapper>
    </section>
  );
}

export default NavigationSection;
