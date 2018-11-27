import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {BrowserRouter, HashRouter} from 'react-router-dom';
import MasterPage from './pages/master';

import 'semantic-ui-css/semantic.min.css';
import './scss/main.scss';

ReactDOM.render(
  <BrowserRouter>
    <MasterPage/>
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);