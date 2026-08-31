import { useEffect, useMemo, useRef, useState } from "react";

const initialMeasurements = {
  containerWidth: 0,
  intervals: [],
  itemWidth: 0,
  marginLeft: 0,
  translateMax: 0,
};

export const createSliderMeasurements = ({
  containerWidth,
  gap,
  marginLeft,
  slideWidths,
  sliderWidth,
}) => ({
  containerWidth,
  intervals: slideWidths.map((width, index) =>
    index === 0 ? 0 : -(width + gap) * index,
  ),
  itemWidth: (slideWidths[slideWidths.length - 1] || 0) + gap,
  marginLeft,
  translateMax: containerWidth - sliderWidth,
});

export const getNextTranslate = (translate, itemWidth, translateMax) =>
  Math.max(translate - itemWidth, translateMax);

export const getPreviousTranslate = (translate, itemWidth) =>
  Math.min(translate + itemWidth, 0);

export const getSnappedTranslate = (translate, intervals, translateMax) => {
  if (!intervals.length) {
    return Math.max(Math.min(translate, 0), translateMax);
  }

  const nearestInterval = intervals.reduce((previous, current) =>
    Math.abs(current - translate) < Math.abs(previous - translate)
      ? current
      : previous,
  );

  return Math.max(nearestInterval, translateMax);
};

export const getVisibleSlideIndexes = (
  intervals,
  translate,
  containerWidth,
) =>
  intervals.flatMap((interval, index) =>
    interval <= translate && interval >= translate - containerWidth
      ? index
      : [],
  );

const getPointerX = (event, marginLeft) => {
  const clientX = Math.round(event.clientX || event.touches[0].clientX);

  return Math.round(clientX - marginLeft);
};

const useSlider = () => {
  const [translate, setTranslate] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [cursorInitialX, setCursorInitialX] = useState(0);
  const [measurements, setMeasurements] = useState(initialMeasurements);
  const containerRef = useRef();
  const sliderRef = useRef();

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      const gap = Number.parseInt(getComputedStyle(sliderRef.current).gap, 10);
      const slideWidths = [...sliderRef.current.children].map(
        (slide) => slide.clientWidth,
      );

      setMeasurements(
        createSliderMeasurements({
          containerWidth: containerRef.current.clientWidth,
          gap,
          marginLeft: containerRef.current.getBoundingClientRect().left,
          slideWidths,
          sliderWidth: sliderRef.current.clientWidth,
        }),
      );
      setTranslate(0);
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  const visibleSlides = useMemo(
    () =>
      getVisibleSlideIndexes(
        measurements.intervals,
        translate,
        measurements.containerWidth,
      ),
    [measurements.intervals, measurements.containerWidth, translate],
  );

  const next = () => {
    setTranslate((currentTranslate) =>
      getNextTranslate(
        currentTranslate,
        measurements.itemWidth,
        measurements.translateMax,
      ),
    );
  };

  const previous = () => {
    setTranslate((currentTranslate) =>
      getPreviousTranslate(currentTranslate, measurements.itemWidth),
    );
  };

  const move = (event) => {
    if (!isDragging) {
      return;
    }

    const pointerX = getPointerX(event, measurements.marginLeft);
    const translateChange = pointerX - cursorInitialX;
    setCursorInitialX(pointerX);
    setTranslate((currentTranslate) => currentTranslate + translateChange);
  };

  const startDragging = (event) => {
    const pointerX = getPointerX(event, measurements.marginLeft);
    setCursorInitialX(pointerX);
    setIsDragging(true);
  };

  const stopDragging = () => {
    setIsDragging(false);
    setTranslate((currentTranslate) =>
      getSnappedTranslate(
        currentTranslate,
        measurements.intervals,
        measurements.translateMax,
      ),
    );
  };

  return {
    refs: {
      container: containerRef,
      slider: sliderRef,
    },
    state: {
      isDragging,
      translate,
      visibleSlides,
    },
    actions: {
      move,
      next,
      previous,
      startDragging,
      stopDragging,
    },
  };
};

export default useSlider;
