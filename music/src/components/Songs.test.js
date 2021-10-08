import React from "react";
import {render} from '../test-utils';
import Songs from './Songs.js';

describe('render Songs component', () => {
    it('render withour crashing', () => {
        render(
            <Songs/>
        );
    }); 
})