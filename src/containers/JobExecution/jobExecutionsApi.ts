import { HTTPStatusCodes } from "../../utils/httpstatus";

const jobExecutionsApi = {
  async getJobExecutionsApiCall(
    jobName: string,
    instanceId: string,
    token: string
  ) {
    let executionsEndpoint = "";
    if (instanceId === "" && jobName === "") {
      executionsEndpoint = `${process.env.REACT_APP_API_HOST ||
        ""}/zinc/jobs/executions`;
    } else if (instanceId === "" && jobName !== "") {
      executionsEndpoint = `${process.env.REACT_APP_API_HOST ||
        ""}/zinc/jobs/${jobName}/executions`;
    } else {
      executionsEndpoint = `${process.env.REACT_APP_API_HOST ||
        ""}/zinc/jobs/${jobName}/${instanceId}/executions`;
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
  },

  async stopJobApiCall(token: string, jobExecutionId: string) {
    return await fetch(
      `${process.env.REACT_APP_API_HOST ||
        ""}/zinc/jobs/executions/${jobExecutionId}?stop=true`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          "X-Auth-Token": token
        }
      }
    );
  },
  stopJob(token: string, jobExecutionId: string) {
    return jobExecutionsApi
      .stopJobApiCall(token, jobExecutionId)
      .then((response: Response) => {
        if (response.status === HTTPStatusCodes.OK) {
          return Promise.resolve();
        } else {
          return Promise.reject({
            message: "Unable to stop job."
          });
        }
      })
      .catch((error: any) => {
        return Promise.reject(error);
      });
  },
  async restartJobApiCall(token: string, jobExecutionId: string) {
    return await fetch(
      `${process.env.REACT_APP_API_HOST ||
        ""}/zinc/jobs/executions/${jobExecutionId}?restart=true`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          "X-Auth-Token": token
        }
      }
    );
  },
  restartJob(token: string, jobExecutionId: string) {
    return jobExecutionsApi
      .restartJobApiCall(token, jobExecutionId)
      .then((response: Response) => {
        if (response.status === HTTPStatusCodes.OK) {
          return Promise.resolve();
        } else {
          return Promise.reject({
            message: "Unable to restart job."
          });
        }
      })
      .catch((error: any) => {
        return Promise.reject(error);
      });
  }
};

export default jobExecutionsApi;
