import * as React from 'react';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {
  faPowerOff, faBars, faCaretDown,
  faUser, faComments, faCogs,
  faHome, faTable, faHeadphones,
  faChalkboard, faBalanceScale,
  faBan, faPlus, faPencilAlt, faTimes, faCrown, faSave, faSearch
} from '@fortawesome/free-solid-svg-icons'
import { Home } from './home';
import { Clan } from './clan';
import { CharacterSearch } from './characterSearch';
import { Login } from '../pages/auth/login';
import { Register } from '../pages/auth/register';
import { Schedule } from '../pages/tables/schedule';
import { Gear } from '../pages/tables/upgradeGear';
import { Marketplace } from '../pages/tables/marketplace';

import "../scss/navigation.scss"

import GlobalContext from '../store/globalContext';
import gearContext from '../store/gearContext';
import RaidStore from '../store/raidContext'


library.add(
  fab, faPowerOff, faBars, faCaretDown,
  faUser, faComments, faCogs, faPowerOff,
  faHome, faTable, faHeadphones,
  faChalkboard, faBalanceScale,
  faBan, faPlus, faPencilAlt, faTimes, faCrown,
  faSave, faSearch
)


export const MasterPage = observer(() => {
  const { isLoading, isAuthUser, authListener, logout } = React.useContext(GlobalContext)
  const { getData } = React.useContext(gearContext)
  const { getRaidData } = React.useContext(RaidStore)

  useEffect(() => {
    getData()
    authListener()
    getRaidData()
  },[])

  return (
    <div>
      {isLoading ?
        <div className="loader"></div>
        :
        <Router>
          <div>
            <div className="container-fluid">
              <div className="row">
                {
                  isAuthUser ?
                    <div className="sidebar">
                      <div className="sidebar-sticky">
                        <ul className="nav side-nav flex-column">
                          <li className="nav-item">
                            <a className="navbar-brand col-sm-3 col-md-2 mr-0 text-light" href="#">
                              <FontAwesomeIcon icon={['fab', 'react']} />
                              <span className="ml-2 brand-name">Game tools</span>
                            </a>
                          </li>
                          <li>
                            <hr className="hr-light" />
                          </li>
                          <li className="nav-item">
                            <Link to="/" className="nav-link active text-light">
                              <FontAwesomeIcon icon="home" className="mr-3" />
                              Home
                          </Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/character" className="nav-link text-light">
                              <FontAwesomeIcon icon="search" className="mr-3" />
                              Character search
                          </Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/raid-schedule" className="nav-link text-light">
                              <FontAwesomeIcon icon="table" className="mr-3" />
                              Raid schedule
                          </Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/market" className="nav-link text-light">
                              <FontAwesomeIcon icon="balance-scale" className="mr-3" />
                              Marketplace
                          </Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/upgrade-gear" className="nav-link text-light">
                              <FontAwesomeIcon icon="chalkboard" className="mr-3" />
                              Gear upgrade chart
                          </Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/find-clan" className="nav-link text-light">
                              <FontAwesomeIcon icon="headphones" className="mr-3" />
                              Find clan
                          </Link>
                          </li>
                          <li>
                            <hr className="hr-light" />
                          </li>
                          <li className="nav-item">
                            <a className="nav-link text-light" href="#" onClick={logout}>
                              <FontAwesomeIcon icon="power-off" className="mr-2" />
                              Logout
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div> :
                    ("")
                }
                <main role="main" className="col px-0">
                  <div>
                    <Route
                      exact path="/"
                      render={() => (!isAuthUser ? <Redirect to="/login" /> : <Home />)} />
                    <Route
                      path="/character"
                      render={() => (!isAuthUser ? <Redirect to="/login" /> : <CharacterSearch />)} />
                    <Route
                      path="/find-clan"
                      render={() => (!isAuthUser ? <Redirect to="/login" /> : <Clan />)} />
                    <Route
                      exact path="/raid-schedule"
                      render={() => (!isAuthUser ? <Redirect to="/login" /> : <Schedule />)} />
                    <Route
                      exact path="/upgrade-gear"
                      render={() => (!isAuthUser ? <Redirect to="/login" /> : <Gear />)} />
                    <Route
                      exact path="/market"
                      render={() => (!isAuthUser ? <Redirect to="/login" /> : <Marketplace />)} />
                    <Route
                      exact path="/login"
                      render={() => (isAuthUser ? <Redirect to="/" /> : <Login />)} />
                    <Route
                      exact path="/register"
                      render={() => (isAuthUser ? <Redirect to="/" /> : <Register />)} />
                  </div>
                </main>
              </div>
            </div>
          </div>
        </Router>
      }
    </div>
  );
})
