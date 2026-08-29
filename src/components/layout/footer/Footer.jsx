import classes from "./Footer.module.scss";
import { ReactComponent as BoxImg } from "./../../../assets/title-box.svg";
import { ReactComponent as EmailIcon } from "./../../../assets/email.svg";
import { ReactComponent as MarkerIcon } from "./../../../assets/layout/map-marker.svg";
import { ReactComponent as PhoneImg } from "./../../../assets/phone.svg";
import FooterNavigation from "../navigation/FooterNavigation";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.wrap}>
        <div className={classes["footer__container"]}>
          <div className={classes["footer__column"]}>
            <h5 className={classes["footer__logo"]}>
              <BoxImg className={classes["footer__logo-img"]} />
              <span> UNSTO-EXPRESS</span>
            </h5>
            <p className={classes["footer__text"]}>
              With the aim to do better everyday, and to be able to add greater
              value to our customers' lives, we have an extensive network of
              call centres, a WhatsApp and Telegram response systems, along with
              a highly motivated social media team, so we can respond to your
              queries, inputs, and complaints better.
            </p>
          </div>
          <div className={classes["footer__column"]}>
            <h4 className={classes["footer__title"]}>Quick Links</h4>
            <FooterNavigation />
          </div>
          <div className={classes["footer__column"]}>
            <h5 className={classes["footer__title"]}>Contact info</h5>

            <div className={classes["footer__item"]}>
              <MarkerIcon className={classes["footer__icon"]} />
              <div>
                <h6 className={classes["footer__subtitle"]}>Location</h6>
                <span>75 Some Street, Some City</span>
              </div>
            </div>
            <div className={classes["footer__item"]}>
              <EmailIcon className={classes["footer__icon"]} />
              <div>
                <h6 className={classes["footer__subtitle"]}>Email</h6>
                <span>someemail@smail.rnd</span>
              </div>
            </div>
            <div className={classes["footer__item"]}>
              <PhoneImg className={classes["footer__icon"]} />
              <div>
                <h6 className={classes["footer__subtitle"]}>Phone</h6>
                <span>+7-777-777-77</span>
              </div>
            </div>
          </div>
        </div>
        <div className={classes["footer__copy"]}>©2023 All Rights Reserved</div>
      </div>
    </footer>
  );
};

export default Footer;
