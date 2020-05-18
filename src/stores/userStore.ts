import { observable, action, computed } from "mobx";
import apiClient from "./apiClient";
import commonStore from "./commonStore";
import authStore from "./authStore";
import { IUser } from "../react-app-env";

export class UserStore {
  //#region For dev only. Correct before production
  @observable admins: Array<string> = ["admin@bimgen.app"];

  @computed get isAdmin() {
    return this.currentUser && this.admins.includes(this.currentUser.email) ? true : false;
  }
  //#endregion

  @observable currentUser: IUser | null = null;

  @observable registrationValues = {
    email: "",
    password: "",
    fullName: "",
    displayName: "",
  };

  @observable registration = {
    inProgress: false,
    errors: {
      email: [] as string[],
      password: [] as string[],
      fullName: [] as string[],
      displayName: [] as string[],
      common: [] as string[],
    },
  };

  @observable pullUserValues = {
    inProgress: false,
    errors: {},
  };

  @action forgetUser() {
    this.currentUser = null;
  }

  @action setUser(user: IUser) {
    this.currentUser = user;
  }

  @action setEmail(email: string) {
    this.registrationValues.email = email;
  }

  @action setPassword(password: string) {
    this.registrationValues.password = password;
  }

  @action setFullName(fullName: string) {
    this.registrationValues.fullName = fullName;
  }

  @action setDisplayName(displayName: string) {
    this.registrationValues.displayName = displayName;
  }

  @action setEmailError(errors: string[]) {
    this.registration.errors.email = errors;
  }

  @action setPasswordError(errors: string[]) {
    this.registration.errors.password = errors;
  }

  @action setCommonError(errors: string[]) {
    this.registration.errors.common = errors;
  }

  @action setFullNameError(errors: string[]) {
    this.registration.errors.fullName = errors;
  }

  @action setDisplayNameError(errors: string[]) {
    this.registration.errors.displayName = errors;
  }

  @action setRegistrationInProgress(condition: boolean) {
    this.registration.inProgress = condition;
  }

  @action resetRegistrationErrors() {
    this.registration.errors = {
      email: [] as string[],
      password: [] as string[],
      fullName: [] as string[],
      displayName: [] as string[],
      common: [] as string[],
    };
  }

  @action async pullUser(): Promise<boolean> {
    this.pullUserValues.inProgress = true;
    try {
      const response = await apiClient.get("/api/users/profile");
      if (response.status === 200) {
        this.setUser(response.data.user);
        authStore.authenticate();
        return true;
      } else {
        return false;
      }
    } catch (e) {
      this.pullUserValues.errors = e;
      return false;
    } finally {
      this.pullUserValues.inProgress = false;
    }
  }

  @action async signUp() {
    this.registration.inProgress = true;
    this.resetRegistrationErrors();
    const { email, password, fullName, displayName } = this.registrationValues;
    try {
      const response = await apiClient.post("/api/auth/register", {
        email,
        password,
        full_name: fullName,
        display_name: displayName,
      });
      commonStore.setToken(response.data.token);
      this.setUser(response.data.user);
      authStore.authenticate();
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
      if (err.response.status === 422) {
        const errors = err.response.data.errors;

        const email = errors
          .filter((element: { param: string }) => element.param === "email")
          .map((element: { msg: string }) => element.msg);

        const password = errors
          .filter((element: { param: string }) => element.param === "password")
          .map((element: { msg: string }) => element.msg);

        const full_name = errors
          .filter((element: { param: string }) => element.param === "full_name")
          .map((element: { msg: string }) => element.msg);

        const display_name = errors
          .filter((element: { param: string }) => element.param === "display_name")
          .map((element: { msg: string }) => element.msg);

        if (email) {
          this.setEmailError(email);
        }
        if (password) {
          this.setPasswordError(password);
        }
        if (full_name) {
          this.setFullNameError(full_name);
        }
        if (display_name) {
          this.setDisplayNameError(display_name);
        }
      } else {
        const { message } = err.response.data;
        this.setCommonError([message]);
      }
    } finally {
      this.setRegistrationInProgress(false);
    }
  }
}

export default new UserStore();
