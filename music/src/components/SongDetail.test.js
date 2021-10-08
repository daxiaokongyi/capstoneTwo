import React from "react";
import {render} from '../test-utils';
import SongDetail from './SongDetail.js';
import { MemoryRouter } from 'react-router-dom';

describe('render SongDetail component', () => {
    it('render withour crashing', () => {
        render(
            <MemoryRouter>
                <SongDetail/>
            </MemoryRouter>
        );
    }); 
})