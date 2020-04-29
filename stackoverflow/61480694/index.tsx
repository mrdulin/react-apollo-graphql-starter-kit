import React, { useState } from 'react';

export default function MyComponent({ index }) {
  const [currentTab, setCurrentTab] = useState(index);
  const handleTabChange = (event: React.ChangeEvent<{}>, tab: number) => {
    console.log('test handleTabChange: ' + tab);
    setCurrentTab(tab);
  };
  return (
    <div>
      <select onChange={(e) => handleTabChange(e, 1)}>
        <option>chocolate</option>
        <option>strawberry</option>
        <option>vanilla</option>
      </select>
      <span>currentTab: {currentTab}</span>
    </div>
  );
}
