import { observable, action, reaction, configure } from "mobx";

configure({ enforceActions: "observed" });

export class CommonStore {
  @observable token: string | null = window.localStorage.getItem("jwt");
  @observable appLoaded = false;
  @observable tags = [];
  @observable isLoadingTags = false;

  constructor() {
    reaction(
      () => this.token,
      (token) => {
        if (token) {
          window.localStorage.setItem("jwt", token);
        } else {
          window.localStorage.removeItem("jwt");
        }
      }
    );
  }

  @action forgetToken() {
    this.token = null;
  }

  @action setToken(token: string) {
    this.token = token;
  }

  @action setAppLoaded() {
    this.appLoaded = true;
  }
}

export default new CommonStore();
