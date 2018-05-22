import { createAction } from "typesafe-actions";
import { ISalesforceObject } from "./ISalesforceObject";

export const LOAD_SALESFORCEOBJECTS_START =
  "zinc/SALESFORCEOBJECTS/LOAD_SALESFORCEOBJECTS_START";
export const LOAD_SALESFORCEOBJECTS_SUCCESS =
  "zinc/SALESFORCEOBJECTS/LOAD_SALESFORCEOBJECTS_SUCCESS";
export const LOAD_SALESFORCEOBJECTS_FAILURE =
  "zinc/SALESFORCEOBJECTS/LOAD_SALESFORCEOBJECTS_FAILURE";

export const DELETE_SALESFORCEOBJECT_START =
  "zinc/SALESFORCEOBJECT/DELETE_SALESFORCEOBJECT_START";
export const DELETE_SALESFORCEOBJECT_SUCCESS =
  "zinc/SALESFORCEOBJECT/DELETE_SALESFORCEOBJECT_SUCCESS";
export const DELETE_SALESFORCEOBJECT_FAILURE =
  "zinc/SALESFORCEOBJECT/DELETE_SALESFORCEOBJECT_FAILURE";

export const LOAD_SALESFORCEOBJECTNAMES_START =
  "zinc/SALESFORCEOBJECTS/LOAD_SALESFORCEOBJECTNAMES_START";
export const LOAD_SALESFORCEOBJECTNAMES_SUCCESS =
  "zinc/SALESFORCEOBJECTS/LOAD_SALESFORCEOBJECTNAMES_SUCCESS";
export const LOAD_SALESFORCEOBJECTNAMES_FAILURE =
  "zinc/SALESFORCEOBJECTS/LOAD_SALESFORCEOBJECTNAMES_FAILURE";

export const salesforceObjectActions = {
  loadSalesforceObjects: createAction(LOAD_SALESFORCEOBJECTS_START),
  loadSalesforceObjectsSuccess: createAction(
    LOAD_SALESFORCEOBJECTS_SUCCESS,
    (salesforceObjects: ISalesforceObject[]) => ({
      type: LOAD_SALESFORCEOBJECTS_SUCCESS,
      salesforceObjects
    })
  ),
  loadSalesforceObjectsFailure: createAction(
    LOAD_SALESFORCEOBJECTS_FAILURE,
    (errorStr: string) => ({
      type: LOAD_SALESFORCEOBJECTS_FAILURE,
      errorStr
    })
  ),
  loadSalesforceObjectNames: createAction(LOAD_SALESFORCEOBJECTNAMES_START),
  loadSalesforceObjectNamesSuccess: createAction(
    LOAD_SALESFORCEOBJECTNAMES_SUCCESS,
    (salesforceObjectNames: ISalesforceObject[]) => ({
      type: LOAD_SALESFORCEOBJECTNAMES_SUCCESS,
      salesforceObjectNames
    })
  ),
  loadSalesforceObjectNamesFailure: createAction(
    LOAD_SALESFORCEOBJECTNAMES_FAILURE,
    (errorStr: string) => ({
      type: LOAD_SALESFORCEOBJECTNAMES_FAILURE,
      errorStr
    })
  ),
  deleteSalesforceObject: createAction(
    DELETE_SALESFORCEOBJECT_START,
    (salesforceObject: ISalesforceObject) => ({
      type: DELETE_SALESFORCEOBJECT_START,
      salesforceObject
    })
  ),
  deleteScheduleDetailSuccess: createAction(
    DELETE_SALESFORCEOBJECT_SUCCESS,
    (salesforceObject: ISalesforceObject) => ({
      type: DELETE_SALESFORCEOBJECT_SUCCESS,
      salesforceObject
    })
  ),
  deleteScheduleDetailFailure: createAction(
    DELETE_SALESFORCEOBJECT_FAILURE,
    (errorStr: string) => ({
      type: DELETE_SALESFORCEOBJECT_FAILURE,
      errorStr
    })
  )
};
