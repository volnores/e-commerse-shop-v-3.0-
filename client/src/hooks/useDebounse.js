import { useEffect, useState } from 'react';

const useDebounse = (value, delay) => {
  const [debounsedValue, setDebounsedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounsedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounsedValue;
};

export default useDebounse;
