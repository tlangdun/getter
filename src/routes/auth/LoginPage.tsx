import { FC } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/auth/login/Loginform';
import LogoAndTitle from '../../components/misc/LogoAndTitle';

const LoginPage: FC = () => {
  return (
    <>
      <div data-testid='login'></div>
      <LogoAndTitle title='Sign in to your account'>
        <p className='mt-2 text-center text-sm text-gray-600'>
          Or{' '}
          <Link
            to={'/auth/signup'}
            className='font-medium text-purple-600 hover:text-purple-500'>
            sign up for an account
          </Link>
        </p>
      </LogoAndTitle>
      <div data-testid='LoginPage'></div>
      <LoginForm />
    </>
  );
};

export default LoginPage;
