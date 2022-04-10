import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';
import { BrowserRouter } from 'react-router-dom';

describe('Dashboard', () => {
  test('Should render without crash', async () => {
     render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
     )
  })
})