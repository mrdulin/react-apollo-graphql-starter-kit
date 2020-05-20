import ButtonContainer from './ButtonContainer';

const App = () => {
  const [counter, setCounter] = React.useState(0);

  const handleClick = () => {
    setCounter(counter + 1);
  };

  return (
    <div data-test="component-app">
      <h1 data-test="counter-display">The counter is currently {counter}</h1>
      <ButtonContainer data-test="increment-button" handleClick={handleClick}>
        Increment
      </ButtonContainer>
    </div>
  );
};

export default App;
