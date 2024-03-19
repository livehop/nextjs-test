"use client";
import { makeAutoObservable, runInAction } from 'mobx';
import { IdValue } from '../models/IdValue';
import agent from '../apiclient/agent';

export default class EmployeeStore {
    constructor() {
        makeAutoObservable(this);
    }
    idValues: IdValue[] = [];
    loading: boolean = false;
    selectedValue: IdValue | null = null;
    query: string = "";

    loadIdValues = async (query = "") => {
        if (this.idValues.length > 0 && query === this.query) {
            return this.idValues;
        }
        try {
            this.loading = true;
            const idvalues = await agent.employees.valuelist(query);
            runInAction(() => {
                this.loading = false;
                this.idValues = idvalues;
                this.query = query;
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