import type { HTMLAttributes, Ref } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  ref?: Ref<HTMLDivElement>;
};

const Container = ({ className, ref, ...props }: ContainerProps) => (
  <div className={cn("container", className)} ref={ref} {...props} />
);

export default Container;
