import { FC } from 'react';
import { MailIcon, PhoneIcon,PlusSmIcon } from '@heroicons/react/solid'
type Person = {
    email:string;
    name:string;
    title:string;
    role:string;
    telephone:string;
    imageUrl:string;
}
interface Props {
    person:Person;
}
function addToCandidatesList(id:string) {
    alert("add " + id + "to candidate list")
}
const Card:FC<Props> = ({ person }) => {
  return(
    <li
        key={person.email}
        className="col-span-1 relative selection:flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
    >
        <button
        type="button"
        className="inline-flex absolute right-0 p-1 border border-transparent shadow-sm text-white bg-violet-500 hover:bg-violet-700 focus:outline-none"
        onClick={() => addToCandidatesList(person.email)}
        >
            <PlusSmIcon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex-1 flex flex-col p-8">
        <img className="w-32 h-32 flex-shrink-0 mx-auto rounded-full" src={person.imageUrl} alt="" />
        <h3 className="mt-6 text-gray-900 text-sm font-medium">{person.name}</h3>
        <dl className="mt-1 flex-grow flex flex-col justify-between">
            <dt className="sr-only">Title</dt>
            <dd className="text-gray-500 text-sm">{person.title}</dd>
            <dt className="sr-only">Role</dt>
            <dd className="mt-3">
            <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                {person.role}
            </span>
            </dd>
        </dl>
        </div>
        <div>
        <div className="-mt-px flex divide-x divide-gray-200">
            <div className="w-0 flex-1 flex">
            <a
                href={`mailto:${person.email}`}
                className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
            >
                <MailIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                <span className="ml-3">Email</span>
            </a>
            </div>
            <div className="-ml-px w-0 flex-1 flex">
            <a
                href={`tel:${person.telephone}`}
                className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
            >
                <PhoneIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                <span className="ml-3">Call</span>
            </a>
            </div>
        </div>
        </div>
    </li>
  );
};

export default Card
