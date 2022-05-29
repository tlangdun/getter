import { FC } from 'react';

interface Props {
  label: string;
  id: string;
  name: string;
  autocomplete?: string;
  type: string;
  handleChange: React.ChangeEventHandler<any>;
  handleBlur: React.ChangeEventHandler<any>;
  value: string;
  touched?: boolean;
  errors?: string;
}

const FormInput: FC<Props> = (props) => {
  return (
    <>
      <label
        htmlFor='email'
        className='block text-sm font-medium text-gray-700'>
        {props.label}
      </label>
      <div className='mt-1'>
        <input
          data-testid={props.id}
          value={props.value}
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          id={props.id}
          name={props.name}
          type={props.type}
          autoComplete={props?.autocomplete}
          className={
            (props.errors && props.touched
              ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 placeholder-gray-400 focus:ring-violet-500 focus:border-violet-500') +
            ' appearance-none block w-full px-3 py-2 border rounded-md shadow-sm  focus:outline-none sm:text-sm '
          }
        />
      </div>
    </>
  );
};

export default FormInput;
