import React from 'react';
import {Route} from 'react-router-dom';
import {Switch, Redirect} from 'react-router';

import AppTemplate from './AppTemplate';

import Home from './pages/Home';
import People from './pages/People';
import NotFound from './pages/NotFound';

const Routes = () => (
  <AppTemplate>
    <Switch>
      <Route path='/home' component={Home} />
      <Route exact from='/' component={() => <Redirect to='/home' />} />

      <Route path='/people/:personId' component={People} />
      <Route exact from='/people' component={() => <Redirect to='/people/1' />} />

      <Route component={NotFound} />
    </Switch>
  </AppTemplate>
);

export default Routes;
