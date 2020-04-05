export let funcA = () => {};
export const funcB = () => {
  exports.funcA();
};
