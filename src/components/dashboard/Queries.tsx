import { FC } from 'react';

const queryItems = [
  {
    name: 'Senior Software Architect',
    id: '0'
  },
  {
    name: 'Junior Data Scientist',
    id: '1'
  },
  {
    name: 'Senior Software Architect1',
    id: '2'
  },
  {
    name: 'Junior Data Scientist1',
    id: '3'
  },
  {
    name: 'Senior Software Architect2',
    id: '4'
  },
  {
    name: 'Junior Data Scientist2',
    id: '5'
  },
]

const NewQuery = () => {
  return (
    <button
      type="button"
      className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <svg
        className="mx-auto h-16 w-16 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
        fill="currentColor"
        viewBox="0 0 28 28"
        aria-hidden="true"
      >
        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
      </svg>
      <span className="mt-2 block text-sm font-medium text-gray-900">Create a new query</span>
    </button>

  )
}

const QueryItem = () => {
  return (
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4 h-20">
      {queryItems.map((query) => (
        <li key={query.id} className="flex items-center justify-center col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
          <button
            type="button"
            className="relative items-center w-full h-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {query.name}
          </button>
       </li>
      ))}
    </ul>
  )
}

const Quieres:FC = () => {
  return(
    <div>
      <div className="mb-40">
        < NewQuery />
      </div>
      <div>
       < QueryItem />
      </div>
    </div>
  );
};

export default Quieres