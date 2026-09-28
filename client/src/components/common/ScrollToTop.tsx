import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 * Automatically resets scroll position to the top on route changes,
 * or smoothly scrolls to the target element if a hash is present in the URL.
 */
export const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Small timeout allows the incoming page DOM and components to mount
      const timer = setTimeout(() => {
        const id = hash.replace('#', '');
        const targetElement = document.getElementById(id);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }
      }, 70);

      return () => clearTimeout(timer);
    } else {
      // Instant reset to top so the new page renders from top: 0
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, search, hash]);

  return null;
};

export default ScrollToTop;
