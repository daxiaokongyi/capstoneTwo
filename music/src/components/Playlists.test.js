import React from "react";
import {render} from '../test-utils';
import Playlists from './Playlists.js';

describe('render Playlists component', () => {
    it('render withour crashing', () => {
        render(
            <Playlists/>
        );
    }); 
    test('test the table tag has a classname of table', () => {
        const {container} = render(<Playlists/>);   
        expect(container.getElementsByClassName('table').length).toBe(1);
    });
})