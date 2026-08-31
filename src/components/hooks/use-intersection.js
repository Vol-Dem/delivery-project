import { useEffect, useState } from "react";

export const useIntersection = (ref, rootMargin = "-40") => {
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
