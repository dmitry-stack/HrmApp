import { useEffect, useRef } from 'react';

export interface UseAutoScrollOptions {
  dependency: unknown;
  enabled?: boolean;
}

export interface UseAutoScrollReturn<T extends HTMLElement = HTMLDivElement> {
  scrollRef: React.RefObject<T | null>;
  scrollToBottom: (smooth?: boolean) => void;
}

export function useAutoScroll<T extends HTMLElement = HTMLDivElement>({
  dependency,
  enabled = true,
}: UseAutoScrollOptions): UseAutoScrollReturn<T> {
  const scrollRef = useRef<T>(null);
  const isFirstLoad = useRef(true);

  const scrollToBottom = (smooth = true) => {
    scrollRef.current?.scrollIntoView({
      behavior: smooth ? 'smooth' : 'auto',
    });
  };

  useEffect(() => {
    if (!enabled) return;

    if (Array.isArray(dependency) && dependency.length === 0) return;

    if (isFirstLoad.current) {
      scrollToBottom(false);
      isFirstLoad.current = false;
    } else {
      scrollToBottom(true);
    }
  }, [dependency, enabled]);

  return {
    scrollRef,
    scrollToBottom,
  };
}
