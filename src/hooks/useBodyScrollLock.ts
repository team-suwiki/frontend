import { useLayoutEffect } from 'react';

interface UseBodyScrollLockOptions {
  selector?: string;
}

export const useBodyScrollLock = (enabled: boolean, options?: UseBodyScrollLockOptions) => {
  const selector = options?.selector;

  useLayoutEffect(() => {
    if (typeof document === 'undefined' || !enabled) return;

    let target = document.body;

    if (selector) {
      const optionTarget = document.getElementById(selector);
      if (optionTarget) {
        target = optionTarget;
      }
    }

    const originalOverflow = target.style.overflow;
    const originalPaddingRight = target.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    target.style.overflow = 'hidden';
    target.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      target.style.overflow = originalOverflow;
      target.style.paddingRight = originalPaddingRight;
    };
  }, [enabled, selector]);
};
