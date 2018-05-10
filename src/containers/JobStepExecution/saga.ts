import { call, put, takeLatest, all } from "redux-saga/effects";
import { getType } from "typesafe-actions";
import { jobExecutionActions } from "./actions";
import { IStepExecution } from "../JobExecution/IJobExecutionCollection";
import jobStepExecutionsApi from "./jobStepExecutionsApi";

export function* getJobStepExecutionsTask(action: any) {
  try {
    const jobStepExecutions: IStepExecution[] = yield call(
      jobStepExecutionsApi.getJobStepExecutions,
      action.executionId,
      window.localStorage.getItem("token")
    );

    yield put({
      type: getType(jobExecutionActions.loadJobStepExecutionsSuccess),
      jobStepExecutions
    });
  } catch (e) {
    yield put({
      type: getType(jobExecutionActions.loadJobStepExecutionsFailure),
      errorStr: e.message
    });
  }
}

export function* getJobStepExecutions() {
  yield takeLatest(
    getType(jobExecutionActions.loadJobStepExecutions),
    getJobStepExecutionsTask
  );
}

export default function* rootSaga() {
  yield all([getJobStepExecutions()]);
}
