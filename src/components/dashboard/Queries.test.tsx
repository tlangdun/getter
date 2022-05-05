import {render, screen, act} from '@testing-library/react'
import QueriesModul from './Queries'
import {Route,Routes, BrowserRouter} from 'react-router-dom'
import Dashboard from './Dashboard'
import userEvent from '@testing-library/user-event'

const testQueries = [
  {name: 'Junior Data Scientist', id: '0'},
  {name: 'Senior Data Scientist', id: '1'},
  {name: 'Java Backend Engineer', id: '2'}
]

describe('Queries page', () => {
  test('Should render queries page', () => {
    render(
     <BrowserRouter>
       <Dashboard content={<QueriesModul.Queries/>}/>
     </BrowserRouter>
    )
  })

})