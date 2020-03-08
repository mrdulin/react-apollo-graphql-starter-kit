const express = require('express');
const app = express();

app.get('/api/getUser', (req, res) => {
  res.json({
    email: req.email,
    name: req.username,
  });
});
