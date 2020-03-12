import React, { Component } from 'react';

class ContactBox extends Component {
  emailCaptureRef;
  constructor(props) {
    super(props);
    this.state = { email_box_used: false };
  }

  addEmail(event) {
    event.stopPropagation();
    event.preventDefault();
    const email = this.emailCaptureRef.current.value;
    const domain = 'https://somedomain.com/';

    fetch(domain + 'newsletter/sign_up', {
      method: 'POST',
      body: JSON.stringify({ _method: 'POST', email }),
    }).then((response) => {
      return response.json().then((result) => {
        this.setState({ email_box_used: true });
      });
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.addEmail}></form>
      </div>
    );
  }
}

export default ContactBox;
