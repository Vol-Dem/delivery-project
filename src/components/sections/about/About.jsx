import { ReactComponent as DomesticIcon } from "../../../assets/domestic.svg";
import { ReactComponent as InterIcon } from "../../../assets/international.svg";
import { ReactComponent as AppImg } from "../../../assets/application.svg";
import Titles from "../../../ui/Titles";
import classes from "./About.module.scss";
import Wrap from "../../layout/Wrap";

const About = () => {
  return (
    <section className={classes["about-section"]}>
      <Wrap>
        <div className={classes.container}>
          <AppImg className={classes["about-section__img"]} />

          <div className={classes["about-section__content"]}>
            <Titles
              main={"Courier delivery service"}
              sub="About Us"
              className={classes["about-section__titles"]}
            />
            <div className={classes["about-section__text"]}>
              <p>
                The Unsto-Delivery platform is a resource that allows online
                stores to quickly fill out orders for the delivery of clothes
                and shoes to their customers.
              </p>
              <p>
                We work without holidays and weekends and therefore we can
                guarantee you the provision of courier services at any time.
              </p>
              <p>
                To find out the price of delivery, just fill in the required
                fields in the online application on the site. We will take into
                account all the parameters and report the final amount.
              </p>
            </div>
            <div className={classes["about-section__info"]}>
              <div className={classes["about-section__info-bg"]}>
                <div
                  className={`${classes["about-section__info-block"]} ${classes["about-section__info-block--1"]}`}
                >
                  <DomesticIcon
                    className={classes["about-section__info-img"]}
                  />
                  <div>Domestic delivery</div>
                </div>
              </div>
              <div className={classes["about-section__info-bg"]}>
                <div
                  className={`${classes["about-section__info-block"]} ${classes["about-section__info-block--2"]}`}
                >
                  <InterIcon className={classes["about-section__info-img"]} />
                  <div>International delivery</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrap>
    </section>
  );
};

export default About;
