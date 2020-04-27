import { observable, action, configure, runInAction } from "mobx";
import commonStore from "./commonStore";
import userStore from "./userStore";
import apiClient from "./apiClient";

configure({ enforceActions: "observed" });

export class AuthStore {
  @observable isAuthenticated = false;

  @observable login = {
    inProgress: false,
    errors: {
      email: [] as string[],
      password: [] as string[],
      common: [] as string[],
    },
  };

  @observable logout = {
    inProgress: false,
    errors: null,
  };

  @observable values = {
    email: "",
    password: "",
  };

  constructor() {
    this.autoLogIn();
  }

  @action resetLoginErrors() {
    this.login.errors = {
      email: [] as string[],
      password: [] as string[],
      common: [] as string[],
    };
  }

  @action authenticate() {
    this.isAuthenticated = true;
  }

  @action setEmail(email: string) {
    this.values.email = email;
  }

  @action setPassword(password: string) {
    this.values.password = password;
  }

  @action setEmailError(errors: string[]) {
    this.login.errors.email = errors;
  }

  @action setPasswordError(errors: string[]) {
    this.login.errors.password = errors;
  }

  @action setCommonError(errors: string[]) {
    this.login.errors.common = errors;
  }

  @action setLoginInProgress(condition: boolean) {
    this.login.inProgress = condition;
  }

  @action setLogoutInProgress(condition: boolean) {
    this.logout.inProgress = condition;
  }

  @action reset() {
    this.resetLoginErrors();
    this.setEmail("");
    this.setPassword("");
  }

  @action async autoLogIn() {
    this.login.inProgress = true;
    const { token } = commonStore;
    if (token) {
      apiClient.interceptors.request.use((config) => {
        return {
          ...config,
          headers: {
            ...config.headers,
            authorization: `Bearer ${token}`,
          },
        };
      });
      await userStore.pullUser();
    }
    commonStore.setAppLoaded();
    runInAction(() => (this.login.inProgress = false));
  }

  @action async logIn() {
    runInAction(() => (this.login.inProgress = true));
    this.resetLoginErrors();
    const { email, password } = this.values;
    try {
      const response = await apiClient.post("/api/auth/login", {
        email,
        password,
      });
      commonStore.setToken(response.data.token);
      userStore.setUser(response.data.user);
      runInAction(() => this.isAuthenticated = true)
      const { token } = response.data;
      apiClient.interceptors.request.use((config) => {
        return {
          ...config,
          headers: {
            ...config.headers,
            authorization: `Bearer ${token}`,
          },
        };
      });
    } catch (err) {
      runInAction(() => ( this.isAuthenticated = false));
      console.log(err);
      if (err.response.status === 422) {
        const errors = err.response.data.errors;
        const email = errors
          .filter((element: { param: string }) => element.param === "email")
          .map((element: { msg: string }) => element.msg);
        const password = errors
          .filter((element: { param: string }) => element.param === "password")
          .map((element: { msg: string }) => element.msg);
        if (email) {
          this.setEmailError(email);
        }
        if (password) {
          this.setPasswordError(password);
        }
      } else {
        this.setCommonError([email]);
      }
      throw err;
    } finally {
      runInAction(() => (this.login.inProgress = false));
    }
  }

  @action async logOut() {
    this.logout.inProgress = true;
    this.logout.errors = null;
    try {
      await apiClient.post("/api/auth/logout");
      commonStore.forgetToken();
      userStore.forgetUser();
      runInAction(() => this.isAuthenticated = false);
      apiClient.interceptors.request.use((config) => {
        const { Authorization, ...newHeaders } = config.headers;
        return {
          ...config,
          headers: newHeaders,
        };
      });
    } catch (err) {
      this.logout.errors = err.response.data.error;
      throw err;
    } finally {
      this.setLogoutInProgress(false);
    }
  }
}

export default new AuthStore();
