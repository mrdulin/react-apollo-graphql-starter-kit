import React, { Component } from 'react';

export default class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      someValue: '',
    };
  }
  render() {
    return (
      <>
        <input type="text" onChange={(e) => this.setState({ someValue: e.target.value })}></input>
      </>
    );
  }
}
