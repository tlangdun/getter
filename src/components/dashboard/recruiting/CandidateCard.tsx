import { MailIcon } from '@heroicons/react/solid';
import { FC } from 'react';
import { User } from '../../../store/models/userModel';

interface Props{
    person:User;
}
const CandidateCard:FC<Props> = ({person}) => {
  return(
    <tr>
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
        <div className="flex items-center">
            <div className="h-10 w-10 flex-shrink-0">
            <img className="h-10 w-10 rounded-full" src={person.pic_url} alt="" />
            </div>
            <div className="ml-4">
            <div className="font-medium text-gray-900">{person.first_name + " " + person.last_name}</div>
            <div className="text-gray-500">{person.email}</div>
            </div>
        </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <div className="text-gray-900">{person.job_role}</div>
        </td>
        
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            {person.job_role}
        </span>
        </td>
        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        <button
            type="button"
            className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            Send a message
            <MailIcon className="ml-2 -mr-0.5 h-4 w-4" aria-hidden="true" />
        </button>
        </td>
    </tr>
  );
};

export default CandidateCard
