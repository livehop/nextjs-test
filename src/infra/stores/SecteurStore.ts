"use client";
import { makeAutoObservable, runInAction } from "mobx";
import { IdValue } from "../models/IdValue";
import agent from "../apiclient/agent";
import { store } from "./Store";
import { Secteur, SousSecteur } from "../models";

export default class SecteurStore {
  constructor() {
    makeAutoObservable(this);
  }
  idValues: IdValue[] = [];
  loading: boolean = false;
  selectedValues: IdValue[] = [];
  sousSecteurSelectedValues: IdValue[] = [];

  secteurs: Secteur[] = [];
  selectedSecteur: Secteur | null = null;

  sousSecteurs: SousSecteur[] = [];
  selectedSousSecteur: SousSecteur | null = null;

  saveSecteur = async (secteur: Secteur) => {
    try {
      this.loading = true;
      const result = await agent.secteur.save(secteur);
      runInAction(() => {
        this.loading = false;
      });
      return result;
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      console.log(error);
    }
  };

  loadSecteurs = async (equipeId: number) => {
    try {
      this.loading = true;
      const secteurs = await agent.secteur.secteurList(equipeId);
      runInAction(() => {
        this.loading = false;
        this.secteurs = secteurs;
      });
      return secteurs;
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      console.log(error);
    }
  };

  loadSecteur = async (secteurId: number) => {
    try {
      this.loading = true;
      const secteur = await agent.secteur.details(secteurId);
      runInAction(() => {
        this.loading = false;
        this.selectedSecteur = secteur;
      });
      return secteur;
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      console.log(error);
    }
  };

  saveSousSecteur = async (soussecteur: SousSecteur) => {
    try {
      this.loading = true;
      const result = await agent.soussecteur.save(soussecteur);
      runInAction(() => {
        this.loading = false;
      });
      return result;
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      console.log(error);
    }
  };

  resetSousSecteurs = () => {
    this.sousSecteurs = [];
  };
  loadSousSecteurs = async (equipeId: number, secteurId: number) => {
    try {
      this.loading = true;
      const soussecteurs = await agent.soussecteur.souseSecteurList(
        equipeId,
        secteurId
      );
      runInAction(() => {
        this.loading = false;
        this.sousSecteurs = soussecteurs;
      });
      return soussecteurs;
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      console.log(error);
    }
  };

  loadSousSecteur = async (soussecteurId: number) => {
    console.log("loading sous secteur...." + soussecteurId);
    try {
      this.loading = true;
      console.log("before call....");
      const soussecteur = await agent.soussecteur.details(soussecteurId);
      console.log("after call...." + JSON.stringify(soussecteur));
      runInAction(() => {
        this.loading = false;
        this.selectedSousSecteur = soussecteur;
      });
      return soussecteur;
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      console.log(error);
    }
  };

  toggleSelectedValue = (value: IdValue) => {
    const index = this.selectedValues.findIndex((v) => v.id === value.id);
    if (index >= 0) {
      this.selectedValues.splice(index, 1);
    } else {
      this.selectedValues.push(value);
    }
  };

  hasAnyCheckedItem = () => {
    return this.selectedValues.length > 0;
  };

  clearAllSelectedItems = () => {
    this.selectedValues = [];
    this.idValues = [{ id: -1, value: "Sélectionner Équipe en premier" }];
    this.sousSecteurSelectedValues = [];
  };

  isChecked = (value: IdValue) => {
    return this.selectedValues.findIndex((v) => v.id === value.id) >= 0;
  };

  reloadIdValues = async () => {
    console.log(
      "reloading id values for secteur..... " +
        JSON.stringify(store.equipeStore.selectedValues)
    );

    if (store.equipeStore.selectedValues.length == 0) {
      this.idValues = [{ id: -1, value: "Sélectionner Équipe en premier" }];
      return;
    }
    let ids = store.equipeStore.selectedValues.map((v) => v.id);
    let idstring = ids.join(",");

    try {
      this.loading = true;
      const idvalues = await agent.secteur.valuelist(idstring);
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

  resetValues = () => {
    this.idValues = [];
    this.sousSecteurSelectedValues = [];
  };

  loadIdValues = async (equipeId: number) => {
    try {
      if (equipeId === undefined || equipeId === 0) return;
      this.loading = true;
      const idvalues = await agent.secteur.valuelist(equipeId.toString());
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

  loadSousSecteurValues = async (equipeId: number, secteurId: number) => {
    try {
      this.loading = true;
      const idvalues = await agent.soussecteur.valuelist(equipeId, secteurId);
      runInAction(() => {
        this.loading = false;
        this.sousSecteurSelectedValues = idvalues;
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
