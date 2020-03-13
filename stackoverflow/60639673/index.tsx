import React, { useState, useEffect } from 'react';

function sample(props) {
  const { counter } = props;
  const [displayIcon, setDisplayIcon] = useState(counter);

  function isLocalstoragePresent() {
    return localStorage.getItem('some_Id');
  }

  useEffect(() => {
    if (isLocalstoragePresent()) {
      setDisplayIcon(true);
    } else {
      setDisplayIcon(false);
    }
  }, [counter]);

  return <div>{displayIcon ? 'icon' : ''}</div>;
}

export default sample;
