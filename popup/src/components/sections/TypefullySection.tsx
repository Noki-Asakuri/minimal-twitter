import ControlsWrapper from "@/components/ui/ControlsWrapper";
import SectionLabel from "@/components/ui/SectionLabel";
import SwitchControl from "@/components/ui/SwitchControl";

const TypefullySection = () => (
  <section className="flex flex-col gap-2" aria-labelledby="user-control-typefully-label">
    <SectionLabel htmlFor="user-control-typefully">Typefully</SectionLabel>
    <ControlsWrapper id="user-control-typefully">
      <SwitchControl label="Typefully Enhancements" storageKey="typefullyEnhancementsButtons" />
    </ControlsWrapper>
  </section>
);

export default TypefullySection;
