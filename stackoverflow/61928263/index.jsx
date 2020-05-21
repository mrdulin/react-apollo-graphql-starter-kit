import React, { useEffect } from 'react';
import Router from 'next/router';
import { useDispatch } from 'react-redux';
import { logout } from './user.actions';
import { LoadingMessage } from './LoadingMessage';

export const Logout = () => {
  const dispatch = useDispatch();
  const props = {
    active: true,
    withOverlay: false,
    small: false,
  };
  useEffect(() => {
    dispatch(logout());
    Router.push('/');
  }, []);
  return (
    <div>
      <LoadingMessage {...props}>
        <div>Logging out, please wait...</div>
      </LoadingMessage>
    </div>
  );
};
