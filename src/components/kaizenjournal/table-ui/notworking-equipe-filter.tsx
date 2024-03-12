import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import { PlusCircledIcon, CheckIcon } from "@radix-ui/react-icons"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command'
import { cn } from '@/lib/utils'
import { useOptionsFilter } from '../hooks/useOptionFilter'
import getEquipes from '../lib/getEquipes'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'




const NotWorkingEquipeFilter = () => {
    const { selectedOptions, selectOption, isOptionSelected, hasOption, addOption, deleteOption } = useOptionsFilter();
    const options = getEquipes();
    return (
        <>

            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 border-dashed">
                        <PlusCircledIcon className="mr-2 h-4 w-4" />
                        Equipe
                        {/* <Select onValueChange={(e) => console.log("on value change " + e)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                    </Select> */}

                        {selectedOptions?.length > 0 && (
                            <>
                                <Separator orientation="vertical" className="mx-2 h-4" />
                                <Badge
                                    variant="secondary"
                                    className="rounded-sm px-1 font-normal lg:hidden"
                                >
                                    {selectedOptions.length}
                                </Badge>
                                <div className="hidden space-x-1 lg:flex">
                                    {selectedOptions.length > 2 ? (
                                        <Badge
                                            variant="secondary"
                                            className="rounded-sm px-1 font-normal"
                                        >
                                            {selectedOptions.length} selected
                                        </Badge>
                                    ) : (
                                        options
                                            .filter((option) => hasOption(option))
                                            .map((option) => (
                                                <Badge
                                                    variant="secondary"
                                                    key={option.value}
                                                    className="rounded-sm px-1 font-normal"
                                                >
                                                    {option.label}
                                                </Badge>
                                            ))
                                    )}
                                </div>
                            </>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0" align="start">
                    <Command>
                        <CommandInput placeholder="Equipe" />
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup>

                                {options.map((option) => {
                                    const isSelected = isOptionSelected(option)
                                    return (
                                        <CommandItem
                                            key={option.value}

                                            onSelect={() =>
                                                console.log("Select option")
                                            }
                                        >
                                            <div
                                                className={cn(
                                                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                                    isSelected
                                                        ? "bg-primary text-primary-foreground"
                                                        : "opacity-50 [&_svg]:invisible"
                                                )}
                                            >
                                                <CheckIcon className={cn("h-4 w-4")} />
                                            </div>
                                            {option.icon && (
                                                <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                                            )}
                                            <span>{option.label}</span>
                                        </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                            {selectedOptions.length > 0 && (
                                <>
                                    <CommandSeparator />
                                    <CommandGroup>
                                        <CommandItem
                                            onSelect={() => console.log("Clear filters")}
                                            className="justify-center text-center"
                                        >
                                            Clear filters
                                        </CommandItem>
                                    </CommandGroup>
                                </>
                            )}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </>

    )
}

export default NotWorkingEquipeFilter