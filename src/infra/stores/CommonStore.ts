"use client";
import { reaction, makeAutoObservable } from 'mobx';
import { token_key } from '../apiclient/agent';


export default class CommonStore {
    constructor() {
        makeAutoObservable(this);
        reaction(() => this.token, token => {
            if (token) {
                this.saveToLocalStorage(token_key, token);
            } else {
                this.saveToLocalStorage(token_key, null);
            }
        });
    }

    appLoaded = false;
    token: string | null = typeof window === 'undefined' ? null : window.localStorage.getItem(token_key);

    setToken = (token: string | null) => {
        this.token = token;
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }

    saveToLocalStorage = (key: string, value: any) => {
        if (typeof window === 'undefined') return;
        if (value === null) {
            window.localStorage.removeItem(key);
        } else {
            window.localStorage.setItem(key, value);
        }
    }


}