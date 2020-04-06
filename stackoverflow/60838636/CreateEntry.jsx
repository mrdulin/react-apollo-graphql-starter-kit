import React from 'react';
const CreateEntry = ({ addEntry }) => (
  <div>
    <button onClick={() => addEntry('entry title')}>add Entry</button>
  </div>
);

export default CreateEntry;
