import { useEffect, useState } from "react";

export default function useDebounce(initialValue, delay) {
  const [debounceValue, setDebounceValue] = useState(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(initialValue);
    }, delay);

    return () => {
      clearInterval(timer);
    };
  }, [delay, initialValue]);

  return debounceValue;
}
