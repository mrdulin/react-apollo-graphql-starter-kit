import React from 'react';

const TestComponent = ({ name, ...props }) => {
  return <div>{name}</div>;
};

export default TestComponent;
