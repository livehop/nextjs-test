import { Equipe } from "./Equipe";

export interface Secteur {
  id: number;
  equipeId: number;
  equipe: Equipe;
  name: string;
  desuet: boolean;
}

export interface SousSecteur {
  id: number;
  equipeId: number;
  equipe: Equipe;
  secteurId: number;
  secteur: Secteur;
  description: string;
  desuet: boolean;
}
