"use client";
import { observer } from 'mobx-react-lite';
import React from 'react'
import {
    ArrowDownIcon,
    ArrowUpIcon,
    CaretSortIcon,
    EyeNoneIcon,
} from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { useStore } from '@/infra/stores/Store';
import { ASC, DESC } from '@/infra/stores/SortingStore';

type ColumnHeaderProps = {
    title: string;
    className?: string;
}

const ColumnHeader = ({ title, className }: ColumnHeaderProps) => {
    const { sortingStore } = useStore();
    const { getSortedState, toggleSorting } = sortingStore;
    return (
        <div className={cn("flex items-center", className)}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="-ml-3 h-8 data-[state=open]:bg-accent"
                    >
                        <span>{title}</span>
                        {getSortedState(title) === DESC ? (
                            <ArrowDownIcon className="ml-2 h-4 w-4" />
                        ) : getSortedState(title) === ASC ? (
                            <ArrowUpIcon className="ml-2 h-4 w-4" />
                        ) : (
                            <CaretSortIcon className="ml-2 h-4 w-4" />
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => toggleSorting(title, false)}>
                        <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Asc
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toggleSorting(title, true)}>
                        <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Desc
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => console.log("remove column")}>
                        <EyeNoneIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Hide
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default observer(ColumnHeader);