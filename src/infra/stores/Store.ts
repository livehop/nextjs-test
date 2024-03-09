"use client";
import { createContext, useContext } from "react";
import CommonStore from "./CommonStore";
import KaizenStore from "./KaizenStore";
import EmployeeStore from "./EmployeeStore";
import KaizenLogStore from "./KaizenLogStore";
import UserStore from "./UserStore";
import SearchStore from "./SearchStore";

interface Store {
    commonStore: CommonStore;
    userStore: UserStore;
    kaizenStore: KaizenStore;
    kaizenLogStore: KaizenLogStore;
    employeeStore: EmployeeStore;
    searchStore: SearchStore;
}

export const store: Store = {
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    kaizenStore: new KaizenStore(),
    kaizenLogStore: new KaizenLogStore(),
    employeeStore: new EmployeeStore(),
    searchStore: new SearchStore()

}

export const StoreContext = createContext(store);


export function useStore() {
    return useContext(StoreContext)
}