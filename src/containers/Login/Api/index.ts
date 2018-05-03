
import { HTTPStatusCodes } from '../../../utils/httpstatus';
import api from './api';

let localStorage: typeof window.localStorage


localStorage = window.localStorage

const auth = {

  getprofile() {

    return api.getProfile(localStorage.getItem("token")!)
      .then((response: Response) => {

        if (response.status === HTTPStatusCodes.OK) {
          return Promise.resolve(response.json());
        } else {

          if ((response.status === HTTPStatusCodes.UNAUTHORIZED) || (response.status === HTTPStatusCodes.BAD_REQUEST)) {
            return Promise.reject({ message: 'Invalid credentials, you need to login.' });

          } else {
            return Promise.reject({ message: 'The server is unable to authenticate your request. Please try again later.' });
          }

        }

      })
      .catch((error: any) => {

        if (error.message === "Failed to fetch") {
          return Promise.reject({ message: 'The server appears to be down. Please contact your administrator' })
        }
        return Promise.reject(error)
      }
      )

  },




  /**
  * Logs a user in, returning a promise with `true` when done
  * @param  {string} username The username of the user
  * @param  {string} password The password of the user
  */
  login(username: string, password: string) {
    if (auth.loggedIn()) {
      return Promise.resolve(true)
    }

    return api.login(username, password)
      .then((response: Response) => {

        if (response.status === HTTPStatusCodes.OK) {
          return response.json();
        } else {

          if ((response.status === HTTPStatusCodes.UNAUTHORIZED) || (response.status === HTTPStatusCodes.BAD_REQUEST)) {
            return Promise.reject({ message: 'Invalid credentials. Please try again.' });

          } else {
            return Promise.reject({ message: 'The server is unable to authenticate your request. Please try again later.' });
          }

        }

      })
      .then((responseData: any) => {
        // Save token to local storage
        localStorage.token = responseData.token
        return Promise.resolve(responseData);

      }).catch((error: any) => {

        if (error.message === "Failed to fetch") {
          return Promise.reject({ message: 'The server appears to be down. Please contact your administrator' })
        }
        return Promise.reject(error)
      }
      )

  },
  /**
  * Logs the current user out
  */
  logout() {
    localStorage.removeItem('token')
    return Promise.resolve(true);
  },
  /**
  * Checks if a user is logged in
  */
  loggedIn() {
    return !!localStorage.token
  },
  /**
  * Registers a user and then logs them in
  * @param  {string} username The username of the user
  * @param  {string} password The password of the user
  */
  register(username: string, password: string) {
    // Post a fake request
    return api.register(username, password)
      // Log user in after registering
      .then(() => auth.login(username, password))
  },
  onChange() { }
}

export default auth
