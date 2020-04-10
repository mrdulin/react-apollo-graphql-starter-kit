import { useEffect } from 'react';

const getValue = (v) => v;

export function MyComponent() {
  const myArg = 'myArg';
  useEffect(() => {
    if (window != undefined) {
      window.history.pushState(
        {
          id: 'myId',
        },
        'yes',
        getValue(myArg),
      );
    }
  }, [myArg]);
  return null;
}
