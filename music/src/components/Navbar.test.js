import React from "react";
import {render} from '../test-utils';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar.js';

describe('render Navbar component', () => {
    it('render withour crashing', () => {
        render(
            <MemoryRouter>
                <Navbar/>
            </MemoryRouter>
        );
    }); 
})