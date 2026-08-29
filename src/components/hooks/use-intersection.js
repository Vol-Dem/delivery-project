import { useState, useEffect, useRef } from "react";

export const useIntersection = (ref, rootMargin = "-40") => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting) observerRef.current.disconnect();
      },
      { rootMargin: `${rootMargin}%` }
    );
  }, []);

  useEffect(() => {
    observerRef.current.observe(ref.current);

    return () => {
      observerRef.current.disconnect();
    };
  }, [ref]);

  return isIntersecting;
};

export default useIntersection;
