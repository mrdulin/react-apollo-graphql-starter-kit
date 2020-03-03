const db = require('./db');

async function create(req, res) {
  try {
    await db.restaurant.create(req.body);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
}

async function read(req, res) {
  try {
    const data = await db.restaurant.findAll();
    res.send(200).json(data);
  } catch (error) {
    res.sendStatus(500);
  }
}

async function update(req, res) {
  try {
    await db.restaurant.update(
      {
        name: 'KFC',
      },
      {
        where: {
          id: req.params.id,
        },
      },
    );
  } catch (error) {
    res.sendStatus(500);
  }
}

module.exports = {
  create,
  read,
  update,
};
