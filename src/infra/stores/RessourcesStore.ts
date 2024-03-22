"use client";
import { makeAutoObservable, runInAction } from "mobx";
import { IdValue } from "../models/IdValue";
import agent from "../apiclient/agent";

export default class RessourcesStore {
  constructor() {
    makeAutoObservable(this);
  }
  ressourcesValues: IdValue[] = [];
  typeDemandeValues: IdValue[] = [];

  loading: boolean = false;
  query: string = "";

  loadRessourcesValues = async () => {
    if (this.ressourcesValues.length > 0) {
      return this.ressourcesValues;
    }
    try {
      this.loading = true;
      const idvalues = await agent.ressourcesnecessaire.listResources();
      runInAction(() => {
        this.loading = false;
        this.ressourcesValues = idvalues;
      });
      return idvalues;
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      console.log(error);
    }
  };

  loadTypeDemandeValues = async () => {
    if (this.typeDemandeValues.length > 0) {
      return this.typeDemandeValues;
    }
    try {
      this.loading = true;
      const idvalues = await agent.ressourcesnecessaire.listTypeDemandes();

      runInAction(() => {
        this.loading = false;
        this.typeDemandeValues = idvalues;
      });
      return idvalues;
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      console.log(error);
    }
  };
}
