import { FC } from 'react';
import { MailIcon, PhoneIcon,PlusSmIcon } from '@heroicons/react/solid'

interface User { 
    uid: string;
    access_level: string;
    email: string;
    first_name: string;
    last_name: string;
    pic_url: string;
    short_bio: string;
    address_postcode: string;
    availability: string;
    birth_date: string;
    canton: string;
    city_of_residence: string;
    job_role: string;
    skills: string[];
    programming_languages: string[];
    salary_range: {
      start: number;
      end: number;
    }
    work_experience: object[];
}    
interface Props {
    user:User;
}
function addToCandidatesList(id:string) {
    alert("add " + id + "to candidate list")
}
const Card:FC<Props> = ({ user }) => {
  return(
    <li
        data-testid={user.uid} className="col-span-1 relative selection:flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
    >
        <button
        type="button"
        className="inline-flex absolute right-0 p-1 border border-transparent shadow-sm text-white bg-violet-500 hover:bg-violet-700 focus:outline-none"
        onClick={() => addToCandidatesList(user.email)}
        >
            <PlusSmIcon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex-1 flex flex-col p-8">
        <img className="w-32 h-32 flex-shrink-0 mx-auto rounded-full" src={user.pic_url} alt="" />
        <h3 className="mt-6 text-gray-900 text-sm font-medium">
            {user.first_name + " " +  user.last_name} 
            <span className="ml-1 flex-shrink-0 inline-block px-2 py-0.5 text-white text-xs font-medium bg-violet-700 rounded-full">
                {user.job_role}
            </span>
        </h3>
        <dl className="mt-1 flex-grow flex flex-col justify-between">
            <dt className="sr-only">Short Bio</dt>
            <dd className="text-gray-500 text-sm pb-1">{user.short_bio}</dd>
            <dt className="sr-only">Salary Range</dt>
            <dd className="text-gray-500 text-sm pb-1">{user.salary_range.start} - {user.salary_range.end} $</dd>
            <dt className="sr-only">Availability</dt>
            <dd className="text-gray-500 text-sm pb-1">Availability:</dd>
            <dd className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
            <div className="bg-violet-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"  style={{width: user.availability + "%", }}>{user.availability  + "%"}</div>
            </dd>
        </dl>
        <div className='pt-2'>
        {user.skills.map((element) => {
            return (
            <span className="ml-1 flex-shrink-0 inline-block px-2 py-0.5 text-white text-xs font-medium bg-violet-500 rounded-full">
            {element}
            </span>)
        })}
        {user.programming_languages.map((element) => {
            return (
            <span className="ml-1 flex-shrink-0 inline-block px-2 py-0.5 text-white text-xs font-medium bg-green-700 rounded-full">
            {element}
            </span>)
        })}
        </div>
        
        </div>
        <div>
        <div className="-mt-px flex divide-x divide-gray-200">
            <div className="w-0 flex-1 flex">
            <a
                href={`mailto:${user.email}`}
                className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
            >
                <MailIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                <span className="ml-3">Email</span>
            </a>
            </div>
        </div>
        </div>
    </li>
  );
};

export default Card
