import axios from "axios";
import Settings from "./settings";

class API {
  constructor(url) {
    this.axios = axios.create({
      baseURL: url,
      timeout: 10000,
    });
  }

  setToken(token) {
    this.token = token;
  }

  async login(body) {
    const path = "auth/login";
    const user = this.axios
      .post(path, body)
      .then((res) => res.data.data)
      .catch((err) => {
        if(!err.response.data.status) throw err;
        if (err.response.data.status && err.response.data.status === "error") {
          throw new Error(err.response.data.message);
        }
        throw err;
      });
    return user;
  }

  async signup(body) {
    const path = "auth/signup";
    const user = this.axios
      .post(path, body)
      .then((res) => res.data.data)
      .catch((err) => {
        if(!err.response.data.status) throw err;
        if (err.response.data.status && err.response.data.status === "error") {
          throw new Error(err.response.data.message);
        }
        throw err;
      });
    return user;
  }

  async getUser(id) {
    const path = `user/${id}`;
    const user = this.axios
      .post(path, {
        headers: {
          authorization: `Bearer ${this.token ? this.token : "no token"}`,
        }
      })
      .then((res) => res.data.data)
      .catch((err) => {
        if(!err.response.data.status) throw err;
        if (err.response.data.status && err.response.data.status === "error") {
          throw new Error(err.response.data.message);
        }
        throw err;
      });
    return user;
  }

  async updateUser(id, body, token) {
    const path = `user/${id}`;
    const user = this.axios
      .patch(path, body, {
        headers: {
          authorization: `Bearer ${this.token ? this.token : "no token"}`,
        },
      })
      .then((res) => res.data.data)
      .catch((err) => {
        if(!err.response.data.status) throw err;
        if (err.response.data.status && err.response.data.status === "error") {
          throw new Error(err.response.data.message);
        }
        throw err;
      });
    return user;
  }

  async deleteUser(id, token) {
    const path = `user/${id}`;
    const user = this.axios
      .delete(path, {
        headers: {
          authorization: `Bearer ${this.token ? this.token : "no token"}`,
        },
      })
      .then((res) => (res.data.status === "success" && true))
      .catch((err) => {
        if(!err.response.data.status) throw err;
        if (err.response.data.status && err.response.data.status === "error") {
          throw new Error(err.response.data.message);
        }
        throw err;
      });
    return user;
  }

  async getCar(id) {
    const path = `car/${id}`;
    const user = this.axios
      .get(path)
      .then((res) => res.data.data)
      .catch((err) => {
        if(!err.response.data.status) throw err;
        if (err.response.data.status && err.response.data.status === "error") {
          throw new Error(err.response.data.message);
        }
        throw err;
      });
    return user;
  }

  async getCarsForUser(id, token) {
    const path = `cars/user/${id}`;
    const user = this.axios
      .get(path, {
        headers: {
          authorization: `Bearer ${this.token ? this.token : "no token"}`,
        },
      })
      .then((res) => res.data.data)
      .catch((err) => {
        if(!err.response.data.status) throw err;
        if (err.response.data.status && err.response.data.status === "error") {
          throw new Error(err.response.data.message);
        }
        throw err;
      });
    return user;
  }

  async getAllCars(token) {
    const path = `cars`;
    const user = this.axios
      .get(path, {
        headers: {
          authorization: `Bearer ${this.token ? this.token : "no token"}`,
        },
      })
      .then((res) => res.data.data)
      .catch((err) => {
        if(!err.response.data.status) throw err;
        if (err.response.data.status && err.response.data.status === "error") {
          throw new Error(err.response.data.message);
        }
        throw err;
      });
    return user;
  }

  async createCarAdvert(body, token) {
    const path = "car/";
    const user = this.axios
      .post(path, body, {
        headers: {
          authorization: `Bearer ${this.token ? this.token : "no token"}`,
        },
      })
      .then((res) => res.data.data)
      .catch((err) => {
        if(!err.response.data.status) throw err;
        if (err.response.data.status && err.response.data.status === "error") {
          throw new Error(err.response.data.message);
        }
        throw err;
      });
    return user;
  }

  async deleteCarAdvert(id, token) {
    const path = `car/${id}`;
    const user = this.axios
      .delete(path, {
        headers: {
          authorization: `Bearer ${this.token ? this.token : "no token"}`,
        },
      })
      .then((res) => (res.data.status === "success" && true))
      .catch((err) => {
        if(!err.response.data.status) throw err;
        if (err.response.data.status && err.response.data.status === "error") {
          throw new Error(err.response.data.message);
        }
        throw err;
      });
    return user;
  }
}

export default new API(Settings.getApiURL());
