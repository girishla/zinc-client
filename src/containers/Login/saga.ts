// This file contains the sagas used for login async actions in our app. It's divided into
// "effects" that the sagas call (`authorize` and `logout`) and the actual sagas themselves,
// which listen for actions.

// Sagas help us gather all our side effects (network requests in this case) in one place

import { take, call, put, all } from 'redux-saga/effects'
import auth from './auth'
import { push } from 'react-router-redux';
import { takeLatest } from 'redux-saga/effects'

import {
  SENDING_REQUEST,
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  SET_AUTH,
  LOGOUT,
  CHANGE_FORM,
  REQUEST_ERROR,
  CLEAR_ERROR,
  SET_PROFILE,
  GET_PROFILE
} from './actions'
import { IAuthResponse } from './IAuthResponse';

// const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

/**
 * Effect to handle authorization
 * @param  {string} username               The username of the user
 * @param  {string} password               The password of the user
 * @param  {object} options                Options
 * @param  {boolean} options.isRegistering Is this a register request?
 */
export function* authorize({ username, password, isRegistering }: any) {

  yield put({ type: CLEAR_ERROR, error: "" }) // Clear ERROR


  // We send an action that tells Redux we're sending a request
  yield put({ type: SENDING_REQUEST, sending: true })
  // yield delay(5000)

  // We then try to register or log in the user, depending on the request
  try {

    let response: IAuthResponse

    // For either log in or registering, we call the proper function in the `auth`
    // module, which is asynchronous. Because we're using generators, we can work
    // as if it's synchronous because we pause execution until the call is done
    // with `yield`!
    if (isRegistering) {
      response = yield call(auth.register, username, password)
    } else {
      response = yield call(auth.login, username, password)
    }

    yield put({ type: SET_PROFILE, profile: response.user })

    return response
  } catch (error) {
    // If we get an error we send Redux the appropiate action and return
    yield put({ type: REQUEST_ERROR, error: error.message })

    return false
  } finally {
    // When done, we tell Redux we're not in the middle of a request any more
    yield put({ type: SENDING_REQUEST, sending: false })
  }
}

/**
 * Effect to handle logging out
 */
export function* logoutTask() {
  // We tell Redux we're in the middle of a request
  yield put({ type: SENDING_REQUEST, sending: true })


  try {

    yield put({ type: SET_AUTH, newAuthState: false })

    yield call(auth.logout)
    yield put({ type: SENDING_REQUEST, sending: false })

    yield put(push('/login'));


  } catch (error) {
    yield put({ type: REQUEST_ERROR, error: error.message })
  }
}


export function* loginTask(loginAction: any) {

  const request = loginAction.data;
  const { username, password } = request;

  const authorised = yield call(authorize, { username, password, isRegistering: false });

  if (authorised) {
    yield put({ type: SET_AUTH, newAuthState: true }) // User is logged in (authorized)
    // yield put({ type: CHANGE_FORM, newFormState: { username: '', password: '' } }) // Clear form
    yield put({ type: REQUEST_ERROR, error: "" }) // Clear ERROR

    yield put(push('/dashboard'));
  }


}

/**
 * Log in saga
 */
export function* loginFlow() {

  yield takeLatest(LOGIN_REQUEST, loginTask)


}

/**
 * Log out saga
 * This is basically the same as the `if (winner.logout)` of above, just written
 * as a saga that is always listening to `LOGOUT` actions
 */
export function* logoutFlow() {

  yield takeLatest(LOGOUT, logoutTask)


}

/**
 * Register saga
 * Very similar to log in saga!
 */
export function* registerFlow() {

  // We always listen to `REGISTER_REQUEST` actions
  const request = yield take(REGISTER_REQUEST)
  const { username, password } = request.data

  // We call the `authorize` task with the data, telling it that we are registering a user
  // This returns `true` if the registering was successful, `false` if not
  const wasSuccessful = yield call(authorize, { username, password, isRegistering: true })

  // If we could register a user, we send the appropiate actions
  if (wasSuccessful) {
    yield put({ type: SET_AUTH, newAuthState: true }) // User is logged in (authorized) after being registered
    yield put({ type: CHANGE_FORM, newFormState: { username: '', password: '' } }) // Clear form
    yield put(push('/dashboard'));

  }


}

/**
 * Effect to handle logging out
 */
export function* getProfileTask() {
  // We tell Redux we're in the middle of a request
  yield put({ type: SENDING_REQUEST, sending: true })

  try {

    const response: IAuthResponse = yield call(auth.getprofile)
    yield put({ type: SENDING_REQUEST, sending: false })

    yield put({ type: SET_PROFILE, profile: response.user })

  } catch (error) {
    // if there is a problem getting the profile, kick the user out
    yield put({ type: LOGOUT })
  }
}

export function* getProfile() {

  yield takeLatest(GET_PROFILE, getProfileTask)


}

export default function* rootSaga() {
  yield all([
    loginFlow(), logoutFlow(), registerFlow(), getProfile()
  ])
}