import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {createMemoryHistory} from 'history'
import React from 'react'
import {Route,Routes,BrowserRouter} from 'react-router-dom'
import Dashboard from './Dashboard'
import {NavLink} from "react-router-dom";
import Recruiting from '../../components/dashboard/Recruiting'
import CandidateList from '../../components/dashboard/CandidateList'


import {
    HomeIcon,
    UserGroupIcon,
    ClipboardListIcon,
    ChatIcon,
  } from '@heroicons/react/outline'

const navRec = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: true },
    { name: 'Recruiting', href: '/recruiting', icon: ClipboardListIcon, current: false},
    { name: 'Candidates List', href: '/candidate-list', icon: UserGroupIcon, current: false },
    { name: 'Messages', href: '/messages', icon: ChatIcon, current: false }
]

const DashboardContent = () => <div>You are on the dashboard page</div>
const RecruitingContent = () => <div>You are on the recruiting page</div>
const CandidateListContent = () => <div>You are on the candidate-list page</div>
const MessageContent = () => <div>You are on the message page</div>
const NoMatch = () => <div>No match</div>

function App() {
  return (
    <div>
    {navRec.map(item =><NavLink to={item.href}>{item.name}</NavLink>)} 
    <Routes>
        <Route path={navRec[0].href} element={DashboardContent} />
        <Route path={navRec[1].href} element={RecruitingContent} />
        <Route path={navRec[2].href} element={CandidateListContent} />
        <Route path={navRec[3].href} element={MessageContent} />
    </Routes>  
    </div>
  )
}
test('recruiter menu gets shown in dashboard', async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    )
    navRec.forEach(nav => {
        expect(screen.getByText(nav.name)).toBeInTheDocument()
    })
})

test('routing right side content', async () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
  navRec.forEach(nav => {
      expect(screen.getByText(nav.name)).toBeInTheDocument()
  })
})