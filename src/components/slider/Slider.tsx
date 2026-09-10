import type { ComponentType, SVGProps } from "react";
import classes from "./Slider.module.scss";
import useSlider from "./use-slider";

export interface SliderItem {
  img: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

interface SliderProps {
  sliderData: SliderItem[];
  className?: string;
}

const Slider = ({ sliderData, className }: SliderProps) => {
  const { refs, state, actions } = useSlider();

  const pagination = sliderData.map((_slide, index) => (
    <div
      key={index}
      className={`${classes["slider__pagination"]} ${
        state.visibleSlides.includes(index)
          ? classes["slider__pagination--active"]
          : ""
      }`}
    />
  ));

  return (
    <div
      className={`${classes.slider} ${className || ""}`}
      onMouseUp={actions.stopDragging}
      onTouchEnd={actions.stopDragging}
    >
      <div
        ref={refs.container}
        className={classes["slider__container"]}
        onPointerMove={actions.move}
        onMouseDown={actions.startDragging}
        onTouchStart={actions.startDragging}
        onTouchMove={actions.move}
      >
        <div
          ref={refs.slider}
          className={`${classes.slides} ${
            !state.isDragging ? classes["slides--transition"] : ""
          }`}
          style={{ transform: `translate3D(${state.translate}px, 0, 0)` }}
        >
          {sliderData.map((slide, index) => (
            <div
              key={index}
              className={classes["slides__item"]}
            >
              <div className={classes["slides__img"]}>
                <slide.img />
              </div>
              <h4 className={classes["slides__title"]}>{slide.title}</h4>
              <p className={classes["slides__description"]}>
                {slide.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className={classes["slider__controls"]}>
        <button
          className={classes["slider__btn"]}
          onClick={actions.previous}
          title="Previous"
        >
          <span
            className={`${classes["slider__arrow"]} ${classes["slider__arrow--left"]}`}
          />
        </button>
        <div className={classes["slider__line"]}>{pagination}</div>
        <button
          className={classes["slider__btn"]}
          onClick={actions.next}
          title="Next"
        >
          <span
            className={`${classes["slider__arrow"]} ${classes["slider__arrow--right"]}`}
          />
        </button>
      </div>
    </div>
  );
};

export default Slider;
