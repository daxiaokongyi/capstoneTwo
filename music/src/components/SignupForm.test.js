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
})