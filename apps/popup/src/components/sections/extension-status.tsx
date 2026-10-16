import SwitchControl from "@/components/ui/switch-control";
import { KeyExtensionStatus } from "@minimal-twitter/shared";

export default function ExtensionStatus() {
  return (
    <div className="extension-status">
      <SwitchControl label="Enable Minimal Twitter" storageKey={KeyExtensionStatus} />
    </div>
  );
}
