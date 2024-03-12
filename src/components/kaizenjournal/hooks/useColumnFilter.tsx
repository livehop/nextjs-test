export type Column = {
    id: string
    getIsVisible: () => boolean
    toggleVisibility: (value: boolean) => void
}

const useColumnFilter = () => {
    const columns: Column[] = [
        {
            id: 'name',
            getIsVisible: () => true,
            toggleVisibility: (value: boolean) => {
                // Implement toggleVisibility logic for 'name' column
            }
        },
        {
            id: 'email',
            getIsVisible: () => true,
            toggleVisibility: (value: boolean) => {
                // Implement toggleVisibility logic for 'email' column
            }
        },
        {
            id: 'lastSeen',
            getIsVisible: () => true,
            toggleVisibility: (value: boolean) => {
                // Implement toggleVisibility logic for 'lastSeen' column
            }
        }
    ];

    return columns;
}

export default useColumnFilter;