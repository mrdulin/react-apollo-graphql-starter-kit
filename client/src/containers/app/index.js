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
            <Link to="/book-list">BookList</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
          <li>
            <Link to="/upload">Upload</Link>
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
