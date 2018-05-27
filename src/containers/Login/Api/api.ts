let localStorage: any;

localStorage = window.localStorage;

const server = {
  /**
   * Populates the users, similar to seeding a database in the real world
   */
  init() {
    // do any init activities
  },
  /**
   * Pretends to log a user in
   *
   * @param  {string} username The username of the user
   * @param  {string} password The password of the user
   */
  async login(username: string, password: string) {
    return await fetch(`${process.env.REACT_APP_API_HOST || ""}/auth`, {
      body: JSON.stringify({ username, password }),
      method: "POST",
      headers: {
        "content-type": "application/json"
      }
    });
  },
  /**
   * Pretends to register a user
   *
   * @param  {string} username The username of the user
   * @param  {string} password The password of the user
   */
  register(username: string, password: string) {
    return new Promise((resolve, reject) => {
      resolve({ registered: true });
    });
  },
  /**
   * Pretends to log a user out and resolves
   */
  logout() {
    return new Promise(resolve => {
      localStorage.removeItem("token");
      resolve(true);
    });
  },

  async getProfile(token: string) {
    return await fetch(`${process.env.REACT_APP_API_HOST || ""}/user`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "X-Auth-Token": token
      }
    });
  }
};

server.init();

export default server;
