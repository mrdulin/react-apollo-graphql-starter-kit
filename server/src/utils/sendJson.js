function sendJson(status, err, res) {
  if (status) {
    return res.status(status).json(err);
  }
  res.json(err);
}

exports.sendJson = sendJson;
