// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { UserIsAuthenticated, UserIsNotAuthenticated } from './utils/routingAuth';
import LoginPage from './pages/login';
import HomePage from './pages/home';
import { validate } from './actions/auth';
import LocalStorageAPI from './utils/LocalStorageAPI';

type Props = {
  validate: (token: string) => void,
};

class App extends React.Component {
  props: Props;
  history: any;

  componentWillMount() {
    this.history = syncHistoryWithStore(browserHistory, this.context.store);
  }

  componentDidMount() {
    const token = LocalStorageAPI.getAuthToken();
    if (token) {
      this.props.validate(token);
    }
  }

  render() {
    return (
      <Router history={this.history}>
        <Route path="/" exact component={HomePage} />
        <Route path="/home" component={UserIsAuthenticated(HomePage)} />
        <Route path="/login" component={UserIsNotAuthenticated(LoginPage)} />
      </Router>
    );
  }

  static contextTypes = {
    store: PropTypes.object.isRequired,
  };
}

const mapDispatchToProps = {
  validate,
};

export default connect(null, mapDispatchToProps)(App);
