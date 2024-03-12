"use client";
import ColumnHeader from '@/components/kaizenjournal/table-ui/column-header';
import { useStore } from '@/infra/stores/Store';
import { isColumnVisible } from '@/lib/utils/arrayutils';
import { observer } from 'mobx-react-lite';


import React from 'react';


type SingleColHeaderProps = {
    title: string
}

const SingleColHeader = ({ title }: SingleColHeaderProps) => {
    const { columnStore } = useStore();
    const { columns } = columnStore;

    return (
        <>
            {isColumnVisible(columns, title) && (
                <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                >
                    <ColumnHeader title={title} className='flex gap-1 items-center' />
                </th>
            )}
        </>
    )
}

export default observer(SingleColHeader)