// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { UserIsAuthenticated, UserIsNotAuthenticated } from './utils/routingAuth';
import LoginPage from './pages/login';
import HomePage from './pages/home';
import * as authActions from './actions/auth';
import LocalStorageAPI from './utils/LocalStorageAPI';

import store, { history } from './store/configure-store';

export default class App extends React.Component {
  componentDidMount() {
    const token = LocalStorageAPI.getAuthToken();
    if (token) {
      store.dispatch(authActions.validate(token));
    }
  }

  render = () =>
    (<Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <Route path="/" exact component={HomePage} />
          <Route path="/home" component={UserIsAuthenticated(HomePage)} />
          <Route path="/login" component={UserIsNotAuthenticated(LoginPage)} />
        </div>
      </ConnectedRouter>
    </Provider>);
}
