/**
* Fake XMLHttpRequest wrapper
*/

import api from './api'

api.init()

const fakeRequest = {
  /**
   * Pretends to post to a remote server
   * @param  {string}  endpoint The endpoint of the server that should be contacted
   * @param  {?object} data     The data that should be transferred to the server
  */
  post(endpoint: any, data?: any) {
    switch (endpoint) {
      case '/auth':
        return api.login(data.username, data.password)
      case '/register':
        return api.register(data.username, data.password)
      case '/logout':
        return api.logout()
      case '/user':
        return api.getProfile(data.token)
      default:
        return null;
    }
  }
}

export default fakeRequest
