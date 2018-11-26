import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  RouteComponentProps,
  
} from 'react-router-dom';

import './scss/app.scss';

import Home from './pages/home';

export default class App extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <div className="container">
        <Router>
          <div className="container">
            <Route exact path="/" component={Home} />
          </div>
        </Router>
      </div>
    );
  }
}
