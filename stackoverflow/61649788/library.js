function exchange_name() {
  async function someFunction() {
    return 'real data';
  }

  return {
    someFunction,
  };
}

module.exports = { exchange_name };
