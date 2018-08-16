import React from 'react';
import { Link } from 'react-router-dom';
import PT from 'prop-types';

import { auth } from '../../services/auth';

class App extends React.Component {
  onLogout() {
    auth.signout();
    window.location.replace('#/login');
  }

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

        {auth.user ? (
          <div>
            <p>Username: {auth.user.name}</p>
            <p>Email: {auth.user.email}</p>
            <button type="button" onClick={() => this.onLogout()}>
              logout
            </button>
          </div>
        ) : null}

        <hr />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PT.node,
  history: PT.object
};

export default App;
