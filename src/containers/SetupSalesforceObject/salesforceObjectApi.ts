import { HTTPStatusCodes } from "../../utils/httpstatus";

const salesforceObjectApi = {
  async addSalesforceObjectApiCall(token: string, objectNames: string[]) {
    const salesforceObjectEndpoint = `${process.env.REACT_APP_API_HOST ||
      ""}/zinc/setup/sobject/add`;

    return await fetch(salesforceObjectEndpoint, {
      method: "POST",
      body: JSON.stringify(objectNames),
      headers: {
        "content-type": "application/json",
        "X-Auth-Token": token
      }
    });
  },
  addSalesforceObject(token: string, objectNames: string[]) {
    return salesforceObjectApi
      .addSalesforceObjectApiCall(token, objectNames)
      .then((response: Response) => {
        if (response.status === HTTPStatusCodes.CREATED) {
          return Promise.resolve(response.json());
        } else {
          return Promise.reject({
            message: "Unable to Add objects at this time."
          });
        }
      })
      .catch((error: any) => {
        return Promise.reject(error);
      });
  },

  async getSalesforceObjectNamesApiCall(token: string) {
    const salesforceObjectEndpoint = `${process.env.REACT_APP_API_HOST ||
      ""}/zinc/setup/sobject/list`;

    return await fetch(salesforceObjectEndpoint, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "X-Auth-Token": token
      }
    });
  },
  getSalesforceObjectNames(token: string) {
    return salesforceObjectApi
      .getSalesforceObjectNamesApiCall(token)
      .then((response: Response) => {
        if (response.status === HTTPStatusCodes.OK) {
          return Promise.resolve(response.json());
        } else {
          return Promise.reject({
            message: "Unable to get Salesforce Object Names at this time."
          });
        }
      })
      .catch((error: any) => {
        return Promise.reject(error);
      });
  },

  async getSalesforceObjectApiCall(token: string) {
    const salesforceObjectEndpoint = `${process.env.REACT_APP_API_HOST ||
      ""}/sobjects?size=100&sort=updatedDate,desc`;

    return await fetch(salesforceObjectEndpoint, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "X-Auth-Token": token
      }
    });
  },
  getSalesforceObject(token: string) {
    return salesforceObjectApi
      .getSalesforceObjectApiCall(token)
      .then((response: Response) => {
        if (response.status === HTTPStatusCodes.OK) {
          return Promise.resolve(response.json());
        } else {
          return Promise.reject({
            message: "Unable to get Salesforce Object list at this time."
          });
        }
      })
      .catch((error: any) => {
        return Promise.reject(error);
      });
  },

  async deleteSalesforceObjectApiCall(token: string, id: string) {
    const salesforceObjectEndpoint = `${process.env.REACT_APP_API_HOST ||
      ""}/sobjects/${id}`;

    return await fetch(salesforceObjectEndpoint, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "X-Auth-Token": token
      }
    });
  },
  deleteSalesforceObject(token: string, id: string) {
    return salesforceObjectApi
      .deleteSalesforceObjectApiCall(token, id)
      .then((response: Response) => {
        if (response.status === HTTPStatusCodes.NO_CONTENT) {
          return Promise.resolve({});
        } else {
          return Promise.reject({
            message: "Unable to delete Salesforce Object list at this time."
          });
        }
      })
      .catch((error: any) => {
        return Promise.reject(error);
      });
  }
};

export default salesforceObjectApi;
