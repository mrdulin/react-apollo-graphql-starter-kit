import { createStore } from 'redux';

function reducer(state) {
  return state;
}
const store = createStore(reducer);

function validate(data) {
  return !!data;
}

function someMethod(flag) {}

const dataImport = (dispatch) => (data) => {
  validate(data);

  dispatch(someMethod(true));
};

const importer = dataImport(store.dispatch);

export { importer };
