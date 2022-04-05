import { FirebaseError } from 'firebase/app';
import { loginGoogle } from '../../../helpers/auth/authFunctions';
import Card from '../../cards/Card';
import EmailPasswordForm from './EmailPasswordForm';
import { ReactComponent as GoogleIcon } from '../../../assets/GoogleLogo.svg'

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
              

<GoogleIcon />


              </button>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default LoginForm;
