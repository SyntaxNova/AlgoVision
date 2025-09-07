import { useCallback, useEffect, useRef, useState } from 'react';

export function useAnimation<T>(frames: T[], speedMs: number) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const stop = useCallback(() => {
    setIsPlaying(false);
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const play = useCallback(() => {
    if (frames.length === 0) return;
    setIsPlaying(true);
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setIndex((i) => {
        if (i + 1 >= frames.length) {
          stop();
          return i;
        }
        return i + 1;
      });
    }, Math.max(16, speedMs));
  }, [frames.length, speedMs, stop]);

  const reset = useCallback(() => {
    stop();
    setIndex(0);
  }, [stop]);

  useEffect(() => () => stop(), [stop]);

  return { index, frame: frames[index], play, stop, reset, isPlaying, total: frames.length };
}
