import request from './fakeRequest'

let localStorage: typeof window.localStorage

// // If we're testing, use a local storage polyfill
// if (global.process && process.env.NODE_ENV === 'test') {
//   localStorage = require('localStorage')
// } else {
//   // If not, use the browser one
//   localStorage = window.localStorage
// }

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

    // Post a fake request
    return request.post('/login', { username, password })!
      .then((response: any) => {
        // Save token to local storage
        localStorage.token = response.token
        return Promise.resolve(true)
      })
  },
  /**
  * Logs the current user out
  */
  logout() {
    return request.post('/logout')
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
