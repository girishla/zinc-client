import { call, put, takeLatest, all } from "redux-saga/effects";
import { getType } from "typesafe-actions";
import { dashboardActions } from "./actions";
import { IDashboardData, IMetricCollection } from "./IDashboardData";
import dashboardApi from "./dashboardApi";

export function* getDashboardDataTask(action: any) {
  try {
    const apiMetrics: IMetricCollection = yield call(
      dashboardApi.getDashboardDataByTime,
      window.localStorage.getItem("token"),
      "SFDC_API_USAGE",
      action.metricTime
    );

    const executionMetrics: IMetricCollection = yield call(
      dashboardApi.getDashboardData,
      window.localStorage.getItem("token"),
      "JOB_EXEC_STATS"
    );

    const tableCountMetrics: IMetricCollection = yield call(
      dashboardApi.getDashboardData,
      window.localStorage.getItem("token"),
      "SFDC_TABLE_COUNTS"
    );

    const tableChangesMetrics: IMetricCollection = yield call(
      dashboardApi.getDashboardData,
      window.localStorage.getItem("token"),
      "SFDC_TABLE_CHANGES"
    );

    const dashboardData: IDashboardData = {
      apiMetrics,
      executionMetrics,
      tableCountMetrics,
      tableChangesMetrics,
      perfTilesData: {},
      executionCountBarChartData: [],
      tableCountBarChartData: [],
      tableChangesLineChartData: []
    };

    yield put({
      type: getType(dashboardActions.loadDashboardSuccess),
      dashboardData
    });
  } catch (e) {
    yield put({
      type: getType(dashboardActions.loadDashboardFailure),
      errorStr: e.message
    });
  }
}

export function* getDashboardData() {
  yield takeLatest(
    getType(dashboardActions.loadDashboard),
    getDashboardDataTask
  );
}

export default function* rootSaga() {
  yield all([getDashboardData()]);
}
