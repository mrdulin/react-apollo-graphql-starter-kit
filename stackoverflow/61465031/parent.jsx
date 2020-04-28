import React from 'react';
import { ChildComponent } from './child';
import axios from 'axios';

export class ParentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockData: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8080/stocks').then((response) => {
      this.setState({ stockData: response.data });
    });
  }

  render() {
    return <ChildComponent stockData={this.state.stockData} />;
  }
}
