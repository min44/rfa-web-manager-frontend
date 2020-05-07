import { observable, configure, action, runInAction } from "mobx";
import { fromPromise, IPromiseBasedObservable } from "mobx-utils";
import apiClient from "./apiClient";

configure({ enforceActions: "observed" });

export class ForgeStore {
  @observable forgeAppName: string = "Fetching name...";
  @observable forgeAppNameState: IPromiseBasedObservable<void> = fromPromise(this.getforgeAppName());

  @observable files: Array<object> = [];
  @observable uploading: boolean = false;

  @observable buckets: Array<object> = [{ "Fetching data...": "Loading..." }];
  @observable bucketsState: IPromiseBasedObservable<void> = fromPromise(this.getBuckets());

  @observable objects: Array<object> = [{ "Fetching data...": "Loading..." }];
  @observable objectsState: IPromiseBasedObservable<void> = fromPromise(this.getObjects());

  @observable appBundles: Array<object> = [{ "Fetching data...": "Loading..." }];
  @observable appBundlesState: IPromiseBasedObservable<void> = fromPromise(this.getAppBundles());

  @observable activities: Array<object> = [{ "Fetching data...": "Loading..." }];
  @observable ActivitiesState: IPromiseBasedObservable<void> = fromPromise(this.getActivities());

  @action.bound async createNickname(newname: string) {
    console.log("async createNickname");
    await apiClient.post("/api/forge/da/createnickname", { newname });
    this.getforgeAppName();
  }

  @action async getforgeAppName(): Promise<void> {
    console.log("async getforgeAppName");
    const response = await apiClient.get("/api/forge/dm/getapplicationName");
    runInAction(() => (this.forgeAppName = response.data));
  }

  @action async uploadFile(data: object) {
    console.log("async uploadFile");
    this.uploading = true;
    await apiClient.post("/api/forge/dm/file/upload", data);
    this.getObjects();
    this.uploading = false;
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

  @action.bound async getObjects(): Promise<void> {
    console.log("async getObjects");
    await apiClient.get("/api/forge/dm/getobjects").then(
      (response) => runInAction(() => (this.objects = response.data.body.items)),
      (reject) => runInAction(() => (this.objects = [{ "Error reason": reject.response.data.statusBody.reason }]))
    );
  }

  @action.bound async deleteObject(objectKey: string) {
    console.log("async deleteObject", objectKey);
    await apiClient.post("/api/forge/dm/deleteobject", { objectKey });
    this.getObjects();
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
      this.activities = response.data.map((value: string, index: number) => ({
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

export default new ForgeStore();
