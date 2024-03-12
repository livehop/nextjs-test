import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import React, { useState } from 'react'
import { PlusCircledIcon, CheckIcon } from "@radix-ui/react-icons"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command'
import getEquipes from '../lib/getEquipes'
import { Checkbox } from '@/components/ui/checkbox'


const TestmeFilter = () => {

    const [popoverOpen, setPopOverOpen] = useState(false);

    const togglePoppver = () => {
        console.log("popover " + popoverOpen);
        setPopOverOpen(!popoverOpen);
    }

    const options = getEquipes();
    return (
        <>
            <Popover open={popoverOpen} onOpenChange={togglePoppver}>
                <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 border-dashed">
                        <PlusCircledIcon className="mr-2 h-4 w-4" />
                        Test Me
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0" align="start">
                    <div className="flex flex-col space-y-4">

                        <div className=" flex space-x-2 mt-1">

                        </div>
                        <div className="m-2 flex space-x-2">
                            <Checkbox id="terms1" onClick={() => console.log("checkbox clicked")} />
                            <label
                                htmlFor="terms1"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Test 1
                            </label>
                        </div>
                        <div className="items-top m-2 flex space-x-2">
                            <Checkbox id="terms2" onClick={() => console.log("checkbox clicked")} />
                            <label
                                htmlFor="terms2"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Test 2
                            </label>
                        </div>
                        <div className="items-top m-2 flex space-x-2 mt-4">
                            <Checkbox id="terms3" onClick={() => console.log("checkbox clicked")} />
                            <label
                                htmlFor="terms4"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Test 3
                            </label>
                        </div>
                        <div className="items-top flex space-x-2 mt-4">

                        </div>
                    </div>
                </PopoverContent>
            </Popover >
        </>

    )
}

export default TestmeFilter