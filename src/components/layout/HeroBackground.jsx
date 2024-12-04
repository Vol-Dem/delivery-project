import classes from "./HeroBackground.module.scss";
import { ReactComponent as CityImg } from "./../../assets/city-mir.svg";
import { ReactComponent as CloudV1Img } from "./../../assets/bg-elements/cloud1.svg";
import { ReactComponent as CloudV2Img } from "./../../assets/bg-elements/cloud2.svg";
import { ReactComponent as CloudV3Img } from "./../../assets/bg-elements/cloud3.svg";

const HeroBackground = () => {
  return (
    <div className={classes["bg-container"]}>
      <div className={`${classes["bg-grad"]} ${classes["bg-grad--day"]}`}></div>
      <div
        className={`${classes["bg-grad"]} ${classes["bg-grad--night"]}`}
      ></div>

      <CityImg className={classes["city-img"]} />
      <CloudV1Img
        className={`${classes["cloud-img"]} ${classes["cloud-img--1"]}`}
      />
      <CloudV2Img
        className={`${classes["cloud-img"]} ${classes["cloud-img--2"]}`}
      />
      <CloudV3Img
        className={`${classes["cloud-img"]} ${classes["cloud-img--3"]}`}
      />
    </div>
  );
};

export default HeroBackground;
