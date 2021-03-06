import { FC, Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import MenuDesktop from './MenuDesktop'
import {routesDashboard, routesDashboardTalent} from '../../routes/dashboard/RouteDashboardRecruiter';

import {
  MenuIcon,
  XIcon,
} from '@heroicons/react/outline'
import { useAppSelector } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { access_level } from '../../store/models/userModel';

interface Props{
  content:JSX.Element;
}

let RouteDashboardRecruiter = routesDashboard

const Dashboard:FC<Props> = (props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/auth/login');
    }
  }, [user, navigate]);
  
  if(user?.access_level === access_level.TALENT) {
    RouteDashboardRecruiter = routesDashboardTalent
  }
  
  return (
    <>
      <div className="h-screen flex">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white focus:outline-none">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                  <MenuDesktop user={user} navigation={RouteDashboardRecruiter}/>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex flex-col w-64">

            {/* Sidebar component, swap this element with another sidebar if you like */}
            <MenuDesktop user={user} navigation={RouteDashboardRecruiter}/>

          </div>
        </div>
        <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
          <div className="lg:hidden">
            <div className="flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-1.5">
              <div>
                <img
                  className="h-8 w-auto"
                  src="https://firebasestorage.googleapis.com/v0/b/getter-38760.appspot.com/o/getter%2FLogo_Full.png?alt=media&token=1e2bcc9d-c2da-4170-9e7b-4b6f186a8e61"
                  alt="Getter"
                />
              </div>
              <div>
                <button
                  type="button"
                  className="-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
                  onClick={() => setSidebarOpen(true)}
                >
                  <span className="sr-only">Open sidebar</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1 relative z-0 flex overflow-hidden">
            <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
              {/* Start main area*/}
              <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
                {props.content}
              </div>
              {/* End main area */}
            </main>
          </div>
        </div>
      </div>
    </>
  )
}
export default Dashboard