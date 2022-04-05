import { FirebaseError } from 'firebase/app';
import { loginGoogle } from '../../../helpers/auth/authFunctions';
import Card from '../../cards/Card';
import EmailPasswordForm from './EmailPasswordForm';

const LoginForm = () => {
  const handleSigninWithGoogle = () => {
    loginGoogle().catch((e: FirebaseError) => {
      alert(e.message);
    });
  };

  return (
    <>
      <Card>
        <div className='sm:w-96'>
        <EmailPasswordForm />

        <div className='mt-6'>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-300' />
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-2 bg-white text-gray-500'>
                Or continue with
              </span>
            </div>
          </div>

          <div className='mt-6'>
            <button
              onClick={handleSigninWithGoogle}
              className='w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'>
              <span className='sr-only'>Sign in with Google</span>
              <svg
                className='w-5 h-5'
                aria-hidden='true'
                fill='currentColor'
                viewBox='0 0 20 20'>
                <path
                  fillRule='evenodd'
                  d='M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </div>
        </div>
        </div>
      </Card>
    </>
  );
};

export default LoginForm;
