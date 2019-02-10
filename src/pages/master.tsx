import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
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
  faBan, faPlus, faPencilAlt, faTimes, faCrown, faSave
} from '@fortawesome/free-solid-svg-icons'
import SiteNav from '../components/navbar';
import "../scss/navigation.scss"
import { market } from '../store/marketStore';
import { user } from '../store/userStore';

library.add(
  fab, faPowerOff, faBars, faCaretDown,
  faUser, faComments, faCogs, faPowerOff,
  faHome, faTable, faHeadphones,
  faChalkboard, faBalanceScale,
  faBan, faPlus, faPencilAlt, faTimes, faCrown,
  faSave
)

export default class MasterPage extends React.Component {
  componentDidMount() {
    market.getStoreData();
  }
  render() {
    return (
      <Router>
        <div>
          {
            user.isAuthUser &&
            <SiteNav />
          }
          <div className="container-fluid">
            <div className="row">
              {
                user.isAuthUser ?
                  <div className="sidebar">
                    <div className="sidebar-sticky">
                      <ul className="nav flex-column">
                        <li className="nav-item">
                          <Link to="/" className="nav-link active text-light">
                            <FontAwesomeIcon icon="home" className="mr-3" />
                            Home
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
                      </ul>
                    </div>
                  </div> :
                  ("")
              }
              {user.isAuthUser ?
                <main role="main" className="col px-0">
                  <div>
                    <Route exact path="/" component={Home} />
                    <Route path="/find-clan" component={Clan} />
                    <Route path="/raid-schedule" component={Schedule} />
                    <Route path="/upgrade-gear" component={Gear} />
                    <Route path="/market" component={Marketplace} />
                  </div>
                </main> :
                <div className="auth-box mx-auto">
                  <div className="logo"></div>
                  <Route path="/login" component={Login} />
                  <Route path="/register" component={Register} />
                </div>
              }
            </div>
          </div>
        </div>
      </Router>
    );
  }
}
