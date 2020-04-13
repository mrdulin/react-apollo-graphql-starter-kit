import React from 'react';

export function App(props) {
  function save() {
    // contains the code for api calls and store changes
    console.log('You should spy or mock the function which make the api calls');
  }
  return (
    <button id="btn-id" onClick={save}>
      Name
    </button>
  );
}
