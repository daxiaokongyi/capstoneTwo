import React from "react";
import {render} from '../test-utils';
import '@testing-library/jest-dom/extend-expect';

import Alert from "./Alert";

describe('Not Found Page', () => {
    test('render without crashing', () => {
        render(
            <Alert/>
        );
    });
    test('check class name', () => {
        const {container} = render(<Alert/>);
        expect(container.firstChild).toHaveClass('alert');
    });
    test('check error message', () => {
        const {getByText} = render(<Alert messages='test error message'/>);
        const result = getByText('test error message');
        expect(result).toBeInTheDocument();
    });
})
