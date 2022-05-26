import { FC, useState } from 'react';
import { Modal, Button, Group, Title, Box, TextInput, MultiSelect, RangeSlider, Text } from '@mantine/core';
import { useForm } from '@mantine/form'
import filtersService from '../../../services/filters'
import { Check } from 'tabler-icons-react';
import { showNotification } from '@mantine/notifications';

const languages = [
  { value: 'java', label: 'Java' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'c', label: 'C' },
  { value: 'cplusplus', label: 'C++' },
  { value: 'csharp', label: 'C#' },
  { value: 'swift', label: 'Swift' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'go', label: 'Go' },
]

const skills = [
  { value: 'react', label: 'React' },
  { value: 'aws', label: 'AWS' },
  { value: 'docker', label: 'Docker' },
  { value: 'data-analyst', label: 'Data Analyst' },
  { value: 'data-science', label: 'Data Science' },
  
]

interface Queries {
  queryNames: any
  setQueryNames: any
}

const QueriesModal:FC<Queries> = ({queryNames, setQueryNames}) => {
  const [opened, setOpened] = useState(false);

  const form = useForm({
    initialValues: {
      name: '',
      language: [],
      skill: [],
      availability: [0, 100],
    },

    validate: {
      name: (value) => {
        if (value.length > 30) {
          return 'Name should consist of a maximum of 30 characters'
        }
        if (!(/^\S+/.test(value))) {
          return 'Invalid name'
        }
        return null
      },
      language: lang => lang.length > 0 ? null : 'Choose at least one language',
    },
  });

  const handleSubmit = (values:any) => {
    filtersService
      .createNewFilterQuery(values)
      .then(returnedQuery => {
        setQueryNames(queryNames.concat(returnedQuery))
        showNotification({
          title: `${returnedQuery.name} added`,
          message: `You added ${returnedQuery.name}`,
          icon: <Check size={18} />,
          color: 'green',
        })
      })
    setOpened(false)
    form.reset()
  }

  const handleCloseModal = () => {
    setOpened(false)
    form.reset()
  }

  return (
    <>
      <Modal
        opened={opened}
        centered 
        overlayBlur={3}
        onClose={() => handleCloseModal()}
        title={<Title order={2} data-testid="modal-title">Create a new query</Title>}
      >
        <Box className="ml-0" sx={{ maxWidth: 385 }} mx="auto">
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <TextInput
              classNames={{ input: 'rounded outline-none focus:outline-none ring-0 border border-slate-200 focus:ring-0 focus:border-2 focus:border-violet-300' }}
              required
              label="Query Name"
              placeholder="Your Query Name"
              {...form.getInputProps('name')}
            />

            <MultiSelect
              classNames={
                { 
                  input: 'outline-none focus:outline-none ring-0 border border-slate-200 focus:border-0 focus:ring-0 focus-within:border-2 focus-within:border-violet-300',
                  searchInput: 'ml-2 bg-transparent outline-none focus:outline-none ring-0 border-0 ring-offset-0 ring-black border-back ring-offset-0 focus:border-0 focus:ring-0 focus:ring-violet-300',
                  hovered: 'bg-violet-200'
                }
              }
              data={languages}
              label="Programming languages"
              placeholder="Select Programming Languages"
              required
              {...form.getInputProps('language')}
            />

            <MultiSelect
              classNames={
                { 
                  input: 'outline-none focus:outline-none ring-0 border border-slate-200 focus:border-0 focus:ring-0 focus-within:border-2 focus-within:border-violet-300',
                  searchInput: 'ml-2 bg-transparent outline-none focus:outline-none ring-0 border-0 ring-offset-0 ring-black border-back ring-offset-0 focus:border-0 focus:ring-0 focus:ring-violet-300',
                  hovered: 'bg-violet-200'
                }
              }
              data={skills}
              label="Skills"
              placeholder="Select Skills"
              {...form.getInputProps('skill')}
            />

            <Text className="mantine-1w07r5r">Availability</Text>
            <RangeSlider
              className="mb-10"
              color="violet"
              step={5}
              marks={[
                { value: 0, label: '0%' },
                { value: 20, label: '20%' },
                { value: 50, label: '50%' },
                { value: 80, label: '80%' },
                { value: 100, label: '100%' },
              ]}
              {...form.getInputProps('availability')}
            />

            <Group position="right" mt="md">
              <Button
                data-testid="modal-close"
                color="red"
                onClick={() => handleCloseModal()}
                className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
              >
                CLOSE
              </Button>
              <Button
                data-testid="modal-save"
                type="submit"
                color="green"
                className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
              >
                SAVE
              </Button>
            </Group>
          </form>
        </Box>
      </Modal>
      <Group position="center">
        <Button 
          onClick={() => setOpened(true)}
          variant="light"
          type="button" 
          color="violet"
          className="w-full h-48 border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400"
          data-testid="new-query" 
        >
          <div className="flex flex-col">
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
          </div>
        </Button>
      </Group>
    </>
  )
}

export default QueriesModal
