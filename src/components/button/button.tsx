import { Component } from 'react';
import { IButtonProps } from './IButton';

import './button.scss';

export class Button extends Component<IButtonProps> {
  render() {
    return (
      <button className="button" type={this.props.type} onClick={this.props.onClick}>
        {this.props.text}
      </button>
    );
  }
}
