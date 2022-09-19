import axios from "axios";
import Settings from "./settings";

class API {
  constructor(url) {
    this.axios = axios.create({
      baseURL: url,
      timeout: 15000,
    });
  }

  setToken(token) {
    this.token = token;
  }

  handleError(err) {
    if (!err.response || !err.response.data || !err.response.data) {
      throw err;
    }
    throw new Error(err.response.data.message);
  }

  async login(body, { signal }) {
    const path = "auth/login";
    const user = this.axios
      .post(path, body, { signal })
      .then((res) => {
        return res.data.data;
      })
      .catch((err) => {
        this.handleError(err);
      });
    return user;
  }

  async signup(body, { signal }) {
    const path = "auth/signup";
    const user = this.axios
      .post(path, body, { signal })
      .then((res) => res.data.data)
      .catch((err) => {
        this.handleError(err);
      });
    return user;
  }

  async getUser(id, { signal }) {
    const path = `user/${id}`;
    const user = this.axios
      .post(path, {
        headers: {
          authorization: `Bearer ${this.token ? this.token : "no token"}`,
        },
        signal,
      })
      .then((res) => res.data.data)
      .catch((err) => {
        this.handleError(err);
      });
    return user;
  }

  async updateUser(id, body, { signal }) {
    const path = `user/${id}`;
    const user = this.axios
      .patch(path, body, {
        headers: {
          authorization: `Bearer ${this.token ? this.token : "no token"}`,
        },
        signal,
      })
      .then((res) => res.data.data)
      .catch((err) => {
        this.handleError(err);
      });
    return user;
  }

  async deleteUser(id, { signal }) {
    const path = `user/${id}`;
    const user = this.axios
      .delete(path, {
        headers: {
          authorization: `Bearer ${this.token ? this.token : "no token"}`,
        },
        signal,
      })
      .then((res) => res.data.status === "success" && true)
      .catch((err) => {
        this.handleError(err);
      });
    return user;
  }

  async getCar(id, { signal }) {
    const path = `car/${id}`;
    const user = this.axios
      .get(path, { signal })
      .then((res) => res.data.data)
      .catch((err) => {
        this.handleError(err);
      });
    return user;
  }

  async getCarsForUser(id, { signal }) {
    const path = `cars/user/${id}`;
    const user = this.axios
      .get(path, {
        headers: {
          authorization: `Bearer ${this.token ? this.token : "no token"}`,
        },
        signal,
      })
      .then((res) => res.data.data)
      .catch((err) => {
        this.handleError(err);
      });
    return user;
  }

  async getAllCars({ signal }) {
    const path = `cars`;
    const user = this.axios
      .get(path, {
        headers: {
          authorization: `Bearer ${this.token ? this.token : "no token"}`,
        },
        signal,
      })
      .then((res) => res.data.data)
      .catch((err) => {
        this.handleError(err);
      });
    return user;
  }

  async createCarAdvert(body, { signal }) {
    const path = "car/";
    const user = this.axios
      .post(path, body, {
        headers: {
          authorization: `Bearer ${this.token ? this.token : "no token"}`,
        },
        signal,
      })
      .then((res) => res.data.data)
      .catch((err) => {
        this.handleError(err);
      });
    return user;
  }

  async deleteCarAdvert(id, { signal }) {
    const path = `car/${id}`;
    const user = this.axios
      .delete(path, {
        headers: {
          authorization: `Bearer ${this.token ? this.token : "no token"}`,
        },
        signal,
      })
      .then((res) => res.data.status === "success" && true)
      .catch((err) => {
        this.handleError(err);
      });
    return user;
  }
}

export default new API(Settings.getApiURL());
