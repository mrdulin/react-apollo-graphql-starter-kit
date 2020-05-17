const router = require('express').Router({ mergeParams: true });

import config from './config';
import proxy from 'express-request-proxy';

router.get('', (...args) => {
  console.log(config);
  let query = {};
  if (config.FOO === 'bar') {
    query.baz = true;
  }
  return proxy({ url: '/stuff', query })(...args);
});

export default router;
