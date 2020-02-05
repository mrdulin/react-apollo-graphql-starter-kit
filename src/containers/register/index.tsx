import React, { PureComponent, SyntheticEvent, ReactNode } from 'react';
import { MutationFunc, compose } from 'react-apollo';
import { RouteComponentProps } from 'react-router-dom';
import PT from 'prop-types';

import * as M from './mutation';
import { auth } from '../../services';

interface IRegisterState {
  formValidatorError: { msg: string };
}

interface IRegisterMutations {
  register: MutationFunc;
}

type State = Readonly<IRegisterState>;
type Props = Readonly<IRegisterMutations & RouteComponentProps>;

class Register extends PureComponent<Props, State> {
  public static propTypes = {
    register: PT.func.isRequired
  };

  public static defaultProps: Partial<Props> = {};

  constructor(props: Props) {
    super(props);
    this.state = {
      formValidatorError: {
        msg: ''
      }
    };
  }

  public render(): ReactNode {
    const { formValidatorError } = this.state;
    return (
      <div>
        <form onSubmit={event => this.onSubmit(event)}>
          <div>
            <input type="text" name="username" placeholder="username" />
          </div>
          <div>
            <input type="text" name="email" placeholder="email" required />
          </div>
          <div>
            <input type="password" name="password" placeholder="password" required />
          </div>
          <div>
            <input type="password" name="passwordConfirm" placeholder="password again" required />
          </div>
          {formValidatorError.msg ? <p>{formValidatorError.msg}</p> : null}
          <input type="submit" value="Register" />
        </form>
      </div>
    );
  }

  private onSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const {
      currentTarget: { elements }
    } = event;
    const username = (elements.namedItem('username') as HTMLInputElement).value.trim();
    const password = (elements.namedItem('password') as HTMLInputElement).value.trim();
    const email = (elements.namedItem('email') as HTMLInputElement).value.trim();
    const passwordConfirm = (elements.namedItem('passwordConfirm') as HTMLInputElement).value.trim();

    if (password !== passwordConfirm) {
      this.setState({ formValidatorError: { msg: 'Password is not same' } });
    }

    if (!email) {
      this.setState({ formValidatorError: { msg: 'Email is required' } });
    }

    this.props
      .register({ variables: { name: username, email, password } })
      .then(res => {
        alert('Register Successfully!');
        const {
          data: { register: user }
        } = res;
        auth.authenticate(user, () => {
          this.props.history.replace('/');
        });
      })
      .catch(err => {
        console.error(err);
      });
  }
}

export default compose(M.register)(Register);
