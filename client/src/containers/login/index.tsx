import React, { PureComponent, ReactNode } from 'react';
import { Mutation } from 'react-apollo';
import { Redirect, RouteComponentProps, Link } from 'react-router-dom';
import PT from 'prop-types';

import * as M from 'gqlMod/mutations/user.gql';
import { auth } from '../../services';

interface ILoginState {
  redirectToReferrer: boolean;
}

type Props = Readonly<RouteComponentProps<any>>;
type State = Readonly<ILoginState>;

interface IFormControl {
  [formControl: string]: HTMLInputElement | null;
}

class Login extends PureComponent<Props, State> {
  public static propsTypes = {
    location: PT.object
  };

  public static defaultProps: Partial<Props> = {};

  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      redirectToReferrer: false
    };
  }

  public render(): ReactNode {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;
    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <Mutation mutation={M.LOGIN}>
        {(mutate: (...args: any[]) => any, mutationResult): ReactNode => {
          const formControl: IFormControl = {
            email: null,
            password: null
          };
          const { loading, error } = mutationResult;

          if (loading) {
            return <p>loading...</p>;
          }

          if (error) {
            return <p>{error.message}</p>;
          }

          return (
            <form onSubmit={e => this.login(e, mutate)}>
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
                <Link to="/register">register</Link>
              </div>
            </form>
          );
        }}
      </Mutation>
    );
  }

  private login(e: React.SyntheticEvent<HTMLFormElement>, mutate: (...args: any[]) => any) {
    e.preventDefault();
    const { currentTarget } = e;
    const { email, password } = currentTarget.elements as any;

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

    mutate({ variables: { email: emailValue, password: passwordValue } }).then(({ data }: any) => {
      if (data && data.login) {
        auth.authenticate(data.login, () => {
          this.setState({ redirectToReferrer: true });
        });
      }
    });
  }
}

export default Login;
