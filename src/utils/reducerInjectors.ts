import * as invariant from 'invariant';
import { isEmpty } from 'lodash';
import { isFunction } from 'lodash';
import { isString } from 'lodash';

import checkStore from './checkStore';
import createReducer from '../reducers';


export function injectReducerFactory(store: any, isValid: boolean) {
  return function injectReducer(key: any, reducer: any) {
    if (!isValid) {
      checkStore(store);
    }

    invariant(
      isString(key) && !isEmpty(key) && isFunction(reducer),
      '(app/utils...) injectReducer: Expected `reducer` to be a reducer function'
    );

    // Check `store.injectedReducers[key] === reducer` for hot reloading when a key is the same but a reducer is different
    if (Reflect.has(store.injectedReducers, key) && store.injectedReducers[key] === reducer) {
      return;
    }

    store.injectedReducers[key] = reducer; // eslint-disable-line no-param-reassign
    store.replaceReducer(createReducer(store.injectedReducers));
  };
}

export default function getInjectors(store: any) {
  checkStore(store);

  return {
    injectReducer: injectReducerFactory(store, true),
  };
}
