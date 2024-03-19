import { Equipe, Secteur, Categorie, SousCategorie, Etat } from "."
import { z } from "zod";

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


export const KaizenDocumentSchema = z.object({
    id: z.number(),
    equipeId: z.number(),
    secteurId: z.number(),
    problematique: z.string(),
    inscritPar: z.string(),
    inscritDate: z.string(),
    categorieId: z.number(),
    sousCategorieId: z.number(),
    catFreq: z.number(),
    catGrav: z.number(),
    catProb: z.number(),
    catLegal: z.number(),
    solGain: z.number(),
    solCout: z.number(),
    solEff: z.number(),
    solRisq: z.number(),
    solution: z.string(),
    focalId: z.string(),
    focalContactName: z.string(),
    suiviDate: z.string(),
    etatId: z.number(),
    debutDate: z.string(),
    finPlaniFieDate: z.string(),
    completeDate: z.string(),
    annuleDate: z.string(),
    pubNouveauPoint: z.boolean(),
});

export type KaizenEditDocument = z.infer<typeof KaizenDocumentSchema>;

