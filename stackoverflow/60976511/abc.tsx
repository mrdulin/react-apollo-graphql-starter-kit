import { useEffect } from 'react';

export const Abc = (props) => {
  useEffect(() => {
    globalThis.scrollTo(0, 0);
  });
  return null;
};
