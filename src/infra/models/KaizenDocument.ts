import { Equipe, Secteur, Categorie, SousCategorie, Etat } from "."

export interface KaizenDocument {
    id: number
    equipeId: number
    equipe: Equipe
    secteurId: number
    secteur: Secteur
    problematique: string
    inscritPar: string
    inscritDate: string
    categorieId: number
    categorie: Categorie
    sousCategorieId: number
    sousCategorie: SousCategorie
    catFreq: number
    catGrav: number
    catProb: number
    catLegal: number
    solGain: number
    solCout: number
    solEff: number
    solRisq: number
    solution: string
    focalId: string
    focalContactName: string
    suiviDate: string
    etatId: number
    etat: Etat
    debutDate: string
    finPlaniFieDate: string
    completeDate: string
    annuleDate: string
    pubNouveauPoint: boolean
}
