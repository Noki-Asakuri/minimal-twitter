import ControlsWrapper from "@/components/ui/controls-wrapper";
import SectionLabel from "@/components/ui/section-label";
import SwitchControl from "@/components/ui/switch-control";

import {
  KeyDownloadVideoShareMenu,
  KeyPostVideoShareMenu,
  KeySendViaChatShareMenu,
  KeySendViaDirectMessageShareMenu,
  KeySharePostViaShareMenu,
} from "@minimal-twitter/shared";

function ShareMenuSection() {
  return (
    <section className="flex flex-col gap-2" aria-labelledby="user-control-share-menu-label">
      <SectionLabel htmlFor="user-control-share-menu">Share Menu</SectionLabel>
      <ControlsWrapper id="user-control-share-menu">
        <SwitchControl
          label="Send via Direct Message"
          storageKey={KeySendViaDirectMessageShareMenu}
        />
        <SwitchControl label="Send via Chat" storageKey={KeySendViaChatShareMenu} />
        <SwitchControl label="Share post via..." storageKey={KeySharePostViaShareMenu} />
        <SwitchControl label="Post Video" storageKey={KeyPostVideoShareMenu} />
        <SwitchControl label="Download Video" storageKey={KeyDownloadVideoShareMenu} />
      </ControlsWrapper>
    </section>
  );
}

export default ShareMenuSection;
