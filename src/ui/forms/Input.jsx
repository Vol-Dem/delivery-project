import classes from "./Input.module.scss";

const Input = ({
  label,
  className,
  onBlur,
  onChange,
  error,
  ...inputProps
}) => {
  const onBlurEvent = (e) => {
    onBlur && onBlur(e.target.value);
  };
  const onChangeEvent = (e) => {
    onChange && onChange(e.target.value);
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
