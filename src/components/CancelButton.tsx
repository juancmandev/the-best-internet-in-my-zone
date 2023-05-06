import ButtonProps from '@/interfaces/button.model';

const CancelButton = ({ children, onClick, buttonType }: ButtonProps) => (
  <button
    className='rounded-[4px] p-[8px] border border-blue-500 text-blue-500'
    onClick={onClick}
    type={buttonType}>
    {children}
  </button>
);

export default CancelButton;
