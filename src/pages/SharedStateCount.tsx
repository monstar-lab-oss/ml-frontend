import { useCount, useIncrement } from "@/hooks/useCounter";

const Count = () => {
  // Use the state context in other components
  console.log("render Count");

  const count = useCount();
  return <span>{count}</span>;
};

const SetCount = () => {
  // Use the updater context that will never trigger a re-render
  console.log("render SetCount");

  const increment = useIncrement();
  return <button onClick={increment}>+</button>;
};

const SharedStateCount = () => {
  return (
    <>
      <Count />
      <SetCount />
    </>
  );
};
export default SharedStateCount;
