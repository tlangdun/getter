import { useState } from 'react';
import { Modal, Button, Group } from '@mantine/core';
import { FC } from 'react';

interface QueryProps {
  names: any
}
const QueryItem:FC<QueryProps> = ({names}) => {
  return (
    <ul role="list" className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4 h-20">
      {names.map((query:any) => (
        <li key={query.id} id={query.id} data-testid='query-button' className="flex items-center justify-center col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
          <button
            type="button"
            className="relative items-center w-full h-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-violet-200 hover:bg-violet-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {query.name}
          </button>
       </li>
      ))}
      {}
    </ul>
  )
}

const QueriesButtonModal = () => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal
        opened={opened}
        centered
        overlayBlur={3}
        onClose={() => setOpened(false)}
        title="Introduce yourself!"
      >
        {/* Modal content */}
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Open Modal</Button>
      </Group>
    </>
  );
}

export default QueriesButtonModal