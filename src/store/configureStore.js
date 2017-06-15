import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

export default function configureStore(history, initialState) {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history),
        sagaMiddleware,
        createLogger({
          predicate: () => process.env.NODE_ENV === 'development',
          collapsed: (getState, action) => action.type.startsWith('@@'),
        }),
      ),
    ),
  );

  sagaMiddleware.run(rootSaga, store.dispatch);

  return store;
}
