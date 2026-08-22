import type { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";

import { cn } from "@/lib/utils";

type ControlsWrapperProps = {
  id?: string;
  className?: string;
  children?: ReactNode;
};

function ControlsWrapper({ id, className = "", children }: ControlsWrapperProps) {
  return (
    <Card id={id || "user-control-timeline"} size="sm" className={cn("py-0", className)}>
      <CardContent className="flex flex-col gap-4 p-4">{children}</CardContent>
    </Card>
  );
}

export default ControlsWrapper;
