import type { InputHTMLAttributes, ReactNode } from "react";
import classes from "./Checkbox.module.scss";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
}

const Checkbox = ({
  id,
  value,
  name,
  label,
  onChange,
  checked,
  className,
  ...inputProps
}: CheckboxProps) => {
  const checkbox = (
    <input
      {...inputProps}
      type="checkbox"
      id={id}
      value={value}
      name={name}
      className={`${classes.checkbox} ${className || ""}`}
      onChange={onChange}
      checked={checked}
    />
  );

  if (!label) {
    return checkbox;
  }

  return (
    <div>
      <label htmlFor={id} className={`${classes.label}`}>
        {checkbox}
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
