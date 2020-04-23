const crypto = require('crypto');
const express = require('express');

const app = express();

app.put('/api/engineer/confirm_mail/:token', async (req, res) => {
  try {
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    console.log(hashedToken);
    return res.status(202).send({ message: 'email verified' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.put('/example/:token', async (req, res) => {
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  console.log(hashedToken);
  res.sendStatus(200);
});

module.exports = app;
