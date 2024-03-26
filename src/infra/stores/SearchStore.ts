"use client";
import { makeAutoObservable, runInAction } from "mobx";
import { PagedResult } from "../models/PagedResult";
import { SearchRequest } from "../models/SearchRequest";
import { store } from "./Store";
import agent from "../apiclient/agent";

const PAGE_SIZE = 100;

export default class SearchStore {
  constructor() {
    makeAutoObservable(this);
  }

  totalRecordCount = 0;
  currentPageNo = 1;
  totalPages = 0;
  pageSize = PAGE_SIZE;
  equipeNumber = 2820;

  searchType = "";
  searchValue = "";

  problemSearch = "";
  solutionSearch = "";

  equipeFilter: number[] = [];
  secteurFilter: number[] = [];
  etatFilter: number[] = [];
  sortBy = "Id";
  sortOrder = "desc";

  setEquipeFilter = (value: number[]) => {
    this.equipeFilter = value;
    console.log("setEquipeNumber" + value);
    this.searchKaizenDocuments();
    store.secteurStore.reloadIdValues();
  };

  setSecteurFilter = (value: number[]) => {
    this.secteurFilter = value;
    console.log("setSecteurFilter" + value);
    this.searchKaizenDocuments();
  };

  setEtatFilter = (value: number[]) => {
    this.etatFilter = value;
    console.log("setEtatFilter" + value);
    this.searchKaizenDocuments();
  };

  setProblemSearch = (value: string) => {
    this.problemSearch = value;
  };

  setSolutionSearch = (value: string) => {
    this.solutionSearch = value;
  };

  setSortBy = (value: string) => {
    this.sortBy = value;
  };

  setSortOrder = (value: string) => {
    this.sortOrder = value;
    this.searchKaizenDocuments();
  };

  resetFilters = () => {
    this.equipeFilter = [];
    this.secteurFilter = [];
    this.etatFilter = [];
    this.problemSearch = "";
    this.solutionSearch = "";
    this.searchKaizenDocuments();
  };

  setPageData = (result: PagedResult<any>) => {
    this.currentPageNo = result.currentPage;
    this.totalRecordCount = result.totalCount;
    this.pageSize = result.pageSize;
    this.totalPages = Math.ceil(this.totalRecordCount / this.pageSize);
  };

  setPageNo = (pageNo: number) => {
    this.currentPageNo = pageNo;
  };

  setNextPage = () => {
    console.log(this.currentPageNo);
    console.log(this.totalPages);
    if (this.currentPageNo < this.totalPages)
      this.currentPageNo = this.currentPageNo + 1;
  };

  setPreviousPage = () => {
    if (this.currentPageNo <= 1) {
      this.currentPageNo = 1;
    } else {
      this.currentPageNo = this.currentPageNo - 1;
    }
  };

  resetSearch = (defaultSearchType: string = "") => {
    this.searchType = defaultSearchType;
    this.currentPageNo = 1;
    this.totalRecordCount = 0;
    this.searchValue = "";
  };

  setEquipeNumber = (value: number) => {
    this.equipeNumber = value;
  };

  setSearchType = (value: string) => {
    this.searchType = value;
    if (value !== this.searchType) {
      this.currentPageNo = 1;
    }
  };
  setSearchValue = (value: string) => {
    if (value !== this.searchValue) {
      this.currentPageNo = 1;
    }

    this.searchValue = value;
  };

  // get totalPages() {
  //     return Math.ceil(this.totalRecordCount / PAGE_SIZE);
  // }

  getAxiosParams() {
    const params = new URLSearchParams();
    params.append("pageSize", PAGE_SIZE.toString());
    params.append("equipeNumber", this.equipeNumber.toString());

    if (this.searchValue !== "") {
      params.append("searchby", this.searchType);
      params.append("searchvalue", this.searchValue);
      //     params.append('offset', '0')
      params.append("pageNo", `${this.currentPageNo}`);
    } else {
      params.append("pageNo", `${this.currentPageNo}`);
    }

    console.log(params.toString());
    return params;
  }

  getSearchAxiosParams() {
    const params: SearchRequest = {
      equipeIds: this.equipeFilter?.join(",") || "",
      secteurIds: this.secteurFilter?.join(",") || "",
      etatIds: this.etatFilter?.join(",") || "",
      problemSearch: this.problemSearch,
      solutionSearch: this.solutionSearch,
      pageSize: PAGE_SIZE,
      pageNo: this.currentPageNo,
      sortBy: this.sortBy ?? "Id",
      sortOrder: this.sortOrder ?? "desc",
    };
    return params;
  }

  searchKaizenDocuments = async () => {
    try {
      store.kaizenStore.setLoading(false);
      console.log(JSON.stringify(this.getSearchAxiosParams()));
      const document = await agent.kaizen.filterSearch(
        this.getSearchAxiosParams()
      );
      runInAction(() => {
        store.kaizenStore.setKaizenDocuments(document);
        this.setPageData(document);
        store.kaizenStore.setLoading(false);
      });
      return document.data;
    } catch (error) {
      runInAction(() => {
        store.kaizenStore.setLoading(false);
      });
      console.log(error);
    }
  };
}
