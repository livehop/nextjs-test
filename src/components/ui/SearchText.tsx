"use client";
import { useStore } from '@/infra/stores/Store';
import { MagnifyingGlassIcon, DocumentIcon } from '@heroicons/react/20/solid'
import { observer } from 'mobx-react-lite';
import { useState } from 'react';

const SearchText = () => {
    const { kaizenStore } = useStore();
    const { searchKaizenDocuments } = kaizenStore;
    const [search, setSearch] = useState('');

    const searchKaizen = () => {
        searchKaizenDocuments(search);
    }
    return (
        <div>
            {/* <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Fuzzy search
            </label> */}
            <div className="mt-4 flex rounded-md shadow-sm max-w-5xl">
                <div className="relative flex flex-grow items-stretch focus-within:z-10">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <DocumentIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                        type="search"
                        name="searchText"
                        id="searchText"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                        placeholder="Search Kaizen Records ..."
                    />
                </div>
                <button
                    type="button"
                    onClick={searchKaizen}
                    className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                    <MagnifyingGlassIcon className="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                    Search
                </button>
            </div>
        </div>
    )
}


export default observer(SearchText);