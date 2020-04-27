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

  @action async getforgeAppName(): Promise<void> {
    console.log("async getforgeAppName");
    const response = await apiClient.get("/api/forge/oss/getapplicationName");
    runInAction(() => (this.forgeAppName = response.data));
  }

  @action async uploadFile(data: object) {
    console.log("async uploadFile");
    this.uploading = true;
    await apiClient.post("/api/forge/oss/file/upload", data);
    this.getObjects();
    this.uploading = false;
  }

  @action.bound async getBuckets() {
    console.log("async getBuckets");
    const response = await apiClient.get("/api/forge/oss/getbuckets");
    runInAction(() => (this.buckets = response.data.body.items));
  }

  @action.bound async deleteBucket(bucketKey: string) {
    console.log("async deleteBucket");
    await apiClient.post("/api/forge/oss/deletebucket", { bucketKey });
    this.getBuckets();
  }

  @action.bound async getObjects(): Promise<void> {
    console.log("async getObjects");
    await apiClient.get("/api/forge/oss/getobjects").then(
      (response) => runInAction(() => (this.objects = response.data.body.items)),
      (reject) => runInAction(() => (this.objects = [{ "Error reason": reject.response.data.statusBody.reason }]))
    );
  }

  @action.bound async deleteObject(objectName: string): Promise<any> {
    console.log("async deleteObject", objectName);
    await apiClient.post("/api/forge/oss/deleteobject", { objectName });
    this.getObjects();
  }
}

export default new ForgeStore();
