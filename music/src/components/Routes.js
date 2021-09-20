import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import UserDetail from './UserDetail';
import Signup from './Signup';
import Signin from './Signin';
import SongDetail from './SongDetail';
import Suggestion from './Suggestion';
import SearchResult from './SearchResult';
import Artists from './Artists';

const Routes = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route exact path="/suggestion">
                    <Suggestion/>
                </Route>
                <Route exact path="/signin">
                    <Signin/>
                </Route>
                <Route exact path="/signup">
                    <Signup/>
                </Route> 
                <Route path="/artists/:name">
                    <Artists/>
                </Route>
                <Route path="/songs/:songid">
                    <SongDetail/>
                </Route>
                <Route path="/search">
                    <SearchResult/>
                </Route>
                <Route path="/user/:username">
                    <UserDetail/>
                </Route>
            </Switch>
        </div>
    );
}

export default Routes;