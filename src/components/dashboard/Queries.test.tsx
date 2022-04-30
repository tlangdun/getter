import {render, screen, act} from '@testing-library/react'
import Queries from './Queries'
import {Route,Routes, BrowserRouter} from 'react-router-dom'
import Dashboard from './Dashboard'
import userEvent from '@testing-library/user-event'

describe('Queries page', () => {
  test('Should render queries page', async () => {
    render(
     <BrowserRouter>
       <Dashboard content={<Queries/>}/>
     </BrowserRouter>
    )
  })

  test('Can click on the new query button', async () => {
    const { getAllByTestId } = render(
      <BrowserRouter>
        <Dashboard content={<Queries/>} />
      </BrowserRouter>
    );

    const [newQueryButton] = getAllByTestId("new-query-button")
    userEvent.click(newQueryButton);
  })
})