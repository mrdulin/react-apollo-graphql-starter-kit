import React, { useState } from 'react';
import Entry from './Entry';
import CreateEntry from './CreateEntry';

function CustomEntry() {
  const [entries, setEntries] = useState([]);
  const addEntry = (title) => {
    const newEntries = [...entries, { title }];
    setEntries(newEntries);
  };
  return (
    <div className="create-entry">
      <CreateEntry addEntry={addEntry} />
      {entries.map((entry, index) => (
        <Entry entry={entry} index={index} key={index} />
      ))}
    </div>
  );
}
export default CustomEntry;
