import React, { Component } from 'react';
import * as PT from 'prop-types';

import './index.css';

class Tooltip extends Component {
  static propTypes = {
    text: PT.string.isRequired,
    children: PT.node,
    icon: PT.node
  };

  state = {
    show: false
  };

  onMouseEnter = () => {
    console.log('onMouseEnter');
    this.setState({ show: true });
  };

  onMouseLeave = () => {
    console.log('onMouseLeave');
    this.setState({ show: false });
  };

  render() {
    const { text, children, icon } = this.props;
    return (
      <div className="tooltip" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        {this.state.show ? (
          <div>
            <span>{icon}</span>
            <span className="tooltip-text">{text}</span>
          </div>
        ) : (
          children
        )}
      </div>
    );
  }
}

export default Tooltip;
