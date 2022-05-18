import { FC, Fragment } from 'react';
import { List } from 'reselect/es/types';
import MenuItems from './MenuItems';
import { Menu, Transition } from '@headlessui/react';
import { GetterUser } from '../../store/models/userModel';


interface Props{
  navigation:List;
  user:GetterUser;
}

function classNames(...classes : any) {
  return classes.filter(Boolean).join(' ')
}

const MenuDesktop:FC<Props> = (props) => {
    return(
     <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4 pb-4">
          <img
            className="h-8 w-auto"
            src="https://firebasestorage.googleapis.com/v0/b/getter-38760.appspot.com/o/getter%2FLogo_Full.png?alt=media&token=1e2bcc9d-c2da-4170-9e7b-4b6f186a8e61"
            alt="Getter"
          />
        </div>
        <Menu as="div" className="px-3 relative inline-block text-left">
              <div className="userBox">
                <Menu.Button className="group w-full bg-gray-100 rounded-md px-3.5 py-2 text-sm text-left font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-500" data-testid="user-button" role="userButton">
                  <span className="flex w-full justify-between items-center">
                    <span className="flex min-w-0 items-center justify-between space-x-3">
                      <img
                        className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
                        src={props.user?.pic_url}
                        alt=""
                      />
                      <span className="flex-1 flex flex-col min-w-0">
                        <span className="text-gray-900 text-sm font-medium truncate">{props.user?.first_name + " " + props.user?.last_name}</span>
                        <span className="text-gray-500 text-sm truncate">{props.user?.email}</span>
                      </span>
                    </span>
                  </span>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="z-10 mx-3 origin-top absolute right-0 left-0 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
                  <div className="py-1" aria-label="user-item">
                    <Menu.Item data-testid="profile">
                      {({ active }) => (
                        <a
                          href="/dashboard/profile"
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          View profile
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="py-1" aria-label="user-item">
                    <Menu.Item data-testid="settings">
                      {({ active }) => (
                        <a
                          href="/dashboard/settings"
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Settings
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="py-1" aria-label="user-item">
                    <Menu.Item data-testid="support">
                      {({ active }) => (
                        <a
                          href="/dashboard/support"
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Support
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="py-1" aria-label="user-item">
                    <Menu.Item data-testid="logout">
                      {({ active }) => (
                        <a
                          href="/"
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Logout
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
        <nav className="mt-5 flex-1" aria-label="Sidebar">
          <div className="px-2 space-y-1">
            <MenuItems navigation={props.navigation} />
          </div>
        </nav>
      </div>
    </div>
    );
  }
  export default MenuDesktop;