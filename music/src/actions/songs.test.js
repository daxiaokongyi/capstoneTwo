import {
    FAV_BUTTON_CLICKED, 
    CLEAR_SONGS_ERRORS
} from './types';

import {
    clearFetchSongsErrs, 
    isFavBtnClicked
} from './songs';

test('test of cleaning of fetching songs errors', () => {
    expect(clearFetchSongsErrs()).toEqual({
        type: CLEAR_SONGS_ERRORS,  
        data: ''
    })
});

test('test is a button is clicked to get a song added as favorited song', () => {
    expect(isFavBtnClicked(true)).toEqual({
        type: FAV_BUTTON_CLICKED,  
        data: true
    })
});

