import {
  HomeIcon,
  UserGroupIcon,
  ClipboardListIcon,
  ChatIcon,
} from '@heroicons/react/outline'

const routesDashboardTalent = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    routing: '/',
    icon: HomeIcon,
    current: true,
  },
  {
    name: 'Messages', 
    href: '/dashboard/messages', 
    routing: '/messages',
    icon: ChatIcon, 
    current: false,
  }
];


const routesDashboard = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    routing: '/',
    icon: HomeIcon,
    current: true,
  },
  {
    name: 'Queries',
    href: '/dashboard/queries',
    routing: '/queries',
    icon: HomeIcon,
    current: true,
  },
  {
    name: 'Recruiting',
    href: '/dashboard/recruiting',
    routing: '/recruiting',
    icon: ClipboardListIcon,
    current: false,
  },
  {
    name: 'Candidates List', 
    href: '/dashboard/candidate-list', 
    routing: '/candidate-list',
    icon: UserGroupIcon, 
    current: false,
  },
  {
    name: 'Messages', 
    href: '/dashboard/messages', 
    routing: '/messages',
    icon: ChatIcon, 
    current: false,
  }
];

export {routesDashboard,routesDashboardTalent};