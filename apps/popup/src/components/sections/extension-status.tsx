import ControlsWrapper from "@/components/ui/controls-wrapper";
import SwitchControl from "@/components/ui/switch-control";

import { KeyExtensionStatus } from "@minimal-twitter/shared";

export default function ExtensionStatus() {
  return (
    <ControlsWrapper className="border-primary/15 bg-primary/5 ring-primary/20">
      <SwitchControl label="Extension Enabled" storageKey={KeyExtensionStatus} />
    </ControlsWrapper>
  );
}
