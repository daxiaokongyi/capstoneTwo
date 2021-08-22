import './App.css';
import {Route, Switch, NavLink} from 'react-router-dom';
import Home from '../src/components/Home';
import Songs from '../src/components/Songs';
import Signin from '../src/components/Signin';
import Signup from '../src/components/Signup';
import Favorite from '../src/components/Favorite';

function App() {
  return (
    <div className="App container">
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink exact to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink exact to="/signin">Sign In</NavLink>
              </li>
              <li className="nav-item">
                <NavLink exact to="/signup">Sign Up</NavLink>
              </li>
              <li className="nav-item">
                <NavLink exact to="/:username/favorite">My Favorite Music</NavLink>
              </li>
              <li className="nav-item">
                <NavLink exact to="/songs">Songs</NavLink>
              </li>
              {/* <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Category
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="/songs">Song</a>
                  <a className="dropdown-item" href="/artist">Artist</a>
                  <a className="dropdown-item" href="album">Album</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="/">Something else</a>
                </div>
              </li> */}
            </ul>
            <form className="form-inline my-2 my-lg-0" action="">
              <input className="form-control mr-sm-2" type="search" placeholder="Song, albums, artist ..." aria-label="Search" />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </nav>
      </header>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route exact path="/:username/favorite">
          <Favorite/>
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
      </Switch>
    </div>
  );
}

export default App;
