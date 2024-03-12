import { useEffect, useState } from "react"

export type Option = {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
}


export function useOptionsFilter() {
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([])

    useEffect(() => {
        // Fetch options from the server
        // setOptions(response.data)
    }, [])


    const selectOption = (option: Option) => {
        setSelectedOptions((prev) => [...prev, option])
    }

    const isOptionSelected = (option: Option) => {
        return selectedOptions.some((selectedOption) => selectedOption.value === option.value)
    }

    const hasOption = (option: Option) => {
        return selectedOptions.some((selectedOption) => selectedOption.value === option.value)
    }

    const addOption = (option: Option) => {
        setSelectedOptions((prev) => [...prev, option])
    }

    const deleteOption = (option: Option) => {
        setSelectedOptions((prev) => prev.filter((selectedOption) => selectedOption.value !== option.value))
    }

    return {
        selectedOptions,
        selectOption,
        isOptionSelected,
        hasOption,
        addOption,
        deleteOption
    }
}