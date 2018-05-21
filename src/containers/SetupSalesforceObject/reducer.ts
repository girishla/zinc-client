import { getType } from "typesafe-actions";
import { salesforceObjectActions } from "./actions";

export const initialJobsState: any = {
  loading: false,
  data: [],
  error: ""
};

function reducer(state = initialJobsState, action: any) {
  switch (action.type) {
    case getType(salesforceObjectActions.loadSalesforceObjects): {
      return { ...state, loading: true };
    }

    case getType(salesforceObjectActions.loadSchedulesSuccess): {
      return { ...state, loading: false, data: action.salesforceObjects };
    }
    case getType(salesforceObjectActions.loadSchedulesFailure): {
      return { ...state, loading: false, error: action.errorStr };
    }
    case getType(salesforceObjectActions.deleteSalesforceObject): {
      return { ...state, loading: true };
    }
    case getType(salesforceObjectActions.deleteScheduleDetailSuccess): {
      return { ...state, loading: false };
    }
    case getType(salesforceObjectActions.deleteScheduleDetailFailure): {
      return { ...state, loading: false, error: action.errorStr };
    }
    default:
      return state;
  }
}

export default reducer;
