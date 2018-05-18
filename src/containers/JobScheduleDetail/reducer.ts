import { getType } from "typesafe-actions";
import { jobScheduleDetailActions } from "./actions";

export const initialJobsState: any = {
  loading: false,
  data: [],
  error: "",
  snackBarOpen: false,
  snackBarMessage: ""
};

function reducer(state = initialJobsState, action: any) {
  switch (action.type) {
    case getType(jobScheduleDetailActions.loadJobScheduleDetail): {
      return { ...state, loading: true };
    }
    case getType(jobScheduleDetailActions.loadScheduleDetailSuccess): {
      return { ...state, loading: false, data: action.jobScheduleDetail };
    }
    case getType(jobScheduleDetailActions.loadScheduleDetailFailure): {
      return { ...state, loading: false, error: action.errorStr };
    }
    case getType(jobScheduleDetailActions.saveJobScheduleDetail): {
      return { ...state, loading: true };
    }
    case getType(jobScheduleDetailActions.saveScheduleDetailSuccess): {
      return {
        ...state,
        loading: false,
        data: action.jobScheduleDetail,
        snackBarOpen: true,
        snackBarMessage: "Schedule Detail Saved Successfully"
      };
    }
    case getType(jobScheduleDetailActions.saveScheduleDetailFailure): {
      return { ...state, loading: false, error: action.errorStr };
    }
    default:
      return state;
  }
}

export default reducer;
