import { HTTPStatusCodes } from "../../utils/httpstatus";

const jobScheduleDetailApi = {
  async getJobScheduleDetailApiCall(token: string, scheduleName: string) {
    const jobScheduleDetailEndpoint = `http://localhost:8090/zinc/schedule/${scheduleName}`;

    return await fetch(jobScheduleDetailEndpoint, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "X-Auth-Token": token
      }
    });
  },
  getJobScheduleDetail(token: string, scheduleName: string) {
    return jobScheduleDetailApi
      .getJobScheduleDetailApiCall(token, scheduleName)
      .then((response: Response) => {
        if (response.status === HTTPStatusCodes.OK) {
          return Promise.resolve(response.json());
        } else {
          return Promise.reject({
            message: "Unable to get Job ScheduleDetail detail at this time."
          });
        }
      })
      .catch((error: any) => {
        return Promise.reject(error);
      });
  }
};

export default jobScheduleDetailApi;
