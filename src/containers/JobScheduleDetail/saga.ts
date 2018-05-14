import { call, put, takeLatest, all } from "redux-saga/effects";
import { getType } from "typesafe-actions";

import { IJobSchedule } from "../JobSchedule/IJobSchedule";
import jobScheduleDetailApi from "./jobScheduleDetailApi";
import { jobScheduleDetailActions } from "./actions";

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

export function* getJobScheduleDetail() {
  yield takeLatest(
    getType(jobScheduleDetailActions.loadJobScheduleDetail),
    getJobScheduleDetailTask
  );

  yield 1;
}

export default function* rootSaga() {
  yield all([getJobScheduleDetail()]);
}