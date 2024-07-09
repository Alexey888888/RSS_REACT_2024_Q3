import { IButtonProps } from './IButton';

import './button.scss';

export const Button: React.FC<IButtonProps> = ({ type, text, onClick }) => {
  return (
    <button className="button" type={type} onClick={onClick}>
      {text}
    </button>
  );
};
