import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import { UserIsAuthenticated, UserIsNotAuthenticated } from './utils/routingAuth';
import configureStore from './store/configure-store';
import WebAPI from './utils/WebAPI';

import LoginPage from './pages/login';
import HomePage from './pages/home';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

WebAPI.init();

const App = () =>
  (<Provider store={store}>
    <Router history={history}>
      <Route path="/" exact component={HomePage} />
      <Route path="/home" component={UserIsAuthenticated(HomePage)} />
      <Route path="/login" component={UserIsNotAuthenticated(LoginPage)} />
    </Router>
  </Provider>);

export default App;
