import { act, renderHook } from "@testing-library/react";
import { useCountStore, Store } from "./countStore";

describe("CountStore", () => {
  const initialStoreState = useCountStore.getState();
  let result: { current: Store };

  beforeEach(() => {
    // Reset store state before each test
    useCountStore.setState(initialStoreState, true);

    const hookResult = renderHook(() => useCountStore());
    result = hookResult.result;
  });

  test("has initial values", () => {
    expectState(result.current, [], 0, []);
  });

  test("gets current count", () => {
    act(() => {
      result.current.set(2);
      result.current.set(5);
    });

    expect(result.current.getCurr()).toEqual(5);
  });

  test("has prev after changing count", () => {
    act(() => {
      result.current.set(2);
      result.current.set(5);
    });

    expect(result.current.hasPrev()).toBeTruthy();
  });

  test("has next after undoing", () => {
    act(() => {
      result.current.set(2);
      result.current.set(5);
      result.current.undo();
    });

    expect(result.current.hasNext()).toBeTruthy();
  });

  test("sets new count", () => {
    act(() => {
      result.current.set(2);
    });

    expectState(result.current, [0], 2, []);
  });

  test("undoes after changing count", () => {
    act(() => {
      result.current.set(2);
      result.current.set(3);
      result.current.undo();
    });

    expectState(result.current, [0], 2, [3]);
  });

  test("redoes after undoing", () => {
    act(() => {
      result.current.set(2);
      result.current.set(3);
      result.current.undo();
      result.current.redo();
    });

    expectState(result.current, [0, 2], 3, []);
  });

  test("resets after changing count", () => {
    act(() => {
      result.current.set(2);
      result.current.set(3);
      result.current.reset(2);
    });

    expectState(result.current, [], 2, []);
  });
});

const expectState = (
  state: Store,
  prev: number[],
  curr: number,
  next: number[]
) => {
  expect(state.prev).toEqual(prev);
  expect(state.curr).toEqual(curr);
  expect(state.next).toEqual(next);
};
