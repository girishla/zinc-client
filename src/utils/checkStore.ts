import { conformsTo } from 'lodash';
import { isFunction } from 'lodash';
import { isObject } from 'lodash';
import * as invariant from 'invariant';

/**
 * Validate the shape of redux store
 */
export default function checkStore(store: any) {

  const shape = {
    dispatch: isFunction,
    subscribe: isFunction,
    getState: isFunction,
    replaceReducer: isFunction,
    runSaga: isFunction,
    injectedReducers: isObject,
    injectedSagas: isObject,
  };
  // tslint:disable-next-line no-console
  console.log("checkStore", store);
  invariant(
    conformsTo(store, shape),
    '(app/utils...) injectors: Expected a valid redux store'
  );
}
