import axios from 'axios';

function createApiClient(config = {}) {
  const client = axios.create(config);
  client.interceptors.response.use(
    (response) => response.data,
    (error) => {
      if (error.response) {
        throw error.response.data;
      } else {
        throw new Error('Ошибка во время соединения с сервером! Попробуйте повторить попытку позже.');
      }
    },
  );
  return client;
}

export default createApiClient;
