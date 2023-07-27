import classes from "./Steps.module.scss";
import { ReactComponent as MarkerImg } from "./../../../assets/layout/map-marker.svg";
import Titles from "../../../ui/Titles";
import Wrap from "../../layout/Wrap";

const Steps = () => {
  return (
    <section className={classes["steps-section"]} id="section-steps">
      <Wrap>
        <Titles
          main="Four simple steps between sender and recipient"
          sub="How it works"
          className={classes["steps-section__titles"]}
        />
        <div className={classes["steps"]}>
          <div
            className={`${classes["steps__item"]} ${classes["steps__item--blue"]}`}
          >
            <div className={classes["steps__icon"]}>
              <MarkerImg
                className={`${classes["steps__icon--small"]} ${classes["steps__icon--dark"]}`}
              />
              <MarkerImg
                className={`${classes["steps__icon--big"]} ${classes["steps__icon--light"]}`}
              />
            </div>
            <h4 className={classes["steps__title"]}>Step 1</h4>
            <p className={classes["steps__text"]}>
              Arrange delivery through your personal account, on the website or
              by phone. It will take no more than 3 minutes
            </p>
          </div>
          <div className={classes["steps__item"]}>
            <div className={classes["steps__icon"]}>
              <MarkerImg
                className={`${classes["steps__icon--small"]} ${classes["steps__icon--light"]}`}
              />
              <MarkerImg
                className={`${classes["steps__icon--big"]} ${classes["steps__icon--dark"]}`}
              />
            </div>
            <h4 className={classes["steps__title"]}>Step 2</h4>
            <p className={classes["steps__text"]}>
              Service couriers will see the order through the mobile application
              and take the order to work
            </p>
          </div>
          <div
            className={`${classes["steps__item"]} ${classes["steps__item--blue"]}`}
          >
            <div className={classes["steps__icon"]}>
              <MarkerImg
                className={`${classes["steps__icon--small"]} ${classes["steps__icon--dark"]}`}
              />
              <MarkerImg
                className={`${classes["steps__icon--big"]} ${classes["steps__icon--light"]}`}
              />
            </div>
            <h4 className={classes["steps__title"]}>Step 3</h4>
            <p className={classes["steps__text"]}>
              As soon as a courier is assigned, you will receive a notification
              that the delivery has been accepted for execution.
            </p>
          </div>
          <div className={classes["steps__item"]}>
            <div className={classes["steps__icon"]}>
              <MarkerImg
                className={`${classes["steps__icon--small"]} ${classes["steps__icon--light"]}`}
              />
              <MarkerImg
                className={`${classes["steps__icon--big"]} ${classes["steps__icon--dark"]}`}
              />
            </div>
            <h4 className={classes["steps__title"]}>Step 4</h4>
            <p className={classes["steps__text"]}>
              Your client receives the order and you will receive a notification
              that the delivery has been successfully completed
            </p>
          </div>
        </div>
      </Wrap>
    </section>
  );
};

export default Steps;
