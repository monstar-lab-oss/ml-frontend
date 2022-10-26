import React from 'react'
import { renderHook, fireEvent } from '@testing-library/react'
import { render } from '@/tests/utils'
import { CounterProvider, useCount, useIncrement } from './useCounter'

type ContextProps = {
  children: React.ReactNode
}

describe('useCount', () => {
  test('starts with default initial value', () => {
    const wrapper = ({ children }: ContextProps) => <CounterProvider>{children}</CounterProvider>

    const { result } = renderHook(() => useCount(), { wrapper })

    expect(result.current).toBe(0)  
  })

  test('starts with initial value', () => {
    const wrapper = ({ children }: ContextProps) => <CounterProvider initialCount={1}>{children}</CounterProvider>

    const { result } = renderHook(() => useCount(), { wrapper })

    expect(result.current).toBe(1)
  })
})

describe('useIncrement', () => {
  test('increases counter', () => {
    const Increment = () => {
      const increment = useIncrement();
      return <button onClick={increment}>Increment</button>;
    };
    const Count = () => {
      const count = useCount();
      return <div>{count}</div>;
    };
    const Counter = () => (
      <CounterProvider initialCount={0}>
        <Increment />
        <Count />
      </CounterProvider>
    );

    const { getByText } = render(<Counter />);
    expect(getByText("0")).toBeInTheDocument();

    fireEvent.click(getByText("Increment"));
    expect(getByText("1")).toBeInTheDocument();
  })
})