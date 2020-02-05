import React from 'react';
import { graphql } from 'react-apollo';
import PT from 'prop-types';

import * as Q from 'gqlMod/queries/library.gql';
import * as M from 'gqlMod/mutations/library.gql';

class AddMessage extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(evt) {
    evt.preventDefault();
    const { match } = this.props;
    const bookId = match.params.id;
    const message = { bookId, text };
    const text = this.input.value;
    this.props
      .mutate({
        variables: {
          message
        },
        optimisticResponse: {
          addMessage: {
            id: Math.round(Math.random() * -1000000),
            text,
            __typename: 'Message'
          }
        },
        update: (store, res) => {
          const data = store.readQuery({
            query: Q.bookDetailQuery,
            variables: { message }
          });
          const message = res.data.addMessage;
          const existed = data.book.messages.findIndex(msg => msg.id === message.id) !== -1;
          if (!existed) {
            data.book.messages.push(message);
          }
          store.writeQuery({
            query: Q.bookDetailQuery,
            variables: { message },
            data
          });
        }
      })
      .then(() => {
        this.input.value = '';
      })
      .catch(err => {
        console.error(err);
      });
  }
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input ref={ref => (this.input = ref)} type="text" placeholder="new message" />
      </form>
    );
  }
}

AddMessage.propTypes = {
  mutate: PT.func,
  match: PT.object
};

export default graphql(M.addMessage)(AddMessage);
