import { HTTPStatusCodes } from "../../utils/httpstatus";

const jobsApi = {
  async getJobsApiCall(token: string) {
    return await fetch(
      `${process.env.REACT_APP_API_HOST || ""}/zinc/jobs/definitions`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "X-Auth-Token": token
        }
      }
    );
  },
  getJobs(token: string) {
    return jobsApi
      .getJobsApiCall(token)
      .then((response: Response) => {
        if (response.status === HTTPStatusCodes.OK) {
          return Promise.resolve(response.json());
        } else {
          return Promise.reject({
            message: "Unable to get Jobs list at this time."
          });
        }
      })
      .catch((error: any) => {
        return Promise.reject(error);
      });
  },

  async executeJobApiCall(token: string, jobName: string) {
    return await fetch(
      `${process.env.REACT_APP_API_HOST || ""}/zinc/jobs/${jobName}/executions`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "X-Auth-Token": token
        }
      }
    );
  },
  executeJob(token: string, jobName: string) {
    return jobsApi
      .executeJobApiCall(token, jobName)
      .then((response: Response) => {
        if (response.status === HTTPStatusCodes.CREATED) {
          return Promise.resolve(response.json());
        } else {
          return Promise.reject({
            message: "Unable to execute job."
          });
        }
      })
      .catch((error: any) => {
        return Promise.reject(error);
      });
  }
};

export default jobsApi;
