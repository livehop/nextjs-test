export interface Note {
    kaizenId: number
    kaizen: any
    inscritDate: string
    description: string
    inscritDateNumber: number
    id: number
}


export interface AddNote {
    kaizenId: number
    description: string
}