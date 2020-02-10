import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

export const Form = ({ onSubmit, onChange, values }) => <form onSubmit={onSubmit}></form>;
const path = '/user';

export const Parent = ({ submitForm }) => {
  const [formValues, setFormValues] = useState({});
  const [redirect, setRedirect] = useState(false);

  const handleChange = (name) => (evt) => {
    setFormValues({ ...formValues, [name]: evt.target.value });
  };

  const onSubmit = async () => {
    try {
      const res = await submitForm(formValues);
      if (res) setRedirect(true);
      else setRedirect(false);
    } catch (err) {
      console.log('Submit error: ', err);
    }
  };

  return redirect ? (
    <Redirect push to={path} />
  ) : (
    <Form onSubmit={onSubmit} values={formValues} onChange={handleChange} />
  );
};

export default Parent;
