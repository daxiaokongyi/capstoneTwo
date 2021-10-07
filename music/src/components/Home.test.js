import React from "react";
import {render} from '@testing-library/react';
import Home from './Home.js';

describe('render Home component', () => {
    it('render withour crashig', () => {
        render(<Home/>);
    }); 
    test('return welcome to i-music', () => {
        const display = render(<Home/>);
        display.getByText('Welcome To I-Music');
    })
})