import type { PointerEvent } from "react";
import classes from "./ServiceCard.module.scss";

interface ServiceCardProps {
  image: string;
  title: string;
  text: string;
  className?: string;
}

const ServiceCard = ({ image, title, text, className }: ServiceCardProps) => {
  const slideEnter = (e: PointerEvent<HTMLDivElement>) => {
    const size = e.currentTarget.getBoundingClientRect();
    const elementWidth = +size.width.toFixed();
    const pointerX = e.clientX - size.left;
    if (pointerX > elementWidth / 2) {
      e.currentTarget.classList.add(classes["animateSlideLeft"]);
      e.currentTarget.classList.remove(classes["animateSlideRight"]);
    } else {
      e.currentTarget.classList.remove(classes["animateSlideLeft"]);
      e.currentTarget.classList.add(classes["animateSlideRight"]);
    }
  };
  const slideLeave = (e: PointerEvent<HTMLDivElement>) => {
    const size = e.currentTarget.getBoundingClientRect();
    const elementWidth = +size.width.toFixed();
    const pointerX = e.clientX - size.left;
    if (pointerX > elementWidth / 2) {
      e.currentTarget.classList.remove(classes["animateSlideLeft"]);
      e.currentTarget.classList.add(classes["animateSlideRight"]);
    } else {
      e.currentTarget.classList.add(classes["animateSlideLeft"]);
      e.currentTarget.classList.remove(classes["animateSlideRight"]);
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
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
