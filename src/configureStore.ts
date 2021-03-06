/**
 * Create the store with asynchronously loaded reducers
 */

import { applyMiddleware, compose, createStore, } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';

import { routerMiddleware } from 'react-router-redux';


import { History } from 'history';
import { initialState as defaultLayoutState } from './containers/Layout/reducer'

const sagaMiddleware = createSagaMiddleware();


export default function configureStore(initialState = {}, history: History) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
      typeof window === 'object' &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose;
  /* eslint-enable */

  const store: any = createStore(createReducer({}),
    { layout: defaultLayoutState },
    composeEnhancers(...enhancers));

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if ((module as any).hot) {
    (module as any).hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }



  return store;
}
