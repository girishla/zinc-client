import { createAction } from "typesafe-actions";
import { IDashboardData } from "./IDashboardData";

export const LOAD_DASHBOARD = "zinc/DASHBOARD/LOAD_DASHHBOARD";
export const LOAD_DASHBOARD_SUCCESS = "zinc/DASHBOARD/LOAD_DASHHBOARD_SUCCESS";
export const LOAD_DASHBOARD_FAILURE = "zinc/DASHBOARD/LOAD_DASHHBOARD_FAILURE";

export const dashboardActions = {
  loadDashboard: createAction(LOAD_DASHBOARD, (metricTime: number) => ({
    type: LOAD_DASHBOARD,
    metricTime
  })),
  loadDashboardSuccess: createAction(
    LOAD_DASHBOARD_SUCCESS,
    (dashboardData: IDashboardData) => ({
      type: LOAD_DASHBOARD_SUCCESS,
      dashboardData
    })
  ),
  loadDashboardFailure: createAction(LOAD_DASHBOARD_FAILURE)
};
