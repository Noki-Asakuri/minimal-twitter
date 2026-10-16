import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

function Container({ children }: ContainerProps) {
  return (
    <div className="popup-shell relative flex w-[440px] max-w-full flex-col font-sans font-normal text-foreground">
      {children}
    </div>
  );
}

export default Container;
