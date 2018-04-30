import { createAction } from "typesafe-actions";

export const LOAD_DASHBOARD = "zinc/DASHBOARD/LOAD_MENU";
export const LOAD_DASHBOARD_SUCCESS = "zinc/DASHBOARD/LOAD_MENU";



export const dashboardActions = {

    loadDashboard: createAction(LOAD_DASHBOARD),
    loadDashboardSuccess: createAction(LOAD_DASHBOARD_SUCCESS),


}