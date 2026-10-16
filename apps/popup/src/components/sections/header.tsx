import { SlidersHorizontalIcon, VolumeXIcon } from "lucide-react";

import createTweetLink from "@/utilities/createTweetLink";
import { createTypefullyUrl } from "@content/modules/utilities/create-typefully-url";

const tweet = {
  text: "An updated fork of Minimal Twitter, originally made by @typefully",
  url: "https://github.com/Noki-Asakuri/minimal-twitter",
};

function Header() {
  return (
    <header className="popup-header">
      <div className="flex items-center gap-3">
        <div className="brand-mark" aria-hidden="true">
          <SlidersHorizontalIcon className="size-5" />
        </div>
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Minimal Twitter</h1>
          <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
            <a
              href={createTypefullyUrl({ utm_content: "popup-header-link" })}
              target="_blank"
              rel="noreferrer"
              className="underline-offset-4 hover:underline"
            >
              Made by Typefully
            </a>
            {" · "}
            <a
              href="https://github.com/Noki-Asakuri/minimal-twitter"
              target="_blank"
              rel="noreferrer"
              className="underline-offset-4 hover:underline"
            >
              Updated fork
            </a>
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <a
          href="https://x.com/settings/mute_and_block"
          target="_blank"
          rel="noreferrer"
          className="header-action"
          aria-label="Mute and block settings"
          title="Mute and block settings"
        >
          <VolumeXIcon className="size-4" />
        </a>
        <a
          href={createTweetLink(tweet)}
          target="_blank"
          rel="noreferrer"
          className="header-action text-xs font-medium"
        >
          Share
        </a>
      </div>
    </header>
  );
}

export default Header;
