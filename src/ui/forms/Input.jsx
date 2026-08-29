import classes from "./Input.module.scss";

const Input = (props) => {
  const {
    id,
    type,
    name,
    label,
    input,
    className,
    onBlur,
    onChange,
    error,
    autoFocus,
    value,
    readOnly,
    placeholder,
  } = props;
  const onBlurEvent = (e) => {
    onBlur && onBlur(e.target.value);
  };
  const onChangeEvent = (e) => {
    onChange && onChange(e.target.value);
  };

  return (
    <>
      <label htmlFor={name} className={classes.label}>
        {label || ""}
        <input
          id={id}
          type={type}
          onBlur={onBlurEvent}
          onChange={onChangeEvent}
          placeholder={placeholder}
          {...input}
          className={`${classes.input} ${className || ""}`}
          autoFocus={autoFocus}
          value={value}
          readOnly={readOnly}
        />
        {error && <div className={classes.error}>{error}</div>}
      </label>
    </>
  );
};

export default Input;
