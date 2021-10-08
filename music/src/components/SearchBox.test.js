import React from "react";
import {render} from '../test-utils';
import SearchBox from "./SearchBox";

describe('Not Found Page', () => {
    test('render without crashing', () => {
        render(
            <SearchBox/>
        );
    });
})
