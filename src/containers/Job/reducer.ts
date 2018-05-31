import { getType } from "typesafe-actions";
import { jobsActions } from "./actions";
// import { IJobsState } from "./IJobsState";

export const initialJobsState: any = {
  loading: false,
  data: [],
  error: ""
};

function reducer(state = initialJobsState, action: any) {
  switch (action.type) {
    case getType(jobsActions.loadJobs): {
      return { ...state, loading: true };
    }
    case getType(jobsActions.loadJobsSuccess): {
      return { ...state, loading: false, data: action.jobs };
    }
    case getType(jobsActions.loadJobsFailure): {
      return { ...state, loading: false, error: action.errorStr };
    }
    case getType(jobsActions.executeJob): {
      return { ...state, loading: true };
    }
    case getType(jobsActions.executeJobSuccess): {
      return { ...state, loading: false };
    }
    case getType(jobsActions.executeJobFailure): {
      return { ...state, loading: false, error: action.errorStr };
    }
    default:
      return state;
  }
}

export default reducer;
