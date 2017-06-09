import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import promiseMiddleware from 'redux-promise-middleware';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reduxCatch from 'redux-catch';
import rootReducer from '../reducers';

// TODO: Maybe log it somewhere...
function errorHandler(error, getState, lastAction /* , dispatch */) {
  console.error(error);
  console.debug('current state', getState());
  console.debug('last action was', lastAction);
  // optionally dispatch an action due to the error using the dispatch parameter
}

export default initialState =>
  createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(
        reduxCatch(errorHandler),
        routerMiddleware(browserHistory),
        thunk,
        promiseMiddleware(),
        logger,
      ),
    ),
  );
