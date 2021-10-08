import React from "react";
import {render} from '../test-utils';
import Home from './Home.js';

describe('render Home component', () => {
    it('render without crashing', () => {
        render(<Home/>);
    }); 
    test('return welcome to i-music', () => {
        const display = render(<Home/>);
        display.getByText('Welcome To I-Music');
    })
})