import { observable, configure, action, runInAction } from "mobx";
import { fromPromise, IPromiseBasedObservable } from "mobx-utils";
import apiClient from "./apiClient";

configure({ enforceActions: "observed" });

export class ForgeStore {
  //#region @observable
  @observable files: Array<object> = [];
  @observable uploading: boolean = false;

  @observable objects: Array<object> = [{ "Fetching data...": "Loading..." }];
  @observable objectsState: IPromiseBasedObservable<void> = fromPromise(this.getObjects());

  @observable extractedParametersFiles: Array<object> = [];
  @observable extractedParametersFilesState: IPromiseBasedObservable<void> = fromPromise(
    this.getExtractedParametersFiles()
  );
  //#endregion

  @action async uploadFile(data: object) {
    console.log("async uploadFile");
    this.uploading = true;
    await apiClient.post("/api/forge/dm/file/upload", data);
    this.getObjects();
    this.getExtractedParametersFiles();
    this.uploading = false;
  }

  @action.bound async getObjects() {
    console.log("async getObjects");
    await apiClient.get("/api/forge/dm/getobjects").then(
      (response) => runInAction(() => (this.objects = response.data.body.items))
    );
  }

  @action.bound async deleteObject(objectKey: string) {
    console.log("async deleteObject", objectKey);
    await apiClient.post("/api/forge/dm/deleteobject", { objectKey });
    this.getExtractedParametersFiles();
    this.getObjects();
  }

  @action.bound async getExtractedParametersFiles() {
    console.log("async getExtractedParametersFiles");
    const response = await apiClient.get("/api/forge/dm/getextractedparametersfiles");
    runInAction(() => {
      this.extractedParametersFiles = response.data.extractedParametersFiles;
    });
  }
}

export default new ForgeStore();
