import React, { Component } from 'react';
import { API } from './api';

export class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }
  async componentDidMount() {
    await API.graphql('graphqlOperation(subscriptions.addedProduct)').subscribe({
      next: (response) => {
        this.setState({ products: [...this.state.products, response.value.data.addedProduct] });
      },
    });
  }

  render() {
    return <div>my component</div>;
  }
}
