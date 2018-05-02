import { Action } from 'redux';
import { takeLatest } from 'redux-saga/effects';
import { call, put } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import menuapi from '../LeftDrawer/MenuItems/menuapi';
import { layoutActions, LOAD_MENU_FAILED } from './actions';


// worker Saga: will be fired on LOAD_MENU actions
export function* fetchMenu(action: Action) {
  try {
    const data = yield call(menuapi.getMenu, action);
    yield put({ type: getType(layoutActions.loadMenuSuccess), data });
  } catch (e) {
    yield put({ type: LOAD_MENU_FAILED, message: e.message });
  }
}

/**
 * Watches for LOAD_MENU actions and calls fetchMenu when one comes in.
 * By using `takeLatest` only the result of the latest API call is applied.
 */

export function* appSaga() {
  yield takeLatest(getType(layoutActions.loadMenu), fetchMenu);
}

// All sagas to be loaded
export default [appSaga];
