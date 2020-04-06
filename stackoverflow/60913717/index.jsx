import React, { useState, useEffect } from 'react';
import { AnotherComponent } from './AnotherComponent';
import { LoadingComponent } from './LoadingComponent';
import { getData } from './dataService';

export default function MyComponent() {
  const [data, setData] = useState(null);
  useEffect(() => {
    getData().then(setData);
  }, []);
  return data ? <AnotherComponent /> : <LoadingComponent />;
}
