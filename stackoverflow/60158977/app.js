import React from 'react';
import { CounterHandler } from './counterHandler';

function App() {
  const counter = CounterHandler(0);

  return (
    <div className="App">
      <button name="increase" onClick={counter.increase}>
        click to increase
      </button>
      <button name="decrease" onClick={counter.decrease}>
        click to decrease
      </button>
      <h1>counter: {counter.counter}</h1>
    </div>
  );
}

export default App;
