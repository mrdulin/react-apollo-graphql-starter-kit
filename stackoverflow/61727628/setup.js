const jquery = function () {
  return "I'm fake jquery";
};
const moment = function () {
  return "I'm fake moment";
};

global.$ = jquery;
global.moment = moment;
