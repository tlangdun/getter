import { FC } from 'react';
import { XIcon } from '@heroicons/react/outline';

interface Props {
  index: number;
  remove(): any;
  setCurrent(): any;
  unSetCurrent(): any;
  current: number | null;
}

const ProfExpirienceForm: FC<Props> = (props) => {
  return (
    <div className='group grid grid-cols-6 gap-6 relative'>
      {!!props.index && (
        <div className='hidden hover:inline group-hover:inline group-focus:inline absolute top-[-0.5rem] right-0'>
          <button
            type='button'
            onClick={props.remove}
            className=' items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500'>
            <XIcon className='h-4 w-4' aria-hidden='true' />
          </button>
        </div>
      )}

      <div className='col-span-6 md:col-span-3'>
        <label
          htmlFor='employment-level'
          className='block text-sm font-medium text-gray-700'>
          Level
        </label>
        <select
          id='employment-level'
          name='employment-level'
          className='appearance-none mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm'>
          <option>Student</option>
          <option>Intern</option>
          <option>Junior Engineer</option>
          <option>Engineer</option>
          <option>Senior Engineer</option>
          <option>Principal</option>
          <option>Manager</option>
          <option>Director</option>
        </select>
      </div>

      <div className='col-span-6 md:col-span-3'>
        <label
          htmlFor='job-title'
          className='block text-sm font-medium text-gray-700'>
          Job title
        </label>
        <input
          type='text'
          name='job-title'
          id='job-title'
          className='mt-1 focus:ring-violet-500 focus:border-violet-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
        />
      </div>

      <div className='col-span-6 md:col-span-3'>
        <label
          htmlFor='employer'
          className='block text-sm font-medium text-gray-700'>
          Employer
        </label>
        <input
          type='text'
          name='employer'
          id='employer'
          className='mt-1 focus:ring-violet-500 focus:border-violet-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
        />
      </div>

      <div className='col-span-6 md:col-span-3'>
        <label
          htmlFor='country'
          className='block text-sm font-medium text-gray-700'>
          Current
        </label>

        <div className=' mt-1 h-[38px] w-full flex items-center'>
          {(props.current == props.index) ? (
            <input
              id='current'
              name='current'
              type='checkbox'
              className='focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300 rounded'
              onClick={props.unSetCurrent}
              checked
            />
          ) : (
            <input
              id='current'
              name='current'
              type='checkbox'
              className='focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300 rounded'
              onClick={props.setCurrent}
            />
          )}

          <p className=' ml-2 text-gray-500 text-sm'>
            set as your current Employer
          </p>
        </div>
      </div>

      <div className='col-span-3 md:col-span-3'>
        <label
          htmlFor='start-date'
          className='block text-sm font-medium text-gray-700'>
          Start date
        </label>
        <input
          type='text'
          name='start-date'
          id='start-date'
          className='mt-1 focus:ring-violet-500 focus:border-violet-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
        />
      </div>

      <div className='col-span-3 md:col-span-3'>
        <label
          htmlFor='start-date'
          className='block text-sm font-medium text-gray-700'>
          End date
        </label>
        <input
          type='text'
          name='end-date'
          id='end-date'
          className='mt-1 focus:ring-violet-500 focus:border-violet-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
        />
      </div>
    </div>
  );
};

export default ProfExpirienceForm;
