import React, { Component } from 'react';

const styles = {
  syntheseContainer: 'syntheseContainer',
  successContainer: 'successContainer',
  fullWidth: 'fullWidth',
  notStartedBox: 'notStartedBox',
  errorBox: 'errorBox',
};

export default class MyComponent extends Component {
  state = {
    data: {},
    currentStatus: 'LOADING',
  };

  render() {
    return (
      <div className={styles.syntheseContainer}>
        {
          {
            SUCCESS: <div className={styles.successContainer}>something here</div>,
            EMPTY: null,
            LOADING: <div className={styles.fullWidth}></div>,
            NOT_STARTED: <div className={styles.notStartedBox}></div>,
            ERROR: <div className={styles.errorBox}></div>,
          }[this.state.currentStatus]
        }
      </div>
    );
  }
}
