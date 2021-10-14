import React from "react";
import {render} from '../test-utils';
import SongDetail from './SongDetail.js';
import { MemoryRouter } from 'react-router-dom';

describe('render SongDetail component', () => {
    it('render withour crashing', () => {
        render(

        );
    }); 
    test('Check if button of Add to Favorite exists and has correct class name', () => {
        const {getByText} = render(
            <MemoryRouter>
                <SongDetail/>
            </MemoryRouter>
        );
        expect(getByText('Add to Favorite')).toHaveClass('btn-primary');
    });
})