"use client";
import { makeAutoObservable } from 'mobx';
import { Employee } from '../models/Employee';

export default class KaizenStore {
    constructor() {
        makeAutoObservable(this);
    }
    employees: Employee[] = [];


}