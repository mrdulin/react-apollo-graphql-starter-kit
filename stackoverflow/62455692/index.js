const hideElem = (elem) => {
  elem.classList.add('js-hidden');
};

const getInputValue = (inputElem) => {
  let inputEl = document.querySelector(inputElem);

  return inputEl.value;
};

const cleanInput = (input) => {
  const inputEl = document.querySelector(input);
  inputEl.value = '';
};

export { hideElem, getInputValue, cleanInput };
