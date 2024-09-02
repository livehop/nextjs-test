"use client";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import agent from "../apiclient/agent";
import { CotationConfig } from "../models/CotationConfig";

export default class CotationConfigStore {
  constructor() {
    makeAutoObservable(this);
  }

  cotationConfigs: CotationConfig[] = [];
  loadingCotationConfigs: boolean = false;

  loadCotationConfigs = async (force: boolean = false) => {
    try {
      if (
        !force &&
        this.cotationConfigs !== null &&
        this.cotationConfigs.length > 0
      )
        return this.cotationConfigs;
      this.loadingCotationConfigs = true;

      console.log("loading cotation configs");
      const configs = await agent.cotationConfigs.list();
      runInAction(() => {
        this.cotationConfigs = configs;
        this.loadingCotationConfigs = false;
      });
      return this.cotationConfigs;
    } catch (error) {
      runInAction(() => {
        this.loadingCotationConfigs = false;
      });
      console.log(error);
    }
  };

  getCotationConfigForCategory = (categorieId: number) => {
    return this.cotationConfigs.find((c) => c.id_Categorie === categorieId);
  };

  getCotationConfigForCategoryAndName = (
    categorieId: number,
    cotationName: string
  ) => {
    return this.cotationConfigs.find(
      (c) => c.id_Categorie === categorieId && c.cotation_Name === cotationName
    );
  };

  getWeightForCotation = (
    categorieId: number,
    cotationName: string,
    level: number
  ) => {
    const cotationConfig = this.cotationConfigs.find(
      (c) =>
        c.id_Categorie === categorieId &&
        c.cotation_Name === cotationName &&
        c.niveau === level
    );
    if (cotationConfig) {
      return cotationConfig.valeur;
    }
    return level;
  };

  upsertCotationConfig = async (cotationConfig: CotationConfig) => {
    try {
      const updatedConfig = await agent.cotationConfigs.upsert(cotationConfig);
      runInAction(() => {
        this.loadCotationConfigs(true);
      });
    } catch (error) {
      console.log(error);
    }
  };

  getTranslatedValue = (
    selectedCategory: number,
    cotationName: string,
    niveau: number
  ) => {
    if (niveau === undefined) return niveau;
    const filteredData = this.cotationConfigs.filter(
      (item) =>
        item.cotation_Name === cotationName &&
        item.id_Categorie === selectedCategory &&
        item.niveau === niveau
    );

    if (filteredData.length > 0) {
      return filteredData[0].valeur;
    } else {
      return niveau;
    }
  };
}
