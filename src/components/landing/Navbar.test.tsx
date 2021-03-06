import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from './NavBar';

describe('NavBar', () => {
  test('should render the navbar without crashing', () => {
    renderWithRouter(<NavBar />);
  });

  test('Loginbutton should be on page', () => {
    renderWithRouter(<NavBar />);
    const loginButton = screen.getByText('Sign in');
    expect(loginButton).toBeInTheDocument();
  });

  test('SignUpButton should be on page', () => {
    renderWithRouter(<NavBar />);
    const signupButton = screen.getByText('Sign up');
    expect(signupButton).toBeInTheDocument();
  })

  test('Getter link should be on page', () => {
    renderWithRouter(<NavBar />);
    const getterLink = screen.getAllByText('Getter');
    expect(getterLink[0]).toBeInTheDocument();
  })

  test('AboutUs link should be on page', () => {
    renderWithRouter(<NavBar />);
    const aboutUsLink = screen.getAllByText('About Us');
    expect(aboutUsLink[0]).toBeInTheDocument();
  })

  test('Features link should be on page', () => {
    renderWithRouter(<NavBar />);
    const featuresLink = screen.getAllByText('Features');
    expect(featuresLink[0]).toBeInTheDocument();
  })
});

let renderWithRouter = (element: any) =>
  render(element, { wrapper: MemoryRouter });
