import { useState } from 'react';

export interface Methods<K, V> {
  clear: () => void;
  get: (key: K) => any;
  hasKey: (key: K) => boolean;
  remove: (key: K) => void;
  reset: () => void;
  set: (key: K, value: V) => void;
}

export const useMap = <T extends { [key: string]: any }>(
  initial: any = {}
): [T, Methods<string, any>] => {
  const [map, set] = useState<T>(initial as any);

  return [
    map,
    {
      get: (key: string) => map[key],
      set: (key: string, val: any) => {
        set({
          ...(map as any),
          [key]: val,
        });
      },
      remove: (key: string) => {
        const { [key]: Omit, ...rest } = map as any;
        set(rest);
      },
      clear: () => set({} as any),
      reset: () => set(initial),
      hasKey: (key: string) => map[key] != null,
    },
  ];
};

export default useMap;
