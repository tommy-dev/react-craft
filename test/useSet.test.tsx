import * as React from 'react';
import * as useNamed from '../src/useSet';
import { render } from 'react-testing-library';
import { renderHook, cleanup, act } from 'react-hooks-testing-library';
import useSet from '../src/useSet';

afterEach(cleanup);

describe('useSet', () => {
  it('should remove dupes with set method', () => {
    const stringTest = renderHook(() => useSet(['red', 'green']));
    act(() =>
      stringTest.result.current[1].set([
        'red',
        'green',
        'pink',
        'green',
        'silver',
        ...['aqua'],
      ])
    );
    expect(stringTest.result.current[0]).toEqual([
      'red',
      'green',
      'pink',
      'silver',
      'aqua',
    ]);
  });

  it('should not break from null values', () => {
    const hook = renderHook(() => useSet());
    act(() => hook.result.current[1].set(null));
    act(() => hook.result.current[1].add(null));
  });

  it('should set a non-array value as an array', () => {
    const hook = renderHook(() => useSet());
    act(() => hook.result.current[1].set('a'));
    expect(hook.result.current[0]).toEqual(['a']);
  });

  it('should not break with no initial args', () => {
    const hook = renderHook(() => useSet());
    act(() => hook.result.current[1].add(1));
    expect(hook.result.current[0]).toEqual([1]);
  });

  it('should not break with named exports object', () => {
    renderHook(() => useNamed.useSet());
  });

  it('should add unique primitives to the end of set', () => {
    const stringTest = renderHook(() => useSet(['red', 'blue', 'green']));
    act(() => stringTest.result.current[1].add('bladerunner'));
    expect(stringTest.result.current[0]).toEqual([
      'red',
      'blue',
      'green',
      'bladerunner',
    ]);
    const boolTest = renderHook(() => useSet([true]));
    act(() => boolTest.result.current[1].add(false));
    expect(boolTest.result.current[0]).toEqual([true, false]);
    const numTest = renderHook(() => useSet([-10, -1, 0, 1, 10]));
    act(() => numTest.result.current[1].add(-2));
    act(() => numTest.result.current[1].add(3));
    expect(numTest.result.current[0]).toEqual([-10, -1, 0, 1, 10, -2, 3]);
  });

  it('should not add dupe primitives', () => {
    const stringTest = renderHook(() => useSet(['red', 'blue', 'green']));
    act(() => stringTest.result.current[1].add('cerulean'));
    act(() => stringTest.result.current[1].add('cerulean'));
    act(() => stringTest.result.current[1].add('red'));
    expect(stringTest.result.current[0]).toEqual([
      'red',
      'blue',
      'green',
      'cerulean',
    ]);
    const boolTest = renderHook(() => useSet([true]));
    act(() => boolTest.result.current[1].add(false));
    act(() => boolTest.result.current[1].add(true));
    expect(boolTest.result.current[0]).toEqual([true, false]);
    const numTest = renderHook(() => useSet([-10, -1, 0, 1, 10]));
    act(() => numTest.result.current[1].add(-10));
    act(() => numTest.result.current[1].add(0));
    act(() => numTest.result.current[1].add(1));
    expect(numTest.result.current[0]).toEqual([-10, -1, 0, 1, 10]);
  });

  it('should not add dupe jsx', () => {
    const jsx1 = render(<div>jsx 1</div>);
    const jsx2 = render(<div>jsx 2</div>);
    const hook = renderHook(() => useSet([jsx1.container, jsx2.container]));
    act(() => hook.result.current[1].add(jsx2.container));
    act(() => hook.result.current[1].add(jsx2.container));
    expect(hook.result.current[0]).toEqual([jsx1.container, jsx2.container]);
  });

  it('should add unique jsx', () => {
    const jsx1 = render(<div>jsx 1</div>);
    const jsx2 = render(<div>jsx 2</div>);
    const jsx3 = render(<div>mad as a hatter!</div>);
    const hook = renderHook(() => useSet([jsx1.container, jsx2.container]));
    act(() => hook.result.current[1].add(jsx3.container));
    expect(hook.result.current[0]).toEqual([
      jsx1.container,
      jsx2.container,
      jsx3.container,
    ]);
  });
});
