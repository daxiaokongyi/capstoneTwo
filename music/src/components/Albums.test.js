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
})
