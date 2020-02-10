import React, { Component } from 'react';

export class Form extends Component {
  constructor() {
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
  }
  onHandleSubmit() {
    console.log('this is from the component');
  }

  render() {
    return (
      <div>
        <button data-test="submit" onClick={this.onHandleSubmit}>
          Submit
        </button>
      </div>
    );
  }
}

export default Form;
