import classes from "./Wrap.module.scss";

const Wrap = (props) => {
  return (
    <div className={`${classes.wrap} ${classes[props.className]}`}>
      {props.children}
    </div>
  );
};

export default Wrap;
