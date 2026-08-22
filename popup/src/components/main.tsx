import AdvancedSection from "./sections/AdvancedSection";
import ExtensionStatus from "./sections/ExtensionStatus";
import InterfaceSection from "./sections/InterfaceSection";
import NavigationSection from "./sections/NavigationSection";
import ShareMenuSection from "./sections/ShareMenuSection";
import TimelineSection from "./sections/TimelineSection";
import TypefullySection from "./sections/TypefullySection";

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
