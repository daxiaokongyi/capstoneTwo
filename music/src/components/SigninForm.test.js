import React from "react";
import {render} from '../test-utils';
import SigninForm from './SigninForm.js';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

describe('render SigninForm component', () => {
    it('render withour crashing', () => {
        render(
            <MemoryRouter>
                <SigninForm/>
            </MemoryRouter>
        );
    }); 
    it('check if sign up on the page', () => {
        const {getByText} = render(
            <MemoryRouter>
                <SigninForm/>
            </MemoryRouter>
        );

        const result = getByText('Sign up');
        expect(result).toBeInTheDocument();
    });
})