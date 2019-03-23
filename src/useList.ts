import { useState } from 'react';

export interface Methods<T> {
  add: (item: T) => void;
  addAt: (index: number, item: T) => void;
  addRange: (items: T[]) => void;
  addRangeAt: (index: number, items: T[]) => void;
  filter: (fn: (item: T) => boolean) => void;
  removeAt: (index: number) => void;
  set: (items: T[]) => void;
  sort: (fn?: (a: T, b: T) => number) => void;
  updateAt: (index: number, item: T) => void;
}

export const useList = <T>(initial: T[] = []): [T[], Methods<T>] => {
  const [array, setArray] = useState<T[]>(initial);

  return [
    array,
    {
      set: setArray,
      add: item => setArray([...array, item]),
      addRange: items => setArray([...array, ...items]),
      addAt: (index, item) =>
        setArray([...array.slice(0, index), item, ...array.slice(index)]),
      addRangeAt: (index, items) =>
        setArray([...array.slice(0, index), ...items, ...array.slice(index)]),
      updateAt: (index, item) =>
        setArray([...array.slice(0, index), item, ...array.slice(index + 1)]),
      removeAt: index =>
        setArray([...array.slice(0, index), ...array.slice(index + 1)]),
      filter: fn => setArray(array.filter(fn)),
      sort: (fn?) => setArray([...array].sort(fn)),
    },
  ];
};

export default useList;
