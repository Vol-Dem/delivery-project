import { useEffect, useMemo, useRef, useState } from "react";
import type {
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
  TouchEvent as ReactTouchEvent,
} from "react";

interface SliderMeasurements {
  containerWidth: number;
  intervals: number[];
  itemWidth: number;
  marginLeft: number;
  translateMax: number;
}

interface SliderMeasurementInput {
  containerWidth: number;
  gap: number;
  marginLeft: number;
  slideWidths: number[];
  sliderWidth: number;
}

const initialMeasurements: SliderMeasurements = {
  containerWidth: 0,
  intervals: [],
  itemWidth: 0,
  marginLeft: 0,
  translateMax: 0,
};

/** Derives slider boundaries and snap points from rendered element sizes. */
export const createSliderMeasurements = ({
  containerWidth,
  gap,
  marginLeft,
  slideWidths,
  sliderWidth,
}: SliderMeasurementInput): SliderMeasurements => ({
  containerWidth,
  intervals: slideWidths.map((width, index) =>
    index === 0 ? 0 : -(width + gap) * index,
  ),
  itemWidth: (slideWidths[slideWidths.length - 1] || 0) + gap,
  marginLeft,
  translateMax: containerWidth - sliderWidth,
});

/** Moves forward by one item without crossing the final slider boundary. */
export const getNextTranslate = (
  translate: number,
  itemWidth: number,
  translateMax: number,
) =>
  Math.max(translate - itemWidth, translateMax);

/** Moves backward by one item without crossing the starting boundary. */
export const getPreviousTranslate = (translate: number, itemWidth: number) =>
  Math.min(translate + itemWidth, 0);

/** Snaps a drag position to its nearest valid interval and clamps its end. */
export const getSnappedTranslate = (
  translate: number,
  intervals: number[],
  translateMax: number,
) => {
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

/** Returns the slide indexes whose snap points fall inside the viewport. */
export const getVisibleSlideIndexes = (
  intervals: number[],
  translate: number,
  containerWidth: number,
) =>
  intervals.flatMap((interval, index) =>
    interval <= translate && interval >= translate - containerWidth
      ? index
      : [],
  );

type DragEvent =
  | ReactMouseEvent<HTMLDivElement>
  | ReactPointerEvent<HTMLDivElement>
  | ReactTouchEvent<HTMLDivElement>;

const getPointerX = (event: DragEvent, marginLeft: number) => {
  const clientX = Math.round(
    "touches" in event ? (event.touches[0]?.clientX ?? 0) : event.clientX,
  );

  return Math.round(clientX - marginLeft);
};

/** Coordinates responsive slider measurements, navigation, and drag gestures. */
const useSlider = () => {
  const [translate, setTranslate] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [cursorInitialX, setCursorInitialX] = useState(0);
  const [measurements, setMeasurements] = useState(initialMeasurements);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (!containerRef.current || !sliderRef.current) return;

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

    const container = containerRef.current;
    if (!container) return undefined;

    observer.observe(container);

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

  const move = (event: ReactPointerEvent<HTMLDivElement> | ReactTouchEvent<HTMLDivElement>) => {
    if (!isDragging) {
      return;
    }

    const pointerX = getPointerX(event, measurements.marginLeft);
    const translateChange = pointerX - cursorInitialX;
    setCursorInitialX(pointerX);
    setTranslate((currentTranslate) => currentTranslate + translateChange);
  };

  const startDragging = (
    event: ReactMouseEvent<HTMLDivElement> | ReactTouchEvent<HTMLDivElement>,
  ) => {
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
