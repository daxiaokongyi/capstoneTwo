import React from "react";
import {render} from '../test-utils';

import NotFound from "./NotFound";

describe('Not Found Page', () => {
    test('render without crashing', () => {
        render(
            <NotFound/>
        );
    });
    test('check text field', () => {
        const {getByText} = render(<NotFound/>);
        const result = getByText('Sorry, your search format cannot be accepted');
        expect(result).toBeInTheDocument();
    });
})
