import { FirebaseError } from 'firebase/app';
import {
  browserSessionPersistence,
  inMemoryPersistence,
  setPersistence,
} from 'firebase/auth';
import { useFormik } from 'formik';
import { FC, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { loginEmailPassword } from '../../../helpers/auth/authFunctions';
import updateReduxUser from '../../../helpers/auth/updateReduxUser';
import { auth } from '../../../services/firebaseconfig';
import ErrorCard from '../ErrorCard';
import FormInput from './FormInput';

const EmailPasswordForm: FC = () => {
  const rememberMe = useRef<HTMLInputElement>(null);

  const [firebaseError, setFirebaseError] = useState<FirebaseError>();

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    isValid,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: ({ email, password }) => {
      setFirebaseError(undefined);
      if (rememberMe.current?.checked) {
        setPersistence(auth, inMemoryPersistence);
      } else {
        setPersistence(auth, browserSessionPersistence);
      }
      loginEmailPassword(email, password).then(usrCred => {
        updateReduxUser(usrCred.user.uid);
      }).catch((e) => {
        setFirebaseError(e);
      });
    },
  });

  return (
    <>
      <ErrorCard
        errors={errors}
        touched={touched}
        firebaseError={firebaseError}
      />

      <form className='space-y-6' onSubmit={handleSubmit}>
        <FormInput
          label='Email address'
          id='email'
          name='email'
          type='email'
          handleChange={handleChange}
          handleBlur={handleBlur}
          value={values.email}
          touched={touched.email}
          errors={errors.email}
        />

        <FormInput
          label='password'
          id='password'
          name='password'
          type='password'
          handleChange={handleChange}
          handleBlur={handleBlur}
          value={values.password}
          touched={touched.password}
          errors={errors.password}
        />

        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <input
              ref={rememberMe}
              id='remember-me'
              name='remember-me'
              type='checkbox'
              className='h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded'
            />
            <label
              htmlFor='remember-me'
              className='ml-2 block text-sm text-gray-900'>
              Remember me
            </label>
          </div>

          <div className='text-sm'>
            <Link
              to='auth/forgot-password'
              className='font-medium text-violet-600 hover:text-violet-500'>
              Forgot your password?
            </Link>
          </div>
        </div>

        <div>
          <button
            disabled={!isValid}
            type='submit'
            id='submit'
            name='submit'
            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500'>
            Sign in
          </button>
        </div>
      </form>
    </>
  );
};

export default EmailPasswordForm;
