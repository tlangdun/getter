import { FirebaseError } from 'firebase/app';
import { FormikErrors, FormikTouched } from 'formik';
import { FC } from 'react';

interface Props {
  errors: FormikErrors<any>;
  touched: FormikTouched<any>;
  firebaseError?: FirebaseError;
}

const ErrorCard: FC<Props> = ({ errors, touched, firebaseError }) => {
  let render: any = firebaseError;

  for (const prop in errors) {
    render = render || (errors[prop] && touched[prop]);
  }

  let errorList = [];

  for (const prop in errors) {
    if (errors[prop] && touched[prop]) {
      errorList.push(<li key={prop}>{errors[prop]}</li>);
    }
  }

  if (firebaseError) {
    errorList.push(<li key={firebaseError.code}>{firebaseError.message}</li>);
  }

  return (
    <>
      {render && (
        <>
          <div className='my-4 sm:mx-auto sm:w-full sm:max-w-md'>
            <div className='bg-red-300 py-1 px-8 rounded-lg sm:px-8'>
              <ul className='text-sm text-red-600 list-disc'>{errorList}</ul>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ErrorCard;
