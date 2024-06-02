"use client";
import { makeAutoObservable, runInAction } from "mobx";
import { IdValue } from "../models/IdValue";
import agent from "../apiclient/agent";
import { Categorie, SousCategorie } from "../models";

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

  categories: Categorie[] = [];
  selectedCategorie: Categorie | null = null;

  souscategories: SousCategorie[] = [];
  selectedSousCategorie: SousCategorie | null = null;

  saveCategorie = async (categorie: Categorie) => {
    try {
      this.loading = true;
      const result = await agent.categorie.save(categorie);
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

  loadCategories = async () => {
    try {
      this.loading = true;
      const categories = await agent.categorie.categoryList();
      runInAction(() => {
        this.loading = false;
        this.categories = categories;
      });
      return categories;
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      console.log(error);
    }
  };

  loadCategorie = async (categorieId: number) => {
    try {
      this.loading = true;
      const categorie = await agent.categorie.details(categorieId);
      runInAction(() => {
        this.loading = false;
        this.selectedCategorie = categorie;
      });
      return categorie;
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      console.log(error);
    }
  };

  resetSousCategories = () => {
    this.souscategories = [];
  };
  loadSousCategories = async (categorieId: number) => {
    console.log("loading souscategories for " + categorieId);
    try {
      this.loading = true;
      const souscategories = await agent.souscategorie.sousCategoryList(
        categorieId
      );
      runInAction(() => {
        this.loading = false;
        this.souscategories = souscategories;
      });
      return souscategories;
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      console.log(error);
    }
  };

  loadSousCategorie = async (sousCategorieId: number) => {
    try {
      this.loading = true;
      const souscategorie = await agent.souscategorie.details(sousCategorieId);
      runInAction(() => {
        this.loading = false;
        this.selectedSousCategorie = souscategorie;
      });
      return souscategorie;
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      console.log(error);
    }
  };

  saveSousCategorie = async (sousCategorie: SousCategorie) => {
    try {
      this.loading = true;
      const result = await agent.souscategorie.save(sousCategorie);
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
      //console.log("loading souscategorie values for " + categorieId);
      this.loading = true;
      const idvalues = await agent.souscategorie.valuelist(categorieId);
      //console.log("souscategorie values " + JSON.stringify(idvalues));
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
