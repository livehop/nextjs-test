"use client";
import { makeAutoObservable } from "mobx";
import { PagedResult } from "../models/PagedResult";


const PAGE_SIZE = 20;

export default class SearchStore {


    constructor() {
        makeAutoObservable(this);
    }

    totalRecordCount = 0;
    currentPageNo = 1;
    totalPages = 0;
    pageSize = PAGE_SIZE;
    equipeNumber = 2820;

    searchType = '';
    searchValue = '';


    setPageData = (result: PagedResult<any>) => {
        this.currentPageNo = result.currentPage;
        this.totalRecordCount = result.totalCount;
        this.pageSize = result.pageSize;
        this.totalPages = Math.ceil(this.totalRecordCount / this.pageSize);
    }


    setPageNo = (pageNo: number) => {
        this.currentPageNo = pageNo;
    }

    setNextPage = () => {
        console.log(this.currentPageNo);
        console.log(this.totalPages);
        if (this.currentPageNo < this.totalPages)
            this.currentPageNo = this.currentPageNo + 1;
    }

    setPreviousPage = () => {
        if (this.currentPageNo <= 1) {
            this.currentPageNo = 1;
        } else {
            this.currentPageNo = this.currentPageNo - 1;
        }
    }

    resetSearch = (defaultSearchType: string = '') => {
        this.searchType = defaultSearchType;
        this.currentPageNo = 1;
        this.totalRecordCount = 0;
        this.searchValue = '';
    }

    setEquipeNumber = (value: number) => {
        this.equipeNumber = value;
    }

    setSearchType = (value: string) => {
        this.searchType = value;
        if (value !== this.searchType) {
            this.currentPageNo = 1;
        }

    }
    setSearchValue = (value: string) => {
        if (value !== this.searchValue) {
            this.currentPageNo = 1;
        }

        this.searchValue = value;
    }

    // get totalPages() {
    //     return Math.ceil(this.totalRecordCount / PAGE_SIZE);
    // }


    getAxiosParams() {
        const params = new URLSearchParams();
        params.append('pageSize', PAGE_SIZE.toString());
        params.append('equipeNumber', this.equipeNumber.toString());

        if (this.searchValue !== '') {
            params.append("searchby", this.searchType);
            params.append("searchvalue", this.searchValue);
            //     params.append('offset', '0')
            params.append('pageNo', `${this.currentPageNo}`)
        } else {
            params.append('pageNo', `${this.currentPageNo}`)
        }

        console.log(params.toString());
        return params;
    }

}