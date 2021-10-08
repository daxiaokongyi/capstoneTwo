import React from "react";
import {render} from '../test-utils';
import SignupForm from './SignupForm.js';
import { MemoryRouter } from 'react-router-dom';

describe('render SignupForm component', () => {
    it('render withour crashing', () => {
        render(
            <MemoryRouter>
                <SignupForm/>
            </MemoryRouter>
        );
    }); 
    test('check if text register in the component', () => {
        const {getByText} = render(            
            <MemoryRouter>
                <SignupForm/>
            </MemoryRouter>)
        const result = getByText('Sign Up');
        expect(result).toBeInTheDocument();
    });
})