import { FC } from 'react';

interface Props {
  title: string;
}
const LogoAndTitle: FC<Props> = (props) => {

  return (
    <div className='min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <img
          className='mx-auto h-12 w-auto'
          src='https://firebasestorage.googleapis.com/v0/b/getter-38760.appspot.com/o/getter%2FLogo%20Transparency2.png?alt=media&token=76aea186-61e4-4e07-bb17-56ca3a705516'
          alt='Workflow'
        />
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
          {props.title}
        </h2>
        {props.children}
      </div>
    </div>
  );
};

export default LogoAndTitle;
