import { FC, Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

type NavItem = {
  displayName: string;
  link: string;
  testid: string;
};

const navItems: NavItem[] = [
  { displayName: 'Getter', link: '/', testid:'default-link' },
  { displayName: 'About Us', link: '/aboutus', testid:'about-us-link' },
  { displayName: 'Features', link: '/features', testid:'features-link' },
];

const NavBar: FC = () => {
  return (
    <Popover className='relative bg-white'>
      <div className='flex justify-between items-center px-4 py-6 sm:px-6 md:justify-start md:space-x-10'>
        <div className='flex justify-start lg:w-0 lg:flex-1'>
          <Link to='/'>
            <span className='sr-only'>Getter</span>
            <img
              className='h-8 w-auto sm:h-10'
              src='https://firebasestorage.googleapis.com/v0/b/getter-38760.appspot.com/o/getter%2FLogo%20Transparency.png?alt=media&token=36133b90-884e-4bc9-bcdf-5ad6a5e334ae'
              alt=''
            />
          </Link>
        </div>
        <div className='-mr-2 -my-2 md:hidden'>
          <Popover.Button className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500'>
            <span className='sr-only'>Open menu</span>
            <MenuIcon className='h-6 w-6' aria-hidden='true' />
          </Popover.Button>
        </div>
        <Popover.Group as='nav' className='hidden md:flex space-x-10'>
          {navItems.map((i) => (
            <Link data-testid={i.testid} to={i.link} key={i.displayName}>
              {i.displayName}
            </Link>
          ))}
          <Link to=''></Link>
        </Popover.Group>
        <div className='hidden md:flex items-center justify-end md:flex-1 lg:w-0'>
          <Link
            to='auth/login'
            className='whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900'>
            Sign in
          </Link>
          <Link
            data-testid="signup"
            to='auth/signup'
            className='ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-purple-600 hover:bg-purple-700'>
            Sign up
          </Link>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter='duration-200 ease-out'
        enterFrom='opacity-0 scale-95'
        enterTo='opacity-100 scale-100'
        leave='duration-100 ease-in'
        leaveFrom='opacity-100 scale-100'
        leaveTo='opacity-0 scale-95'>
        <Popover.Panel
          focus
          className='absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden'>
          <div className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50'>
            <div className='pt-5 pb-6 px-5'>
              <div className='flex items-center justify-between'>
                <div>
                  <img
                    className='h-8 w-auto'
                    src='https://firebasestorage.googleapis.com/v0/b/getter-38760.appspot.com/o/getter%2FLogo%20Transparency2.png?alt=media&token=76aea186-61e4-4e07-bb17-56ca3a705516'
                    alt='Workflow'
                  />
                </div>
                <div className='-mr-2'>
                  <Popover.Button className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500'>
                    <span className='sr-only'>Close menu</span>
                    <XIcon className='h-6 w-6' aria-hidden='true' />
                  </Popover.Button>
                </div>
              </div>
              <div className='mt-6'>
                <nav className='grid grid-cols-1 gap-7'></nav>
              </div>
            </div>
            <div className='py-6 px-5'>
              <div className='grid grid-cols-2 gap-4'>
                {navItems.map((i) => (
                  <Link data-testid={i.testid} to={i.link} key={i.displayName}>
                    {i.displayName}
                  </Link>
                ))}
              </div>
              <div className='mt-6'>
                <Link
                  to='auth/signup'
                  className='w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-purple-600 hover:bg-purple-700'>
                  Sign up
                </Link>
                <p className='mt-6 text-center text-base font-medium text-gray-500'>
                  Existing customer?{' '}
                  <Link
                    to='auth/login'
                    className='text-purple-600 hover:text-purple-500'>
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default NavBar;
