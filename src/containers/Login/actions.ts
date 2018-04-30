import { createAction } from "typesafe-actions";


/*
 * Actions describe changes of state in your application
 */

export const CHANGE_FORM = 'CHANGE_FORM'
export const SET_AUTH = 'SET_AUTH'
export const SENDING_REQUEST = 'SENDING_REQUEST'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const LOGOUT = 'LOGOUT'
export const REQUEST_ERROR = 'REQUEST_ERROR'
export const CLEAR_ERROR = 'CLEAR_ERROR'

export const loginActions = {
  /**
 * Sets the form state
 * @param  {object} newFormState          The new state of the form
 * @param  {string} newFormState.username The new text of the username input field of the form
 * @param  {string} newFormState.password The new text of the password input field of the form
 */
  changeForm: createAction(CHANGE_FORM, (newFormState: any) => ({
    newFormState,
    type: CHANGE_FORM,
  })),
  /**
 * Sets the authentication state of the application
 * @param  {boolean} newAuthState True means a user is logged in, false means no user is logged in
 */
  setAuthState: createAction(SET_AUTH, (newAuthState: any) => ({
    newAuthState,
    type: SET_AUTH,
  })),
  /**
 * Sets the `currentlySending` state, which displays a loading indicator during requests
 * @param  {boolean} sending True means we're sending a request, false means we're not
 */
  sendingRequest: createAction(SENDING_REQUEST, (sending: boolean) => ({
    sending,
    type: SENDING_REQUEST,
  })),
  /**
 * Tells the app we want to log in a user
 * @param  {object} data          The data we're sending for log in
 * @param  {string} data.username The username of the user to log in
 * @param  {string} data.password The password of the user to log in
 */
  loginRequest: createAction(LOGIN_REQUEST, (data: any) => ({
    data,
    type: LOGIN_REQUEST,
  })),
  /**
 * Tells the app we want to log out a user
 */
  logout: createAction(LOGOUT),
  /**
 * Tells the app we want to register a user
 * @param  {object} data          The data we're sending for registration
 * @param  {string} data.username The username of the user to register
 * @param  {string} data.password The password of the user to register
 */
  registerRequest: createAction(REGISTER_REQUEST, (data: any) => ({
    data,
    type: REGISTER_REQUEST,
  })),
  /**
 * Sets the `error` state to the error received
 * @param  {object} error The error we got when trying to make the request
 */
  requestError: createAction(REQUEST_ERROR, (error: any) => ({
    error,
    type: REQUEST_ERROR,
  })),

  /**
   * Sets the `error` state as empty
   */
  clearError: createAction(CLEAR_ERROR),
}
