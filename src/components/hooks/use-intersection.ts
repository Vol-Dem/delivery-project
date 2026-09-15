import { useEffect, useState } from "react";
import type { RefObject } from "react";

/**
 * Reports the first time an element intersects the viewport, then disconnects
 * the observer so entrance animations do not replay.
 *
 * @param rootMargin - Root margin percentage without the `%` suffix.
 */
export const useIntersection = <T extends Element>(
  ref: RefObject<T | null>,
  rootMargin = "-40",
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting) observer.disconnect();
      },
      { rootMargin: `${rootMargin}%` },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return isIntersecting;
};

export default useIntersection;
