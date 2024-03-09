import { Equipe } from "./Equipe"

export interface Secteur {
    id: number
    equipeId: number
    equipe: Equipe
    name: string
    desuet: boolean
}