import { getType } from "typesafe-actions";
import { jobScheduleActions } from "./actions";

export const initialJobsState: any = {
  loading: false,
  data: [],
  error: ""
};

function reducer(state = initialJobsState, action: any) {
  switch (action.type) {
    case getType(jobScheduleActions.loadJobSchedules): {
      return { ...state, loading: true };
    }

    case getType(jobScheduleActions.loadSchedulesSuccess): {
      return { ...state, loading: false, data: action.jobSchedules };
    }
    case getType(jobScheduleActions.loadSchedulesFailure): {
      return { ...state, loading: false, error: action.errorStr };
    }
    case getType(jobScheduleActions.deleteJobSchedule): {
      return { ...state, loading: true };
    }
    case getType(jobScheduleActions.deleteScheduleDetailSuccess): {
      return { ...state, loading: false };
    }
    case getType(jobScheduleActions.deleteScheduleDetailFailure): {
      return { ...state, loading: false, error: action.errorStr };
    }
    default:
      return state;
  }
}

export default reducer;
