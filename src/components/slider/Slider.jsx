import { useEffect, useRef, useState } from "react";
import classes from "./Slider.module.scss";

const Slider = ({ sliderData, className }) => {
  const [slideIsVisible, setSlideIsVisible] = useState([]);
  const [translate, setTranslate] = useState(0);
  const [translateIntervals, setTranslateIntervals] = useState([]);
  const [translateMax, setTranslateMax] = useState(0);
  const [mouseDown, setMouseDown] = useState(false);
  const [cursorInitialX, setCursorInitialX] = useState(0);
  const [marginLeft, setMarginLeft] = useState(0);
  const [itemWidth, setitemWidth] = useState(0);
  const containerRef = useRef();
  const sliderRef = useRef();
  const itemRef = useRef();

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      const gap = parseInt(getComputedStyle(sliderRef.current).gap);
      const itemWidth = itemRef.current.clientWidth + gap;
      const marginLeft = containerRef.current.getBoundingClientRect().left;
      const intervals = [...sliderRef.current.children].map((slide, i) => {
        const val = -(slide.clientWidth + gap) * i;
        return val;
      });
      const transMax =
        containerRef.current.clientWidth - sliderRef.current.clientWidth;

      setTranslateIntervals(intervals);
      setTranslateMax(transMax);
      setMarginLeft(marginLeft);
      setitemWidth(itemWidth);
      setTranslate(0);
    });
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const nextSlide = () => {
    const translateNew = translate - itemWidth;
    if (translateNew > translateMax) {
      setTranslate(translateNew);
    } else {
      setTranslate(translateMax);
    }
  };
  const prevSlide = () => {
    const translateNew = translate + itemWidth;
    if (translateNew > 0) {
      setTranslate(0);
    } else {
      setTranslate(translateNew);
    }
  };

  const moveElement = (e) => {
    const clientX = Math.round(e.clientX || e.touches[0].clientX);
    const pointerX = Math.round(clientX - marginLeft);

    if (mouseDown) {
      const neTrans = pointerX - cursorInitialX;
      const translateOffset = translate + neTrans;
      setCursorInitialX(pointerX);
      setTranslate(translateOffset);
    }
  };

  const mouseDownHandler = (e) => {
    const clientX = Math.round(e.clientX || e.touches[0].clientX);
    const pointerX = Math.round(clientX - marginLeft);
    setCursorInitialX(pointerX);
    setMouseDown(true);
  };

  const mouseUp = () => {
    setMouseDown(false);
    const transNew = translateIntervals.reduce((prev, curr) => {
      return Math.abs(curr - translate) < Math.abs(prev - translate)
        ? curr
        : prev;
    });
    const transFinal = transNew < translateMax ? translateMax : transNew;
    setTranslate(transFinal);
  };

  useEffect(() => {
    const containerWidth = containerRef.current.getBoundingClientRect().width;

    const visibleSlides = translateIntervals.flatMap((interval) => {
      if (interval <= translate && interval >= -containerWidth + translate) {
        return translateIntervals.indexOf(interval);
      } else {
        return [];
      }
    });
    setSlideIsVisible(visibleSlides);
  }, [translate, translateIntervals]);

  const paginaton = sliderData.map((slide, i) => {
    return (
      <div
        key={i}
        className={`${classes["slider__pagination"]} ${
          slideIsVisible.includes(i)
            ? classes["slider__pagination--active"]
            : ""
        }`}
      ></div>
    );
  });
  return (
    <div
      className={`${classes["slider"]} ${className || ""}`}
      onMouseUp={mouseUp}
      onTouchEnd={mouseUp}
    >
      <div
        ref={containerRef}
        className={classes["slider__container"]}
        onPointerMove={moveElement}
        onMouseDown={mouseDownHandler}
        onTouchStart={mouseDownHandler}
        onTouchMove={moveElement}
      >
        <div
          ref={sliderRef}
          className={`${classes["slides"]} ${
            !mouseDown ? classes["slides--transition"] : ""
          }`}
          style={{ transform: `translate3D(${translate}px, 0, 0)` }}
        >
          {sliderData.map((slide, i) => {
            return (
              <div key={i} ref={itemRef} className={classes["slides__item"]}>
                <div className={classes["slides__img"]}>
                  <slide.img />
                </div>
                <h4 className={classes["slides__title"]}>{slide.title}</h4>
                <p className={classes["slides__description"]}>
                  {slide.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className={classes["slider__controls"]}>
        <button
          className={classes["slider__btn"]}
          onClick={prevSlide}
          title="Previous"
        >
          <span
            className={`${classes["slider__arrow"]} ${classes["slider__arrow--left"]}`}
          ></span>
        </button>
        <div className={classes["slider__line"]}>{paginaton}</div>
        <button
          className={classes["slider__btn"]}
          onClick={nextSlide}
          title="Next"
        >
          <span
            className={`${classes["slider__arrow"]} ${classes["slider__arrow--right"]}`}
          ></span>
        </button>
      </div>
    </div>
  );
};

export default Slider;
