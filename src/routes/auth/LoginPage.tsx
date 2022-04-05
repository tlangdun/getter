import { FC } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/auth/login/Loginform';
import LogoAndTitle from '../../components/misc/LogoAndTitle';

const LoginPage: FC = () => {
  return (
    <>
      <LogoAndTitle title='Sign in to your account'>
        <p className='mt-2 text-center text-sm text-gray-600'>
          Or{' '}
          <Link
            to={'/auth/sign-up'}
            className='font-medium text-indigo-600 hover:text-indigo-500'>
            sign up for an account
          </Link>
        </p>
      </LogoAndTitle>

      <LoginForm />
    </>
  );
};

export default LoginPage;
