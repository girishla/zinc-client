/*
 * The reducer takes care of login state changes in our app through actions
 */

import {
  CHANGE_FORM,
  SET_AUTH,
  SENDING_REQUEST,
  REQUEST_ERROR,
  CLEAR_ERROR,
  SET_PROFILE
} from './actions'
import auth from './auth'

// The initial login state
const initialState = {
  formState: {
    username: '',
    password: ''
  },
  error: '',
  currentlySending: false,
  loggedIn: auth.loggedIn()
}

// Takes care of changing the application state
function reducer(state = initialState, action: any) {
  switch (action.type) {
    case CHANGE_FORM:
      return { ...state, formState: action.newFormState }
    case SET_AUTH:
      return { ...state, loggedIn: action.newAuthState }
    case SET_PROFILE:
      return { ...state, profile: action.profile }
    case SENDING_REQUEST:
      return { ...state, currentlySending: action.sending }
    case REQUEST_ERROR:
      return { ...state, error: action.error }
    case CLEAR_ERROR:
      return { ...state, error: '' }
    default:
      return state
  }
}

export default reducer
