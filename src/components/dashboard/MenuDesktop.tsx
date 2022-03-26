import { FC } from 'react';
import { List } from 'reselect/es/types';
import MenuItems from './MenuItems';

interface Props{
  navigation:List;
}

const MenuDesktop:FC<Props> = (props) => {
    return(
     <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200">
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
            <MenuItems navigation={props.navigation} />
          </div>
        </nav>
      </div>
      <div className="flex-shrink-0 flex border-t bg-violet-100 border-gray-200 p-4">
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
              <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Martin Bosswald</p>
              <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">View profile</p>
            </div>
          </div>
        </a>
      </div>
    </div>
    );
  }
  export default MenuDesktop;