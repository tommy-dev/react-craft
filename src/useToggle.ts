import * as React from 'react';

export type UseToggle = (on?: boolean) => [boolean, (on?: boolean) => void];

export const useToggle: UseToggle = initialValue => {
  const [on, setOn] = React.useState<boolean>(initialValue || false);

  const toggle = React.useCallback(
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
