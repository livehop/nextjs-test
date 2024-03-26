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
    this.idValues = [{ id: -1, value: "Select Equipe First" }];
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
      this.idValues = [{ id: -1, value: "Select Equipe First" }];
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

  loadIdValues = async () => {
    console.log(
      "loading id values for secteur..... " +
        store.equipeStore.selectedValues.length
    );

    if (store.equipeStore.selectedValues.length == 0) {
      this.idValues = [{ id: -1, value: "Select Equipe First" }];
      return;
    }
    if (this.idValues.length > 1) return this.idValues;
    try {
      this.loading = true;
      const idvalues = await agent.secteur.valuelist("");
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
}
