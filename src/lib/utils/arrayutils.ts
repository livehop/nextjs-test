import { DisplayColumn } from "@/infra/models/DisplayColumn";

export const getToggledColumns = (columns: DisplayColumn[], column: DisplayColumn, value: boolean) => {
    const index = columns.findIndex(v => v.title === column.title);
    if (index >= 0) {
        const newColumns = [...columns];
        newColumns[index] = { ...column, isVisible: value };
        return newColumns;
    }
    return columns;
}

export const isColumnVisible = (columns: DisplayColumn[], columnName: string) => {
    if (typeof window === 'undefined') return true;
    return columns.find((column) => column.title === columnName)?.isVisible ?? true;
}



export const GetColoredTextClass = (urgency: number) => {
    if (urgency === 1) return 'text-pink-700';
    if (urgency === 2) return 'text-orange-700';
    if (urgency === 3) return 'text-indigo-700';
    if (urgency === 4) return 'text-violet-700';
    if (urgency === 5) return 'text-teal-700';
    if (urgency === 6) return 'text-green-700';
    return 'text-rose-700';
}
