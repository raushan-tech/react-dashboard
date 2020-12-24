import React from 'react';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import {history} from '../_helpers';
import Header from '../_components/header/Header';

function App() {
  return (
    <div>
      <Router history={history}>
        <Header>head</Header>
      </Router>
    </div>
  );
}

export {App};