import AdvancedSection from "./sections/advanced-section";
import ExtensionStatus from "./sections/extension-status";
import InterfaceSection from "./sections/interface-section";
import NavigationSection from "./sections/navigation-section";
import ShareMenuSection from "./sections/share-menu-section";
import TimelineSection from "./sections/timeline-section";
import TypefullySection from "./sections/typefully-section";

export default function Main() {
  return (
    <main className="flex flex-col gap-5 px-2">
      <ExtensionStatus />
      <TimelineSection />
      <NavigationSection />
      <InterfaceSection />
      <ShareMenuSection />
      <TypefullySection />
      <AdvancedSection />
    </main>
  );
}
