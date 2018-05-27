import { HTTPStatusCodes } from "../../utils/httpstatus";
import { IJobSchedule } from "../JobSchedule/IJobSchedule";

const jobScheduleDetailApi = {
  async getJobScheduleDetailApiCall(token: string, scheduleName: string) {
    const jobScheduleDetailEndpoint = `${process.env.REACT_APP_API_HOST ||
      ""}/zinc/schedule/${scheduleName}`;

    return await fetch(jobScheduleDetailEndpoint, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "X-Auth-Token": token
      }
    });
  },
  async postJobScheduleDetailApiCall(
    token: string,
    scheduleDetail: IJobSchedule
  ) {
    const { jobName } = scheduleDetail;

    const jobScheduleDetailEndpoint = `${process.env.REACT_APP_API_HOST ||
      ""}/zinc/jobs/${jobName}/schedule`;

    return await fetch(jobScheduleDetailEndpoint, {
      method: "POST",
      body: JSON.stringify(scheduleDetail),
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
  },
  postJobScheduleDetail(token: string, scheduleDetail: IJobSchedule) {
    return jobScheduleDetailApi
      .postJobScheduleDetailApiCall(token, scheduleDetail)
      .then((response: Response) => {
        if (response.status === HTTPStatusCodes.CREATED) {
          return Promise.resolve(response.json());
        } else {
          return Promise.reject({
            message: "Unable to save Job Schedule at this time."
          });
        }
      })
      .catch((error: any) => {
        return Promise.reject(error);
      });
  }
};

export default jobScheduleDetailApi;
