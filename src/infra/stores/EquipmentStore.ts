"use client";
import { makeAutoObservable, runInAction } from "mobx";
import { IdValue } from "../models/IdValue";
import agent from "../apiclient/agent";
import { Equipe } from "../models";

export default class EquipeStore {
  constructor() {
    makeAutoObservable(this);
  }
  idValues: IdValue[] = [];
  loading: boolean = false;
  selectedValues: IdValue[] = [];
  selectedEquipe: Equipe | null = null;

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
  };

  isChecked = (value: IdValue) => {
    return this.selectedValues.findIndex((v) => v.id === value.id) >= 0;
  };

  loadIdValues = async () => {
    if (this.idValues.length > 0) return this.idValues;
    try {
      this.loading = true;
      const idvalues = await agent.equipement.valuelist();
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

  loadEquipe = async (equipeId: number) => {
    try {
      this.loading = true;
      const equipe = await agent.equipement.details(equipeId);
      runInAction(() => {
        this.loading = false;
        this.selectedEquipe = equipe;
      });
      return equipe;
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      console.log(error);
    }
  };

  saveEquipe = async (equipe: Equipe) => {
    try {
      console.log("Saving equipe " + JSON.stringify(equipe));
      this.loading = true;
      const result = await agent.equipement.upsert(equipe);
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
}
