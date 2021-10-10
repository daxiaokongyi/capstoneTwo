import songsReducer from './songs';

import {
    CLEAR_SONGS_ERRORS,
    FAV_BUTTON_CLICKED
} from '../actions/types';

test('testing no songs errors exist', () => {
    const state = {
        getSongsErrors: 'test errors'
    }

    const action = {
        type: CLEAR_SONGS_ERRORS,
    }
    expect(songsReducer(state, action)).toMatchObject({
        getSongsErrors: ''
    })
})

test('test if the state of isFavBtnClicked turned to true', () => {
    const state = {
        isFavBtnClicked: false 
    }

    const action = {
        type: FAV_BUTTON_CLICKED,
        data: true
    }
    expect(songsReducer(state, action)).toMatchObject({
        isFavBtnClicked: true
    })
});