import { useState, useEffect, useRef, RefObject } from "react";

export default function useIntersectionObserver(targetElement: HTMLDivElement) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observerRef = useRef<IntersectionObserver>();

  useEffect(() => {
    if (targetElement) {
      observerRef.current = new IntersectionObserver(([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      });
      observerRef.current.observe(targetElement);
    }
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [targetElement]);

  return isIntersecting;
}
