import { createAction } from "typesafe-actions";
import { IJobExecutionCollection } from "./IJobExecutionCollection";

export const LOAD_EXECUTIONS_START = "zinc/JOBEXECUTIONS/LOAD_EXECUTIONS_START";
export const LOAD_JOBEXECUTIONS_START =
  "zinc/JOBEXECUTIONS/LOAD_JOBEXECUTIONS_START";
export const LOAD_JOBINSTANCEEXECUTIONS_START =
  "zinc/JOBEXECUTIONS/LOAD_JOBINSTANCEEXECUTIONS_START";
export const LOAD_JOBEXECUTIONS_SUCCESS =
  "zinc/JOBEXECUTIONS/LOAD_EXECUTIONS_SUCCESS";
export const LOAD_JOBEXECUTIONS_FAILURE =
  "zinc/JOBEXECUTIONS/LOAD_EXECUTIONS_FAILURE";

export const jobExecutionActions = {
  loadExecutions: createAction(LOAD_EXECUTIONS_START),
  loadJobExecutions: createAction(
    LOAD_JOBEXECUTIONS_START,
    (jobName: string) => ({
      type: LOAD_JOBEXECUTIONS_START,
      jobName
    })
  ),
  loadExecutionsSuccess: createAction(
    LOAD_JOBEXECUTIONS_SUCCESS,
    (jobExecutions: IJobExecutionCollection) => ({
      type: LOAD_JOBEXECUTIONS_SUCCESS,
      jobExecutions
    })
  ),
  loadExecutionsFailure: createAction(
    LOAD_JOBEXECUTIONS_FAILURE,
    (errorStr: string) => ({
      type: LOAD_JOBEXECUTIONS_FAILURE,
      errorStr
    })
  ),
  loadJobInstanceExecutions: createAction(
    LOAD_JOBINSTANCEEXECUTIONS_START,
    (jobName: string, instanceId: string) => ({
      type: LOAD_JOBINSTANCEEXECUTIONS_START,
      jobName,
      instanceId
    })
  )
};
