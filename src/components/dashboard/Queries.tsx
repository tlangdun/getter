import { FC } from 'react';
import React, { useEffect, useState } from "react";
import {getRecruiterQueryList} from '../../queries/getRecruiterQueryList'
import QueryModal from './QueriesModal'
import ButtonModal from './QueriesButtonModal'
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import filtersService from '../../services/filters'
import CandidateList from './CandidateList'

interface FilterQueries {
  name: string;
  id: string;
}

interface QueryProps {
  names: any
  deleteQuery: any
}

const QueryItem:FC<QueryProps> = ({names, deleteQuery}) => {

  return (
    <ul role="list" className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4 h-16 max-h-32">
      {names.map((query:any) => (
        <li key={query.id} id={query.id} data-testid='query-button' className="flex items-center justify-center col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
          <button id={query.id} type="button" onClick={deleteQuery} className="bg-red-300 hover:bg-red-400 h-full rounded-l-lg mr-0 p-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 overflow-hidden pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
          <button
            id={query.id}
            type="button"
            onClick={() => console.log("hello")}
            className="relative ml-0 p-0 items-center w-full h-full px-6 py-3 border border-transparent text-base font-medium rounded-r-lg text-indigo-700 bg-violet-200 hover:bg-violet-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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

  useEffect(() => {
    filtersService   //TODO: Backend
      .getAllFilterQueries()
      .then(initialFilters => {
        setQueryNames(initialFilters)
      })
  }, []);

  const deleteQuery = (event: any) => {
    const id = event.target.id
    const toDeleteQuery = queryNames.find(query => query.id === id)
    if (toDeleteQuery) {
      if (window.confirm(`Delete ${toDeleteQuery.name}?`)){
        filtersService
          .deleteFilterQuery(id)
          .then(deletedQuery => {
            console.log("deleted", deletedQuery)
            setQueryNames(queryNames.filter(query => query.id !== id))
          })
      }
    }
  }

  return(
    <div>
      <div className="mb-24">
        <MantineProvider>
          <ModalsProvider>
            < QueryModal queryNames={queryNames} setQueryNames={setQueryNames}/>
          </ModalsProvider>
        </MantineProvider>
      </div>
      <div>
        <h2 className="text-lg leading-6 font-medium text-gray-900">Existing queries</h2>
        < QueryItem names={queryNames} deleteQuery={deleteQuery}/>
      </div>
    </div>
  );
};

export default {Queries, QueryItem}