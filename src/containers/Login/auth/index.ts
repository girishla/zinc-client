import request from './request'
import { HTTPStatusCodes } from '../../../utils/httpstatus';

let localStorage: typeof window.localStorage


localStorage = window.localStorage

const auth = {
  /**
  * Logs a user in, returning a promise with `true` when done
  * @param  {string} username The username of the user
  * @param  {string} password The password of the user
  */
  login(username: string, password: string) {
    if (auth.loggedIn()) {
      return Promise.resolve(true)
    }

    return request.post('/auth', { username, password })!
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
        return Promise.resolve(true);

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
    return request.post('/register', { username, password })!
      // Log user in after registering
      .then(() => auth.login(username, password))
  },
  onChange() { }
}

export default auth
