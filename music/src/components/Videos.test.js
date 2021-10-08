import React from "react";
import {render} from '../test-utils';
import Videos from './Videos.js';

describe('render Videos component', () => {
    it('render without crashing', () => {
        render(
            <Videos/>
        );
    }); 
    test('test the table tag has a classname of table', () => {
        const {container} = render(<Videos/>);   
        expect(container.getElementsByClassName('table').length).toBe(1);
    });
})