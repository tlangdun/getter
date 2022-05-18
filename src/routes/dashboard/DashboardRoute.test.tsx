import {render} from '@testing-library/react'
import { Provider } from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import DashboardRoute from '../../routes/dashboard/DashboardRoute'
import store from '../../store/store'


describe('Dashboard routing', () => {
  test('Should render dashboard route without crash', async () => {
     render( 
      <BrowserRouter>
        <Provider store={store}>
          <DashboardRoute/>
        </Provider>
      </BrowserRouter>
     )
  })
})
