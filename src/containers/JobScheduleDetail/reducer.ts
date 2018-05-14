import { getType } from "typesafe-actions";
import { jobScheduleDetailActions } from "./actions";

export const initialJobsState: any = {
  loading: false,
  data: [],
  error: ""
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
    default:
      return state;
  }
}

export default reducer;
