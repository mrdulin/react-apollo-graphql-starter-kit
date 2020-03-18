import React from 'react';

export const Checkbox = ({ label, onChange, id, isChecked }) => {
  console.log('isChecked:', isChecked);
  return (
    <>
      <input type="checkbox" name="node" id={'checkbox-' + id} onChange={onChange} checked={isChecked} />
      <label className="treeview__level" htmlFor={'checkbox-' + id}>
        {label}
      </label>
    </>
  );
};
