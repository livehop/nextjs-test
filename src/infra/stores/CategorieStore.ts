"use client";
import { makeAutoObservable, runInAction } from 'mobx';
import { IdValue } from '../models/IdValue';
import agent from '../apiclient/agent';

export default class CategorieStore {
    constructor() {
        makeAutoObservable(this);
    }
    catetoryValues: IdValue[] = [];
    sousCatetoryValues: IdValue[] = [];

    loading: boolean = false;
    query: string = "";

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
    }

    loadSousCategoryValues = async () => {
        if (this.sousCatetoryValues.length > 0) {
            return this.sousCatetoryValues;
        }
        try {
            this.loading = true;
            const idvalues = await agent.souscategorie.valuelist();
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
    }

}