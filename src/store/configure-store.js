import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import reduxCatch from 'redux-catch';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

// TODO: Maybe log it somewhere...
function errorHandler(error, getState, lastAction /* , dispatch */) {
  console.error(error);
  console.debug('current state', getState());
  console.debug('last action was', lastAction);
  // optionally dispatch an action due to the error using the dispatch parameter
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  /*  initialState, */
  composeWithDevTools(
    applyMiddleware(
      reduxCatch(errorHandler),
      routerMiddleware(browserHistory),
      sagaMiddleware,
      // thunk,
      // promiseMiddleware(),
      logger,
    ),
  ),
);

sagaMiddleware.run(rootSaga);

export default store;
