"use client";
import { makeAutoObservable, runInAction } from "mobx";
import { IdValue } from "../models/IdValue";
import agent from "../apiclient/agent";
import { store } from "./Store";

export default class SecteurStore {
  constructor() {
    makeAutoObservable(this);
  }
  idValues: IdValue[] = [];
  loading: boolean = false;
  selectedValues: IdValue[] = [];
  sousSecteurSelectedValues: IdValue[] = [];

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

  loadIdValues = async (equipeId: number) => {
    try {
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
