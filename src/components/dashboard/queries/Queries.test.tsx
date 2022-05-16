import {render, screen, act} from '@testing-library/react'
import QueriesModul from './Queries'
import QueriesItem from './QueriesItem'
import {BrowserRouter} from 'react-router-dom'
import Dashboard from '../Dashboard'
import QueriesModal from './QueriesModal'
import { useEffect, useState } from "react";
import userEvent from '@testing-library/user-event'
import React, { useState as useStateMock } from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

let testQueries = [
  {name: 'Junior Data Scientist', id: '0'},
  {name: 'Senior Data Scientist', id: '1'},
  {name: 'Java Backend Engineer', id: '2'}
]

const deleteQuery = (id: string) => {
  testQueries = testQueries.filter(query => query.id !== id)
}

interface FilterQueries {
  name: string;
  id: string;
}



describe('Queries page', () => {
  test('Should render queries page', () => {
    render(
     <BrowserRouter>
       <Dashboard content={<QueriesModul.Queries/>}/>
     </BrowserRouter>
    )
  })

  test('Shows the correct number of forward buttons', () => {
    render(
      <QueriesItem names={testQueries} deleteQuery={deleteQuery}/>
    );
    const items = screen.getAllByTestId("forward-button")
    expect(items.length).toBe(3)
  })

  test('Shows the correct number of delete buttons', () => {
    render(
      <QueriesItem names={testQueries} deleteQuery={deleteQuery}/>
    );
    const items = screen.getAllByTestId("delete-button")
    expect(items.length).toBe(3)
  })

  test('Forward button of the newly added query is displayed', () => {
    const newTestQueries = testQueries.concat({name: 'Frontend Developer', id: '3'})

    render(
      <QueriesItem names={newTestQueries} deleteQuery={deleteQuery}/>
    );

    const items = screen.getAllByTestId("forward-button")
    expect(items.length).toBe(4)
  })

  test('Delete Button of the newly added query is displayed', () => {
    let newTestQueries = testQueries.concat({name: 'Frontend Developer', id: '3'})
    newTestQueries = newTestQueries.concat({name: 'Frontend Junior Developer', id: '4'})
    render(
      <QueriesItem names={newTestQueries} deleteQuery={deleteQuery}/>
    );

    const items = screen.getAllByTestId("delete-button")
    expect(items.length).toBe(5)
  })

  test('Should display the correct query name', () => {
    render(
      <QueriesItem names={testQueries} deleteQuery={deleteQuery}/>
    );
    const queryName = screen.getByRole('button', { 
      name: /Senior Data Scientist/i 
    })
    expect(queryName).toHaveTextContent('Senior Data Scientist')
  })

  const queryNames = testQueries;
  const setQueryNames: any[] = []

  test('Should display the button for creating a new query', () => {
    const { getByTestId } = render(
      <QueriesModal queryNames={queryNames} setQueryNames={setQueryNames}/>
    );
    const newQueryButton = getByTestId("new-query");
    expect(newQueryButton).toBeInTheDocument()
  })

  test('Should show the queries modal after clicking the new-query button', () => {
    const { getAllByTestId } = render(
      <QueriesModal queryNames={queryNames} setQueryNames={setQueryNames}/>
    );
    const [menuButton] = getAllByTestId("new-query");
    userEvent.click(menuButton);
    expect(screen.getByTestId("modal-title")).toBeInTheDocument()
  })

  test('Should display the save button', () => {
    const { getByTestId } = render(
      <QueriesModal queryNames={queryNames} setQueryNames={setQueryNames}/>
    );
    const newQueryButton = getByTestId("new-query");
    userEvent.click(newQueryButton);
    expect(screen.getByTestId("modal-save")).toBeInTheDocument()
  })

  test('Should display the close button', () => {
    const { getByTestId } = render(
      <QueriesModal queryNames={queryNames} setQueryNames={setQueryNames}/>
    );
    const newQueryButton = getByTestId("new-query");
    userEvent.click(newQueryButton);
    expect(screen.getByTestId("modal-close")).toBeInTheDocument()
  })

})