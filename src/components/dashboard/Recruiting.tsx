import { FC } from 'react';
import { MailIcon } from '@heroicons/react/solid';

const people = [
  {
    name: 'Lindsay Walton',
    title: 'Frontend Developer',
    email: 'lindsay.walton@example.com',
    skill: 'React',
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Martin Bosswald',
    title: 'Backend Developer',
    email: 'martin.bosswald@example.com',
    skill: 'Java',
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  }
  // More people...
]

const Recruiting:FC = () => {
  return(
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-700">
            Test
          </p>
        </div>
      </div>
    </div>
  );
};

export default Recruiting
