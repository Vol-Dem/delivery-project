import classes from "./Hero.module.scss";
import { ReactComponent as HouseIcon } from "./../../../assets/house.svg";
import { ReactComponent as BuildingIcon } from "./../../../assets/building.svg";
import { ReactComponent as TruckIcon } from "./../../../assets/truck.svg";
import { ReactComponent as TreeIcon } from "./../../../assets/tree.svg";
import { ReactComponent as WheelIcon } from "./../../../assets/wheel.svg";
import Button from "../../../ui/Button";
import Input from "../../../ui/forms/Input";
import Modal from "../../../ui/Modal";
import Tracking from "../../tracking/Tracking";
import { useState } from "react";
import { AnimatePresence, animate } from "framer-motion";

const Hero = () => {
  const [trackingIsOpen, setTrackingIsOpen] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");
  const closeTrackingHandler = () => {
    setTrackingIsOpen(false);
  };
  const formHandler = (e) => {
    e.preventDefault();
    const inputValue = e.target[0].value;
    if (!inputValue) {
      animate(
        "#track",
        { rotate: [-5, 0, 5, 0] },
        { type: "keyframes", duration: 0.1, repeat: 1 }
      );
    }
    if (inputValue) {
      setTrackingNumber(inputValue);
      setTrackingIsOpen(true);
    }
  };
  return (
    <section className={classes.hero} id="section-hero">
      <div className={classes["container"]}>
        <div className={classes.content}>
          <h1 className={classes.title}>
            Express delivery
            <span>for online stores within the city</span>
          </h1>
          <p className={classes["hero-text"]}>
            We will provide your business with delivery just in time and with a
            convenient possibility of paying for orders for you and your
            customers
          </p>
          <form onSubmit={formHandler} className={classes.form} action="">
            <Input id="track" type="text" placeholder="Enter track number" />
            <Button type="submit">Track</Button>
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
      </div>
      <AnimatePresence>
        {trackingIsOpen && (
          <Modal ariaLabel="Delivery tracking" onClose={closeTrackingHandler}>
            <Tracking trackingNumber={trackingNumber} />
          </Modal>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
