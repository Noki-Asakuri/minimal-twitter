import ControlsWrapper from "@/components/ui/ControlsWrapper";
import SwitchControl from "@/components/ui/SwitchControl";

import { KeyExtensionStatus } from "../../../../storage-keys";

export default function ExtensionStatus() {
  return (
    <ControlsWrapper className="border-primary/15 bg-primary/5 ring-primary/20">
      <SwitchControl label="Extension Enabled" storageKey={KeyExtensionStatus} />
    </ControlsWrapper>
  );
}
