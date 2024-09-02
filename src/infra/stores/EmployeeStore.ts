"use client";
import { makeAutoObservable, runInAction } from "mobx";
import { IdValue } from "../models/IdValue";
import agent from "../apiclient/agent";
import { EmployeeData } from "../models";

export default class EmployeeStore {
  constructor() {
    makeAutoObservable(this);
  }
  employees: EmployeeData[] = [];
  employee: EmployeeData | null = null;
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
  };

  searchEmployees = async (query: string = "") => {
    //SearchEmployee
    if (this.employees.length > 0 && query === this.query) {
      return this.employees;
    }
    try {
      this.loading = true;
      const employees = await agent.employees.searchemployees(query);
      runInAction(() => {
        this.loading = false;
        this.employees = employees;
        this.query = query;
      });
      return employees;
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      console.log(error);
    }
  };

  loadEmployee = async (id: string) => {
    try {
      this.loading = true;
      const employee = await agent.employees.details(id);
      runInAction(() => {
        this.loading = false;
        this.employee = employee;
      });
      return employee;
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      console.log(error);
    }
  };

  saveEmployee = async (id: string, accessLevel: string) => {
    try {
      this.loading = true;
      const savedEmployee = await agent.employees.save(id, accessLevel);
      runInAction(() => {
        this.loading = false;
        this.employee = savedEmployee;
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      console.log(error);
    }
  };
}
