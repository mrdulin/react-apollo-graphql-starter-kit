import React, { Component } from 'react';

export default class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data1: { value: 'a' },
      data2: { userId: 1, list: [] },
      employees: [],
    };
  }
  handleChange = async (select) => {
    const { data1, data2 } = this.state;
    if (data1.value === 'a') {
      this.setState({
        data2: {
          ...data2,
          userId: select.value,
        },
      });
    }
    if (data1.value === 'b') {
      this.setState({
        data2: {
          ...data2,
          list: select,
        },
        employees: select,
      });
    }
  };

  render() {
    return <div>my component</div>;
  }
}
