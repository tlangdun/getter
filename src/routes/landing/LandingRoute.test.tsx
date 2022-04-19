import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import LandingRoute from '../../routes/landing/LandingRoute';

describe('LandingRoute', () => {

  test('should render the landingroute without crashing', () => {
    renderWithRouter(<LandingRoute />);
  });

  test('click event on about us link', async () => {
    const { getByTestId } = renderWithRouter(<LandingRoute />);
    userEvent.click(getByTestId("about-us-link"));
    expect(getByTestId('about-us')).toBeInTheDocument();
  })

  test('click event on features link', async () => {
    const { getByTestId } = renderWithRouter(<LandingRoute />);
    userEvent.click(getByTestId("features-link"));
    expect(getByTestId('features')).toBeInTheDocument();
  })

  test('click event on landing-page link', async () => {
    const { getByTestId } = renderWithRouter(<LandingRoute />);
    userEvent.click(getByTestId("default-link"));
    expect(getByTestId('landing-page')).toBeInTheDocument();
  })
});

let renderWithRouter = (element: any) =>
  render(element, { wrapper: MemoryRouter });
