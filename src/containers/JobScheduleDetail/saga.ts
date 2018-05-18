import { call, put, takeLatest, all } from "redux-saga/effects";
import { getType } from "typesafe-actions";

import { IJobSchedule } from "../JobSchedule/IJobSchedule";
import jobScheduleDetailApi from "./jobScheduleDetailApi";
import { jobScheduleDetailActions } from "./actions";
import { layoutActions } from "../Layout/actions";

export function* getJobScheduleDetailTask(action: any) {
  try {
    const jobScheduleDetail: IJobSchedule = yield call(
      jobScheduleDetailApi.getJobScheduleDetail,
      window.localStorage.getItem("token"),
      action.scheduleName
    );
    yield put({
      type: getType(jobScheduleDetailActions.loadScheduleDetailSuccess),
      jobScheduleDetail
    });
  } catch (e) {
    yield put({
      type: getType(jobScheduleDetailActions.loadScheduleDetailFailure),
      errorStr: e.message
    });
  }
}

export function* saveJobScheduleDetailTask(action: any) {
  try {
    const jobScheduleDetail: IJobSchedule = yield call(
      jobScheduleDetailApi.postJobScheduleDetail,
      window.localStorage.getItem("token"),
      action.scheduleDetail
    );
    yield put({
      type: getType(jobScheduleDetailActions.saveScheduleDetailSuccess),
      jobScheduleDetail
    });
    yield put({
      type: getType(layoutActions.showSnackBarMessage),
      message: "Job Schedule Saved Successfully!"
    });
  } catch (e) {
    yield put({
      type: getType(jobScheduleDetailActions.saveScheduleDetailFailure),
      errorStr: e.message
    });
  }
}

export function* getJobScheduleDetail() {
  yield takeLatest(
    getType(jobScheduleDetailActions.loadJobScheduleDetail),
    getJobScheduleDetailTask
  );
}

export function* saveJobScheduleDetail() {
  yield takeLatest(
    getType(jobScheduleDetailActions.saveJobScheduleDetail),
    saveJobScheduleDetailTask
  );
}

export default function* rootSaga() {
  yield all([getJobScheduleDetail(), saveJobScheduleDetail()]);
}
