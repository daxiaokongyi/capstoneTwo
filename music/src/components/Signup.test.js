import React from "react";
import {render} from '../test-utils';
import { MemoryRouter } from 'react-router-dom';

import Signup from "./Signup";

describe('sign up form', () => {
    test('Sign button is shown for user to switch to sign in page', () => {
        render(
            <MemoryRouter>
                <Signup/>
            </MemoryRouter>
        );
    })
    test('check if text register in the component', () => {
        const {getByText} = render(            
            <MemoryRouter>
                <Signup/>
            </MemoryRouter>)
        const result = getByText('Register');
        expect(result).toBeInTheDocument();
    });
})
