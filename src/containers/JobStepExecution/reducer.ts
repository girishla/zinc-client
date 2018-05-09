import { getType } from "typesafe-actions";
import { jobExecutionActions } from "./actions";

export const initialJobsState: any = {
  loading: false,
  data: [],
  error: ""
};

function reducer(state = initialJobsState, action: any) {
  switch (action.type) {
    case getType(jobExecutionActions.loadJobStepExecutions): {
      return { ...state, loading: true };
    }
    case getType(jobExecutionActions.loadJobStepExecutionsSuccess): {
      return { ...state, loading: false, data: action.jobStepExecutions };
    }
    case getType(jobExecutionActions.loadJobStepExecutionsFailure): {
      return { ...state, loading: false, error: action.errorStr };
    }
    default:
      return state;
  }
}

export default reducer;
