import classes from "./Input.module.scss";

const Input = ({
  type,
  placeholder,
  value,
  onChange,
  autoFocus,
  className,
  readOnly,
}) => {
  return (
    <input
      className={`${classes.input} ${className || ""}`}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      autoFocus={autoFocus}
      readOnly={readOnly}
    />
  );
};

export default Input;
