import { useTheme } from '../../context/useTheme';
import { IButtonProps } from './IButton';

import './button.scss';

export const Button: React.FC<IButtonProps> = ({ type, text, disabled, onClick }) => {
  const { theme } = useTheme();

  return (
    <button
      className={`button ${theme === 'light' ? 'button_light' : 'button_dark'}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
