import { useIncrement } from "@/hooks/useCounter";

export const SetCount = () => {
  // Use the updater context that will never trigger a re-render
  console.log("render SetCount");

  const increment = useIncrement();
  return <button onClick={increment}>+</button>;
};
