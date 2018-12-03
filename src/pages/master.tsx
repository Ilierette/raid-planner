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

import SiteNav from '../components/navbar';

import "../scss/navigation.scss"

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
                      <Link to="/" className="nav-link active">Home</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/login" className="nav-link">Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/register" className="nav-link">Register</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/find-clan" className="nav-link">Find clan</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/raid-schedule" className="nav-link">Raid schedule</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/upgrade-gear" className="nav-link">Gear upgrade chart</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/market" className="nav-link">Marketplace</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <main role="main" className="col">
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
