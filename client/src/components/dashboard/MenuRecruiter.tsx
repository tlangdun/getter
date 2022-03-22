import React from 'react';
import { FC } from 'react';
import { List } from 'reselect/es/types';

interface Props{
  navigation:List;
}

function classNames(...classes:List) {
  return classes.filter(Boolean).join(' ')
}

const MenuRecruiter:FC<Props> = (props) => {
    return(
     <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-gray-100">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-900-text.svg"
            alt="Workflow"
          />
        </div>
        <nav className="mt-5 flex-1" aria-label="Sidebar">
          <div className="px-2 space-y-1">
            {props.navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current
                    ? 'bg-gray-200 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                  'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                )}
              >
                <item.icon
                  className={classNames(
                    item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                    'mr-3 h-6 w-6'
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </a>
            ))}
          </div>
        </nav>
      </div>
      <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
        <a href="#" className="flex-shrink-0 w-full group block">
          <div className="flex items-center">
            <div>
              <img
                className="inline-block h-9 w-9 rounded-full"
                src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Whitney Francis</p>
              <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">View profile</p>
            </div>
          </div>
        </a>
      </div>
    </div>
    );
  }
  export default MenuRecruiter;