import React from "react";
import {render} from '../test-utils';
import Suggestion from './Suggestion.js';

describe('render Suggestion component', () => {
    it('render without crashing', () => {
        render(
            <Suggestion/>
        );
    }); 
})