import React from 'react';
import { Link } from 'react-router-dom';
import PT from 'prop-types';

class App extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/book-list">BookList</Link>
          </li>
        </ul>
        <hr />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PT.node
};

export default App;
