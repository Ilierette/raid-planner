import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import Home from './home';
import Login from './login';
import Register from './register';
import Clan from './clan';
import Schedule from './schedule';
import Gear from './upgradeGear';
import Marketplace from './marketplace';
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
import "../scss/navigation.scss"
import { market } from '../store/marketStore';
import { user } from '../store/userStore';
import CharacterSearch from './characterSearch';
import { observer } from 'mobx-react';

library.add(
  fab, faPowerOff, faBars, faCaretDown,
  faUser, faComments, faCogs, faPowerOff,
  faHome, faTable, faHeadphones,
  faChalkboard, faBalanceScale,
  faBan, faPlus, faPencilAlt, faTimes, faCrown,
  faSave, faSearch
)

@observer
export default class MasterPage extends React.Component {
  componentDidMount() {
    market.getStoreData();
    user.authListener();
  }
  render() {
    return (
      <div>
        {user.isLoading ?
          <div className="loader"></div>
          :
          <Router>
            <div>
              <div className="container-fluid">
                <div className="row">
                  {
                    user.isAuthUser ?
                      <div className="sidebar">
                        <div className="sidebar-sticky">
                          <ul className="nav side-nav flex-column">
                            <li className="nav-item">
                              <a className="navbar-brand col-sm-3 col-md-2 mr-0 text-light" href="#">
                                <FontAwesomeIcon icon={['fab', 'react']} />
                                <span className="ml-2 brand-name">BNS Raid Planner</span>
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
                              <a className="nav-link text-light" href="#">
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
                      <Route exact path="/" component={Home} />
                      <Route path="/character" component={CharacterSearch} />
                      <Route path="/find-clan" component={Clan} />
                      <Route exact path="/raid-schedule" component={Schedule} />
                      <Route exact path="/upgrade-gear" component={Gear} />
                      <Route exact path="/market" component={Marketplace} />
                      <Route exact path="/login" render={() => (user.isAuthUser ? <Redirect to="/" /> : <Login />)} />
                      <Route exact path="/register" render={() => (user.isAuthUser ? <Redirect to="/" /> : <Register />)} />
                    </div>
                  </main>
                </div>
              </div>
            </div>
          </Router>
        }
      </div>
    );
  }
}
