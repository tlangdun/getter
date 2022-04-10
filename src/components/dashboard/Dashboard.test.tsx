import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import {Route,Routes,BrowserRouter} from 'react-router-dom'
import Dashboard from './Dashboard'


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

import RouteDashboardRecruiter from '../../routes/dashboard/RouteDashboardRecruiter';

describe('Dashboard recruiter', () => {
  test('Should render without crash', async () => {
     render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
     )
  })

  test('recruiter menu gets shown in dashboard', async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    )
    RouteDashboardRecruiter.forEach(nav => {
        expect(screen.getByText(nav.name)).toBeInTheDocument()
    })
  })

  test('routing dashboard menu content', async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    )
    userEvent.click(screen.getByText("Dashboard"))
    expect(screen.getByTestId("dashboard")).toBeInTheDocument()
  
    userEvent.click(screen.getByText("Recruiting"))
    expect(screen.getByTestId("recruiting")).toBeInTheDocument()
  
    userEvent.click(screen.getByText("Candidates List"))
    expect(screen.getByTestId("candidates-list")).toBeInTheDocument()
  
    userEvent.click(screen.getByText("Messages"))
    expect(screen.getByTestId("messages")).toBeInTheDocument()
  })
})