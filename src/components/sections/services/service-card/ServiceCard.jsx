import classes from "./ServiceCard.module.scss";

const ServiceCard = ({ image, title, text, className }) => {
  const slideEnter = (e) => {
    const size = e.target.getBoundingClientRect();
    const elementWidth = +size.width.toFixed();
    const pointerX = e.clientX - size.left;
    if (pointerX > elementWidth / 2) {
      e.target.classList.add(classes["animateSlideLeft"]);
      e.target.classList.remove(classes["animateSlideRight"]);
    } else {
      e.target.classList.remove(classes["animateSlideLeft"]);
      e.target.classList.add(classes["animateSlideRight"]);
    }
  };
  const slideLeave = (e) => {
    const size = e.target.getBoundingClientRect();
    const elementWidth = +size.width.toFixed();
    const pointerX = e.clientX - size.left;
    if (pointerX > elementWidth / 2) {
      e.target.classList.remove(classes["animateSlideLeft"]);
      e.target.classList.add(classes["animateSlideRight"]);
    } else {
      e.target.classList.add(classes["animateSlideLeft"]);
      e.target.classList.remove(classes["animateSlideRight"]);
    }
  };
  return (
    <div className={`${classes["service__container"]} ${className || ""}`}>
      <div
        onPointerEnter={slideEnter}
        onPointerLeave={slideLeave}
        className={classes.service}
      >
        <div className={classes["service__content"]}>
          <img src={image} alt={title} className={classes["service__img"]} />
          <h4>{title}</h4>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
