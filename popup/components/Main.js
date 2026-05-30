import AdvancedSection from "./sections/AdvancedSection";
import ExtensionStatus from "./sections/ExtensionStatus";
import InterfaceSection from "./sections/InterfaceSection";
import NavigationSection from "./sections/NavigationSection";
import ShareMenuSection from "./sections/ShareMenuSection";
import TimelineSection from "./sections/TimelineSection";
import TypefullySection from "./sections/TypefullySection";

const Main = () => (
  <main className="flex flex-col p-2 gap-y-4">
    <ExtensionStatus />
    <TimelineSection />
    <NavigationSection />
    <InterfaceSection />
    <ShareMenuSection />
    <TypefullySection />
    <AdvancedSection />
  </main>
);

export default Main;
