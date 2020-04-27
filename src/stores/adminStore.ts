import { observable, action, runInAction, configure } from "mobx";
import { fromPromise, IPromiseBasedObservable } from "mobx-utils";
import apiClient from "./apiClient";

configure({ enforceActions: "observed" });

export class AdminStore {
  @observable users: Array<object> = [{ "fetching users...": "Loading data..." }];
  @observable usersState: IPromiseBasedObservable<void> = fromPromise(this.getUsers());

  @action.bound async getUsers() {
    console.log("async getUsers");
    const response = await apiClient.get("/api/users/users");
    runInAction(() => (this.users = response.data.users));
  }

  @action.bound async deleteUser(userId: string) {
    console.log("async deleteUser");
    await apiClient.post("/api/users/delete", { userId });
    this.getUsers();
  }
}
export default new AdminStore();
