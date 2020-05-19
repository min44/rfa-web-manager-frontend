import { observable, configure, action, runInAction } from "mobx";
import { fromPromise, IPromiseBasedObservable } from "mobx-utils";
import apiClient from "./apiClient";

configure({ enforceActions: "observed" });

interface signedResourcesFile {
  fileName: string;
  rvtFile: string;
  result: string;
}

export class ForgeStore {
  //#region @observable
  @observable files: Array<object> = [];
  @observable uploading: boolean = false;

  @observable objects: Array<object> = [{ "Fetching data...": "Loading..." }];
  @observable objectsState: IPromiseBasedObservable<void> = fromPromise(this.getObjects());

  @observable signedResourcesData: Array<signedResourcesFile> = [];

  @observable extractedParametersFiles: Array<object> = [];
  @observable extractedParametersFilesState: IPromiseBasedObservable<void> = fromPromise(
    this.getExtractedParametersFiles()
  );
  //#endregion

  
  @action async uploadFile(data: object) {
    console.log("async uploadFile");
    this.uploading = true;
    const response = await apiClient.post("/api/forge/dm/file/upload", data);
    runInAction(() => (this.signedResourcesData = response.data.signedResourcesData));
    this.getObjects();
    this.getExtractedParametersFiles();
    this.uploading = false;
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

  @action.bound async getExtractedParametersFiles() {
    console.log("async getExtractedParametersFiles");
    const response = await apiClient.get("/api/forge/dm/getextractedparametersfiles");
    runInAction(() => {
      this.extractedParametersFiles = response.data.extractedParametersFiles;
    });
  }
}

export default new ForgeStore();
