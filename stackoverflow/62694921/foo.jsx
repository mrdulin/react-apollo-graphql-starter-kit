import React from 'react';

export default (props) => {
  let { val } = props;

  if (val) {
    return 'ReactComponentFail';
  } else {
    return 'ReactComponent';
  }
};
