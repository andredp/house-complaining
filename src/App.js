// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import configureStore from './store/configureStore';
import { UserIsAuthenticated, UserIsNotAuthenticated } from './utils/routingAuth';
import LoginPage from './pages/login';
import HomePage from './pages/home';

export default class App extends React.Component {
  history = createHistory();
  store = configureStore(this.history);

  render = () =>
    (<Provider store={this.store}>
      <ConnectedRouter history={this.history}>
        <div>
          <Route path="/" exact component={HomePage} />
          <Route path="/home" component={UserIsAuthenticated(HomePage)} />
          <Route path="/login" component={UserIsNotAuthenticated(LoginPage)} />
        </div>
      </ConnectedRouter>
    </Provider>);
}
