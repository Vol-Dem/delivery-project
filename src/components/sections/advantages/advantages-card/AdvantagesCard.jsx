import classes from "./AdvantagesCard.module.scss";
import { ReactComponent as SmartphoneImg } from "../../../../assets/smartphone.svg";
import { ReactComponent as MastercardImg } from "../../../../assets/mastercard.svg";
import { ReactComponent as HeartfulImg } from "../../../../assets/heartful-care.svg";
import { ReactComponent as LocationImg } from "../../../../assets/location.svg";

const AdvantagesCard = ({ img, title, text, className }) => {
  let image;
  switch (img) {
    case 1:
      image = <SmartphoneImg className={classes["advantages__img"]} />;
      break;
    case 2:
      image = <MastercardImg className={classes["advantages__img"]} />;
      break;
    case 3:
      image = <HeartfulImg className={classes["advantages__img"]} />;
      break;
    case 4:
      image = <LocationImg className={classes["advantages__img"]} />;
      break;

    default:
      image = <LocationImg className={classes["advantages__img"]} />;
      break;
  }

  return (
    <div className={`${classes["advantages-card"]} ${className || ""}`}>
      <div
        className={`${classes["advantages-card__side"]} ${classes["advantages-card__side--front"]}`}
      >
        {image}
        <h4
          className={`${classes["advantages-card__title"]} ${classes["advantages-card__title--front"]}`}
        >
          {title}
        </h4>
      </div>
      <div
        className={`${classes["advantages-card__side"]} ${classes["advantages-card__side--back"]}`}
      >
        <h4
          className={`${classes["advantages-card__title"]} ${classes["advantages-card__title--back"]}`}
        >
          {title}
        </h4>
        <p className={classes["advantages-card__text"]}>{text}</p>
      </div>
    </div>
  );
};

export default AdvantagesCard;
