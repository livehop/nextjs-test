"use client";
import { makeAutoObservable, runInAction } from "mobx";
import { IdValue } from "../models/IdValue";
import agent from "../apiclient/agent";
import { store } from "./Store";
import { KaizenAttachement } from "../models/Document";

export default class DocumentStore {
  constructor() {
    makeAutoObservable(this);
  }

  attachedFiles: KaizenAttachement[] = [];
  uploading: boolean = false;
  loading: boolean = false;

  loadFiles = async () => {
    if (store.kaizenStore.editDocumentId === null) return;
    try {
      this.loading = true;
      const files = await agent.document.list(store.kaizenStore.editDocumentId);
      runInAction(() => {
        this.loading = false;
        this.attachedFiles = files.map((file) => {
          return {
            id: file.id,
            data: new File([], file.fileName),
            isProcessing: false,
            size: file.size,
          };
        });
      });
      return files;
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
      return [];
    }
  };

  uploadFile = async (blob: Blob) => {
    if (store.kaizenStore.editDocumentId === null) return;
    try {
      this.uploading = true;
      const documentId = await agent.document.uploadDocument(
        store.kaizenStore.editDocumentId,
        blob
      );
      runInAction(() => {
        this.uploading = false;
      });
      return documentId;
    } catch (error) {
      runInAction(() => {
        this.uploading = false;
      });
      console.log(error);
      return 0;
    }
  };

  deleteFile = async (id: number) => {
    try {
      this.loading = true;
      const success = await agent.document.delete(id);
      runInAction(() => {
        this.loading = false;
      });
      return success;
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
      return false;
    }
  };

  downloadFile = async (id: number) => {
    try {
      let file = await agent.document.download(id);
      runInAction(() => {});
      return file;
    } catch (error) {
      console.log(error);
    }
  };
}
