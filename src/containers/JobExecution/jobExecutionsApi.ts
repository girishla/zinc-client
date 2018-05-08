import { HTTPStatusCodes } from "../../utils/httpstatus";

const jobExecutionsApi = {
  async getJobExecutionsApiCall(
    jobName: string,
    instanceId: string,
    token: string
  ) {
    let executionsEndpoint = "";
    if (instanceId === "" && jobName === "") {
      executionsEndpoint = "http://localhost:8090/zinc/jobs/executions";
    } else if (instanceId === "" && jobName !== "") {
      executionsEndpoint = `http://localhost:8090/zinc/jobs/${jobName}/executions`;
    } else {
      executionsEndpoint = `http://localhost:8090/zinc/jobs/${jobName}/${instanceId}/executions`;
    }

    return await fetch(executionsEndpoint, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "X-Auth-Token": token
      }
    });
  },
  getExecutions(token: string) {
    return jobExecutionsApi
      .getJobExecutionsApiCall("", "", token)
      .then((response: Response) => {
        if (response.status === HTTPStatusCodes.OK) {
          return Promise.resolve(response.json());
        } else {
          return Promise.reject({
            message: "Unable to get Excecutions list at this time."
          });
        }
      })
      .catch((error: any) => {
        return Promise.reject(error);
      });
  },
  getJobExecutions(jobName: string, token: string) {
    return jobExecutionsApi
      .getJobExecutionsApiCall(jobName, "", token)
      .then((response: Response) => {
        if (response.status === HTTPStatusCodes.OK) {
          return Promise.resolve(response.json());
        } else {
          return Promise.reject({
            message: "Unable to get Job Excecutions list at this time."
          });
        }
      })
      .catch((error: any) => {
        return Promise.reject(error);
      });
  },
  getJobInstanceExecutions(jobName: string, instanceId: string, token: string) {
    return jobExecutionsApi
      .getJobExecutionsApiCall(jobName, instanceId, token)
      .then((response: Response) => {
        if (response.status === HTTPStatusCodes.OK) {
          return Promise.resolve(response.json());
        } else {
          return Promise.reject({
            message: "Unable to get Job Instance Excecutions list at this time."
          });
        }
      })
      .catch((error: any) => {
        return Promise.reject(error);
      });
  }
};

export default jobExecutionsApi;
