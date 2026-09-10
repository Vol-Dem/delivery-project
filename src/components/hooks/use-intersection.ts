import { useEffect, useState } from "react";
import type { RefObject } from "react";

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
