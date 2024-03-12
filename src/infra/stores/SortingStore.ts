"use client";
import { makeAutoObservable } from 'mobx';


export const ASC = "asc";
export const DESC = "desc";

export default class SortingStore {
    constructor() {
        makeAutoObservable(this);
    }
    sortedColumn = 'id';
    sortedOrder = DESC;
    loading: boolean = false;

    toggleSorting = (column: string, isDesc: boolean) => {
        this.sortedColumn = column;
        if (isDesc) {
            this.sortedOrder = DESC;
        } else {
            this.sortedOrder = ASC;
        }
    }

    setSortedColumn = (column: string) => {
        this.sortedColumn = column;
    }

    setSortedOrder = (order: string) => {
        this.sortedOrder = order;
    }

    getSortedState = (column: string) => {
        if (column.toLocaleLowerCase() === this.sortedColumn.toLocaleLowerCase()) {
            return this.sortedOrder;
        }
        return '';
    }
}