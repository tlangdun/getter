import { FC } from 'react';
import { Disclosure } from '@headlessui/react';
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

    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className=" mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-shrink-0 flex items-center">
                  <img
              className='h-8 w-auto sm:h-10'
              src='https://firebasestorage.googleapis.com/v0/b/getter-38760.appspot.com/o/getter%2FLogo%20Transparency.png?alt=media&token=36133b90-884e-4bc9-bcdf-5ad6a5e334ae'
              alt=''
            />
                </div>
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  {navItems.map((i) => (
            <Link className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium" data-testid={i.testid} to={i.link} key={i.displayName}>
              {i.displayName}
            </Link>
          ))}
                </div>
              </div>
              <div className="flex items-center">
                <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">

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
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navItems.map((i) => (
            <Link className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6" data-testid={i.testid} to={i.link} key={i.displayName}>
              {i.displayName}
            </Link>
          ))}
            </div>
            <div className="pt-3 pb-3 border-t border-gray-200">
              <div className="space-y-1">
              <Link className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6"to="auth/signup">
              Sign up
            </Link>
            <Link className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6"to="auth/login">
              Sign in
            </Link>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>

  );
};

export default NavBar;
