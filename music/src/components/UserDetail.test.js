import React from "react";
import {render} from '../test-utils';
import UserDetail from './UserDetail.js';

describe('render UserDetail component', () => {
    it('render without crashing', () => {
        render(
            <UserDetail/>
        );
    }); 
})