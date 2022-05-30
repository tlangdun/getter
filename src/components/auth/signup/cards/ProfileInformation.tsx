import { useFormik } from 'formik';
import { forwardRef, useEffect, useRef, useState } from 'react';
import SignupCard from './SignupCard';
import * as Yup from 'yup';
import ErrorCard from '../../ErrorCard';
import { FirebaseError } from 'firebase/app';
import { DEFAULT_PROFILE_PIC } from '../../../../store/models/firebaseUserModel';

export type ProfileInfoSubmitPara = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  about: string;
  profilepicture: File | null;
};

interface Props {
  onSubmitHandler(params: ProfileInfoSubmitPara | undefined): any;
  setValid(isValid: boolean): any;
  firebaseError?: FirebaseError;
}

const ProfileInformation = forwardRef<HTMLButtonElement | null, Props>(
  ({ onSubmitHandler, setValid, firebaseError }, ref) => {
    const [image, setImage] = useState(DEFAULT_PROFILE_PIC);

    const fileInput = useRef<HTMLInputElement | null>(null);
    const selectFile = () => {
      if (fileInput != null) {
        fileInput.current?.click();
      }
    };

    const imageChangeHandler = (event: any) => {
      if (event.target.files && event.target.files[0]) {
        setImage(URL.createObjectURL(event.target.files[0]));
      }
    };

    const {
      handleSubmit,
      handleChange,
      handleBlur,
      setFieldValue,
      values,
      touched,
      errors,
      isValid,
    } = useFormik({
      initialValues: {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        about: '',
        profilepicture: null,
      },
      validationSchema: Yup.object({
        firstname: Yup.string().max(30).required('first name is required'),
        lastname: Yup.string().max(30).required('last name is required'),
        email: Yup.string().email().required('email is required'),
        password: Yup.string().min(8).max(32).required('Password is required'),
        about: Yup.string().max(256).optional(),
      }),
      onSubmit: onSubmitHandler,
    });

    useEffect(() => {
      setValid(isValid);
    }, [isValid]);

    return (
      <SignupCard
        title='Profile'
        description='Some information such as name, and picture will be displayed publicly on your profile.'>
        <form
          className='mt-5 md:mt-0 md:col-span-2'
          id='profileInfoForm'
          onSubmit={handleSubmit}>
          <div className='grid grid-cols-6 gap-6'>
            <div className='col-span-6'>
              <ErrorCard
                errors={errors}
                touched={touched}
                firebaseError={firebaseError}
              />
            </div>

            <div className='col-span-6 sm:col-span-3'>
              <label
                htmlFor='first-name'
                className='block text-sm font-medium text-gray-700'>
                First name
              </label>
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstname}
                type='text'
                name='firstname'
                id='firstname'
                autoComplete='given-name'
                className={
                  (errors.firstname && touched.firstname
                    ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'focus:ring-violet-500 focus:border-violet-500 border-gray-300') +
                  'mt-1 block w-full shadow-sm sm:text-sm rounded-md'
                }
              />
            </div>

            <div className='col-span-6 sm:col-span-3'>
              <label
                htmlFor='last-name'
                className='block text-sm font-medium text-gray-700'>
                Last name
              </label>
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastname}
                type='text'
                name='lastname'
                id='lastname'
                autoComplete='family-name'
                className={
                  (errors.lastname && touched.lastname
                    ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'focus:ring-violet-500 focus:border-violet-500 border-gray-300') +
                  'mt-1 block w-full shadow-sm sm:text-sm rounded-md'
                }
              />
            </div>

            <div className='col-span-6'>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'>
                Email address
              </label>
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                type='email'
                name='email'
                id='email'
                autoComplete='email'
                className={
                  (errors.email && touched.email
                    ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'focus:ring-violet-500 focus:border-violet-500 border-gray-300') +
                  'mt-1 block w-full shadow-sm sm:text-sm rounded-md'
                }
              />
            </div>

            <div className='col-span-6'>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700'>
                Password
              </label>
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                type='password'
                name='password'
                id='password'
                autoComplete='password'
                className={
                  (errors.password && touched.password
                    ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'focus:ring-violet-500 focus:border-violet-500 border-gray-300') +
                  'mt-1 block w-full shadow-sm sm:text-sm rounded-md'
                }
              />
            </div>

            <div className='col-span-6'>
              <label className='block text-sm font-medium text-gray-700'>
                Profile photo
              </label>
              <div className='mt-1 flex items-center space-x-5'>
                <span className='inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100'>
                  <img src={image} className='h-full w-full' />
                </span>
                <button
                  type='button'
                  onClick={selectFile}
                  className='bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500'>
                  Change
                </button>
                <input
                  type='file'
                  name='profilepicture'
                  id='profilepicture'
                  className='hidden'
                  onChange={(e) => {
                    if (e.currentTarget.files) {
                      setFieldValue('profilepicture', e.currentTarget.files[0]);
                    }
                    imageChangeHandler(e);
                  }}
                  ref={fileInput}
                />
              </div>
            </div>

            <div className='col-span-6'>
              <label
                htmlFor='about'
                className='block text-sm font-medium text-gray-700'>
                About
              </label>
              <div className='mt-1'>
                <textarea
                  id='about'
                  name='about'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={3}
                  className={
                    (errors.about && touched.about
                      ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'focus:ring-violet-500 focus:border-violet-500 border-gray-300') +
                    'mt-1 block w-full shadow-sm sm:text-sm rounded-md'
                  }
                  placeholder='Brief description for your profile'
                  defaultValue={''}
                />
              </div>
            </div>

            <button
              type='submit'
              name='submit'
              className='hidden'
              ref={ref}></button>
          </div>
        </form>
      </SignupCard>
    );
  }
);

export default ProfileInformation;
