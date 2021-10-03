import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../common/LoadingSpinner';
import { useHistory } from 'react-router-dom';

const Suggestion = () => {
    const history = useHistory();
    const genreRecommendArray = useSelector(st => st.users.user.favoriteSongs);     

    let genreNameSelected = genreRecommendArray.length !== 0 ? genreRecommendArray[genreRecommendArray.length - 1][3] : 'singer';

    // check if the current genren name includes forward slash, /
    if (genreNameSelected.includes('/')) {
        genreNameSelected = genreNameSelected.split('/')[0];
    }

    useEffect(()=> {
        async function getSuggestionSongs(genreName) {
            history.push(`/search?term=${genreName}`);
        }
        if (genreNameSelected) {
            getSuggestionSongs(genreNameSelected);
        }
    },[genreNameSelected]);

    return(
        <LoadingSpinner/>
    )
}

export default Suggestion;