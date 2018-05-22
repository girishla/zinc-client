import { call, put, takeLatest, all } from "redux-saga/effects";
import { getType } from "typesafe-actions";
import { salesforceObjectActions } from "./actions";
import { ISalesforceObject } from "./ISalesforceObject";
import salesforceObjectsApi from "./salesforceObjectApi";
import { layoutActions } from "../Layout/actions";

export function* getSalesforceObjectsTask(action: any) {
  try {
    const salesforceObjects: ISalesforceObject = yield call(
      salesforceObjectsApi.getSalesforceObject,
      window.localStorage.getItem("token")
    );
    yield put({
      type: getType(salesforceObjectActions.loadSalesforceObjectsSuccess),
      salesforceObjects
    });
  } catch (e) {
    yield put({
      type: getType(salesforceObjectActions.loadSalesforceObjectsFailure),
      errorStr: e.message
    });
  }
}

export function* getSalesforceObjects() {
  yield takeLatest(
    getType(salesforceObjectActions.loadSalesforceObjects),
    getSalesforceObjectsTask
  );
}

export function* addSalesforceObjectsTask(action: any) {
  try {
    yield call(
      salesforceObjectsApi.addSalesforceObject,
      window.localStorage.getItem("token"),
      action.objectNames
    );
    yield put({
      type: getType(salesforceObjectActions.addSalesforceObjectSuccess)
    });

    yield put({
      type: getType(layoutActions.showSnackBarMessage),
      message:
        "Added objects " + (action.objectNames && action.objectNames.join(", "))
    });

    yield put({
      type: getType(salesforceObjectActions.loadSalesforceObjects)
    });
  } catch (e) {
    yield put({
      type: getType(salesforceObjectActions.addSalesforceObjectFailure),
      errorStr: e.message
    });
  }
}

export function* addSalesforceObjects() {
  yield takeLatest(
    getType(salesforceObjectActions.addSalesforceObject),
    addSalesforceObjectsTask
  );
}

export function* getSalesforceObjectNamesTask(action: any) {
  try {
    const salesforceObjectNames: string[] = yield call(
      salesforceObjectsApi.getSalesforceObjectNames,
      window.localStorage.getItem("token")
    );
    yield put({
      type: getType(salesforceObjectActions.loadSalesforceObjectNamesSuccess),
      salesforceObjectNames
    });
  } catch (e) {
    yield put({
      type: getType(salesforceObjectActions.loadSalesforceObjectNamesFailure),
      errorStr: e.message
    });
  }
}

export function* getSalesforceObjectNames() {
  yield takeLatest(
    getType(salesforceObjectActions.loadSalesforceObjectNames),
    getSalesforceObjectNamesTask
  );
}

export function* deleteSalesforceObjectTask(action: any) {
  try {
    yield call(
      salesforceObjectsApi.deleteSalesforceObject,
      window.localStorage.getItem("token"),
      action.salesforceObject.id
    );
    yield put({
      type: getType(salesforceObjectActions.deleteSalesforceObjectSuccess)
    });
    yield put({
      type: getType(layoutActions.showSnackBarMessage),
      message: "Salesforce Object Deleted Successfully!"
    });
    yield put({
      type: getType(salesforceObjectActions.loadSalesforceObjects)
    });
  } catch (e) {
    yield put({
      type: getType(salesforceObjectActions.deleteSalesforceObjectFailure),
      errorStr: e.message
    });
  }
}

export function* deleteSalesforceObject() {
  yield takeLatest(
    getType(salesforceObjectActions.deleteSalesforceObject),
    deleteSalesforceObjectTask
  );
}

export default function* rootSaga() {
  yield all([
    getSalesforceObjects(),
    deleteSalesforceObject(),
    getSalesforceObjectNames(),
    addSalesforceObjects()
  ]);
}
