import {hot} from 'react-hot-loader/root';
import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {hydrate, render} from 'react-dom';
import {Provider} from 'react-redux';
import {configureStore} from 'redux-starter-kit';
import thunk from 'redux-thunk';

import rootReducer from './AppTemplate/reducers';
import Routes from './routes.browser';

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

const App = () => (
  <Provider store={store}>
    <Router>
      <Routes />
    </Router>
  </Provider>
);

/* Check if the Server Pre-fetch some of the App data and we need to `hydrate` the App with it */
const renderMethod = global.__INITIAL_FETCHED_SERVER_DATA__ ? hydrate : render;
renderMethod(<App />, document.getElementById('app'));

export default module.hot ? hot(App) : App;
