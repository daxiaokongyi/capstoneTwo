import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import UserDetail from './UserDetail';
import Songs from './Songs';
import Signup from './Signup';
import Signin from './Signin';

const Routes = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route exact path="/songs">
                    <Songs/>
                </Route>
                <Route exact path="/signin">
                    <Signin/>
                </Route>
                <Route exact path="/signup">
                    <Signup/>
                </Route>
                <Route path="/:username">
                    <UserDetail/>
                </Route>
            </Switch>
        </div>
    );
}

export default Routes;