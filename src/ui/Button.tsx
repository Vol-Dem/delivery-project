import type { ButtonHTMLAttributes } from "react";
import classes from "./Button.module.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ className, type = "button", ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`${classes["button-submint"]} ${className || ""}`}
      type={type}
    />
  );
};

export default Button;
