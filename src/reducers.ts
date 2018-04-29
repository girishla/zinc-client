/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { LOCATION_CHANGE } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form'
import layoutReducer from './containers/Layout/reducer';



/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@5
 *
 */

// Initial routing state
const routeInitialState = {
  location: null
};

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action: any) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return Object.assign({}, state, { location: action.payload })
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers: {}) {
  return combineReducers({
    route: routeReducer,
    layout: layoutReducer,
    form: reduxFormReducer,
    ...injectedReducers
  });
}
