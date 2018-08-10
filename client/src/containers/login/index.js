import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import * as PT from 'prop-types';

import * as M from 'gqlMod/mutations/user.gql';

import { auth } from '../../services';

class Login extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      redirectToReferrer: false
    };
  }

  login(e, mutate) {
    e.preventDefault();
    const { target } = e.nativeEvent;
    const { email, password } = target.elements;

    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    if (!emailValue) {
      alert('email is required');
      return;
    }

    if (!passwordValue) {
      alert('password is required');
      return;
    }

    mutate({ variables: { email: emailValue, password: passwordValue } }).then(({ data }) => {
      if (data && data.login) {
        auth.authenticate(data.login, () => {
          this.setState({ redirectToReferrer: true });
        });
      }
    });
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;
    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <Mutation mutation={M.LOGIN}>
          {(login, mutationResult) => {
            let formControl = {};
            const { loading, error } = mutationResult;

            if (loading) {
              return <p>loading...</p>;
            }

            if (error) {
              return <p>{error.message}</p>;
            }

            return (
              <form onSubmit={e => this.login(e, login)}>
                <div>
                  <input type="text" placeholder="email" name="email" ref={ref => (formControl.email = ref)} />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="password"
                    name="password"
                    ref={ref => (formControl.password = ref)}
                  />
                </div>
                <div>
                  <input type="submit" value="Login" />
                </div>
              </form>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

Login.propTypes = {
  location: PT.object
};

export default Login;
