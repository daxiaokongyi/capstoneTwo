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
    // it('not found if nothing is searched', () => {
    //     const {getByText} = render(
    //         <MemoryRouter>
    //             <SearchResult/>
    //         </MemoryRouter>
    //     )
    //     expect(getByText('Artists:')).toBeInTheDocument(); 
    // });
})