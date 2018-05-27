import { HTTPStatusCodes } from "../../utils/httpstatus";

const jobScheduleApi = {
  async getJobScheduleApiCall(token: string) {
    const jobScheduleEndpoint = `${process.env.REACT_APP_API_HOST ||
      ""}/zinc/schedule`;

    return await fetch(jobScheduleEndpoint, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "X-Auth-Token": token
      }
    });
  },
  getJobSchedule(token: string) {
    return jobScheduleApi
      .getJobScheduleApiCall(token)
      .then((response: Response) => {
        if (response.status === HTTPStatusCodes.OK) {
          return Promise.resolve(response.json());
        } else {
          return Promise.reject({
            message: "Unable to get Job Schedule list at this time."
          });
        }
      })
      .catch((error: any) => {
        return Promise.reject(error);
      });
  },

  async deleteJobScheduleApiCall(
    token: string,
    jobName: string,
    scheduleName: string
  ) {
    const jobScheduleEndpoint = `${process.env.REACT_APP_API_HOST ||
      ""}/zinc/jobs/${jobName}/schedule/${scheduleName}`;

    return await fetch(jobScheduleEndpoint, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "X-Auth-Token": token
      }
    });
  },
  deleteJobSchedule(token: string, jobName: string, scheduleName: string) {
    return jobScheduleApi
      .deleteJobScheduleApiCall(token, jobName, scheduleName)
      .then((response: Response) => {
        if (response.status === HTTPStatusCodes.OK) {
          return Promise.resolve({});
        } else {
          return Promise.reject({
            message: "Unable to delete Job Schedule list at this time."
          });
        }
      })
      .catch((error: any) => {
        return Promise.reject(error);
      });
  }
};

export default jobScheduleApi;
