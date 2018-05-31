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
    case getType(jobExecutionActions.stopJobExecution): {
      return { ...state, loading: true };
    }
    case getType(jobExecutionActions.stopJobExecutionSuccess): {
      return { ...state, loading: false };
    }
    case getType(jobExecutionActions.stopJobExecutionFailure): {
      return { ...state, loading: false, error: action.errorStr };
    }
    case getType(jobExecutionActions.restartJobExecution): {
      return { ...state, loading: true };
    }
    case getType(jobExecutionActions.restartJobExecutionSuccess): {
      return { ...state, loading: false };
    }
    case getType(jobExecutionActions.restartJobExecutionFailure): {
      return { ...state, loading: false, error: action.errorStr };
    }
    default:
      return state;
  }
}

export default reducer;
