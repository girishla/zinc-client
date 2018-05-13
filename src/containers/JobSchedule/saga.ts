import { call, put, takeLatest, all } from "redux-saga/effects";
import { getType } from "typesafe-actions";
import { jobScheduleActions } from "./actions";
import { IJobSchedule } from "./IJobSchedule";
import jobSchedulesApi from "./jobScheduleApi";

export function* getJobSchedulesTask(action: any) {
  try {
    const jobSchedules: IJobSchedule = yield call(
      jobSchedulesApi.getJobSchedule,
      window.localStorage.getItem("token")
    );
    yield put({
      type: getType(jobScheduleActions.loadSchedulesSuccess),
      jobSchedules
    });
  } catch (e) {
    yield put({
      type: getType(jobScheduleActions.loadSchedulesFailure),
      errorStr: e.message
    });
  }
}

export function* getJobSchedules() {
  yield takeLatest(
    getType(jobScheduleActions.loadJobSchedules),
    getJobSchedulesTask
  );
}

export default function* rootSaga() {
  yield all([getJobSchedules()]);
}
