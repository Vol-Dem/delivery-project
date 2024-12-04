import classes from "./Tracking.module.scss";
import { ReactComponent as BoxEmptyImg } from "./../../assets/layout/boxempty.svg";
import { ReactComponent as MarkerCheckImg } from "./../../assets/markercheck.svg";
import { ReactComponent as CalendarImg } from "./../../assets/calendar.svg";
import { ReactComponent as TruckImg } from "./../../assets/truck-small.svg";
import { ReactComponent as MarkerImg } from "./../../assets/layout/map-marker.svg";

const Tracking = ({ trackingNumber }) => {
  return (
    <div className={classes["tracking"]}>
      <h3 className={classes["tracking__title"]}>Delivery</h3>
      <div className={classes["tracking__number-item"]}>
        <div className={classes["tracking__subtitle"]}>Track Number</div>
        <div className={classes["tracking__number"]}>{trackingNumber}</div>
      </div>
      <div className={classes["tracking__item"]}>
        <div className={classes["tracking__img"]}>
          <CalendarImg />
        </div>
        <div className={classes["tracking__subtitle"]}>
          Estimated delivery date
        </div>
        <div className={classes["tracking__content"]}>25.08.24</div>
      </div>
      <div className={classes["tracking__item"]}>
        <div className={classes["tracking__img"]}>
          <MarkerImg />
        </div>
        <div className={classes["tracking__subtitle"]}>London N1 9DN</div>
        <div className={classes["tracking__content"]}>Post Office</div>
      </div>
      <div className={classes["tracking__story"]}>
        <div className={classes["tracking__item"]}>
          <div className={classes["tracking__img"]}>
            <BoxEmptyImg />
          </div>
          <div>Waiting at the palce of issue</div>
          <div className={classes["tracking__date"]}>23.08.24</div>
        </div>
        <div className={classes["tracking__item"]}>
          <div className={classes["tracking__img"]}>
            <MarkerCheckImg />
          </div>
          <div>Shipped form warehouse</div>
          <div className={classes["tracking__date"]}>23.08.24</div>
        </div>
        <div className={classes["tracking__item"]}>
          <div className={classes["tracking__img"]}>
            <MarkerCheckImg />
          </div>
          <div>Sent to sorting center</div>
          <div className={classes["tracking__date"]}>23.08.24</div>
        </div>
      </div>
      <div className={classes["tracking__item"]}>
        <div className={classes["tracking__img"]}>
          <TruckImg />
        </div>
        <div className={classes["tracking__subtitle"]}>Delivery service</div>
        <div className={classes["tracking__content"]}>UNSTO-Delivery</div>
      </div>
    </div>
  );
};

export default Tracking;
