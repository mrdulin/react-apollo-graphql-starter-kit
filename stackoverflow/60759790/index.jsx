import React from 'react';
const Button = (props) => <button></button>;
export class Popup extends React.Component {
  render() {
    return (
      <div className="popupOuter">
        <div className="popupInner text-center">
          <br />
          <h3>{this.props.config.text}</h3>
          <br />
          <div>
            <Button type="NoButton" value={'No'} onClick={this.props.config.back} />
            <Button type="YesButton" value={'Yes'} onClick={this.props.config.next} />
          </div>
        </div>
      </div>
    );
  }
}
