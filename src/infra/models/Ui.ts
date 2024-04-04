import {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { KaizenDocument } from ".";

export enum SortOrder {
  ID = 0,
  Equipe,
  Secteur,
  Problematique,
  Inscrit_Par,
  Inscrit_Date,
  Categorie,
  SousCategorie,
  Indice,
  CoteIndice,
  Solution,
  PointFocal,
  Etat,
}

export type FormProps = {
  register: UseFormRegister<KaizenDocument>;
  getValues: UseFormGetValues<KaizenDocument>;
  setValue: UseFormSetValue<KaizenDocument>;
};
