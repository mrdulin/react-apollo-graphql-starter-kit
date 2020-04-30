const express = require('express');
const { Router } = require('express');
const A = require('./a');

const app = express();
const router = Router();

router.get('/', async (req, res) => {
  const a = new A();

  a.myFunc()
    .then((result) => {
      res.json({ message: result });
    })
    .catch((e) => {
      return [];
    });
});

app.use(router);

module.exports = app;
