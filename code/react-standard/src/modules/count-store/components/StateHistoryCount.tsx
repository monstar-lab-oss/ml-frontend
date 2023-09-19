import { useCountStore } from "../hooks/countStore";

const Count = () => {
  const count = useCountStore((state) => state.curr);
  return <h3 data-testid="count">{count}</h3>;
};

const UndoCountButton: React.FC = () => {
  const undo = useCountStore((state) => state.undo);
  const hasPrev = useCountStore((state) => state.hasPrev());

  return (
    <button onClick={undo} disabled={!hasPrev}>
      Undo
    </button>
  );
};

const RedoCountButton: React.FC = () => {
  const redo = useCountStore((state) => state.redo);
  const hasNext = useCountStore((state) => state.hasNext());

  return (
    <button onClick={redo} disabled={!hasNext}>
      Redo
    </button>
  );
};

const SetCountButton: React.FC = () => {
  const getCount = useCountStore((state) => state.getCurr);
  const set = useCountStore((state) => state.set);
  const hasNext = useCountStore((state) => state.hasNext());

  return (
    <>
      <button
        disabled={hasNext}
        onClick={() => set(getCount() - 1)}
        data-testid="button-decrease"
      >
        -
      </button>
      <button
        disabled={hasNext}
        onClick={() => set(getCount() + 1)}
        data-testid="button-increase"
      >
        +
      </button>
    </>
  );
};

const ResetCountButton: React.FC = () => {
  const reset = useCountStore((state) => state.reset);

  return (
    <button onClick={() => reset(0)} style={{ width: "100%" }}>
      Clear history stack
    </button>
  );
};

const HistoryStack = () => {
  const { prev, curr, next } = useCountStore((state) => state);

  return (
    <div data-testid="history">
      <h3>History stack</h3>
      <table>
        <tbody>
          {[...next].reverse().map((x, i) => (
            <tr key={i}>
              <td style={{ color: "#333" }}>{x}</td>
            </tr>
          ))}
          <tr>
            <td style={{ color: "blue" }}>{curr}</td>
          </tr>
          {[...prev].reverse().map((x, i) => (
            <tr key={i}>
              <td style={{ color: "#999" }}>{x}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const StateHistoryCount = () => (
  <>
    <h2>Undo/Redo (History)</h2>
    <div
      style={{
        width: 500,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div style={{ width: 200 }}>
        <Count />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            rowGap: "10px",
            columnGap: "10px",
          }}
        >
          <SetCountButton />
          <UndoCountButton />
          <RedoCountButton />
          <div
            style={{
              gridColumnStart: 1,
              gridColumnEnd: 3,
            }}
          >
            <ResetCountButton />
          </div>
        </div>
      </div>
      <HistoryStack />
    </div>
  </>
);
