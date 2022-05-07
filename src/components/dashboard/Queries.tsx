import { FC } from 'react';
import React, { useEffect, useState } from "react";
import PopUp from './QueriesFormUp'
import {getRecruiterQueryList} from '../../queries/getRecruiterQueryList'
import { Props } from '@headlessui/react/dist/types';

interface FilterQueries {
  name: string;
  id: string;
}

interface QueryProps {
  //here you can declare the return type (here is void)
  names: any
}

const QueryItem:FC<QueryProps> = ({names}) => {
  return (
    <ul role="list" className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4 h-20">
      {names.map((query:any) => (
        <li key={query.id} data-testid='query-button' className="flex items-center justify-center col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
          <button
            type="button"
            className="relative items-center w-full h-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {query.name}
          </button>
       </li>
      ))}
      {}
    </ul>
  )
}

const Queries:FC = () => {
  const [queryNames, setQueryNames] = useState<FilterQueries[]>([]);

  const newObj = async () => {
    const userQueries: any = await getRecruiterQueryList()
    /*
    const userQueries = [
      {name: 'Junior Data Scientist', id: '0'},
      {name: 'Senior Data Scientist', id: '1'},
      {name: 'Java Backend Engineer', id: '2'}
    ]*/
    setQueryNames(userQueries)
  }

  useEffect(() => {
    newObj();
  }, []);

  return(
    <div>
      <div id="pop-up" className="mb-24">
        < PopUp />
      </div>
      <div>
        <h2 className="text-lg leading-6 font-medium text-gray-900">Existing queries</h2>
        < QueryItem names={queryNames}/>
      </div>
    </div>
  );
};

export default {Queries, QueryItem}