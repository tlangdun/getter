import {render, screen, fireEvent, findByTestId} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import LoginPage from './LoginPage';
import '@testing-library/jest-dom/extend-expect';
import {abortControllerWithReason} from "@reduxjs/toolkit/dist/listenerMiddleware/utils";
import {keyboard} from "@testing-library/user-event/dist/keyboard";

describe('LoginPage', () => {

    test('should render the LoginPage without crashing', () => {
        renderWithRouter(<LoginPage/>);
    });

    test('should show error when no email is entered', async () => {
        const {getByTestId} = renderWithRouter(<LoginPage/>)
        await fireEvent.blur(getByTestId('email'))
        expect(await screen.findByText('Email is required')).toBeInTheDocument()
    })

    test('should show error when email is in wrong format', async () => {
        const {getByTestId} = renderWithRouter(<LoginPage/>)
        await fireEvent.blur(getByTestId('email'));
        await fireEvent.change(getByTestId('email'), {target: {value: '23'}})
        expect(await screen.findByText('email must be a valid email')).toBeInTheDocument();

    })

    test('should show error when no password is entered', async () => {
        const {getByTestId} = renderWithRouter(<LoginPage/>)
        await fireEvent.blur(getByTestId('password'));
        expect(await screen.findByText('Password is required')).toBeInTheDocument();

    })

    test('should show error when wrong password is entered', async () => {
        const {getByTestId} = renderWithRouter(<LoginPage/>)
        await fireEvent.change(getByTestId('email'), {target: {value: 'test@gmail.com'}})
        await fireEvent.change(getByTestId('password'), {target: {value: 'asdf'}})
        await fireEvent(screen.getByText('Sign in'), new MouseEvent('click', {bubbles: true, cancelable: true,}),)

        expect(await screen.findByText('Firebase: Error (auth/wrong-password).')).toBeInTheDocument();

    })

});

let renderWithRouter = (element: any) =>
    render(element, {wrapper: MemoryRouter});


