import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { MasterPage } from './pages/master';

import './scss/main.scss';


ReactDOM.render(
  <BrowserRouter>
    <MasterPage />
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);