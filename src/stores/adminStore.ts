import { observable, action, runInAction, configure } from "mobx";
import { fromPromise, IPromiseBasedObservable } from "mobx-utils";
import apiClient from "./apiClient";
import { IUser } from "../react-app-env";

configure({ enforceActions: "observed" });

export class AdminStore {
  @observable forgeAppName: string = "Fetching name...";
  @observable forgeAppNameState: IPromiseBasedObservable<void> = fromPromise(this.getforgeAppName());

  @observable users: IUser[] = [];
  @observable usersState: IPromiseBasedObservable<void> = fromPromise(this.getUsers());

  @observable allObjects: Array<object> = [{ "Fetching data...": "Loading..." }];
  @observable allObjectsState: IPromiseBasedObservable<void> = fromPromise(this.getAllObjects());

  @observable buckets: Array<object> = [{ "Fetching data...": "Loading..." }];
  @observable bucketsState: IPromiseBasedObservable<void> = fromPromise(this.getBuckets());

  @observable appBundles: Array<object> = [{ "Fetching data...": "Loading..." }];
  @observable appBundlesState: IPromiseBasedObservable<void> = fromPromise(this.getAppBundles());

  @observable activities: Array<object> = [{ "Fetching data...": "Loading..." }];
  @observable activitiesState: IPromiseBasedObservable<void> = fromPromise(this.getActivities());

  @action async getforgeAppName(): Promise<void> {
    console.log("async getforgeAppName");
    const response = await apiClient.get("/api/forge/dm/getapplicationName");
    runInAction(() => (this.forgeAppName = response.data));
  }

  @action.bound async createNickname(newname: string) {
    console.log("async createNickname");
    await apiClient.post("/api/forge/da/createnickname", { newname });
    this.getforgeAppName();
  }

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

  @action.bound async setUserRole(userId: string, role: string) {
    console.log("async setUserRole");
    await apiClient.post("/api/users/role", { userId, role });
    this.getUsers();
  }

  @action.bound async getBuckets() {
    console.log("async getBuckets");
    const response = await apiClient.get("/api/forge/dm/getbuckets");
    runInAction(() => (this.buckets = response.data.body.items));
  }

  @action.bound async deleteBucket(bucketKey: string) {
    console.log("async deleteBucket", bucketKey);
    await apiClient.post("/api/forge/dm/deletebucket", { bucketKey });
    this.getBuckets();
  }

  @action.bound async getAllObjects(): Promise<void> {
    console.log("async getAllObjects");
    await apiClient.get("/api/forge/dm/getallobjects").then((response) => {
      runInAction(() => (this.allObjects = response.data));
    });
  }

  @action.bound async deleteObject(bucketKey: string, objectKey: string) {
    console.log("async deleteObject", objectKey);
    await apiClient.post("/api/forge/dm/deleteobject", { bucketKey, objectKey });
    this.getAllObjects();
  }

  @action.bound async createAppBundle(id: string) {
    console.log("async createAppBundle");
    await apiClient.post("/api/forge/da/createappbundle", { id });
    this.getAppBundles();
  }

  @action.bound async getAppBundles() {
    console.log("async getAppBundles");
    const response = await apiClient.get("/api/forge/da/getappbundles");
    runInAction(() => {
      this.appBundles = response.data
        .map((value: string, index: number) => ({
          index: index + 1,
          id: value.split(/[.+\s]/)[1],
          value: value,
        }))
        .filter((appBundle: { value: string }) => {
          return appBundle.value.startsWith("clforgeapp");
        });
    });
  }

  @action.bound async deleteAppBundle(id: string) {
    console.log("async deleteAppBundle");
    await apiClient.post("/api/forge/da/deleteappbundle", { id });
    this.getAppBundles();
  }

  @action.bound async createActivity(id: string) {
    console.log("async createActivity");
    await apiClient.post("/api/forge/da/createactivity", { id });
    this.getActivities();
  }

  @action.bound async getActivities() {
    console.log("async getActivities");
    const response = await apiClient.get("/api/forge/da/getactivities");
    runInAction(() => {
      this.activities = response.data
        .map((value: string, index: number) => ({
          index: index + 1,
          id: value.split(/[.+\s]/)[1],
          value: value,
        }))
        .filter((appBundle: { value: string }) => {
          return appBundle.value.startsWith("clforgeapp");
        });
    });
  }

  @action.bound async deleteActivity(id: string) {
    console.log("async deleteActivity");
    await apiClient.post("/api/forge/da/deleteactivity", { id });
    this.getActivities();
  }

  @action.bound async createWorkItem(id: string) {
    console.log("async createWorkItem");
    await apiClient.post("/api/forge/da/createworkitem", { id });
  }
}
export default new AdminStore();
