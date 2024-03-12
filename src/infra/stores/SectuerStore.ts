"use client";
import { makeAutoObservable, runInAction } from 'mobx';
import { IdValue } from '../models/IdValue';
import agent from '../apiclient/agent';

export default class SecteurStore {
    constructor() {
        makeAutoObservable(this);
    }
    idValues: IdValue[] = [];
    loading: boolean = false;
    selectedValues: IdValue[] = [];

    toggleSelectedValue = (value: IdValue) => {
        const index = this.selectedValues.findIndex(v => v.id === value.id);
        if (index >= 0) {
            this.selectedValues.splice(index, 1);
        } else {
            this.selectedValues.push(value);
        }
    }

    hasAnyCheckedItem = () => {
        return this.selectedValues.length > 0;
    }

    clearAllSelectedItems = () => {
        this.selectedValues = [];
    }


    isChecked = (value: IdValue) => {
        return this.selectedValues.findIndex(v => v.id === value.id) >= 0;
    }


    loadIdValues = async () => {
        if (this.idValues.length > 0) return this.idValues;
        try {
            this.loading = true;
            const idvalues = await agent.secteur.valuelist();
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