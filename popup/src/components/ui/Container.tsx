import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

const Container = ({ children }: ContainerProps) => (
  <div className="relative flex w-[420px] max-w-full flex-col font-sans font-normal text-foreground">
    {children}
  </div>
);

export default Container;
