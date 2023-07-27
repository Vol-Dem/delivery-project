import classes from "./Button.module.scss";

const Button = (props) => {
  return (
    <button
      className={`${classes["button-submint"]} ${props.className}`}
      type={props.type || "button"}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
