import React from "react";
import {render} from '../test-utils';
import { MemoryRouter } from 'react-router-dom';

import Signin from "./Signin";

describe('sign up form', () => {
    test('Sign button is shown for user to switch to sign in page', () => {
        render(
            <MemoryRouter>
                <Signin/>
            </MemoryRouter>
        );
    })
    test('check if text register in the component', () => {
        const {getByText} = render(            
            <MemoryRouter>
                <Signin/>
            </MemoryRouter>)
        const result = getByText('Sign up');
        expect(result).toBeInTheDocument();
    });
})
