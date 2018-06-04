import { getType } from "typesafe-actions";
import { userActions } from "./actions";

export const initialJobsState: any = {
  loading: false,
  data: [],
  error: ""
};

function reducer(state = initialJobsState, action: any) {
  switch (action.type) {
    case getType(userActions.loadUsers): {
      return { ...state, loading: true };
    }

    case getType(userActions.loadUsersSuccess): {
      return { ...state, loading: false, data: action.users };
    }
    case getType(userActions.loadUsersFailure): {
      return { ...state, loading: false, error: action.errorStr };
    }
    case getType(userActions.addUser): {
      return { ...state, loading: true };
    }
    case getType(userActions.addUserSuccess): {
      return { ...state, loading: false };
    }
    case getType(userActions.addUserFailure): {
      return { ...state, loading: false, error: action.errorStr };
    }
    case getType(userActions.deleteUser): {
      return { ...state, loading: true };
    }
    case getType(userActions.deleteUserSuccess): {
      return { ...state, loading: false };
    }
    case getType(userActions.deleteUserFailure): {
      return { ...state, loading: false, error: action.errorStr };
    }
    default:
      return state;
  }
}

export default reducer;
