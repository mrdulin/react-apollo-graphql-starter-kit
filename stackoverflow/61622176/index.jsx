import React, { Component } from 'react';

export default class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myObject: {
        name: null,
        percentage: null,
      },
    };
  }
  render() {
    const nullValue = <span>-</span>;

    const value = (propValue) => {
      if (propValue === null) {
        return nullValue;
      } else {
        return <span>{propValue}</span>;
      }
    };

    const percentageValue = (percentagePropValue) => {
      if (percentagePropValue === null) {
        return nullValue;
      } else {
        return <span>{percentagePropValue * 100}%</span>;
      }
    };

    return (
      <div>
        <h1>Object Name: {value(this.state.myObject.name)}</h1>
        <h2>Object Percentage: {percentageValue(this.state.myObject.percentage)}</h2>
      </div>
    );
  }
}
