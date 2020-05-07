const library = require('./library');
const exchange = new library.exchange_name();

async function getPositions() {
  let positions = [];

  const results = await exchange.someFunction();
  return results;
}

module.exports = getPositions;
