import { FC, useState } from 'react';
import { SelectorIcon } from '@heroicons/react/solid';
import { Combobox } from '@headlessui/react';
import Divider from '../../../misc/Divider';
import SignupCard from './SignupCard';
import { XIcon } from '@heroicons/react/outline';


interface Props {
  title: string;
  description: string;
  label: string;
  options: string[];
  setOptions(arr: string[]): any
  choice: any;
  setChoice(arr: any[]): any;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const removeFromArr = (o: any, array: any[]) => {
  const arr = [...array];
  const index = arr.indexOf(o, 0);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
};

const ComboBoxCard: FC<Props> = ({ title, description, label, options, setOptions, choice, setChoice }) => {
  const [query, setQuery] = useState('');

  const filteredOptions =
    query === ''
      ? options
      : options.filter((o) => {
          return o.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <>
      <SignupCard title={title} description={description}>
        <div className='mt-5 md:mt-0 md:col-span-2'>
          <div className='grid grid-cols-6 gap-6'>
            <div className='col-span-6'>
              <label
                htmlFor='last-name'
                className='block text-sm font-medium text-gray-700'>
                {label}
              </label>
              <Combobox
                as='div'
                value={choice}
                onChange={(val) => {
                  if (val != undefined) {
                    setChoice([...choice, val]);
                    setOptions(removeFromArr(val, options));
                  }
                }}>
                <div className='relative mt-1'>
                  <Combobox.Input
                    className='w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 sm:text-sm'
                    onChange={(event) => {
                      const val = event.target.value;
                      setQuery(val);
                    }}
                  />
                  <Combobox.Button className='absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none'>
                    <SelectorIcon
                      className='h-5 w-5 text-gray-400'
                      aria-hidden='true'
                    />
                  </Combobox.Button>

                  {filteredOptions.length > 0 && (
                    <Combobox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                      {filteredOptions.map((person) => (
                        <Combobox.Option
                          key={person}
                          value={person}
                          className={({ active }) =>
                            classNames(
                              'relative cursor-default select-none py-2 pl-3 pr-9',
                              active
                                ? 'bg-violet-600 text-white'
                                : 'text-gray-900'
                            )
                          }>
                          <div className='flex items-center'>
                            <span className={'ml-3 truncate'}>{person}</span>
                          </div>
                        </Combobox.Option>
                      ))}
                    </Combobox.Options>
                  )}
                </div>
              </Combobox>
            </div>

            <div className='col-span-6'>
              <Divider />
            </div>

            <div className='col-span-6'>
              {choice.map((elem: any) => {
                return (
                  <div
                    key={elem}
                    className='border-2 rounded-md hover:border-slate-300 m-1 p-1 flex justify-between'>
                    <span className=' mt-auto mb-auto'>{elem}</span>

                    <button
                      onClick={() => {
                        if (elem != undefined) {
                          setOptions([...options, elem]);
                          setChoice(removeFromArr(elem, choice));
                        }
                      }}
                      type='button'
                      className='inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500'>
                      <XIcon className='h-4 w-4' aria-hidden='true' />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </SignupCard>
    </>
  );
};

export default ComboBoxCard;
