import React from 'react'
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid'
import { useStore } from '@/infra/stores/Store';
import { observer } from 'mobx-react-lite';


interface PagingProps {
    bottom?: boolean
}

const Paging: React.FC<PagingProps> = ({ bottom = true }) => {

    const { kaizenStore, searchStore } = useStore();
    const { kaizenDocuments, loadKaizenDocuments } = kaizenStore;
    const { totalPages } = searchStore;

    const getClassesForPage = (pageNum: number) => {
        if (pageNum === kaizenDocuments?.currentPage) {
            if (bottom) return "inline-flex items-center border-t-2 border-blue-500 px-4 pt-4 text-sm font-medium text-blue-600";
            return "inline-flex items-center border-b-2 border-blue-500 px-4 pt-2 text-sm font-medium text-blue-600";
        } else {
            return "inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700";
        }
    }

    const getPage = (pageNum: number) => {
        searchStore.setPageNo(pageNum);
        loadKaizenDocuments();
    }

    const getNextPage = () => {
        searchStore.setNextPage();
        loadKaizenDocuments();
    }

    const getPreviousPage = () => {
        searchStore.setPreviousPage();
        loadKaizenDocuments();
    }

    return (
        <div className='overflow-x-auto'>
            <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
                <div className="-mt-px flex w-0 flex-1">
                    <a
                        onClick={() => getPreviousPage()}
                        href="#"
                        className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    >
                        <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                        Previous
                    </a>
                </div>
                <div className="hidden md:-mt-px md:flex">
                    {[...Array.from(Array(totalPages).keys())].map((num, i) =>
                        kaizenDocuments?.currentPage === num + 1 ?
                            (<a
                                key={i}
                                href="#"
                                className={getClassesForPage(num + 1)}
                                aria-current="page"
                            >
                                {num + 1}
                            </a>)
                            : (
                                <a
                                    key={i}
                                    onClick={() => getPage(num + 1)}
                                    href="#"
                                    className={getClassesForPage(num + 1)}
                                >
                                    {num + 1}
                                </a>
                            )
                    )}
                </div>
                <div className="-mt-px flex w-0 flex-1 justify-end">
                    <a
                        onClick={() => getNextPage()}
                        href="#"
                        className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    >
                        Next
                        <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </a>
                </div>
            </nav>
        </div>
    )
}

export default observer(Paging)