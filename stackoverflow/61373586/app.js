const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.post('/example', (req, res) => {
  const checked = req.body.check;
  const Identifier = req.app.get('identifier');
  console.log('Identifier:', Identifier);
  res.sendStatus(200);
});

module.exports = app;
