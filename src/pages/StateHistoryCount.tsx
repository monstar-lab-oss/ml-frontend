import { useCountStore } from "@/stores/countStore";

const Count = () => {
  const count = useCountStore((state) => state.curr);
  return <p>You clicked {count}</p>;
};

const UndoCountButton: React.FC = () => {
  const undo = useCountStore((state) => state.undo);
  const hasPrev = useCountStore((state) => state.hasPrev());

  return (
    <button onClick={undo} disabled={!hasPrev}>
      undo
    </button>
  );
};

const RedoCountButton: React.FC = () => {
  const redo = useCountStore((state) => state.redo);
  const hasNext = useCountStore((state) => state.hasNext());

  return (
    <button onClick={redo} disabled={!hasNext}>
      redo
    </button>
  );
};

const SetCountButton: React.FC = ({}) => {
  const getCount = useCountStore((state) => state.getCurr);
  const set = useCountStore((state) => state.set);

  return (
    <>
      <button onClick={() => set(getCount() - 1)}>-</button>
      <button onClick={() => set(getCount() + 1)}>+</button>
    </>
  );
};

const ResetCountButton: React.FC = ({}) => {
  const reset = useCountStore((state) => state.reset);

  return <button onClick={() => reset(0)}>reset to 0</button>;
};

const StateHistoryCount = () => (
  <>
    <Count />
    <SetCountButton />
    <UndoCountButton />
    <RedoCountButton />
    <ResetCountButton />
  </>
);

export default StateHistoryCount;
