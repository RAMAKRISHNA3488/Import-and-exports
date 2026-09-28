import { useEffect, useRef, useState } from 'react';

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  delayMs?: number;
}

/**
 * Custom hook for smooth one-way entrance animations on scroll-down.
 * Crucial behavior: Once revealed while scrolling down, it stays revealed permanently.
 * Scrolling UP does NOT un-animate, hide, or re-trigger the animation.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const { threshold = 0.08, rootMargin = '0px 0px -40px 0px', delayMs = 0 } = options;
  const ref = useRef<T>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    // If already revealed, no observer needed
    if (isRevealed) return;

    const element = ref.current;
    if (!element) return;

    // Check if element is already within or above the viewport on mount
    const initialRect = element.getBoundingClientRect();
    if (initialRect.top <= (window.innerHeight || document.documentElement.clientHeight)) {
      if (delayMs > 0) {
        const timer = setTimeout(() => setIsRevealed(true), delayMs);
        return () => clearTimeout(timer);
      } else {
        setIsRevealed(true);
        return;
      }
    }

    let lastScrollY = window.scrollY;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;

        const currentScrollY = window.scrollY;
        const isScrollingDown = currentScrollY >= lastScrollY - 2;
        lastScrollY = currentScrollY;

        // Trigger reveal when intersecting and moving down (or entering viewport)
        if (entry.isIntersecting && isScrollingDown) {
          if (delayMs > 0) {
            setTimeout(() => {
              setIsRevealed(true);
            }, delayMs);
          } else {
            setIsRevealed(true);
          }

          // Permanently disconnect: will never un-reveal on scroll up!
          observer.unobserve(element);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [isRevealed, threshold, rootMargin, delayMs]);

  return { ref, isRevealed };
}
