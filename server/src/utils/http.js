const requestPromise = require('request-promise');
const { appConfig } = require('../config');

const GRAPHQL_ENDPOINT = `http://localhost:${appConfig.PORT}/graphql`;

function rp(options) {
  const url = options.url || GRAPHQL_ENDPOINT;
  function post(api, body) {
    const uri = url + api;
    return requestPromise(uri, {
      method: 'POST',
      body,
      json: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  function get(api, qs) {
    const uri = url + api;
    return requestPromise(uri, {
      method: 'GET',
      qs,
      json: true
    });
  }

  return {
    post,
    get
  };
}

module.exports = rp;
