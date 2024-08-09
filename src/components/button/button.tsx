import useTheme from '../../context/useTheme';
import { IButtonProps } from './IButton';

import styles from './button.module.scss';

export const Button: React.FC<IButtonProps> = ({ type, text, disabled, onClick }) => {
  const { theme } = useTheme();

  return (
    <button
      className={`${styles.button} ${theme === 'light' ? styles.button_light : styles.button_dark}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
