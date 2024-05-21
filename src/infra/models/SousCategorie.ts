import { Categorie } from "./Categorie";

export interface SousCategorie {
  id: number;
  categorieId: number;
  categorie: Categorie;
  description: string;
  desuet: number;
}
