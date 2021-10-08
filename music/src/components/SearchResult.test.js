import React from "react";
import {render} from '../test-utils';
import SearchResult from './SearchResult.js';
import { MemoryRouter } from 'react-router-dom';

describe('render SearchResult component', () => {
    it('render withour crashing', () => {
        render(
            <MemoryRouter>
                <SearchResult/>
            </MemoryRouter>
        );
    }); 
})