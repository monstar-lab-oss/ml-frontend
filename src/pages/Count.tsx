import { useCount } from "@/hooks/useCounter";

export const Count = () => {
  // Use the state context in other components
  console.log("render Count");

  const count = useCount();
  return <span>{count}</span>;
};
