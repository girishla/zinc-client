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
      type: getType(salesforceObjectActions.loadSchedulesSuccess),
      salesforceObjects
    });
  } catch (e) {
    yield put({
      type: getType(salesforceObjectActions.loadSchedulesFailure),
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

export function* deleteSalesforceObjectTask(action: any) {
  try {
    yield call(
      salesforceObjectsApi.deleteSalesforceObject,
      window.localStorage.getItem("token"),
      action.salesforceObject.id
    );
    yield put({
      type: getType(salesforceObjectActions.deleteScheduleDetailSuccess)
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
      type: getType(salesforceObjectActions.deleteScheduleDetailFailure),
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
  yield all([getSalesforceObjects(), deleteSalesforceObject()]);
}
