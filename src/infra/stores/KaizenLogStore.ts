"use client";
import { makeAutoObservable } from 'mobx';
import { KaizenLog } from '../models/KaizenLog';

export default class KaizenStore {
    constructor() {
        makeAutoObservable(this);
    }
    kaizenLogs: KaizenLog[] = [];


}