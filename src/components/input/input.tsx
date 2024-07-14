import { IInputProps } from './IInput';

export const Input: React.FC<IInputProps> = ({ type, value, onChange }) => {
  return <input type={type} value={value} onChange={onChange} />;
};
