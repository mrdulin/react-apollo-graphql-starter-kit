import React, { Component } from 'react';

class SomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { sticky: false };
  }

  handleWindowScroll() {
    const header = document.querySelector('.productNavLinksContainer');
    const dataHeader = document.querySelector('.productNavDataContainer');
    if (header && dataHeader) {
      const headerPos = header.getBoundingClientRect();
      const dataHeaderPos = dataHeader.getBoundingClientRect();
      const sticky = header.offsetTop;
      if (dataHeaderPos.top > headerPos.height) {
        this.setState({ sticky: false });
      } else if (window.pageYOffset > sticky) {
        this.setState({ sticky: true });
      }
    } else {
      return;
    }
  }
  render() {
    return null;
  }
}

export default SomeComponent;
