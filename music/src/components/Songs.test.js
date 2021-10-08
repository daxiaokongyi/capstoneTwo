import React from "react";
import {render} from '../test-utils';
import Songs from './Songs.js';

describe('render Songs component', () => {
    it('render withour crashing', () => {
        render(
            <Songs/>
        );
    }); 
    test('test the table tag has a classname of table', () => {
        const {container} = render(<Songs/>);   
        expect(container.getElementsByClassName('table').length).toBe(1);
    });
})