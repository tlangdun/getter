import { FC } from 'react';

interface Props {
  title: string;
  description: string;
}

const SignupCard: FC<Props> = ({ title, description, children }) => {
  return (

    <div className='bg-white shadow mt-8 px-4 py-5 rounded-lg sm:p-6'>
      <div className='md:grid md:grid-cols-3 md:gap-6'>
        <div className='md:col-span-1'>
          <h3 className='text-lg font-medium leading-6 text-gray-900'>
            {title}
          </h3>
          <p className='mt-1 text-sm text-gray-500'>{description}</p>
        </div>
        <div className='mt-5 md:mt-0 md:col-span-2'>
        {children}
        </div>
      </div>
    </div>
  );
};

export default SignupCard;
