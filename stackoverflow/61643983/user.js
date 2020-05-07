import * as API from './api';

export var LoginRequestHandler = async function () {
  const username = 'theUsername';
  const password = 'thePassword';
  try {
    await API.Auth().Login(username, password);
  } catch (e) {
    throw new Error(e);
  }
};
