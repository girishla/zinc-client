import { Action } from "redux";
import { call, put, takeLatest, all } from "redux-saga/effects";
import { getType } from "typesafe-actions";
import { jobsActions } from "./actions";
import { IJobCollection } from "./IJobCollection";
import jobsApi from "./jobsApi";



export function* getJobsTask(action: Action) {
    try {
        const jobs: IJobCollection = yield call(jobsApi.getJobs, window.localStorage.getItem('token'));
        yield put({ type: getType(jobsActions.loadJobsSuccess), jobs });
    } catch (e) {
        yield put({ type: getType(jobsActions.loadJobsFailure), errorStr: e.message });
    }
}


export function* getJobs() {

    yield takeLatest(getType(jobsActions.loadJobs), getJobsTask)


}

export default function* rootSaga() {
    yield all([
        getJobs()
    ])
}