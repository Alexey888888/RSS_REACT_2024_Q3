import { Component } from 'react';
import { IInputProps } from './IInput';

export class Input extends Component<IInputProps> {
  render() {
    const { type, value, placeholder, onChange } = this.props;

    return <input type={type} value={value} placeholder={placeholder} onChange={onChange} />;
  }
}
