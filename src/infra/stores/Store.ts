"use client";
import { createContext, useContext } from "react";
import CommonStore from "./CommonStore";
import KaizenStore from "./KaizenStore";
import EmployeeStore from "./EmployeeStore";
import KaizenLogStore from "./KaizenLogStore";
import UserStore from "./UserStore";
import SearchStore from "./SearchStore";
import EquipeStore from "./EquipmentStore";
import SecteurStore from "./SectuerStore";
import EtatStore from "./EtatStore";
import SortingStore from "./SortingStore";

interface Store {
    commonStore: CommonStore;
    userStore: UserStore;
    kaizenStore: KaizenStore;
    kaizenLogStore: KaizenLogStore;
    employeeStore: EmployeeStore;
    searchStore: SearchStore;
    equipeStore: EquipeStore;
    secteurStore: SecteurStore;
    etatStore: EtatStore;
    sortingStore: SortingStore;
}

export const store: Store = {
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    kaizenStore: new KaizenStore(),
    kaizenLogStore: new KaizenLogStore(),
    employeeStore: new EmployeeStore(),
    searchStore: new SearchStore(),
    equipeStore: new EquipeStore(),
    secteurStore: new SecteurStore(),
    etatStore: new EtatStore(),
    sortingStore: new SortingStore()
}

export const StoreContext = createContext(store);


export function useStore() {
    return useContext(StoreContext)
}