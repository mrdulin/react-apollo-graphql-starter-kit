import React, { Component } from 'react';
import User from './User';
import Board from './Board';

class Game extends Component {
  constructor(props) {
    super(props);
    this.board = new Board({});
  }

  initializeUser(name) {
    const user = new User(name);
    user.pickCards();
  }

  render() {
    return <div className="game-container"></div>;
  }
}

export default Game;
