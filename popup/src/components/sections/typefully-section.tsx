import ControlsWrapper from "@/components/ui/controls-wrapper";
import SectionLabel from "@/components/ui/section-label";
import SwitchControl from "@/components/ui/switch-control";

function TypefullySection() {
  return (
    <section className="flex flex-col gap-2" aria-labelledby="user-control-typefully-label">
      <SectionLabel htmlFor="user-control-typefully">Typefully</SectionLabel>
      <ControlsWrapper id="user-control-typefully">
        <SwitchControl label="Typefully Enhancements" storageKey="typefullyEnhancementsButtons" />
      </ControlsWrapper>
    </section>
  );
}

export default TypefullySection;
