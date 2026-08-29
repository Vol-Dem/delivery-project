// import classes from "./Input.module.scss";

// const Input = ({
//   type,
//   placeholder,
//   value,
//   onChange,
//   autoFocus,
//   className,
//   readOnly,
// }) => {
//   return (
//     <input
//       className={`${classes.input} ${className || ""}`}
//       type={type}
//       placeholder={placeholder}
//       value={value}
//       onChange={onChange}
//       autoFocus={autoFocus}
//       readOnly={readOnly}
//     />
//   );
// };

// export default Input;

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
  const onBlurIvent = (e) => {
    onBlur && onBlur(e.target.value);
  };
  const onChangeIvent = (e) => {
    onChange && onChange(e.target.value);
  };

  return (
    <>
      <label htmlFor={name} className={classes.label}>
        {label || ""}
        <input
          id={id}
          type={type}
          onBlur={onBlurIvent}
          onChange={onChangeIvent}
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
