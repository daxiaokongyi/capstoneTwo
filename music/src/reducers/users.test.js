import usersReducer from './users';

import {
    LOG_OUT,
} from '../actions/types';

test('testing log out function works', () => {
    const state = {
        token: 'test token'
    }

    const action = {
        type: LOG_OUT,
    }
    expect(usersReducer(state, action)).toMatchObject({
        token: null
    })
})