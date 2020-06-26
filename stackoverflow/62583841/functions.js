const firstFunc = () => {
  const x = exports.secondFunc();
  return x;
};

const secondFunc = () => {
  return '5';
};

exports.firstFunc = firstFunc;
exports.secondFunc = secondFunc;
