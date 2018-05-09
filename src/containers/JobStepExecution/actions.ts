import { createAction } from "typesafe-actions";
import { IStepExecution } from "../JobExecution/IJobExecutionCollection";

export const LOAD_JOBSTEPEXECUTIONS_START =
  "zinc/JOBSTEPEXECUTIONS/LOAD_JOBSTEPEXECUTIONS_START";
export const LOAD_JOBSTEPEXECUTIONS_SUCCESS =
  "zinc/JOBSTEPEXECUTIONS/LOAD_JOBSTEPEXECUTIONS_SUCCESS";
export const LOAD_JOBSTEPEXECUTIONS_FAILURE =
  "zinc/JOBSTEPEXECUTIONS/LOAD_JOBSTEPEXECUTIONS_FAILURE";

export const jobExecutionActions = {
  loadJobStepExecutions: createAction(
    LOAD_JOBSTEPEXECUTIONS_START,
    (executionId: string) => ({
      type: LOAD_JOBSTEPEXECUTIONS_START,
      executionId
    })
  ),
  loadJobStepExecutionsSuccess: createAction(
    LOAD_JOBSTEPEXECUTIONS_SUCCESS,
    (jobStepExecutions: IStepExecution[]) => ({
      type: LOAD_JOBSTEPEXECUTIONS_SUCCESS,
      jobStepExecutions
    })
  ),
  loadJobStepExecutionsFailure: createAction(
    LOAD_JOBSTEPEXECUTIONS_FAILURE,
    (errorStr: string) => ({
      type: LOAD_JOBSTEPEXECUTIONS_FAILURE,
      errorStr
    })
  )
};
