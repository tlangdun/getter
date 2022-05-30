import { useNavigate } from 'react-router-dom';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { StepsProvider } from 'react-step-builder';
import SignupCard from '../../components/auth/signup/cards/SignupCard';
import SignupEmployee from './SignupPageEmployee';
import SignupRecruiter from './SignupPageRecruiter';
import FooterSection from '../../components/landingpage/FooterSection';
import LogoAndTitle from '../../components/misc/LogoAndTitle';

const SignupPage: FC = () => {
  const navigate = useNavigate();

  const handleClickRec = () => {
    navigate('/auth/signup-rec');
  };
  const handleClickTal = () => {
    navigate('/auth/signup-tal');
  };

  return (
    <>
      <div className=' max-w-6xl mx-auto space-y-6'>
        <div data-testid='signup'></div>

        <LogoAndTitle title='Sign up for your account'>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Or{' '}
            <Link
              to={'/auth/login'}
              className='font-medium text-indigo-600 hover:text-indigo-500'>
              sign in to an existing account
            </Link>
          </p>
        </LogoAndTitle>

        <SignupCard
          title='Sign Up'
          description='Sign up as recruiter or talent.'>
          <div className='mt-5 md:mt-0 md:col-span-2'>
            <div className='grid grid-cols-6 gap-6'>
              <div
                className='relative col-span-3 inset-0 rounded-md overflow-hidden group'
                onClick={handleClickRec}>
                <div className='absolute inset-0'>
                  <img
                    className=' w-full h-full object-cover'
                    src='https://firebasestorage.googleapis.com/v0/b/getter-38760.appspot.com/o/getter%2Frecruiter.jpg?alt=media&token=f8f95be0-2fa5-429e-8806-6c400b74b8e5'
                  />
                  <div className='absolute inset-0 bg-slate-300 group-hover:bg-slate-100 mix-blend-multiply'></div>
                </div>

                <div className='relative pt-[55%] pb-[40%] '>
                  <h1 className='text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl'>
                    <span className='block text-white'>Recruiter</span>
                  </h1>
                </div>
              </div>

              <div
                className='relative col-span-3 inset-0 rounded-md overflow-hidden group'
                onClick={handleClickTal}>
                <div className='absolute inset-0'>
                  <img
                    className=' w-full h-full object-cover'
                    src='https://firebasestorage.googleapis.com/v0/b/getter-38760.appspot.com/o/getter%2Ftalent.jpg?alt=media&token=802c0b72-4705-4e9d-ae28-913e8032e736'
                  />
                  <div className='absolute inset-0 bg-slate-300 group-hover:bg-slate-100 mix-blend-multiply'></div>
                </div>

                <div className='relative pt-[55%] pb-[40%] '>
                  <h1 className='text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl'>
                    <span className='block text-white'>Talent</span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </SignupCard>
      </div>
    </>
  );
};

export default SignupPage;
