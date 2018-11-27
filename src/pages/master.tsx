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

class MasterPage extends React.Component {
  render() {

    return (
      <div>
        <Router>
          <div className="container">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/find-clan">Find clan</Link>
              </li>
              <li>
                <Link to="/raid-schedule">Raid schedule</Link>
              </li>
              <li>
                <Link to="/upgrade-gear">Gear upgrade chart</Link>
              </li>
              <li>
                <Link to="/market">Marketplace</Link>
              </li>
            </ul>

            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/find-clan" component={Clan} />
            <Route path="/raid-schedule" component={Schedule} />
            <Route path="/upgrade-gear" component={Gear} />
            <Route path="/market" component={Marketplace} />
          </div>
        </Router>
      </div>
    );
  }
}

export default MasterPage;
