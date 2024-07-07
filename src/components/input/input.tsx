import { Component } from 'react';
import { IInputProps } from './IInput';

export class Input extends Component<IInputProps> {
  render() {
    const { type, value, onChange } = this.props;

    return <input type={type} value={value} onChange={onChange} />;
  }
}
