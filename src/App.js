// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import configureStore from './store/configureStore';
import { UserIsAuthenticated } from './utils/routingAuth';
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
        </div>
      </ConnectedRouter>
    </Provider>);
}
