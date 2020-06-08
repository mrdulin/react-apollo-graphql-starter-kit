import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);
    this.name = this.props.name;
  }

  pickCards() {
    console.log('pick cards real implementation');
  }

  render() {
    return 'User';
  }
}

export default User;
