export interface IButtonProps {
  type: 'button' | 'submit';
  text: string;
  disabled?: boolean;
  onClick?: () => void;
}
