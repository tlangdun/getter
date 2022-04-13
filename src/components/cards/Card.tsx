import { FC } from 'react';

const Card: FC = (props) => {
  return (
    <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-fit'>
      <div className='bg-white py-8 px-4 shadow rounded-lg sm:px-10'>
        {props.children}
      </div>
    </div>
  );
};

export default Card;
