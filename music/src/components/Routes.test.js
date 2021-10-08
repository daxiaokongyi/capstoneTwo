import React from 'react';
import {render} from '../test-utils';
import Routes from './Routes';
import { MemoryRouter } from 'react-router-dom';

describe('routes', () => {
    test('test routes components', () => {
        const {getByText} = render(
            <MemoryRouter>
                <Routes/>
            </MemoryRouter>
        );
        const result = getByText('Welcome To I-Music');
        expect(result).toBeInTheDocument();
    })
});