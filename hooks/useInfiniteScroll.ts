import { useEffect, useRef } from "react";

export function useInfiniteScroll(onIntersect: () => void, enabled: boolean) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0,
      },
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [onIntersect, enabled]);

  return ref;
}
