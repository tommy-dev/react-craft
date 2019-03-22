import { useState, useCallback } from 'react';

export type UseToggle = (on?: boolean) => [boolean, (on?: boolean) => void];

export const useToggle: UseToggle = initialValue => {
  const [on, setOn] = useState<boolean>(initialValue || false);

  const toggle = useCallback(
    (on?: boolean) => {
      if (typeof on !== 'undefined') {
        setOn(!!on);
        return;
      }
      setOn(on => !on);
    },
    [setOn]
  );

  return [on, toggle];
};

export default useToggle;
