import { useFormik } from 'formik';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import SignupCard from './SignupCard';
import * as Yup from 'yup';
import { FirebaseError } from 'firebase/app';
import getAllCountries from '../../../../helpers/auth/getAllCountries';
import getCantons from '../../../../helpers/auth/getCantons';
import ErrorCard from '../../ErrorCard';

export type LocationInformationSubmitPara = {
  country: string;
  canton: string;
  city: string;
  zip: string;
};

interface Props {
  onSubmitHandler(params: LocationInformationSubmitPara | undefined): any;
  setValid(isValid: boolean): any;
}

const countriesMap: Map<string, string[]> = new Map();

const LocationInformation = forwardRef<HTMLButtonElement | null, Props>(
  ({ onSubmitHandler, setValid }, ref) => {
    const [firebaseError, setFirebaseError] = useState<FirebaseError>();

    const [countries, setCountries] = useState<string[]>();
    const [cantons, setCantons] = useState<string[]>();

    useMemo(() => {
      getAllCountries()
        .then((c) => {
          setCountries(c);
          c?.forEach((count) => {
            getCantons(count).then((regs) => {
              if (regs != undefined) {
                countriesMap.set(count, regs);
              }
            });
          });
          if (c != undefined) {
            getCantons(c[0]).then((r) => {
              setCantons(r);
            });
          }
        })
        .catch((e) => {
          setFirebaseError(e);
        });
    }, []);

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
        country: 'Switzerland',
        canton: 'Basel',
        city: '',
        zip: '',
      },
      validationSchema: Yup.object({}),
      onSubmit: onSubmitHandler,
    });

    useEffect(() => {
      setValid(isValid);
    }, [isValid]);

    return (
      <SignupCard
        title='Location'
        description='This information will be accessible to recruiters.'>
        <form className='mt-5 md:mt-0 md:col-span-2' onSubmit={handleSubmit}>
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
                htmlFor='country'
                className='block text-sm font-medium text-gray-700'>
                Country
              </label>
              <select
                onChange={(e) => {
                  handleChange(e);
                  setCantons(countriesMap.get(e.target.value));
                }}
                onBlur={handleBlur}
                value={values.country}
                id='country'
                name='country'
                autoComplete='country-name'
                className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm'>
                {countries?.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className='col-span-6 sm:col-span-3'>
              <label
                htmlFor='region'
                className='block text-sm font-medium text-gray-700'>
                State / Province
              </label>
              <select
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.canton}
                name='canton'
                id='canton'
                autoComplete='address-level1'
                className='mt-1 focus:ring-purple-500 focus:border-purple-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'>
                {cantons?.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className='col-span-6 sm:col-span-3'>
              <label
                htmlFor='city'
                className='block text-sm font-medium text-gray-700'>
                City
              </label>
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.city}
                type='text'
                name='city'
                id='city'
                autoComplete='address-level2'
                className='mt-1 focus:ring-violet-500 focus:border-violet-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
              />
            </div>

            <div className='col-span-6 sm:col-span-3'>
              <label
                htmlFor='postal-code'
                className='block text-sm font-medium text-gray-700'>
                ZIP / Postal code
              </label>
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.zip}
                type='text'
                name='zip'
                id='zip'
                autoComplete='zip'
                className='mt-1 focus:ring-violet-500 focus:border-violet-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
              />
            </div>
            <button
              className='hidden'
              type='submit'
              name='submit'
              ref={ref}></button>
          </div>
        </form>
      </SignupCard>
    );
  }
);

export default LocationInformation;
