import React, { Component } from 'react';

class CodeVerification extends Component {
  constructor(props) {
    super(props);
    this.handlePaste = this.handlePaste.bind(this);
  }
  handlePaste(event: React.ClipboardEvent<HTMLInputElement>) {
    const pasteDatas = event.clipboardData || (window as any).clipboardData;
    const text = pasteDatas.getData('text');
    console.log(text);
  }
  render() {
    return (
      <div>
        <input type="text" onPaste={this.handlePaste} />
      </div>
    );
  }
}

export default CodeVerification;
