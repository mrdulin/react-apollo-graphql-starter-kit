import React from 'react';

export const Tabs = ({ onChange, children }) => <select onChange={onChange}>{children}</select>;
const Tab = ({ label }) => <option value={label}>{label}</option>;

export function Header(): JSX.Element {
  function onChangeFunc(event: Event, tab: number): void {
    console.log('onchange');
  }

  return (
    <div>
      <Tabs onChange={onChangeFunc}>
        <Tab label="A" />
        <Tab label="B" />
      </Tabs>
    </div>
  );
}
