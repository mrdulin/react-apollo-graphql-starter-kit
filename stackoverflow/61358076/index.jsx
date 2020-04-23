import React, { Component } from 'react';
import firebase from 'firebase';

export default class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      field: { email: 'fuck@qq.com' },
    };
  }
  clearFields(statusMsg) {
    console.log(statusMsg);
  }
  saveToFirebase = () => {
    let statusMsg = '';

    return firebase
      .firestore()
      .collection('messages')
      .doc(this.state.field.email)
      .set(this.state.field)
      .then(() => {
        statusMsg = 'Your Message have been submitted successfully.';
        this.clearFields(statusMsg);
      });
  };
  render() {
    return <div>my component</div>;
  }
}
