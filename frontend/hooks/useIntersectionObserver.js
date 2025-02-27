"use client";

import { useEffect, useState, useRef } from "react";

export function useIntersectionObserver({ threshold = 0.1, root = null, rootMargin = "0%", freezeOnceVisible = true } = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) {
      setIsIntersecting(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && freezeOnceVisible) {
          observer.unobserve(node);
        }
      },
      { threshold, root, rootMargin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, root, rootMargin, freezeOnceVisible]);

  return { ref, isIntersecting };
}
