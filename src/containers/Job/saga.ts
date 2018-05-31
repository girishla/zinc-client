import { Action } from "redux";
import { call, put, takeLatest, all } from "redux-saga/effects";
import { getType } from "typesafe-actions";
import { jobsActions } from "./actions";
import { IJobCollection } from "./IJobCollection";
import jobsApi from "./jobsApi";
import { push } from "react-router-redux";
import { layoutActions } from "../Layout/actions";

export function* getJobsTask(action: Action) {
  try {
    const jobs: IJobCollection = yield call(
      jobsApi.getJobs,
      window.localStorage.getItem("token")
    );
    yield put({ type: getType(jobsActions.loadJobsSuccess), jobs });
  } catch (e) {
    yield put({
      type: getType(jobsActions.loadJobsFailure),
      errorStr: e.message
    });
  }
}

export function* getJobs() {
  yield takeLatest(getType(jobsActions.loadJobs), getJobsTask);
}

export function* executeJobTask(action: any) {
  try {
    yield call(
      jobsApi.executeJob,
      window.localStorage.getItem("token"),
      action.jobName
    );
    yield put({ type: getType(jobsActions.executeJobSuccess) });
    yield put(push(`/jobs/${action.jobName}/executions`));
  } catch (e) {
    yield put({
      type: getType(jobsActions.executeJobFailure),
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

export function* executeJob() {
  yield takeLatest(getType(jobsActions.executeJob), executeJobTask);
}

export default function* rootSaga() {
  yield all([getJobs(), executeJob()]);
}
