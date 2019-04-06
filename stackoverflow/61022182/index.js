import { Component } from 'react';

class YourComponent extends Component {
  static getHelloWorld() {
    return 'hello world';
  }

  render() {
    return <div>{YourComponent.getHelloWorld()}</div>;
  }
}

export default YourComponent;
