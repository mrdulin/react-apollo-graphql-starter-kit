import React, { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';

class ManuallyFiringAQuery extends Component {
  render() {
    return (
      <div>
        <h1>Manually firing a query</h1>

        {/* <ApolloConsumer>{client => {}}</ApolloConsumer> */}
      </div>
    );
  }
}

export default ManuallyFiringAQuery;
