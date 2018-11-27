import * as React from 'react';
import { 
  BrowserRouter as Router,
  Route,
  Link 
} from 'react-router-dom';

import Home from './home';
import Login from './login';
import Register from './register';


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
            </ul>

            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </div>
        </Router>
      </div>
    );
  }
}

export default MasterPage;
