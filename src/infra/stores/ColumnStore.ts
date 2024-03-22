"use client";
import { makeAutoObservable, reaction } from "mobx";
import {
  DisplayColumn,
  getDefaultDisplayColumns,
} from "../models/DisplayColumn";

export default class ColumnStore {
  constructor() {
    makeAutoObservable(this);
    if (typeof window !== "undefined") {
      reaction(
        () => this.columns,
        (columns) => {
          localStorage.setItem("displaycolumns", JSON.stringify(columns));
        }
      );
    }
  }

  getFromLocalStorage = () => {
    if (typeof window !== "undefined") {
      console.log("getFromLocalStorage.......");
      const columns = localStorage.getItem("displaycolumns");
      if (columns) {
        console.log("getFromLocalStorage.......columns");
        return JSON.parse(columns);
      } else {
        console.log("getFromLocalStorage.......getDefaultDisplayColumns");
        return getDefaultDisplayColumns();
      }
    } else {
      return getDefaultDisplayColumns();
    }
  };

  columns: DisplayColumn[] = this.getFromLocalStorage();

  get visibleColumns() {
    console.log(this.columns);
    return this.columns.filter((c) => c.isVisible);
  }

  toggleColVisibility = (column: DisplayColumn, value: boolean) => {
    const index = this.columns.findIndex((v) => v.title === column.title);
    if (index >= 0) {
      this.columns[index].isVisible = value;
      this.setColumnsToLocalStorage(this.columns);
    }
  };

  toggleVisibility = (column: string, value: boolean) => {
    const index = this.columns.findIndex((v) => v.title === column);
    if (index >= 0) {
      this.columns[index].isVisible = value;
      this.setColumnsToLocalStorage(this.columns);
    }
  };

  hideVisibility = (column: string) => {
    const index = this.columns.findIndex((v) => v.title === column);
    if (index >= 0) {
      this.columns[index].isVisible = false;
      this.setColumnsToLocalStorage(this.columns);
    }
  };

  isVisible = (column: string) => {
    const index = this.columns.findIndex((v) => v.title === column);
    if (index >= 0) {
      return this.columns[index].isVisible;
    }
    return false;
  };

  setColumnsToLocalStorage = (columns: DisplayColumn[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("displaycolumns", JSON.stringify(columns));
    }
  };
}
