import { HTTPStatusCodes } from "../../utils/httpstatus";

const jobStepExecutionsApi = {
  async getJobStepExecutionsApiCall(executionId: string, token: string) {
    const stepStepExecutionsEndpoint = `http://localhost:8090/zinc/jobs/executions/${executionId}/steps`;

    return await fetch(stepStepExecutionsEndpoint, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "X-Auth-Token": token
      }
    });
  },
  getJobStepExecutions(executionId: string, token: string) {
    return jobStepExecutionsApi
      .getJobStepExecutionsApiCall(executionId, token)
      .then((response: Response) => {
        if (response.status === HTTPStatusCodes.OK) {
          return Promise.resolve(response.json());
        } else {
          return Promise.reject({
            message: "Unable to get Job Step Executions list at this time."
          });
        }
      })
      .catch((error: any) => {
        return Promise.reject(error);
      });
  }
};

export default jobStepExecutionsApi;
