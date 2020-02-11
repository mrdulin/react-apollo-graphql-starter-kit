import React from 'react';

export const CounterHandler = (num) => {
  const [counter, setCounter] = React.useState(num);
  const increase = () => setCounter(counter + 1);
  const decrease = () => setCounter(counter - 1);

  return {
    counter,
    increase,
    decrease,
  };
};
