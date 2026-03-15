import { useEffect, useRef, useState } from 'react';

export const useScrollReveal = (threshold = 0.1) => {
  // Initialize as true to ensure content is visible on direct navigation
  // The IntersectionObserver will update this for scroll animations
  const [isVisible, setIsVisible] = useState(true);
  const elementRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Clean up any existing observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, we can stop observing to save resources
          if (observerRef.current && elementRef.current) {
            observerRef.current.unobserve(elementRef.current);
          }
        }
      },
      { threshold }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observerRef.current.observe(currentElement);
    }

    return () => {
      // Proper cleanup: disconnect the observer entirely
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [threshold]);

  return { elementRef, isVisible };
};