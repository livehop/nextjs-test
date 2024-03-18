"use client";
import { makeAutoObservable, runInAction } from 'mobx';
import { IdValue } from '../models/IdValue';
import agent from '../apiclient/agent';

export default class ProjetStore {
    constructor() {
        makeAutoObservable(this);
    }
    idValues: IdValue[] = [];
    loading: boolean = false;

    loadIdValues = async () => {
        if (this.idValues.length > 0) return this.idValues;
        try {
            this.loading = true;
            const idvalues = await agent.projet.valuelist();
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
    }

}