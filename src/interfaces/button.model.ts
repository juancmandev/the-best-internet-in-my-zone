export default interface ButtonProps {
  children: string;
  onClick?: () => void;
  buttonType: 'button' | 'submit' | 'reset';
}
