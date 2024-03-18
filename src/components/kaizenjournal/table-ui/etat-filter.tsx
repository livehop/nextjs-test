import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import React, { useEffect, useState } from 'react'
import { PlusCircledIcon } from "@radix-ui/react-icons"
import { Checkbox } from '@/components/ui/checkbox'
import { observer } from 'mobx-react-lite'
import { useStore } from '@/infra/stores/Store'
import { FaSearch } from 'react-icons/fa'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'


const EtatFilter = () => {
    const { etatStore, searchStore } = useStore();
    const { setEtatFilter } = searchStore
    const { idValues, loadIdValues, toggleSelectedValue, isChecked, hasAnyCheckedItem, clearAllSelectedItems, selectedValues } = etatStore;
    const [popoverOpen, setPopOverOpen] = useState(false);

    useEffect(() => {
        loadIdValues();
    }, [])

    const togglePoppver = () => {
        console.log("popover " + popoverOpen);
        setPopOverOpen(!popoverOpen);
        if (popoverOpen) {
            setEtatFilter(selectedValues.map(v => v.id));
        }
    }


    return (
        <>
            <Popover open={popoverOpen} onOpenChange={togglePoppver}>
                <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 border-dashed">
                        <PlusCircledIcon className="mr-2 h-4 w-4" />
                        État
                        {selectedValues?.length > 0 && (
                            <>
                                <Separator orientation="vertical" className="mx-2 h-4" />
                                <Badge
                                    variant="secondary"
                                    className="rounded-sm px-1 font-normal lg:hidden"
                                >
                                    {selectedValues.length}
                                </Badge>
                                <div className="hidden space-x-1 lg:flex">
                                    {selectedValues.length > 2 ? (
                                        <Badge
                                            variant="secondary"
                                            className="rounded-sm px-1 font-normal"
                                        >
                                            {selectedValues.length} selected
                                        </Badge>
                                    ) : (
                                        selectedValues
                                            .map((option) => (
                                                <Badge
                                                    variant="secondary"
                                                    key={option.value}
                                                    className="rounded-sm px-1 font-normal"
                                                >
                                                    {option.value}
                                                </Badge>
                                            ))
                                    )}
                                </div>
                            </>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[220px] p-0" align="start">
                    <div className="flex flex-col space-y-4">
                        <div className="m-0 mt-4 ml-4 flex items-center justify-start space-x-2">
                            <Checkbox
                                disabled={!hasAnyCheckedItem()}
                                id={"dhiru"}
                                checked={hasAnyCheckedItem()}
                                onClick={() => clearAllSelectedItems()}
                            />

                            <input
                                type="text"
                                name="search"
                                id="search"
                                className="block w-32 rounded-md border-0 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="  Search"
                            />
                            <FaSearch color='grey' />
                        </div>
                        <Separator />
                        {idValues.map(idValue => (
                            <div key={idValue.id} className="m-0 ml-4 flex items-center space-x-2">
                                <Checkbox
                                    id={idValue.value}
                                    checked={isChecked(idValue)}
                                    onClick={() => toggleSelectedValue(idValue)}
                                />
                                <label
                                    htmlFor="terms1"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    {idValue.value}
                                </label>
                            </div>
                        ))}
                        <div className="items-top flex space-x-2 mt-4">

                        </div>
                    </div>
                </PopoverContent>
            </Popover >

        </>

    )
}

export default observer(EtatFilter)