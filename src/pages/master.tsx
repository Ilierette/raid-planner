import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Home from './home';
import Login from './auth/login';
import Register from './auth/register';
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
  faBan, faPlus, faPencilAlt,
  faCaretDown
} from '@fortawesome/free-solid-svg-icons'

import SiteNav from '../components/navbar';

import "../scss/navigation.scss"

library.add(
  fab, faPowerOff, faBars, faCaretDown,
  faUser, faComments, faCogs, faPowerOff,
  faHome, faTable, faHeadphones,
  faChalkboard, faBalanceScale,
  faBan, faPlus, faPencilAlt,
  faCaretDown
)

export default class MasterPage extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <SiteNav />
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-2 sidebar">
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
              </div>
              <main role="main" className="col px-0">
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/find-clan" component={Clan} />
                <Route path="/raid-schedule" component={Schedule} />
                <Route path="/upgrade-gear" component={Gear} />
                <Route path="/market" component={Marketplace} />
              </main>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}
