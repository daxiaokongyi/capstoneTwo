import React from "react";
import {render} from '../test-utils';
import Help from './Help.js';

describe('render Help component', () => {
    it('render without crashing', () => {
        render(<Help/>);
    }); 
    test('test Search on the page', () => {
        const {getByText} = render(<Help/>);
        expect(getByText('Search')).toBeInTheDocument();
    })
})