import React, { Component } from 'react';

export class MyComponent extends Component {
  public render() {
    return <div>{this.someMethod()}</div>;
  }
  private someMethod(content = 'my component') {
    return content;
  }
}
