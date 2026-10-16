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
    <Card
      id={id || "user-control-timeline"}
      size="sm"
      className={cn("settings-group py-0 ring-0", className)}
    >
      <CardContent className="flex flex-col gap-0 px-4 py-1">{children}</CardContent>
    </Card>
  );
}

export default ControlsWrapper;
