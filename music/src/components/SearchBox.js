import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import './SearchBox.css';

const SearchBox = () => {
    const history = useHistory();
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = evt => {
        setSearchTerm(evt.target.value);
    }

    const handleSubmit = evt => {
        evt.preventDefault();
        setSearchTerm(searchTerm.trim());
        searchTerm === '' ? history.push(`/search?term=singer`) : history.push(`/search?term=${searchTerm}`);
    }

    return (
        <form className="form-inline my-2 my-lg-0 search-box" onSubmit={handleSubmit}>
            <input
                className="form-control mr-sm-2"
                aria-label="Search"
                type="search" 
                name="searchTerm"
                placeholder="Search ..."
                onChange={handleChange}
                value={searchTerm}
                style={{"marginRight":"0.8rem"}}
            />
            <button className="btn btn-primary" type="submit">
                Search
            </button>
        </form>
    )
}

export default SearchBox;