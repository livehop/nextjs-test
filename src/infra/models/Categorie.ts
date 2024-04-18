export interface Categorie {
  id: number;
  name: string;
  ficherIntranet: string;
}

export interface CatLegalLookup {
  categorieId: number;
  label: string;
  catLegal: number;
  description: string;
  id: number;
}
