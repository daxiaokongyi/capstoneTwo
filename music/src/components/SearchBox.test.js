import React from "react";
import {render} from '../test-utils';
import SearchBox from "./SearchBox";
import '@testing-library/jest-dom/extend-expect';

describe('Not Found Page', () => {
    test('render without crashing', () => {
        render(
            <SearchBox/>
        );
    });
    test('check the text on the button tag', () => {
        const {getByText} = render(<SearchBox/>);
        expect(getByText('Search')).toBeInTheDocument();
    })
})
