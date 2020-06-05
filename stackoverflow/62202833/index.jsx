import React, { useState } from 'react';

function Profile() {
  const [name, setName] = useState({
    firstName: '',
    lastName: '',
  });
  const [names, setNames] = useState([]);

  const handleClick = (e) => {
    e.preventDefault();
    names.push(name);
  };

  return (
    <form>
      <input
        type="text"
        value={name.firstName}
        onChange={(e) =>
          setName({
            ...name,
            firstName: e.target.value,
          })
        }
      />
      <input
        type="text"
        value={name.lastName}
        onChange={(e) =>
          setName({
            ...name,
            lastName: e.target.value,
          })
        }
      />
      <button onClick={handleClick}> Add Name </button>{' '}
    </form>
  );
}
export default Profile;
