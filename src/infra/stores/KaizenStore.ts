"use client";
import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../apiclient/agent';
import { PagedResult } from '../models/PagedResult';
import { store } from './Store';
import { Categorie, Equipe, Etat, KaizenDocument, Secteur, SousCategorie } from '../models';
import { SortOrder } from '../models/Ui';
import { Note } from '../models/Note';

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
    editDocument: KaizenDocument | null = null;

    activeCategorie: Categorie | null = null;
    activeEquipe: Equipe | null = null;
    activeEtat: Etat | null = null;
    activeSecteur: Secteur | null = null;
    activeSousCategorie: SousCategorie | null = null;

    notes: Note[] = [];
    loading: boolean = false;

    loadingDocument: boolean = false;
    loadingNotes: boolean = false;
    savingData: boolean = false;


    setKaizenDocuments = (documents: PagedResult<KaizenDocument>) => {
        this.kaizenDocuments = documents;
    }

    setLoading = (loading: boolean) => {
        this.loading = loading;
    }

    get hasAnyFiltersSet() {
        return store.equipeStore.selectedValues.length > 0 ||
            store.secteurStore.selectedValues.length > 0 ||
            store.etatStore.selectedValues.length > 0
    }

    resetSearchFilters = () => {
        store.equipeStore.clearAllSelectedItems();
        store.secteurStore.clearAllSelectedItems();
        store.etatStore.clearAllSelectedItems();
        store.searchStore.resetFilters();

    }


    setCurrentSortOrder = (sortOrder: SortOrder) => {
        this.currentSortOrder = sortOrder;
    }

    setEditDocumentId = (documentId: number | null) => {
        this.editDocumentId = documentId;
        if (documentId === null) {
            this.editDocument = null;
        }
    }


    updateKaizenDocument = async (document: KaizenDocument) => {
        try {
            this.savingData = true;
            console.log("Updating kaizen document " + document.id);
            const result = await agent.kaizen.update(document);
            runInAction(() => {
                this.savingData = false;
                if (result === true) {
                    if (this.kaizenDocuments !== null && this.kaizenDocuments.data !== null) {
                        const updatedDocument = this.kaizenDocuments.data.find(d => d.id === document.id);
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
    }

    loadEditDocument = async () => {
        console.log("Loading editDocumentId " + this.editDocumentId);
        if (this.editDocumentId === null) return;
        this.loadingDocument = true;
        console.log("Loading kaizen document " + this.editDocumentId);
        this.editDocument = null;
        if (this.kaizenDocuments !== null && this.kaizenDocuments.data !== null) {
            const document = this.kaizenDocuments.data.find(d => d.id === this.editDocumentId);
            console.log("Document found " + document?.problematique)
            if (document !== undefined) {
                runInAction(() => {
                    this.loadingDocument = false;
                    this.editDocument = document;
                });
                return document;
            }
        }

        this.loadingDocument = false;

    }


    setActiveEquipe = (equipeName: any) => {
        if (equipeName === undefined) return;
        const equipe = this.equipes.find(e => e.nomEquipe === equipeName);
        if (equipe !== undefined) {
            this.activeEquipe = equipe;
            store.searchStore.resetSearch();
            store.searchStore.equipeNumber = equipe.numeroEquipe;
            this.loadKaizenDocuments();
        }
    }

    setActiveEquipeWithNumber = (equipeNo: any) => {
        if (equipeNo === undefined) return;
        const equipe = this.equipes.find(e => e.numeroEquipe === equipeNo);
        if (equipe !== undefined) {
            this.activeEquipe = equipe;
            store.searchStore.resetSearch();
            store.searchStore.equipeNumber = equipe.numeroEquipe;
            this.loadKaizenDocuments();
        }
    }
    loadMeta = async () => {
        await this.loadCategories();
        await this.loadEquipes();
        await this.loadEtats();
        await this.loadSecteurs();
        await this.loadSousCategories();
    }

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

    }
    loadKaizenDocuments = async () => {
        try {
            this.loading = true;
            console.log(store.searchStore.getAxiosParams().toString());
            const document = await agent.kaizen.list(store.searchStore.getAxiosParams());
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
    }

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
    }

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
    }

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
    }

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
    }

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
    }

    addNote = async (note: string) => {
        try {
            if (this.editDocumentId === null) return;
            this.savingData = true;

            console.log("Adding note to kaizen " + this.editDocumentId + " " + note)
            await agent.notes.add({ kaizenId: this.editDocumentId, description: note });
            runInAction(() => {
                this.savingData = false;
            });
        } catch (error) {
            runInAction(() => {
                this.savingData = false;
            });
            console.log(error);
        }
    }

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
    }

}