import React from "react";
import {render} from '../test-utils';
import Videos from './Videos.js';

describe('render Videos component', () => {
    it('render without crashing', () => {
        render(
            <Videos/>
        );
    }); 
})