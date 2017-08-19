import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import AppRouter from './components/AppRouter';

import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <Router>
    <AppRouter />
  </Router>,
  document.getElementById('root')
);
