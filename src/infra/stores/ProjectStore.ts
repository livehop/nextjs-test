"use client";
import { makeAutoObservable, runInAction } from "mobx";
import { IdValue } from "../models/IdValue";
import agent from "../apiclient/agent";
import { Projet } from "../models/Projet";

export default class ProjetStore {
  constructor() {
    makeAutoObservable(this);
  }
  idValues: IdValue[] = [];
  loading: boolean = false;
  selectedProject: Projet | null = null;

  loadIdValues = async (forceLoad: boolean = false) => {
    if (!forceLoad && this.idValues.length > 0) return this.idValues;
    try {
      this.loading = true;
      const idvalues = await agent.projet.valuelist();
      runInAction(() => {
        this.loading = false;
        this.idValues = idvalues;
      });
      return idvalues;
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      console.log(error);
    }
  };

  loadProjet = async (projetId: number) => {
    try {
      this.loading = true;
      const projet = await agent.projet.details(projetId);
      runInAction(() => {
        this.loading = false;
        this.selectedProject = projet;
      });
      return projet;
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      console.log(error);
    }
  };

  saveProjet = async (projet: Projet) => {
    try {
      this.loading = true;
      await agent.projet.save(projet);
      runInAction(() => {
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      console.log(error);
    }
  };
}
