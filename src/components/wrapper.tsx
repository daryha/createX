import React from "react";
import cn from "classnames";
interface Props {
  className?: string;
}

export const Wrapper: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  return (
    <div className={cn("mx-auto max-w-[1480px]", className)}>{children}</div>
  );
};
