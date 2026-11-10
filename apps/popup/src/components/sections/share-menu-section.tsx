import ControlsWrapper from "@/components/ui/controls-wrapper";
import SectionLabel from "@/components/ui/section-label";
import SwitchControl from "@/components/ui/switch-control";

import {
  KeyDownloadVideoShareMenu,
  KeyPostVideoShareMenu,
  KeyRemoveShareLinkTracking,
  KeySendViaChatShareMenu,
  KeySendViaDirectMessageShareMenu,
  KeySharePostViaShareMenu,
  KeyUseFixupx,
} from "@minimal-twitter/shared";

function ShareMenuSection() {
  return (
    <section className="flex flex-col gap-4" aria-labelledby="user-control-share-menu-label">
      <SectionLabel
        htmlFor="user-control-share-menu"
        description="Choose share menu actions and customize copied post links."
      >
        Sharing
      </SectionLabel>
      <ControlsWrapper id="user-control-share-menu">
        <SwitchControl
          label="Send via Direct Message"
          storageKey={KeySendViaDirectMessageShareMenu}
        />
        <SwitchControl label="Send via Chat" storageKey={KeySendViaChatShareMenu} />
        <SwitchControl label="Share post via..." storageKey={KeySharePostViaShareMenu} />
        <SwitchControl label="Post Video" storageKey={KeyPostVideoShareMenu} />
        <SwitchControl label="Download Video" storageKey={KeyDownloadVideoShareMenu} />
        <SwitchControl label="Use fixupx.com for copied links" storageKey={KeyUseFixupx} />
        <SwitchControl
          label="Remove tracking from copied links"
          storageKey={KeyRemoveShareLinkTracking}
        />
      </ControlsWrapper>
    </section>
  );
}

export default ShareMenuSection;
