import type { ReactNode } from "react";

type SectionLabelProps = {
  htmlFor?: string;
  className?: string;
  description?: string;
  children?: ReactNode;
};

function SectionLabel({ htmlFor, className = "", description, children }: SectionLabelProps) {
  return (
    <div className={`section-heading ${className}`}>
      <h2
        id={`${htmlFor || "user-control-interface"}-label`}
        className="text-2xl font-semibold tracking-tight"
      >
        {children || "Interface"}
      </h2>
      {description && (
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

export default SectionLabel;
