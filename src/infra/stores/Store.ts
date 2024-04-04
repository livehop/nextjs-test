"use client";
import { createContext, useContext } from "react";
import CommonStore from "./CommonStore";
import KaizenStore from "./KaizenStore";
import EmployeeStore from "./EmployeeStore";
import KaizenLogStore from "./KaizenLogStore";
import UserStore from "./UserStore";
import SearchStore from "./SearchStore";
import EquipeStore from "./EquipmentStore";
import EtatStore from "./EtatStore";
import SortingStore from "./SortingStore";
import ColumnStore from "./ColumnStore";
import CategorieStore from "./CategorieStore";
import ProjetStore from "./ProjectStore";
import RessourcesStore from "./RessourcesStore";
import DocumentStore from "./DocumentStore";
import SecteurStore from "./SecteurStore";

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
  columnStore: ColumnStore;
  categoryStore: CategorieStore;
  projetStore: ProjetStore;
  ressourcesStore: RessourcesStore;
  documentStore: DocumentStore;
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
  sortingStore: new SortingStore(),
  columnStore: new ColumnStore(),
  categoryStore: new CategorieStore(),
  projetStore: new ProjetStore(),
  ressourcesStore: new RessourcesStore(),
  documentStore: new DocumentStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
