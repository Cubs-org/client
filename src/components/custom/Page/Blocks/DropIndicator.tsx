import clsx from "clsx"
import { forwardRef } from "react";

interface DropIndicatorProps {
  classNames?: string;
}

export const DropIndicator = forwardRef(({ classNames }: DropIndicatorProps, ref: any) => {
  return (
    <div 
      ref={ref}
      className={clsx("rounded-sm", classNames)}
    />
  );
})
