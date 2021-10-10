import {LOG_OUT} from "./types";

import {logout} from './users';

test('test if token is changed to Null when logging out', () => {
    expect(logout()).toEqual({
        type: LOG_OUT,
        data: {token: null}
    });
})