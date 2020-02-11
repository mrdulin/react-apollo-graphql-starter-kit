import React, { useState } from 'react';

export function SearchProviders({ changeRoute }) {
  const [speciality, setspeciality] = useState('Hospital');

  const onInputChange = () => {
    setspeciality(speciality.toUpperCase());
  };

  return (
    <div>
      <span>{speciality}</span>
      <input id="speciality" onChange={onInputChange}></input>
    </div>
  );
}
