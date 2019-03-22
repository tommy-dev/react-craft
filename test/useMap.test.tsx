import * as React from 'react';
import { renderHook, cleanup, act } from 'react-hooks-testing-library';
import { fireEvent, render } from 'react-testing-library';

import { useMap } from '../src/useMap';
import * as useNamed from '../src/useMap';

afterEach(cleanup);
const key = 'name';
const keySymbol = Symbol('sym');
const getInput = () => {
  return {
    a: '1',
    b: 2,
    c: { a: 1, b: 's' },
    d: [{ a: '2', b: { a: 'c' } }],
    ['ads']: '2s',
    [1]: 'd',
    [key]: 'xy',
    [keySymbol]: 'io',
  };
};

const Test = (props: any) => {
  const [state, setState] = React.useState();
  const [map, { get, hasKey }] = useMap(props.initial);

  return (
    <div>
      <div id="state">{JSON.stringify(state)}</div>
      <div id="map">{JSON.stringify(map)}</div>
      <button id="getPrimitive" onClick={() => setState(get('b'))} />
      <button id="getObject" onClick={() => setState(get('c'))} />
      <button id="getArray" onClick={() => setState(get('d'))} />

      <button id="hasKeyTrue" onClick={() => setState(hasKey('c'))} />
      <button id="hasKeyFalse" onClick={() => setState(hasKey('f'))} />
    </div>
  );
};

describe('useMap', () => {
  it('returns initialised map', () => {
    const hook = renderHook(() => useMap(getInput()));
    expect(hook.result.current[0]).toEqual(getInput());
  });

  it('returns object literal when not initialised', () => {
    const hook = renderHook(() => useMap());
    expect(hook.result.current[0]).toEqual({});
  });

  it('clears map to empty object literal', () => {
    const hook = renderHook(() => useMap(getInput()));
    act(() => hook.result.current[1].clear());
    expect(hook.result.current[0]).toEqual({});
  });

  it('resets to initial map', () => {
    const hook = renderHook(() => useMap(getInput()));
    expect(hook.result.current[0]).toEqual(getInput());
    act(() => hook.result.current[1].set('c', 'x'));
    expect(hook.result.current[0]).toEqual({
      a: '1',
      b: 2,
      c: 'x',
      d: [{ a: '2', b: { a: 'c' } }],
      ['ads']: '2s',
      [1]: 'd',
      [key]: 'xy',
      [keySymbol]: 'io',
    });
    act(() => hook.result.current[1].reset());
    expect(hook.result.current[0]).toEqual(getInput());
  });

  it('sets entry with primitive value', () => {
    const hook = renderHook(() => useMap(getInput()));
    act(() => hook.result.current[1].set('b', 'x'));
    expect(hook.result.current[0]).toEqual({
      a: '1',
      b: 'x',
      c: { a: 1, b: 's' },
      d: [{ a: '2', b: { a: 'c' } }],
      ['ads']: '2s',
      [1]: 'd',
      [key]: 'xy',
      [keySymbol]: 'io',
    });
  });

  it('sets entry with object value', () => {
    const hook = renderHook(() => useMap(getInput()));
    act(() => hook.result.current[1].set('d', { a: '2' }));
    expect(hook.result.current[0]).toEqual({
      a: '1',
      b: 2,
      c: { a: 1, b: 's' },
      d: { a: '2' },
      ['ads']: '2s',
      [1]: 'd',
      [key]: 'xy',
      [keySymbol]: 'io',
    });
  });

  it('removes entry with primitive as value', () => {
    const hook = renderHook(() => useMap(getInput()));
    act(() => hook.result.current[1].remove('a'));
    expect(hook.result.current[0]).toEqual({
      b: 2,
      c: { a: 1, b: 's' },
      d: [{ a: '2', b: { a: 'c' } }],
      ['ads']: '2s',
      [1]: 'd',
      [key]: 'xy',
      [keySymbol]: 'io',
    });
  });

  it('removes entry with object as value', () => {
    const hook = renderHook(() => useMap(getInput()));
    act(() => hook.result.current[1].remove('d'));
    expect(hook.result.current[0]).toEqual({
      a: '1',
      b: 2,
      c: { a: 1, b: 's' },
      ['ads']: '2s',
      [1]: 'd',
      [key]: 'xy',
      [keySymbol]: 'io',
    });
  });

  it('should not add new entry if entry key exists', () => {
    const input = {
      a: 1,
      b: 's',
    };
    const hook = renderHook(() => useMap(input));
    act(() => hook.result.current[1].set('b', 'x'));
    expect(hook.result.current[0]).toEqual({
      a: 1,
      b: 'x',
    });
  });

  it('adds new entry if entry key does not exist', () => {
    const input = {
      a: 1,
      b: 's',
    };
    const hook = renderHook(() => useMap(input));
    act(() => hook.result.current[1].set('c', 'x'));
    expect(hook.result.current[0]).toEqual({
      a: 1,
      b: 's',
      c: 'x',
    });
  });

  it('adds new entry if entry key does not exist', () => {
    const input = {
      a: 1,
      b: 's',
    };
    const hook = renderHook(() => useMap(input));
    act(() => hook.result.current[1].set('c', 'x'));
    expect(hook.result.current[0]).toEqual({
      a: 1,
      b: 's',
      c: 'x',
    });
  });

  it('gets primitive value', () => {
    const { container } = render(<Test initial={getInput()} />);
    const state = container.querySelector('#state');
    const get = container.querySelector('#getPrimitive');
    fireEvent.click(get);
    expect(state.textContent).toEqual(JSON.stringify(2));
  });

  it('gets object value', () => {
    const { container } = render(<Test initial={getInput()} />);
    const state = container.querySelector('#state');
    const get = container.querySelector('#getObject');
    fireEvent.click(get);
    expect(state.textContent).toEqual(JSON.stringify({ a: 1, b: 's' }));
  });

  it('gets array value', () => {
    const { container } = render(<Test initial={getInput()} />);
    const state = container.querySelector('#state');
    const get = container.querySelector('#getArray');
    fireEvent.click(get);
    expect(state.textContent).toEqual(
      JSON.stringify([{ a: '2', b: { a: 'c' } }])
    );
  });

  it('returns true if key found with hasKey', () => {
    const { container } = render(<Test initial={getInput()} />);
    const state = container.querySelector('#state');
    const hasKeyTrue = container.querySelector('#hasKeyTrue');
    fireEvent.click(hasKeyTrue);
    expect(state.textContent).toEqual(JSON.stringify(true));
  });

  it('returns false if key not found with hasKey', () => {
    const { container } = render(<Test initial={getInput()} />);
    const state = container.querySelector('#state');
    const hasKeyFalse = container.querySelector('#hasKeyFalse');
    fireEvent.click(hasKeyFalse);
    expect(state.textContent).toEqual(JSON.stringify(false));
  });

  test('should work with named exports as object', () => {
    renderHook(() => useNamed.useMap());
  });
});
