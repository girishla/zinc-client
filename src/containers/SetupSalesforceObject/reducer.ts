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

    case getType(salesforceObjectActions.loadSalesforceObjectsSuccess): {
      return { ...state, loading: false, data: action.salesforceObjects };
    }
    case getType(salesforceObjectActions.loadSalesforceObjectsFailure): {
      return { ...state, loading: false, error: action.errorStr };
    }
    case getType(salesforceObjectActions.loadSalesforceObjectNames): {
      return { ...state, loading: true };
    }
    case getType(salesforceObjectActions.loadSalesforceObjectNamesSuccess): {
      return {
        ...state,
        loading: false,
        salesforceObjectNames: action.salesforceObjectNames
      };
    }
    case getType(salesforceObjectActions.loadSalesforceObjectNamesFailure): {
      return { ...state, loading: false, error: action.errorStr };
    }

    case getType(salesforceObjectActions.deleteSalesforceObject): {
      return { ...state, loading: true };
    }
    case getType(salesforceObjectActions.deleteSalesforceObjectSuccess): {
      return { ...state, loading: false };
    }
    case getType(salesforceObjectActions.deleteSalesforceObjectFailure): {
      return { ...state, loading: false, error: action.errorStr };
    }
    default:
      return state;
  }
}

export default reducer;
