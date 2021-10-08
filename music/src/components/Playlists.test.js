import React from "react";
import {render} from '../test-utils';
import Playlists from './Playlists.js';

describe('render Playlists component', () => {
    it('render withour crashing', () => {
        render(
            <Playlists/>
        );
    }); 
})