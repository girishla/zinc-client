import { call, put, takeLatest, all } from "redux-saga/effects";
import { getType } from "typesafe-actions";
import { userActions } from "./actions";
import { IUser } from "./IUser";
import usersApi from "./userApi";
import { layoutActions } from "../Layout/actions";

export function* getUsersTask(action: any) {
  try {
    const users: IUser = yield call(
      usersApi.getUser,
      window.localStorage.getItem("token")
    );
    yield put({
      type: getType(userActions.loadUsersSuccess),
      users
    });
  } catch (e) {
    yield put({
      type: getType(userActions.loadUsersFailure),
      errorStr: e.message
    });
  }
}

export function* getUsers() {
  yield takeLatest(getType(userActions.loadUsers), getUsersTask);
}

export function* addUsersTask(action: any) {
  try {
    yield call(
      usersApi.addUser,
      window.localStorage.getItem("token"),
      action.objectNames
    );
    yield put({
      type: getType(userActions.addUserSuccess)
    });

    yield put({
      type: getType(layoutActions.showSnackBarMessage),
      message:
        "Added users " + (action.userNames && action.objectNames.join(", "))
    });

    yield put({
      type: getType(userActions.loadUsers)
    });
  } catch (e) {
    yield put({
      type: getType(userActions.addUserFailure),
      errorStr: e.message
    });
  }
}

export function* addUsers() {
  yield takeLatest(getType(userActions.addUser), addUsersTask);
}

export function* deleteUserTask(action: any) {
  try {
    yield call(
      usersApi.deleteUser,
      window.localStorage.getItem("token"),
      action.user.id
    );
    yield put({
      type: getType(userActions.deleteUserSuccess)
    });
    yield put({
      type: getType(layoutActions.showSnackBarMessage),
      message: "User Deleted Successfully!"
    });
    yield put({
      type: getType(userActions.loadUsers)
    });
  } catch (e) {
    yield put({
      type: getType(userActions.deleteUserFailure),
      errorStr: e.message
    });
  }
}

export function* deleteUser() {
  yield takeLatest(getType(userActions.deleteUser), deleteUserTask);
}

export default function* rootSaga() {
  yield all([getUsers(), deleteUser(), addUsers()]);
}
