import type { HTMLAttributes } from "react";
import classes from "./Wrap.module.scss";

const Wrap = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props} className={`${classes.wrap} ${className || ""}`} />
  );
};

export default Wrap;
