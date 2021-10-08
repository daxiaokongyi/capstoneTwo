import React from "react";
import {render} from '../test-utils';
import '@testing-library/jest-dom/extend-expect';

import Albums from "./Albums";

describe('Not Found Page', () => {
    test('render without crashing', () => {
        render(
            <Albums/>
        );
    });
    test('test the table tag has a classname of table', () => {
        const {container} = render(<Albums/>);   
        expect(container.getElementsByClassName('table').length).toBe(1);
    });
})


