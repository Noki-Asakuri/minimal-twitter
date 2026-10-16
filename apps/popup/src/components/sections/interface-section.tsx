import FontSelector from "@/components/controls/font-selector";
import ControlsWrapper from "@/components/ui/controls-wrapper";
import SectionLabel from "@/components/ui/section-label";
import SwitchControl from "@/components/ui/switch-control";

import {
  KeyChatDrawerButton,
  KeyHidePremiumPromotions,
  KeySearchBar,
  KeyTitleNotifications,
  KeyTransparentSearch,
  KeyTweetButton,
} from "@minimal-twitter/shared";

function InterfaceSection() {
  return (
    <section className="flex flex-col gap-4" aria-labelledby="user-control-interface-label">
      <SectionLabel
        htmlFor="user-control-interface"
        description="A familiar place, with your finishing touches."
      >
        Appearance
      </SectionLabel>
      <ControlsWrapper id="user-control-interface">
        <FontSelector />
        <h3 className="settings-group-title">Search & controls</h3>
        <SwitchControl label="Search Bar" storageKey={KeySearchBar} />
        <SwitchControl label="Transparent Search Bar" storageKey={KeyTransparentSearch} />
        <SwitchControl label="Tweet Button" storageKey={KeyTweetButton} />
        <SwitchControl label="Chat Drawer Button" storageKey={KeyChatDrawerButton} />
        <h3 className="settings-group-title">Promotions & notifications</h3>
        <SwitchControl label="Hide Premium promotions" storageKey={KeyHidePremiumPromotions} />
        <SwitchControl label="Notifications in Title" storageKey={KeyTitleNotifications} />
      </ControlsWrapper>
    </section>
  );
}

export default InterfaceSection;
