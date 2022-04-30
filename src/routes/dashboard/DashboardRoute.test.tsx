import {render} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import DashboardRoute from '../../routes/dashboard/DashboardRoute'


describe('Dashboard routing', () => {
  test('Should render dashboard route without crash', async () => {
     render(
      <BrowserRouter>
        <DashboardRoute/>
      </BrowserRouter>
     )
  })
})
