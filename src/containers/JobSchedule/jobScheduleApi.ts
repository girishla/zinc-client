import { HTTPStatusCodes } from "../../utils/httpstatus";

const jobScheduleApi = {
  async getJobScheduleApiCall(token: string) {
    const jobScheduleEndpoint = `http://localhost:8090/zinc/jobs/schedule`;

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
  }
};

export default jobScheduleApi;
