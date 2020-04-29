import React from 'react';
import { withRouter } from 'react-router-dom';
import Menubar from './menubar';

class MenubarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          label: 'Home',
          icon: 'pi pi-home',
          command: () => this.props.history.push('/'),
        },
        {
          label: 'About',
          icon: 'pi pi-info',
          command: () => this.props.history.push('/about'),
        },
      ],
    };
  }

  render() {
    return <Menubar model={this.state.items} />;
  }
}

export default withRouter(MenubarComponent);
