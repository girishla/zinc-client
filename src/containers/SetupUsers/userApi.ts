import { HTTPStatusCodes } from "../../utils/httpstatus";

const userApi = {
  async addUserApiCall(token: string, objectNames: string[]) {
    const userEndpoint = `${process.env.REACT_APP_API_HOST || ""}/users`;

    return await fetch(userEndpoint, {
      method: "POST",
      body: JSON.stringify(objectNames),
      headers: {
        "content-type": "application/json",
        "X-Auth-Token": token
      }
    });
  },
  addUser(token: string, objectNames: string[]) {
    return userApi
      .addUserApiCall(token, objectNames)
      .then((response: Response) => {
        if (response.status === HTTPStatusCodes.CREATED) {
          return Promise.resolve(response.json());
        } else {
          return Promise.reject({
            message: "Unable to Add users at this time."
          });
        }
      })
      .catch((error: any) => {
        return Promise.reject(error);
      });
  },

  async getUserApiCall(token: string) {
    const userEndpoint = `${process.env.REACT_APP_API_HOST ||
      ""}/users?size=100&sort=username,asc`;

    return await fetch(userEndpoint, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "X-Auth-Token": token
      }
    });
  },
  getUser(token: string) {
    return userApi
      .getUserApiCall(token)
      .then((response: Response) => {
        if (response.status === HTTPStatusCodes.OK) {
          return Promise.resolve(response.json());
        } else {
          return Promise.reject({
            message: "Unable to get User list at this time."
          });
        }
      })
      .catch((error: any) => {
        return Promise.reject(error);
      });
  },

  async deleteUserApiCall(token: string, id: string) {
    const userEndpoint = `${process.env.REACT_APP_API_HOST || ""}/users/${id}`;

    return await fetch(userEndpoint, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "X-Auth-Token": token
      }
    });
  },
  deleteUser(token: string, id: string) {
    return userApi
      .deleteUserApiCall(token, id)
      .then((response: Response) => {
        if (response.status === HTTPStatusCodes.NO_CONTENT) {
          return Promise.resolve({});
        } else {
          return Promise.reject({
            message: "Unable to delete User at this time."
          });
        }
      })
      .catch((error: any) => {
        return Promise.reject(error);
      });
  }
};

export default userApi;
