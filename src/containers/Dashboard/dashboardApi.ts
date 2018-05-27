import { HTTPStatusCodes } from "../../utils/httpstatus";

const dashboardApi = {
  async getDashboardDataApiCall(token: string, metricType: string) {
    return await fetch(
      `${process.env.REACT_APP_API_HOST ||
        ""}/zincmetrics/search/findByMetricType?metricType=${metricType}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "X-Auth-Token": token
        }
      }
    );
  },
  async getDashboardDataByTimeApiCall(
    token: string,
    metricType: string,
    metricTime: number
  ) {
    return await fetch(
      `${process.env.REACT_APP_API_HOST ||
        ""}/zincmetrics/search/findTypeAndMetricSumByTimeGreaterThan?metricType=${metricType}&metricTime=${metricTime}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "X-Auth-Token": token
        }
      }
    );
  },
  getDashboardData(token: string, metricType: string) {
    return dashboardApi
      .getDashboardDataApiCall(token, metricType)
      .then((response: Response) => {
        if (response.status === HTTPStatusCodes.OK) {
          return Promise.resolve(response.json());
        } else {
          return Promise.reject({
            message: "Unable to get Dashboard data at this time."
          });
        }
      })
      .catch((error: any) => {
        return Promise.reject(error);
      });
  },
  getDashboardDataByTime(
    token: string,
    metricType: string,
    metricTime: number
  ) {
    return dashboardApi
      .getDashboardDataByTimeApiCall(token, metricType, metricTime)
      .then((response: Response) => {
        if (response.status === HTTPStatusCodes.OK) {
          return Promise.resolve(response.json());
        } else {
          return Promise.reject({
            message: "Unable to get Dashboard data at this time."
          });
        }
      })
      .catch((error: any) => {
        return Promise.reject(error);
      });
  }
};

export default dashboardApi;
