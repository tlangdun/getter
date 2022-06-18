import { ChatIcon, XIcon } from '@heroicons/react/solid';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../../store/models/userModel';

interface Props{
    person:User;
    deleteEvent:any;
}
const CandidateCard:FC<Props> = ({person, deleteEvent}) => {
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
        {person.skills.map((skill)=>{
        return (<span key={skill} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-500 text-white">
            {skill}
        </span>)
        })}
        </td>
        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
          <Link to={`/dashboard/messages/${person.uid}`}>    
            <button
                type="button"
                className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Send a message
                <ChatIcon className="ml-2 -mr-0.5 h-4 w-4" aria-hidden="true" />
            </button>
        </Link>
        </td>
        <td className="relative whitespace-nowrap py-4 text-right text-sm font-medium sm:pr-6">
        <button
            data-testid={"button-"+person.uid}
            type="button"
            onClick={deleteEvent}
            value={person.uid}
            className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
        >
            <XIcon className="h-4 w-4 pointer-events-none" aria-hidden="true" />
        </button>
        </td>
    </tr>
  );
};

export default CandidateCard
