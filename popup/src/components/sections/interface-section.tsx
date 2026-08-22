import ControlsWrapper from "@/components/ui/controls-wrapper";
import SectionLabel from "@/components/ui/section-label";
import SwitchControl from "@/components/ui/switch-control";

import {
  KeyChatDrawerButton,
  KeyInterFont,
  KeySearchBar,
  KeyTitleNotifications,
  KeyTransparentSearch,
  KeyTweetButton,
} from "../../../../storage-keys";

function InterfaceSection() {
  return (
    <section className="flex flex-col gap-2" aria-labelledby="user-control-interface-label">
      <SectionLabel htmlFor="user-control-interface">Interface</SectionLabel>
      <ControlsWrapper id="user-control-interface">
        <SwitchControl label="Inter Font" storageKey={KeyInterFont} />
        <SwitchControl label="Search Bar" storageKey={KeySearchBar} />
        <SwitchControl label="Transparent Search Bar" storageKey={KeyTransparentSearch} />
        <SwitchControl label="Tweet Button" storageKey={KeyTweetButton} />
        <SwitchControl label="Chat Drawer Button" storageKey={KeyChatDrawerButton} />
        <SwitchControl label="Notifications in Title" storageKey={KeyTitleNotifications} />
      </ControlsWrapper>
    </section>
  );
}

export default InterfaceSection;
