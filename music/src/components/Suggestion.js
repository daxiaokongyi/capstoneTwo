import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongsFromAPI } from '../actions/songs'; 
import { useHistory } from 'react-router-dom';

const Suggestion = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const genreRecommendArray = useSelector(st => st.users.user.favoriteSongs); 
    console.log(`genreRecommendArray: ${genreRecommendArray}`);

    let genreNameSelected = genreRecommendArray.length !== 0 ? genreRecommendArray[genreRecommendArray.length - 1][3] : 'popular';

    useEffect(()=> {
        async function getSuggestionSongs(genreName) {
            dispatch(fetchSongsFromAPI(genreName));
            history.push(`/search?term=${genreName}`);
        }
        getSuggestionSongs(genreNameSelected);
    },[]);
    return(
        <div>
            Suggestion Page
        </div>
    )
}

export default Suggestion;