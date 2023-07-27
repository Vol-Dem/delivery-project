import classes from "./Titles.module.scss";
import { ReactComponent as BoxImg } from "./../assets/title-box.svg";

const Titles = ({ main, sub, className }) => {
  return (
    <div className={`${classes["titles"]} ${className}`}>
      {sub && (
        <div className={classes["titles__sub"]}>
          <BoxImg className={classes["titles__sub-img"]} />
          <h5 className={classes["titles__sub-text"]}>{sub}</h5>
        </div>
      )}
      <h2 className={classes["titles__main"]}>{main}</h2>
    </div>
  );
};

export default Titles;
