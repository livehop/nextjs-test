export interface Categorie {
  id: number;
  name: string;
  ficherIntranet: string;
  desuet: number;
}

export interface CatLegalLookup {
  categorieId: number;
  label: string;
  catLegal: number;
  description: string;
  id: number;
}
