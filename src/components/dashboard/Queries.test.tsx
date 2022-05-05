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

  test('Can click on the new query button', () => {
    const { getAllByTestId } = render(
      <BrowserRouter>
        <Dashboard content={<QueriesModul.Queries/>} />
      </BrowserRouter>
    );

    const [newQueryButton] = getAllByTestId("new-query-button")
    userEvent.click(newQueryButton);
  })

  test('Shows the correct number of queries buttons', () => {
    render(
      <QueriesModul.QueryItem names={testQueries}/>
    );
    const items = screen.getAllByTestId("query-button")
    expect(items.length).toBe(3)
    
  })

  test('Should display the correct query name', () => {
    render(
      <QueriesModul.QueryItem names={testQueries}/>
    );
    const queryName = screen.getByRole('button', { 
      name: /Senior Data Scientist/i 
    })
    expect(queryName).toHaveTextContent('Senior Data Scientist')
  })

})