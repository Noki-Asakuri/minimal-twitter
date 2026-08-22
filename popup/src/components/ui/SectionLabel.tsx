import type { ReactNode } from "react";

type SectionLabelProps = {
  htmlFor?: string;
  className?: string;
  children?: ReactNode;
};

const SectionLabel = ({ htmlFor, className = "", children }: SectionLabelProps) => {
  return (
    <h2
      id={`${htmlFor || "user-control-interface"}-label`}
      className={`px-1 text-xs font-semibold tracking-wide text-muted-foreground ${className}`}
    >
      {children || "Interface"}
    </h2>
  );
};

export default SectionLabel;
