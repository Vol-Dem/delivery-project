import classes from "./Wrap.module.scss";

const Wrap = (props) => {
  return (
    <div className={`${classes.wrap} ${props.className}`}>{props.children}</div>
  );
};

export default Wrap;
