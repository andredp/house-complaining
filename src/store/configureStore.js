// @flow
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

export default function configureStore(history: Object, initialState?: Object) {
  const sagaMiddleware = createSagaMiddleware();
  const enhancers = composeWithDevTools(
    applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware,
      createLogger({
        predicate: () => process.env.NODE_ENV === 'development',
        collapsed: (getState, action) => action.type.startsWith('@@'),
      }),
    ),
  );
  // create the store
  const store = createStore(rootReducer, initialState, enhancers);
  // run the root saga
  sagaMiddleware.run(rootSaga, store.dispatch);
  return store;
}
