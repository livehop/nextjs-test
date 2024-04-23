"use client";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../apiclient/agent";
import { PagedResult } from "../models/PagedResult";
import { store } from "./Store";
import {
  Categorie,
  CreateKaizenDocument,
  Equipe,
  Etat,
  KaizenDocument,
  RecordMetric,
  Secteur,
  SousCategorie,
} from "../models";
import { SortOrder } from "../models/Ui";
import { AddNote, Note } from "../models/Note";
import {
  RessourcesNecessaire,
  RessourcesNecessaireDesc,
} from "../models/RessourcesNecessaire";
import { EmailDetails } from "../models/Email";

export default class KaizenStore {
  constructor() {
    makeAutoObservable(this);
  }
  kaizenDocuments: PagedResult<KaizenDocument> | null = null;

  currentSortOrder: SortOrder = SortOrder.ID;

  categories: Categorie[] = [];
  equipes: Equipe[] = [];
  etats: Etat[] = [];
  secteurs: Secteur[] = [];
  sousCategories: SousCategorie[] = [];

  editDocumentId: number | null = null;
  editDocument: KaizenDocument | null | undefined = null;

  activeCategorie: Categorie | null = null;
  activeEquipe: Equipe | null = null;
  activeEtat: Etat | null = null;
  activeSecteur: Secteur | null = null;
  activeSousCategorie: SousCategorie | null = null;

  resNecessaires: RessourcesNecessaireDesc[] = [];
  loadingResNecessaire: boolean = false;

  notes: Note[] = [];
  loading: boolean = false;

  loadingDocument: boolean = false;
  loadingNotes: boolean = false;
  savingData: boolean = false;

  recordMetrics: RecordMetric | null = null;

  setKaizenDocuments = (documents: PagedResult<KaizenDocument>) => {
    this.kaizenDocuments = documents;
  };

  setLoading = (loading: boolean) => {
    this.loading = loading;
  };

  get hasAnyFiltersSet() {
    return (
      store.equipeStore.selectedValues.length > 0 ||
      store.secteurStore.selectedValues.length > 0 ||
      store.etatStore.selectedValues.length > 0 ||
      store.categoryStore.selectedValues.length > 0
    );
  }

  resetSearchFilters = () => {
    store.equipeStore.clearAllSelectedItems();
    store.secteurStore.clearAllSelectedItems();
    store.etatStore.clearAllSelectedItems();
    store.searchStore.resetFilters();
    store.categoryStore.clearAllSelectedItems();
  };

  setCurrentSortOrder = (sortOrder: SortOrder) => {
    this.currentSortOrder = sortOrder;
  };

  setEditDocumentId = (documentId: number | null) => {
    this.editDocumentId = documentId;
    if (documentId === null) {
      this.editDocument = null;
      this.resNecessaires = [];
    }
  };

  createKaizenDocument = async (document: CreateKaizenDocument) => {
    try {
      this.savingData = true;
      console.log("Creating kaizen document " + document);
      const result = await agent.kaizen.create(document);
      console.log("result from create " + result);
      runInAction(() => {
        this.savingData = false;
        this.loadKaizenDocuments();
      });
      return result;
    } catch (error) {
      runInAction(() => {
        this.savingData = false;
      });
      console.log(error);
    }
  };

  updateKaizenDocument = async (document: KaizenDocument) => {
    try {
      this.savingData = true;
      console.log("Updating kaizen document " + document.id);
      const result = await agent.kaizen.update(document);
      runInAction(() => {
        this.savingData = false;
        if (result === true) {
          if (
            this.kaizenDocuments !== null &&
            this.kaizenDocuments.data !== null
          ) {
            const updatedDocument = this.kaizenDocuments.data.find(
              (d) => d.id === document.id
            );
            if (updatedDocument !== undefined) {
              this.editDocument = updatedDocument;
            }
            this.loadKaizenDocuments();
          }
        }
        //this.editDocument = updatedDocument;
      });
      return result;
    } catch (error) {
      runInAction(() => {
        this.savingData = false;
      });
      console.log(error);
    }
  };

  loadEditDocument = async () => {
    if (this.editDocumentId === null) return;
    this.loadingDocument = true;
    this.editDocument = null;
    if (this.kaizenDocuments !== null && this.kaizenDocuments.data !== null) {
      let document = this.kaizenDocuments.data.find(
        (d) => d.id === this.editDocumentId
      );
      if (document !== undefined) {
        runInAction(() => {
          this.loadingDocument = false;
          this.editDocument = document;
        });
        return document;
      }
    }

    this.loadingDocument = false;
  };

  sendMail = async (pointFocal: string, probleme: string, solution: string) => {
    if (this.editDocumentId === null) return;
    if (this.editDocument === null) return;
    try {
      this.savingData = true;
      const emailDetails: EmailDetails = {
        documentId: this.editDocumentId,
        pointFocal: pointFocal,
        probleme: probleme,
        solution: solution,
      };
      console.log("Sending mail for document " + this.editDocumentId);
      const result = await agent.sendmail.send(emailDetails);
      runInAction(() => {
        this.savingData = false;
      });
      return result;
    } catch (error) {
      runInAction(() => {
        this.savingData = false;
      });
      console.log(error);
    }
  };

  setDefaults = (document: KaizenDocument) => {
    if (document.catFreq === null) document.catFreq = 1;
    if (document.catGrav === null) document.catGrav = 1;
    if (document.catProb === null) document.catProb = 1;
    if (document.catLegal === null) document.catLegal = 1;
    if (document.solCout === null) document.solCout = 1;
    if (document.solEff === null) document.solEff = 1;
    if (document.solGain === null) document.solGain = 1;
    if (document.solRisq === null) document.solRisq = 1;
    return document;
  };

  loadResourceNessaicaires = async () => {
    if (this.editDocumentId === null) return;
    try {
      this.loadingResNecessaire = true;
      const result = await agent.ressourcesnecessaire.list(this.editDocumentId);
      runInAction(() => {
        this.resNecessaires = result;
        this.loadingResNecessaire = false;
      });
      return result;
    } catch (error) {
      console.log(error);
      this.loadingResNecessaire = false;
    }
  };

  upsertResourceNessaicaires = async (resNecessaire: RessourcesNecessaire) => {
    try {
      this.loadingResNecessaire = true;
      const result = await agent.ressourcesnecessaire.upsert(resNecessaire);
      runInAction(() => {
        this.loadingResNecessaire = false;
      });
      return result;
    } catch (error) {
      console.log(error);
      this.loadingResNecessaire = false;
    }
  };

  setActiveEquipe = (equipeName: any) => {
    if (equipeName === undefined) return;
    const equipe = this.equipes.find((e) => e.nomEquipe === equipeName);
    if (equipe !== undefined) {
      this.activeEquipe = equipe;
      store.searchStore.resetSearch();
      store.searchStore.equipeNumber = equipe.numeroEquipe;
      this.loadKaizenDocuments();
    }
  };

  setActiveEquipeWithNumber = (equipeNo: any) => {
    if (equipeNo === undefined) return;
    const equipe = this.equipes.find((e) => e.numeroEquipe === equipeNo);
    if (equipe !== undefined) {
      this.activeEquipe = equipe;
      store.searchStore.resetSearch();
      store.searchStore.equipeNumber = equipe.numeroEquipe;
      this.loadKaizenDocuments();
    }
  };
  loadMeta = async () => {
    await this.loadCategories();
    await this.loadEquipes();
    await this.loadEtats();
    await this.loadSecteurs();
    await this.loadSousCategories();
  };

  searchKaizenDocuments = async (search: string) => {
    try {
      this.loading = true;
      console.log(store.searchStore.getAxiosParams().toString());
      const documents = await agent.kaizen.search(search);
      runInAction(() => {
        this.kaizenDocuments = documents;
        store.searchStore.setPageData(documents);
        this.loading = false;
      });
      return documents.data;
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      console.log(error);
    }
  };

  loadRecordMetrics = async () => {
    try {
      const metrics = await agent.kaizen.recordMetrics();
      runInAction(() => {
        this.recordMetrics = metrics;
      });
      return metrics;
    } catch (error) {
      console.log(error);
    }
  };

  loadKaizenDocuments = async () => {
    try {
      this.loading = true;
      console.log(store.searchStore.getAxiosParams().toString());
      const document = await agent.kaizen.list(
        store.searchStore.getAxiosParams()
      );
      runInAction(() => {
        this.kaizenDocuments = document;
        store.searchStore.setPageData(document);
        this.loading = false;
      });
      return document.data;
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      console.log(error);
    }
  };

  loadCategories = async () => {
    if (this.categories.length > 0) return this.categories;
    try {
      this.loading = true;
      const categories = await agent.categorie.list();
      runInAction(() => {
        this.loading = false;
        this.categories = categories.data;
        this.activeCategorie = this.categories[0];
      });
      return categories;
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      console.log(error);
    }
  };

  loadEquipes = async () => {
    if (this.equipes.length > 0) return this.equipes;
    try {
      this.loading = true;
      const equipes = await agent.equipement.list();
      runInAction(() => {
        this.loading = false;
        this.equipes = equipes.data;
        this.activeEquipe = this.equipes[0];
      });
      return equipes;
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      console.log(error);
    }
  };

  loadEtats = async () => {
    if (this.etats.length > 0) return this.etats;
    try {
      this.loading = true;
      const etats = await agent.etat.list();
      runInAction(() => {
        this.loading = false;
        this.etats = etats.data;
        this.activeEtat = this.etats[0];
      });
      return etats;
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      console.log(error);
    }
  };

  loadSecteurs = async () => {
    if (this.secteurs.length > 0) return this.secteurs;
    try {
      this.loading = true;
      const secteurs = await agent.secteur.list();
      runInAction(() => {
        this.loading = false;
        this.secteurs = secteurs.data;
        this.activeSecteur = this.secteurs[0];
      });
      return secteurs;
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      console.log(error);
    }
  };

  loadSousCategories = async () => {
    if (this.sousCategories.length > 0) return this.sousCategories;
    try {
      this.loading = true;
      const sousCategories = await agent.souscategorie.list();
      runInAction(() => {
        this.loading = false;
        this.sousCategories = sousCategories.data;
        this.activeSousCategorie = this.sousCategories[0];
      });
      return sousCategories;
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      console.log(error);
    }
  };

  addNote = async (addThis: string) => {
    try {
      if (this.editDocumentId === null) return;
      this.savingData = true;

      let myNote: AddNote = {
        kaizenId: this.editDocumentId,
        description: addThis,
      };
      await agent.notes.add(myNote);
      runInAction(() => {
        this.savingData = false;
      });
    } catch (error) {
      runInAction(() => {
        this.savingData = false;
      });
      console.log(error);
    }
  };

  getNotes = async () => {
    try {
      if (this.editDocumentId === null || this.editDocument === null) return;
      this.loadingNotes = true;
      const notes = await agent.notes.list(this.editDocumentId);
      runInAction(() => {
        this.notes = notes;
        this.loadingNotes = false;
      });
      return this.notes;
    } catch (error) {
      runInAction(() => {
        this.loadingNotes = false;
      });
      console.log(error);
    }
  };
}
