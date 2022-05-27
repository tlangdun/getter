import { useFormik } from 'formik';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import getAllJobRoles from '../../../../helpers/auth/getAllJobRoles';
import * as Yup from 'yup';
import SignupCard from './SignupCard';
import ErrorCard from '../../ErrorCard';
import { FirebaseError } from 'firebase/app';

export type AccountSettingsSubmitPara = {
  availablaForHire: boolean;
  availability: string;
  jobRole: string;
  salaryMin: string;
  salaryMax: string;
};

interface Props {
  onSubmitHandler(params: AccountSettingsSubmitPara | undefined): any;
  setValid(isValid: boolean): any;
}

const AccountSettings = forwardRef<HTMLButtonElement | null, Props>(
  ({ onSubmitHandler, setValid }, ref) => {
    const [jobRoles, setJobRoles] = useState<string[]>();

    const [firebaseError, setFirebaseError] = useState<FirebaseError>();

    useMemo(() => {
      getAllJobRoles()
        .then((j) => setJobRoles(j))
        .catch((e) => {
          setFirebaseError(e);
        });
    }, [jobRoles]);

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
        availablaForHire: false,
        availability: '0 - 20',
        jobRole: jobRoles != undefined ? jobRoles[0] : 'Intern',
        salaryMin: '',
        salaryMax: '',
      },
      validationSchema: Yup.object({
        salaryMin: Yup.number().min(0),
        salaryMax: Yup.number().min(0),
      }),
      onSubmit: onSubmitHandler,
    });

    useEffect(() => {
      setValid(isValid);
    }, [isValid]);

    return (
      <SignupCard
        title='Account Settings'
        description='Add information visible to recruiters. salary is yearly.'>
        <form className='mt-5 md:mt-0 md:col-span-2' onSubmit={handleSubmit}>
          <div className='grid grid-cols-6 gap-6'>
            <div className='col-span-6'>
              <ErrorCard
                errors={errors}
                touched={touched}
                firebaseError={firebaseError}
              />
            </div>

            <div className='col-span-6'>
              <div className='flex items-start'>
                <div className='h-5 flex items-center'>
                  <input
                    onChange={handleChange}
                    value={'availableForHire'}
                    onBlur={handleBlur}
                    id='availablaForHire'
                    name='availablaForHire'
                    type='checkbox'
                    className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
                  />
                </div>
                <div className='ml-3 text-sm'>
                  <label className='font-medium text-gray-700'>
                    Available for hire
                  </label>
                  <p className='text-gray-500'>
                    recruiters can see that you're available for hire
                  </p>
                </div>
              </div>
            </div>

            <div className='col-span-6 sm:col-span-3'>
              <label className='block text-sm font-medium text-gray-700'>
                Availability %
              </label>
              <select
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.availability}
                id='availability'
                name='availability'
                className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm'>
                <option>0 - 20</option>
                <option>20 - 40</option>
                <option>40 - 60</option>
                <option>60 - 80</option>
                <option>80 - 100</option>
              </select>
            </div>

            <div className='col-span-6 sm:col-span-3'>
              <label className='block text-sm font-medium text-gray-700'>
                Job Role
              </label>
              <select
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.jobRole}
                id='jobRole'
                name='jobRole'
                className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm'>
                {jobRoles?.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </div>

            <div className='col-span-6'>
              <div className='grid grid-cols-6 gap-6'>
                <div className='col-span-6 sm:col-span-3'>
                  <label className='block text-sm font-medium text-gray-700'>
                    Salary Range min
                  </label>
                  <input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.salaryMin}
                    type='text'
                    name='salaryMin'
                    id='salaryMin'
                    autoComplete='address-level2'
                    className={
                      (errors.salaryMin && touched.salaryMin
                        ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                        : 'focus:ring-violet-500 focus:border-violet-500 border-gray-300') +
                      'mt-1 block w-full shadow-sm sm:text-sm rounded-md'
                    }
                  />
                </div>

                <div className='col-span-6 sm:col-span-3'>
                  <label className='block text-sm font-medium text-gray-700'>
                    Salary Range max
                  </label>
                  <input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.salaryMax}
                    type='text'
                    name='salaryMax'
                    id='salaryMax'
                    autoComplete='address-level2'
                    className={
                      (errors.salaryMax && touched.salaryMax
                        ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                        : 'focus:ring-violet-500 focus:border-violet-500 border-gray-300') +
                      'mt-1 block w-full shadow-sm sm:text-sm rounded-md'
                    }
                  />
                </div>
              </div>
            </div>
                <button
                  className='hidden'
                  type='submit'
                  name='submit'
                  id='submit'
                  ref={ref}></button>
          </div>
        </form>
      </SignupCard>
    );
  }
);

export default AccountSettings;
