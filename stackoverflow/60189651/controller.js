const Driver = require('./models.js');

exports.create = (req, res) => {
  const { oLongitude, oLatitude } = req.body;
  const { dLongitude, dLatitude } = req.body;

  if (!Object.keys(req.body).length) {
    return res.status(400).json({
      message: 'Form content can not be empty',
    });
  }

  const driver = new Driver({
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
    veichle: req.body.veichle,
    cnhType: req.body.cnhType,
    loaded: req.body.loaded,
    truckType: req.body.truckType,
    origin: {
      type: 'Point',
      coordinates: [oLongitude, oLatitude],
    },
    destination: {
      type: 'Point',
      coordinates: [dLongitude, dLatitude],
    },
    date: req.body.date,
  });

  return driver
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error ocurred while creating the driver.',
      });
    });
};
