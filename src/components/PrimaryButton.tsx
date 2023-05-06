import ButtonProps from '@/interfaces/button.model';

const PrimaryButton = ({ children, onClick, buttonType }: ButtonProps) => (
  <button
    className='bg-blue-500 transition-colors text-white rounded-[4px] p-[8px] hover:bg-blue-400 w-max'
    onClick={onClick}
    type={buttonType}>
    {children}
  </button>
);

export default PrimaryButton;
