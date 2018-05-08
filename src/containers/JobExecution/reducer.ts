import { getType } from "typesafe-actions";
import { jobExecutionActions } from "./actions";

export const initialJobsState: any = {
  loading: false,
  data: [],
  error: ""
};

function reducer(state = initialJobsState, action: any) {
  switch (action.type) {
    case getType(jobExecutionActions.loadExecutions): {
      return { ...state, loading: true };
    }
    case getType(jobExecutionActions.loadJobExecutions): {
      return { ...state, loading: true };
    }
    case getType(jobExecutionActions.loadJobInstanceExecutions): {
      return { ...state, loading: true };
    }
    case getType(jobExecutionActions.loadExecutionsSuccess): {
      return { ...state, loading: false, data: action.jobExecutions };
    }
    case getType(jobExecutionActions.loadExecutionsFailure): {
      return { ...state, loading: false, error: action.errorStr };
    }
    default:
      return state;
  }
}

export default reducer;
