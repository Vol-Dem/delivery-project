import classes from "./Hero.module.scss";
import { ReactComponent as HouseIcon } from "./../../../assets/house.svg";
import { ReactComponent as BuildingIcon } from "./../../../assets/building.svg";
import { ReactComponent as TruckIcon } from "./../../../assets/truck.svg";
import { ReactComponent as TreeIcon } from "./../../../assets/tree.svg";
import { ReactComponent as WheelIcon } from "./../../../assets/wheel.svg";
import Button from "../../../ui/Button";
import Input from "../../../ui/Input";

const Hero = () => {
  const formHandler = (e) => {
    e.preventDefault();
  };
  return (
    <section className={classes.hero} id="section-hero">
      <div className={classes["container"]}>
        <div className={classes.content}>
          <h1>
            Express delivery
            <span>for online stores within the city</span>
          </h1>
          <p className={classes["hero-text"]}>
            We will provide your business with delivery just in time and with a
            convenient possibility of paying for orders for you and your
            customers
          </p>
          <form onSubmit={formHandler} className={classes.form} action="">
            <Input type="text" placeholder="Enter track number" />
            <Button>Track</Button>
          </form>
        </div>
        <HouseIcon className={classes["warehouse-img"]} />
        <div className={classes.road}>
          <span className={`${classes.speed} ${classes["speed--1"]}`}></span>
          <span className={`${classes.speed} ${classes["speed--2"]}`}></span>
          <span className={`${classes.speed} ${classes["speed--3"]}`}></span>
          <TreeIcon className={`${classes.tree} ${classes["tree--1"]}`} />

          <div className={`${classes.truck} ${classes.anim}`}>
            <TruckIcon />
            <div className={`${classes.tires} ${classes["tires--1"]}`}>
              <WheelIcon />
            </div>
            <div className={`${classes.tires} ${classes["tires--2"]}`}>
              <WheelIcon />
            </div>

            <span className={`${classes.line} ${classes["line--1"]}`}></span>
            <span className={`${classes.line} ${classes["line--2"]}`}></span>
            <span className={`${classes.line} ${classes["line--3"]}`}></span>
          </div>
        </div>

        <BuildingIcon className={classes["house-img"]} />
        <div className={classes["bg-sky"]}></div>
        {/* <div className={classes["bg-container"]}>
          <div className={classes["bg-grad"]}>
            <CityImg className={classes["city-img"]} />
          </div>
        </div> */}
      </div>
      {/* <CityImg className={classes["city-img"]} /> */}
    </section>
  );
};

export default Hero;
