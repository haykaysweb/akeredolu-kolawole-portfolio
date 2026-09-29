import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useSettings } from '@/hooks/useSettings';

export function useCountUp(target: number, duration = 1500) {
  const { settings } = useSettings();
  const prefersReduced = useReducedMotion();
  const skip = settings.reduceAnimations || Boolean(prefersReduced);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (skip) return;
    let raf = 0;
    let startTime: number | null = null;

    const tick = (ts: number) => {
      if (startTime === null) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, skip]);

  return skip ? target : value;
}