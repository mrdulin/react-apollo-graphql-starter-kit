import createApiClient from './createApiClient';

const request = createApiClient({
  baseURL: process.env.VUE_APP_AUTH_API_URL,
});

async function logIn(username, password) {
  const { token } = await request.post('login/', {
    username,
    password,
  });
  return token;
}

export { logIn };
