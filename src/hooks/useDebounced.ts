import { useEffect, useRef } from 'react';

interface UseDebouncedEffectProps {
  callback: () => void;
  delay: number;
  dependencies: string[];
}

const useDebounced = (props: UseDebouncedEffectProps): void => {
  const { callback, delay, dependencies } = props;
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = setTimeout(() => {
      callbackRef.current();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [...dependencies, delay]);
};

export default useDebounced;
