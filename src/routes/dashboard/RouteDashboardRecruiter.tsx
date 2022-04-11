import {
  HomeIcon,
  UserGroupIcon,
  ClipboardListIcon,
  ChatIcon,
} from '@heroicons/react/outline'

const routesDashboard = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: HomeIcon,
    current: true,
  },
  {
    name: 'Recruiting',
    href: '/recruiting',
    icon: ClipboardListIcon,
    current: false,
  },
  {
    name: 'Candidates List', 
    href: '/candidate-list', 
    icon: UserGroupIcon, 
    current: false,
  },
  {
    name: 'Messages', 
    href: '/messages', 
    icon: ChatIcon, 
    current: false,
  }
];

export default routesDashboard;