import classes from "./Titles.module.scss";
import { ReactComponent as BoxImg } from "./../assets/title-box.svg";

interface TitlesProps {
  main: string;
  sub?: string;
  className?: string;
}

const Titles = ({ main, sub, className }: TitlesProps) => {
  return (
    <div className={`${classes["titles"]} ${className || ""}`}>
      {sub && (
        <div className={classes["titles__sub"]}>
          <BoxImg className={classes["titles__sub-img"]} />
          <p className={classes["titles__sub-text"]}>{sub}</p>
        </div>
      )}
      <h2 className={classes["titles__main"]}>{main}</h2>
    </div>
  );
};

export default Titles;
