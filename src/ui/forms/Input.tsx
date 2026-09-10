import type {
  ChangeEvent,
  FocusEvent,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import classes from "./Input.module.scss";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onBlur" | "onChange"> {
  label?: ReactNode;
  error?: ReactNode;
  onBlur?: (value: string) => void;
  onChange?: (value: string) => void;
}

const Input = ({
  label,
  className,
  onBlur,
  onChange,
  error,
  ...inputProps
}: InputProps) => {
  const onBlurEvent = (e: FocusEvent<HTMLInputElement>) => {
    onBlur?.(e.target.value);
  };
  const onChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <label htmlFor={inputProps.name} className={classes.label}>
      {label || ""}
      <input
        {...inputProps}
        className={`${classes.input} ${className || ""}`}
        onBlur={onBlurEvent}
        onChange={onChangeEvent}
      />
      {error && <div className={classes.error}>{error}</div>}
    </label>
  );
};

export default Input;
