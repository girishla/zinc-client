import { createAction } from "typesafe-actions";
import { IUser } from "./IUser";

export const LOAD_USERS_START = "zinc/USERS/LOAD_USERS_START";
export const LOAD_USERS_SUCCESS = "zinc/USERS/LOAD_USERS_SUCCESS";
export const LOAD_USERS_FAILURE = "zinc/USERS/LOAD_USERS_FAILURE";

export const DELETE_USER_START = "zinc/USER/DELETE_USER_START";
export const DELETE_USER_SUCCESS = "zinc/USER/DELETE_USER_SUCCESS";
export const DELETE_USER_FAILURE = "zinc/USER/DELETE_USER_FAILURE";

export const ADD_USER_START = "zinc/USER/ADD_USER_START";
export const ADD_USER_SUCCESS = "zinc/USER/ADD_USER_SUCCESS";
export const ADD_USER_FAILURE = "zinc/USER/ADD_USER_FAILURE";

export const userActions = {
  loadUsers: createAction(LOAD_USERS_START),
  loadUsersSuccess: createAction(LOAD_USERS_SUCCESS, (users: IUser[]) => ({
    type: LOAD_USERS_SUCCESS,
    users
  })),
  loadUsersFailure: createAction(LOAD_USERS_FAILURE, (errorStr: string) => ({
    type: LOAD_USERS_FAILURE,
    errorStr
  })),

  deleteUser: createAction(DELETE_USER_START, (user: IUser) => ({
    type: DELETE_USER_START,
    user
  })),
  deleteUserSuccess: createAction(DELETE_USER_SUCCESS, (user: IUser) => ({
    type: DELETE_USER_SUCCESS,
    user
  })),
  deleteUserFailure: createAction(DELETE_USER_FAILURE, (errorStr: string) => ({
    type: DELETE_USER_FAILURE,
    errorStr
  })),
  addUser: createAction(ADD_USER_START, (objectNames: string[]) => ({
    type: ADD_USER_START,
    objectNames
  })),
  addUserSuccess: createAction(ADD_USER_SUCCESS),
  addUserFailure: createAction(ADD_USER_FAILURE, (errorStr: string) => ({
    type: ADD_USER_FAILURE,
    errorStr
  }))
};
