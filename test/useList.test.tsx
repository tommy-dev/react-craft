import { fireEvent, render } from 'react-testing-library';
import { renderHook, cleanup, act } from 'react-hooks-testing-library';

import * as React from 'react';
import useList from '../src/useList';
import * as useNamed from '../src/useList';

const TestBasic = props => {
  const [list, { set, add, addAt, updateAt, filter, sort }] = useList(
    props.initialList
  );

  return (
    <div>
      <div id="values">{list.join('|')}</div>
      <button id="reset" onClick={() => set([])} />
      <button id="set" onClick={() => set(['2'])} />
      <button id="add" onClick={() => add(1)} />
      <button id="addItems" onClick={() => add([7, 8, 9])} />
      <button id="addAt" onClick={() => addAt(1, 19)} />
      <button id="addItemsAt" onClick={() => addAt(2, [7, 8, 9])} />
      <button id="remove" onClick={() => filter(item => !(item === 2))} />
      <button id="updateAt" onClick={() => updateAt(1, 12)} />
      <button
        id="removeItems"
        onClick={() => filter(item => ![2, 3, 4, 5767].includes(item))}
      />
      <button id="filter" onClick={() => filter(item => item >= 0)} />
      <button id="sortDefault" onClick={() => sort()} />
      <button
        id="sortDesc"
        onClick={() =>
          sort((a: any, b: any) => {
            return b - a;
          })
        }
      />
    </div>
  );
};

describe('component-decoupled hook tests', () => {
  afterEach(cleanup);

  test('should render JSX', () => {
    const { container } = render(<TestBasic />);
    const { result } = renderHook(() => useList([container]));
    const [list] = result.current;

    expect(list).toEqual([container]);
  });

  test('should return empty array for uninitialised list', () => {
    const { result } = renderHook(() => useList());
    const [list] = result.current;
    expect(list).toEqual([]);
  });

  test('should remove nothing from empty list', () => {
    const { result } = renderHook(() => useList());
    const [list, { filter }] = result.current;
    expect(list).toEqual([]);
    act(() => filter(item => !(item === 32)));
    const [list2] = result.current;
    expect(list2).toEqual([]);
  });

  test('should remove first item from list', () => {
    const { result } = renderHook(() => useList([1, 2, 3, 4]));
    const [list, { filter }] = result.current;
    act(() => filter(item => !(item === 1)));
    const [list2] = result.current;
    expect(list2).toEqual([2, 3, 4]);
  });

  test('should remove last item from list', () => {
    const { result } = renderHook(() => useList([1, 2, 3, 4]));
    const [list, { filter }] = result.current;
    act(() => filter(item => !(item === 4)));
    const [list2] = result.current;
    expect(list2).toEqual([1, 2, 3]);
  });

  test('should remove nothing if item not in list', () => {
    const { result } = renderHook(() => useList([1, 2, 3, 4]));
    const [list, { filter }] = result.current;
    act(() => filter(item => !(item === 8)));
    const [list2] = result.current;
    expect(list2).toEqual([1, 2, 3, 4]);
  });

  test('should remove item from specified index', () => {
    const { result } = renderHook(() => useList([1, 2, 3, 4, 88, 123]));

    const [list, { removeAt }] = result.current;
    expect(list).toEqual([1, 2, 3, 4, 88, 123]);

    act(() => removeAt(list.length - 1));
    const [list2] = result.current;
    expect(list2).toEqual([1, 2, 3, 4, 88]);

    act(() => removeAt(0));
    const [list3] = result.current;
    expect(list3).toEqual([2, 3, 4, 88, 123]);

    act(() => removeAt(3));
    const [list4] = result.current;
    expect(list4).toEqual([1, 2, 3, 88, 123]);
  });

  test('should remove nothing if item with specified index not in list', () => {
    const { result } = renderHook(() => useList());
    const [list, { removeAt }] = result.current;
    act(() => removeAt(12));
    const [list2] = result.current;
    expect(list2).toEqual([]);
  });

  test('should remove nothing from an empty list for removeItems', () => {
    const { result } = renderHook(() => useList());
    const [list, { filter }] = result.current;
    expect(list).toEqual([]);
    act(() => filter(item => ![3, 2, 3, 42].includes(item)));
    const [list2] = result.current;
    expect(list2).toEqual([]);
  });
});

test('should return specified initial list', () => {
  const { container } = render(<TestBasic initialList={[1, 2, 3]} />);
  const values = container.querySelector('#values');
  expect(values.textContent).toBe('1|2|3');
});

test('should set specified values', () => {
  const { container } = render(<TestBasic />);
  const values = container.querySelector('#values');
  const reset = container.querySelector('#reset');
  const set = container.querySelector('#set');

  fireEvent.click(reset);
  expect(values.textContent).toBe('');

  fireEvent.click(set);
  expect(values.textContent).toBe('2');
});

test('should replace an item', () => {
  const { container } = render(<TestBasic initialList={[1, 2, 3]} />);
  const values = container.querySelector('#values');
  const updateAt = container.querySelector('#updateAt');

  fireEvent.click(updateAt);
  expect(values.textContent).toBe('1|12|3');
});

test('should add to the end of an existing list', () => {
  const { container } = render(<TestBasic initialList={[1, 2, 3]} />);
  const values = container.querySelector('#values');
  const add = container.querySelector('#add');
  const addItems = container.querySelector('#addItems');

  expect(values.textContent).toBe('1|2|3');

  fireEvent.click(add);
  expect(values.textContent).toBe('1|2|3|1');

  fireEvent.click(addItems);
  expect(values.textContent).toBe('1|2|3|1|7|8|9');
});

test('should add to an empty list', () => {
  const { container } = render(<TestBasic />);
  const values = container.querySelector('#values');
  const add = container.querySelector('#add');

  fireEvent.click(add);
  expect(values.textContent).toBe('1');
});

test('should add a list to an empty list', () => {
  const { container } = render(<TestBasic />);
  const values = container.querySelector('#values');
  const addItems = container.querySelector('#addItems');

  fireEvent.click(addItems);
  expect(values.textContent).toBe('7|8|9');
});

test('should add to the specified index of a list', () => {
  const { container } = render(<TestBasic initialList={[1, 2, 3]} />);
  const values = container.querySelector('#values');
  const addAt = container.querySelector('#addAt');
  const addItemsAt = container.querySelector('#addItemsAt');

  expect(values.textContent).toBe('1|2|3');

  fireEvent.click(addAt);
  expect(values.textContent).toBe('1|19|2|3');
  fireEvent.click(addItemsAt);
  expect(values.textContent).toBe('1|19|7|8|9|2|3');
});

test('should add to an empty list when add index specified', () => {
  const { container } = render(<TestBasic />);
  const values = container.querySelector('#values');
  const addAt = container.querySelector('#addAt');

  fireEvent.click(addAt);
  expect(values.textContent).toBe('19');
});

test('should add a list to an empty list when add index specified', () => {
  const { container } = render(<TestBasic />);
  const values = container.querySelector('#values');
  const addItemsAt = container.querySelector('#addItemsAt');

  fireEvent.click(addItemsAt);
  expect(values.textContent).toBe('7|8|9');
});

test('should remove item from list', () => {
  const { container } = render(<TestBasic initialList={[1, 2, 3, 55, 29]} />);
  const values = container.querySelector('#values');
  const remove = container.querySelector('#remove');
  expect(values.textContent).toBe('1|2|3|55|29');
  fireEvent.click(remove);
  expect(values.textContent).toBe('1|3|55|29');
});

test('should remove items from list', () => {
  const { container } = render(
    <TestBasic initialList={[1, 2, 3, 55, 29, 4]} />
  );
  const values = container.querySelector('#values');
  const removeItems = container.querySelector('#removeItems');
  expect(values.textContent).toBe('1|2|3|55|29|4');
  fireEvent.click(removeItems);
  expect(values.textContent).toBe('1|55|29');
});

test('should filter negative items', () => {
  const { container } = render(
    <TestBasic initialList={[-1, -44, 0, 12, 441, -8, -1, -44, 1]} />
  );
  const values = container.querySelector('#values');
  const filter = container.querySelector('#filter');
  fireEvent.click(filter);
  expect(values.textContent).toBe('0|12|441|1');
});

test('should sort without sort function', () => {
  const { container } = render(
    <TestBasic initialList={[-1, 0, 12, 441, -8, -1, -44]} />
  );
  const values = container.querySelector('#values');
  const sortDefault = container.querySelector('#sortDefault');
  fireEvent.click(sortDefault);
  expect(values.textContent).toBe('-1|-1|-44|-8|0|12|441');
});

test('should sort without sort descending', () => {
  const { container } = render(
    <TestBasic initialList={[-1, 0, 12, 441, -8, -1, -44]} />
  );
  const values = container.querySelector('#values');
  const sortDesc = container.querySelector('#sortDesc');
  fireEvent.click(sortDesc);
  expect(values.textContent).toBe('441|12|0|-1|-1|-8|-44');
});

test('should work with named exports as object', () => {
  const Test = props => {
    const [list] = useNamed.useList();
    return <>{list}</>;
  };
  const { container } = render(<Test />);
  expect(container).toBe(container);
});
