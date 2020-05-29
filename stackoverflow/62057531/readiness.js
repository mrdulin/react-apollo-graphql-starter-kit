const state = require('./state');
const hooks = require('./hooks');

function setReady() {
  state.ready = true;
  hooks.notifyHook(state.ready);
}

function setNotReady() {
  state.ready = false;
  hooks.notifyHook(state.ready);
}

module.exports = {
  setReady,
  setNotReady,
};
