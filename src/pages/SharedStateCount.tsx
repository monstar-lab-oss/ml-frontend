import { Button } from "@/components/atoms/Button";
import { useCount, useIncrement } from "@/hooks/useCounter";

const Count = () => {
  // Use the state context in other components
  console.log("render Count");

  const count = useCount();
  return <h3>{count}</h3>;
};

const SetCount = () => {
  // Use the updater context that will never trigger a re-render
  console.log("render SetCount");

  const increment = useIncrement();
  return (
    <Button size="large" onClick={increment}>
      +
    </Button>
  );
};

const SharedStateCount = () => {
  return (
    <>
      <h2>Count</h2>
      <p>You can check logs on browser console.</p>
      <p>
        (use <kbd>Option + ⌘ + J</kbd> or <kbd>Shift + CTRL + J</kbd>)
      </p>
      <fieldset style={{ width: 70 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <Count />
          <SetCount />
        </div>
      </fieldset>
    </>
  );
};
export default SharedStateCount;
