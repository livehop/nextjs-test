"use client";
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import React, { useState } from 'react'
import { MixerHorizontalIcon } from "@radix-ui/react-icons"
import { DisplayColumn, getDefaultDisplayColumns } from '@/infra/models/DisplayColumn'
import { getToggledColumns } from '@/lib/utils/arrayutils'
import { observer } from 'mobx-react-lite'
import { useStore } from '@/infra/stores/Store';


const ColumnsFilter = () => {
    const { columnStore } = useStore();
    const { columns, toggleColVisibility } = columnStore;


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="ml-auto hidden h-8 lg:flex"
                >
                    <MixerHorizontalIcon className="mr-2 h-4 w-4" />
                    View
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[150px]">
                <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {columns
                    .map((column) => {
                        return (
                            <DropdownMenuCheckboxItem
                                key={column.title}
                                className="capitalize"
                                checked={column.isVisible}
                                onCheckedChange={(value) => toggleColVisibility(column, !!value)}
                            >
                                {column.title}
                            </DropdownMenuCheckboxItem>
                        )
                    })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default observer(ColumnsFilter)