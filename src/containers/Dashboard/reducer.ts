import { getType } from "typesafe-actions";
import { dashboardActions } from "./actions";
// import { IJobsState } from "./IJobsState";

export const initialJobsState: any = {
  loading: false,
  data: [],
  error: ""
};

function reducer(state = initialJobsState, action: any) {
  switch (action.type) {
    case getType(dashboardActions.loadDashboard): {
      return { ...state, loading: true };
    }
    case getType(dashboardActions.loadDashboardSuccess): {
      return { ...state, loading: false, data: action.dashboardData };
    }
    case getType(dashboardActions.loadDashboardFailure): {
      return { ...state, loading: false, error: action.errorStr };
    }
    default:
      return state;
  }
}

export default reducer;
