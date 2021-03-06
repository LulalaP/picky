/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useApolloClient } from '@apollo/client';
import {
  BrowserRouter as Router,
  Switch, Route, Redirect,
} from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';

import Home from './components/home/Home';
import Discover from './components/discover/Discover';
import Footer from './components/Footer';
import Profile from './components/profile/Profile';
import Settings from './components/profile/Settings';
import UserLikes from './components/profile/UserLikes';
import UserCollections from './components/profile/UserCollections';
import PhotoDetails from './components/photo-page/PhotoDetails';
import CollectionDetails from './components/collection-page/CollectionDetails';
import SignIn from './components/sign-in/SignIn';
import SignUp from './components/sign-up/SignUp';
import useAuthorizedUser from './hooks/useAuthorizedUser';
import useField from './hooks/useField';
import NavSearchBar from './components/others/NavSearchBar';
import UserPage from './components/profile/UserPage';
import SearchPage from './components/search/SearchPage';
import BroadSearchPage from './components/search/BroadSearchPage';
import License from './components/license/License';
import LicenseZh from './components/license/LicenseZh';
import About from './components/about/About';
import AboutZh from './components/about/AboutZh';
import TopWebsites from './components/TopWebsites';
import ContactUs from './components/ContactUs';
import logo from './img/logo/logo1.svg';

const App = () => {
  const client = useApolloClient();
  const { authorizedUser } = useAuthorizedUser();
  const searchValue = useField('searchValue');
  const [newSearchValue, setNewSearchValue] = useState('');

  const Menu = () => {
    const handleLogout = async (event) => {
      event.preventDefault();
      localStorage.clear();
      client.resetStore();
    };

    let userPage;
    if (authorizedUser) userPage = `/user/@${authorizedUser.username}`;
    return (
      <div>
        <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" fixed="sticky">
          <Navbar.Brand href="/" className="container-row-navbar-brand">
            <img
              src={logo}
              width="30"
              height="30"
              alt="Picky brand logo"
            />
            Picky
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end light">
            <Nav>
              <div className="container-row-navbar-searchbox">
                <NavSearchBar placeholder="Search for free photos" />
              </div>
            </Nav>
            <Nav className="justify-content-end container-row-0">
              <a className="navbar-link" href="/discover">Discover</a>
              <a className="navbar-link" href="/license">License</a>
              <a className="navbar-link" href="/about">About</a>
              {authorizedUser && <a className="navbar-link" href={userPage}>Profile</a>}
              {authorizedUser && <a className="navbar-link" href="/user/edit">Settings</a>}
              {!authorizedUser && <a className="navbar-link" href="/signin">Login</a>}
              {authorizedUser && <button className="navbar-button-logout" type="submit" onClick={handleLogout}>Logout</button>}
              {!authorizedUser && <a href="/signup" className="navbar-button-join">Sign up</a>}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  };

  return (
    <Router>
      <div>
        <Menu />
        <div>
          <Switch>
            <Route path="/discover" exact>
              <Discover />
            </Route>
            <Route path="/license" exact>
              <License />
            </Route>
            <Route path="/license/zh" exact>
              <LicenseZh />
            </Route>
            <Route path="/faq" exact>
              <License />
            </Route>
            <Route path="/about" exact>
              <About />
            </Route>
            <Route path="/about/zh" exact>
              <AboutZh />
            </Route>
            <Route path="/contact" exact>
              <ContactUs />
            </Route>
            <Route path="/partner" exact>
              <TopWebsites />
            </Route>
            <Route path="/signin" exact>
              <SignIn />
            </Route>
            <Route path="/signup" exact>
              <SignUp />
            </Route>
            <Route path="/pickysearch" render={() => (<SearchPage authorizedUser={authorizedUser} />)}>
              {/* <SearchPage authorizedUser={authorizedUser} /> */}
            </Route>
            <Route path="/search" render={() => (<BroadSearchPage />)}>
              {/* <BroadSearchPage /> */}
            </Route>
            <Route path="/user" exact>
              <UserPage />
            </Route>
            <Route path="/user/edit" exact>
              <Settings authorizedUser={authorizedUser} />
            </Route>
            <Route path="/user/:username" exact>
              <Profile authorizedUser={authorizedUser} />
              <UserLikes authorizedUser={authorizedUser} />
            </Route>
            <Route path="/user/:username/collections" exact>
              <Profile authorizedUser={authorizedUser} />
              <UserCollections authorizedUser={authorizedUser} />
            </Route>
            <Route path="/photo/:id" exact>
              <PhotoDetails authorizedUser={authorizedUser} />
            </Route>
            <Route path="/collection/:id" exact>
              <CollectionDetails authorizedUser={authorizedUser} />
            </Route>
            <Route path="/" exact>
              <Home
                authorizedUser={authorizedUser}
                searchValue={searchValue}
                newSearchValue={newSearchValue}
                setNewSearchValue={setNewSearchValue}
              />
            </Route>
            <Redirect to="/" />
            <Redirect from="/search?" to="/search?" />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
