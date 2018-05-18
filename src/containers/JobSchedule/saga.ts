import { call, put, takeLatest, all } from "redux-saga/effects";
import { getType } from "typesafe-actions";
import { jobScheduleActions } from "./actions";
import { IJobSchedule } from "./IJobSchedule";
import jobSchedulesApi from "./jobScheduleApi";
import { layoutActions } from "../Layout/actions";

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

export function* deleteJobScheduleDetailTask(action: any) {
  try {
    yield call(
      jobSchedulesApi.deleteJobSchedule,
      window.localStorage.getItem("token"),
      action.scheduleDetail.jobName,
      action.scheduleDetail.scheduleName
    );
    yield put({
      type: getType(jobScheduleActions.deleteScheduleDetailSuccess)
    });
    yield put({
      type: getType(layoutActions.showSnackBarMessage),
      message: "Job Schedule Deleted Successfully!"
    });
    yield put({
      type: getType(jobScheduleActions.loadJobSchedules)
    });
  } catch (e) {
    yield put({
      type: getType(jobScheduleActions.deleteScheduleDetailFailure),
      errorStr: e.message
    });
  }
}

export function* deleteJobScheduleDetail() {
  yield takeLatest(
    getType(jobScheduleActions.deleteJobSchedule),
    deleteJobScheduleDetailTask
  );
}

export default function* rootSaga() {
  yield all([getJobSchedules(), deleteJobScheduleDetail()]);
}
