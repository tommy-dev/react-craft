import { useState } from 'react';

export interface Methods<T> {
  set: (items: T[]) => void;
  add: (item: T | T[]) => void;
  addAt: (index: number, item: T | T[]) => void;
  updateAt: (index: number, item: T) => void;
  removeAt: (index: number) => void;
  filter: (fn: (item: T) => boolean) => void;
  sort: (fn?: (a: T, b: T) => number) => void;
}

export const useList = <T>(initialList: T[] = []): [T[], Methods<T>] => {
  const [list, set] = useState<T[]>(initialList || []);

  const addFn = (items: T | T[]) => {
    if (Array.isArray(items)) {
      set([...list, ...items]);
    } else {
      set([...list, items]);
    }
  };

  const addAtFn = (index: number, items: T | T[]) => {
    if (Array.isArray(items)) {
      set([...list.slice(0, index), ...items, ...list.slice(index)]);
    } else {
      set([...list.slice(0, index), items, ...list.slice(index)]);
    }
  };

  return [
    list,
    {
      set,
      add: item => addFn(item),
      addAt: (index, item) => addAtFn(index, item),
      updateAt: (index, item) =>
        set([...list.slice(0, index), item, ...list.slice(index + 1)]),
      removeAt: index =>
        set([...list.slice(0, index), ...list.slice(index + 1)]),
      filter: fn => set(list.filter(fn)),
      sort: (fn?) => set([...list].sort(fn)),
    },
  ];
};

export default useList;
