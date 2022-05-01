import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HeroSection from './HeroSection';

describe('HeroSection', () => {
    test('Should render the HeroSection without crashing', () => {
        renderWithRouter(<HeroSection />);
    });

    test('LoginButton should be on page', () => {
        renderWithRouter(<HeroSection />);
        const loginButton = screen.getByText('Log in');
        expect(loginButton).toBeInTheDocument();
    });

    test('GetStartedButton should be on page', () => {
        renderWithRouter(<HeroSection />);
        const signupButton = screen.getByText('Get started');
        expect(signupButton).toBeInTheDocument();
    })

});

let renderWithRouter = (element: any) =>
    render(element, { wrapper: MemoryRouter });
