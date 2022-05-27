import { FC } from 'react';

interface Props {
  label?: string;
}

const Divider: FC<Props> = (props) => {
  return (
    <div className='relative'>
      <div className='absolute inset-0 flex items-center' aria-hidden='true'>
        <div className='w-full border-t border-gray-300' />
      </div>
      {props.label && (
        <div className='relative flex justify-center'>
          <span className='px-2 bg-white text-sm text-gray-500'>
            {props.label}
          </span>
        </div>
      )}
    </div>
  );
};

export default Divider;
