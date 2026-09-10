import classes from "./Counter.module.scss";

interface CounterProps {
  digits: string;
  text: string;
  className?: string;
}

const Counter = ({ digits, text, className }: CounterProps) => {
  return (
    <div className={`${classes["counter"]} ${className || ""}`}>
      <span className={classes["counter-digits"]}>{digits}</span>
      {text}
    </div>
  );
};

export default Counter;
