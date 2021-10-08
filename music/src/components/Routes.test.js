import React from 'react';
import {render} from '../test-utils';
import Routes from './Routes';
import { MemoryRouter } from 'react-router-dom';

describe('routes', () => {
    it('render without crashing', () => {
        render(
            <MemoryRouter>
                <Routes/>
            </MemoryRouter>
        );
    });
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