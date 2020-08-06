const setEnterpriseCookie = (...args) => {
  let path = window.location.pathname;
  if (path.match(/.*\/enterprise.*/)) {
    window.TOOL.cookie.setCookie(...args);
  }
};

exports.setEnterpriseCookie = setEnterpriseCookie;
