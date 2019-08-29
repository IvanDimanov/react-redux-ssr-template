import React, {lazy} from 'react';
import {Route} from 'react-router-dom';
import {Switch, Redirect} from 'react-router';

import waitingComponent from './utils/waitingComponent';
import AppTemplate from './AppTemplate';

const Home = lazy(() => import(/* webpackChunkName: "Home" */ './pages/Home'));
const People = lazy(() => import(/* webpackChunkName: "People" */ './pages/People'));
const NotFound = lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));

const Routes = () => (
  <AppTemplate>
    <Switch>
      <Route path='/home' component={waitingComponent(Home)} />
      <Route exact from='/' component={() => <Redirect to='/home' />} />

      <Route path='/people/:personId' component={waitingComponent(People)} />
      <Route exact from='/people' component={() => <Redirect to='/people/1' />} />

      <Route component={waitingComponent(NotFound)} />
    </Switch>
  </AppTemplate>
);

export default Routes;
