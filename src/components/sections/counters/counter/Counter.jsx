import classes from "./Counter.module.scss";

const Counter = ({ digits, text, className }) => {
  return (
    <div className={`${classes["counter"]} ${className || ""}`}>
      <span className={classes["counter-digits"]}>{digits}</span>
      {text}
    </div>
  );
};

export default Counter;
