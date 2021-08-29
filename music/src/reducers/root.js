import {combineReducers} from 'redux';
import songs from './songs';
import users from './users';

export default combineReducers({
    songs,
    users
});
