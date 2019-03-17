import { useState } from 'react';

export interface Methods<T> {
  add: (item: T) => void;
  filter: (fn: (item: T) => boolean) => void;
  removeAt: (index: number) => void;
  set: (items: T[]) => void;
  sort: (fn?: (a: T, b: T) => number) => void;
}

const filterDupe = (items: any[]) => {
  let temp = items;
  if (!Array.isArray(items)) {
    temp = [items];
  }
  return temp.filter((d, i) => temp.indexOf(d) === i);
};

const hasItem = (items: any[], item: any) => items.indexOf(item) !== -1;
const addUnique = (items: any[], item: any) => {
  if (hasItem(items, item)) return items;
  return [...items, item];
};

export const useSet = <T>(initial: T[] = []): [T[], Methods<T>] => {
  const [array, setArray] = useState<T[]>(filterDupe(initial));

  return [
    array,
    {
      set: array => setArray(filterDupe(array)),
      add: item => setArray(addUnique(array, item)),
      removeAt: index =>
        setArray([...array.slice(0, index), ...array.slice(index + 1)]),
      filter: fn => setArray(array.filter(fn)),
      sort: (fn?) => setArray([...array].sort(fn)),
    },
  ];
};

export default useSet;
