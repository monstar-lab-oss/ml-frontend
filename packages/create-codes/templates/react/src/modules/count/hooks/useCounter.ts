import { useCallback, useState } from "react";
import constate from "constate";

const useCounter = ({ initialCount = 0 }) => {
  const [count, setCount] = useState(initialCount);
  const increment = useCallback(() => setCount((prev) => prev + 1), []);

  return { count, increment };
};

const [CounterProvider, useCount, useIncrement] = constate(
  useCounter,
  (value) => value.count, // becomes useCount
  (value) => value.increment // becomes useIncrement
);

export { CounterProvider, useCount, useIncrement };
