import request from 'request';

export const getRequest = (API, queryParams, camelCase = true) => {
  return new Promise((resolve, reject) => {
    request
      .get(API)
      .query(queryParams)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.log('----- fetch unsuccessful ---- ', error);
        reject(error);
      });
  });
};
