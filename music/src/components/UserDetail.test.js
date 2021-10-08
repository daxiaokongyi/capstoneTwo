import React from "react";
import {render} from '../test-utils';
import UserDetail from './UserDetail.js';

describe('render UserDetail component', () => {
    it('render without crashing', () => {
        render(
            <UserDetail/>
        );
    }); 
    test('test text of User Name in the document', () => {
        const {getByText} = render(<UserDetail/>);
        expect(getByText('User Name:')).toBeInTheDocument();
    });
})