"use client";
import { makeAutoObservable, runInAction } from "mobx";
import { IdValue } from "../models/IdValue";
import agent from "../apiclient/agent";
import { store } from "./Store";

export default class CategorieStore {
  constructor() {
    makeAutoObservable(this);
  }
  catetoryValues: IdValue[] = [];
  sousCatetoryValues: IdValue[] = [];

  loading: boolean = false;
  query: string = "";
  loadingIdValues: boolean = false;
  idValues: IdValue[] = [];
  selectedValues: IdValue[] = [];

  loadCategoryValues = async () => {
    if (this.catetoryValues.length > 0) {
      return this.catetoryValues;
    }
    try {
      this.loading = true;
      const idvalues = await agent.categorie.valuelist();
      runInAction(() => {
        this.loading = false;
        this.catetoryValues = idvalues;
      });
      return idvalues;
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      console.log(error);
    }
  };

  loadSousCategoryValues = async (categorieId: number) => {
    try {
      console.log("loading souscategorie values for " + categorieId);
      this.loading = true;
      const idvalues = await agent.souscategorie.valuelist(categorieId);
      console.log("souscategorie values " + JSON.stringify(idvalues));
      runInAction(() => {
        this.loading = false;
        this.sousCatetoryValues = idvalues;
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
    if (this.idValues.length > 0) return this.idValues;
    try {
      this.loadingIdValues = true;
      const idvalues = await agent.categorie.valuelist();
      runInAction(() => {
        this.loadingIdValues = false;
        this.idValues = idvalues;
      });
      return idvalues;
    } catch (error) {
      runInAction(() => {
        this.loadingIdValues = false;
      });
      console.log(error);
    }
  };

  getCatLegalLookup = async (categorieId: number) => {
    try {
      const catLegalLookup = await agent.catlegallookup.list(categorieId);
      return catLegalLookup;
    } catch (error) {
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
  };

  isChecked = (value: IdValue) => {
    return this.selectedValues.findIndex((v) => v.id === value.id) >= 0;
  };
}
