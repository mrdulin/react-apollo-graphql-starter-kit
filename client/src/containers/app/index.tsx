import React, { ReactNode } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import PT from "prop-types";

import { auth } from "../../services/auth";

interface IAppProps {
  children?: ReactNode;
}
type Props = Readonly<RouteComponentProps & IAppProps>;

class App extends React.Component<Props> {
  public static propTypes = {
    children: PT.node,
    history: PT.object
  };

  public static defaultProps: Partial<Props> = {
    children: null
  };

  public render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/book-list">BookList</Link>
          </li>
          {/* <li>
            <Link to="/topics">Topics</Link>
          </li> */}
          <li>
            <Link to="/upload">Upload</Link>
          </li>
          <li>
            <Link to="/register">register</Link>
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

  private onLogout() {
    auth.signout();
    window.location.replace("#/login");
  }
}

export default App;
