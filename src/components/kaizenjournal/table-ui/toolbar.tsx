import React, { useState } from 'react'
import ColumnsFilter from './column-filter';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Cross2Icon } from "@radix-ui/react-icons"
import EquipeFilter from './equipe-filter';
import SecteurFilter from './secteur-filter';
import EtatFilter from './etat-filter';
import { useStore } from '@/infra/stores/Store';
import { observer } from 'mobx-react-lite';
import { FaPlus } from "react-icons/fa6";


type ToolbarProps = {
    openSidePanel: () => void;
}


const Toolbar = ({ openSidePanel }: ToolbarProps) => {
    const { kaizenStore } = useStore();
    const { hasAnyFiltersSet, resetSearchFilters } = kaizenStore;

    const [search, setSearch] = useState('')


    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex flex-1 items-center space-x-2">
                    <Input
                        placeholder="Problems ..."
                        value={search ?? ""}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                        className="h-8 w-[150px] lg:w-[250px]"
                    />
                    <Input
                        placeholder="Solutions ..."
                        value={search ?? ""}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                        className="h-8 w-[150px] lg:w-[250px]"
                    />
                    <EquipeFilter />
                    <SecteurFilter />
                    <EtatFilter />


                    {hasAnyFiltersSet && (
                        <Button
                            variant="ghost"
                            onClick={resetSearchFilters}
                            className="h-8 px-2 lg:px-3"
                        >
                            Reset
                            <Cross2Icon className="ml-2 h-4 w-4" />
                        </Button>
                    )}
                </div>
                <div className='flex flex-col gap-2'>
                    <ColumnsFilter />
                    <Button onClick={() => openSidePanel()} variant="secondary">
                        <FaPlus />
                        <div className='ml-2'>Ajout</div>
                    </Button>

                </div>
            </div>
        </>

    )
}

export default observer(Toolbar)