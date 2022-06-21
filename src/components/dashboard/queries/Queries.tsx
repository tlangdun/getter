import { FC, useEffect, useState } from 'react';
import QueryModal from './QueriesModal'
import { MantineProvider} from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import filtersService from '../../../services/filters'
import { NotificationsProvider, showNotification } from '@mantine/notifications';
import QueriesItem from './QueriesItem'
import { X } from 'tabler-icons-react';

interface FilterQueries {
  name: string;
  id: string;
}

const Queries:FC = () => {
  const [queryNames, setQueryNames] = useState<FilterQueries[]>([]);

  useEffect(() => {
    filtersService 
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
            setQueryNames(queryNames.filter(query => query.id !== id))
          })
      
        showNotification({
          title: `${toDeleteQuery.name} Deleted`,
          message: `You deleted ${toDeleteQuery.name}`,
          icon: <X size={18} />,
          color: 'red',
        })
      }
    }
  }

  return(
    <div>
      <div className="mb-24">
        <MantineProvider>
         <NotificationsProvider>
          <ModalsProvider>
            < QueryModal queryNames={queryNames} setQueryNames={setQueryNames}/>
          </ModalsProvider>
        </NotificationsProvider>
        </MantineProvider>
      </div>
      <div>
        <h2 className="text-lg leading-6 font-medium text-gray-900">Existing queries</h2>
        <MantineProvider>
          <NotificationsProvider>
           < QueriesItem names={queryNames} deleteQuery={deleteQuery}/>
          </NotificationsProvider>
        </MantineProvider>
      </div>
    </div>
  );
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {Queries}