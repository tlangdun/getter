import { FC, useState } from 'react';
import Divider from '../../../misc/Divider';
import SignupCard from './SignupCard';
import ProfExpirienceForm from './ProfExpirienceForm';

type ProfExperience = {
  level: string;
  jobTitle: string;
  employer: string;
  current: boolean;
  startYear: number;
  endYear: number;
};

const ProfessionalExpirience: FC = () => {
  const [forms, setForms] = useState([0]);

  const [current, setCurrent] = useState<number | null>(null);

  const addEntryHandler = () => {
    const numb = forms[forms.length - 1] + 1;
    console.log([...forms, numb])
    setForms([...forms, numb]);
  };

  const removeEntry = (n: number) => {
    const idx = forms.indexOf(n)
    const newForms = [...forms];
    newForms.splice(idx, 1);
    setForms(newForms);
    console.log(newForms)
    if (n == current) {setCurrent(null)}
  };

  return (
    <SignupCard
      title='Professional Experience'
      description='Describe your professional experience. Current will be displayed on your profile.'>
      <div className='mt-5 md:mt-0 md:col-span-2'>
        {forms.map((i) => {
          return (
            <>
              <ProfExpirienceForm
                key={i}
                index={i}
                setCurrent={() => {
                  setCurrent(i);
                }}
                unSetCurrent={() => {
                  setCurrent(null);
                }}
                remove={() => removeEntry(i)}
                current={current}
              />
              <div className=' py-4'></div>
              <Divider />
              <div className=' py-4'></div>
            </>
          );
        })}

        <button
          type='button'
          onClick={addEntryHandler}
          className='relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='mx-auto h-10 w-10 text-gray-400'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 4v16m8-8H4'
            />
          </svg>

          <span className='mt-2 block text-sm font-medium text-gray-900'>
            Add new Entry
          </span>
        </button>
      </div>
    </SignupCard>
  );
};

export default ProfessionalExpirience;
