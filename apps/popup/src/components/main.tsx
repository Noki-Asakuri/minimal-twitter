import { useEffect, useRef, useState } from "react";

import AdvancedSection from "./sections/advanced-section";
import ExtensionStatus from "./sections/extension-status";
import InterfaceSection from "./sections/interface-section";
import NavigationSection from "./sections/navigation-section";
import ShareMenuSection from "./sections/share-menu-section";
import TimelineSection from "./sections/timeline-section";
import TypefullySection from "./sections/typefully-section";

const categories = [
  { id: "feed", label: "Feed" },
  { id: "navigation", label: "Navigation" },
  { id: "appearance", label: "Appearance" },
  { id: "more", label: "More" },
];

export default function Main() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("feed");

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;
    const sections = [...root.querySelectorAll<HTMLElement>("[data-settings-section]")].reverse();
    const updateActiveCategory = () => {
      const boundary = root.getBoundingClientRect().top + root.clientHeight * 0.25;
      const current = sections.find((section) => section.getBoundingClientRect().top <= boundary);
      if (current) setActiveCategory(current.id);
    };
    const observer = new IntersectionObserver(updateActiveCategory, {
      root,
      rootMargin: "0px 0px -75% 0px",
    });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <ExtensionStatus />
      <div className="settings-tabs">
        <nav aria-label="Settings categories" className="settings-tab-list">
          {categories.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className="settings-tab"
              aria-current={activeCategory === id ? "location" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <div ref={scrollRef} className="settings-scroll">
          <div id="feed" data-settings-section className="settings-panel">
            <TimelineSection />
          </div>
          <div id="navigation" data-settings-section className="settings-panel">
            <NavigationSection />
          </div>
          <div id="appearance" data-settings-section className="settings-panel">
            <InterfaceSection />
          </div>
          <div id="more" data-settings-section className="settings-panel">
            <div className="flex flex-col gap-7">
              <ShareMenuSection />
              <TypefullySection />
              <AdvancedSection />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
