import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FeaturesPage from '../../routes/landing/FeaturesPage';

describe('FeaturesPage', () => {

  test('Should render the features page without crashing', () => {
    renderWithRouter(<FeaturesPage />);
  });

});

let renderWithRouter = (element: any) =>
  render(element, { wrapper: MemoryRouter });