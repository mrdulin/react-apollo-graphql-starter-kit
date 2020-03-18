import { Component } from 'react';

export interface IMyComponentProps {
  flag?: boolean;
}

export class MyComponent extends Component<IMyComponentProps> {
  private myProperty!: HTMLElement;

  public componentDidMount() {
    this.init();
  }
  public render() {
    return null;
  }

  private init() {
    if (this.props.flag) {
      this.myProperty.addEventListener('event', () => null, false);
    }
  }
}
