import { Action } from "redux";
import { call, put, takeLatest, all } from "redux-saga/effects";
import { getType } from "typesafe-actions";
import { jobExecutionActions } from "./actions";
import {
  IJobExecutionCollection,
  IJobExecutionInfoResource
} from "./IJobExecutionCollection";
import jobExecutionsApi from "./jobExecutionsApi";
import { layoutActions } from "../Layout/actions";

export function* getExecutionsTask(action: Action) {
  try {
    const jobExecutions: IJobExecutionCollection = yield call(
      jobExecutionsApi.getExecutions,
      window.localStorage.getItem("token")
    );
    yield put({
      type: getType(jobExecutionActions.loadExecutionsSuccess),
      jobExecutions
    });
  } catch (e) {
    yield put({
      type: getType(jobExecutionActions.loadExecutionsFailure),
      errorStr: e.message
    });
  }
}

export function* getJobExecutionsTask(action: any) {
  try {
    const jobExecutions: IJobExecutionCollection = yield call(
      jobExecutionsApi.getJobExecutions,
      action.jobName,
      window.localStorage.getItem("token")
    );
    yield put({
      type: getType(jobExecutionActions.loadExecutionsSuccess),
      jobExecutions
    });
  } catch (e) {
    yield put({
      type: getType(jobExecutionActions.loadExecutionsFailure),
      errorStr: e.message
    });
  }
}

export function* getJobInstanceExecutionsTask(action: any) {
  try {
    const jobInstanceExecutions: IJobExecutionInfoResource[] = yield call(
      jobExecutionsApi.getJobInstanceExecutions,
      action.jobName,
      action.instanceId,
      window.localStorage.getItem("token")
    );

    const jobExecutions = {
      _embedded: { jobExecutionInfoResources: jobInstanceExecutions },
      page: {
        size: jobInstanceExecutions.length,
        totalElements: jobInstanceExecutions.length,
        totalPages: 1,
        number: 1
      }
    };

    yield put({
      type: getType(jobExecutionActions.loadExecutionsSuccess),
      jobExecutions
    });
  } catch (e) {
    yield put({
      type: getType(jobExecutionActions.loadExecutionsFailure),
      errorStr: e.message
    });
  }
}

export function* getExecutions() {
  yield takeLatest(
    getType(jobExecutionActions.loadExecutions),
    getExecutionsTask
  );
}

export function* getJobExecutions() {
  yield takeLatest(
    getType(jobExecutionActions.loadJobExecutions),
    getJobExecutionsTask
  );
}

export function* getJobInstanceExecutions() {
  yield takeLatest(
    getType(jobExecutionActions.loadJobInstanceExecutions),
    getJobInstanceExecutionsTask
  );
}

export function* stopExecutionTask(action: any) {
  try {
    yield call(
      jobExecutionsApi.stopJob,
      window.localStorage.getItem("token"),
      action.jobId
    );
    yield put({
      type: getType(jobExecutionActions.stopJobExecutionSuccess)
    });
    yield put({
      type: getType(layoutActions.showSnackBarMessage),
      message: "Stop Request Submitted. It might take a while to stop."
    });
  } catch (e) {
    yield put({
      type: getType(jobExecutionActions.stopJobExecutionFailure),
      errorStr: e.message
    });
    yield put({
      type: getType(layoutActions.showAlertMessage),
      messageTitle: "Failed",
      message: e.message,
      severity: "ERROR"
    });
  }
}

export function* stopJobExecution() {
  yield takeLatest(
    getType(jobExecutionActions.stopJobExecution),
    stopExecutionTask
  );
}

export default function* rootSaga() {
  yield all([
    getExecutions(),
    getJobExecutions(),
    getJobInstanceExecutions(),
    stopJobExecution()
  ]);
}
