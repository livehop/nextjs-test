import { KaizenDocument } from "@/infra/models";
import { useStore } from "@/infra/stores/Store";
import xlsx, { IJsonSheet } from "json-as-xlsx";

export function DownloadToExcel(data: KaizenDocument[]) {
  // Mapping your documents to ensure they match the expected format
  // Mapping your documents to ensure they match the expected format
  const mappedData = data.map((doc) => ({
    Id: doc.id,
    EquipeId: doc.equipeId,
    NomEquipe: doc.equipe.nomEquipe,
    SecteurId: doc.secteurId,
    SecteurNom: doc.secteur.name,
    Problematique: doc.problematique,
    Solution: doc.solution,
    InscritPar: doc.inscritPar,
    InscritDate: doc.inscritDate,
    CategorieId: doc.categorieId,
    CategorieNom: doc.categorie.name,
    SousCategorieId: doc.sousCategorieId,
    SousCategorieNom: doc.sousCategorie.description,
    CatFreq: doc.catFreq,
    CatGrav: doc.catGrav,
    CatProb: doc.catProb,
    CatLegal: doc.catLegal,
    SolGain: doc.solGain,
    SolCout: doc.solCout,
    SolEff: doc.solEff,
    SolRisq: doc.solRisq,
    FocalId: doc.focalId,
    FocalContactName: doc.focalContactName,
    SuiviDate: doc.suiviDate,
    EtatId: doc.etatId,
    Etat: doc.etat.name,
    DebutDate: doc.debutDate,
    FinPlaniFieDate: doc.finPlaniFieDate,
    CompleteDate: doc.completeDate,
    AnnuleDate: doc.annuleDate,
    PubNouveauPoint: doc.pubNouveauPoint,
  }));

  let columns: IJsonSheet[] = [
    {
      sheet: "KasizenJournal",
      columns: [
        { label: "Id", value: "id" },
        { label: "EquipeId", value: "EquipeId" },
        { label: "EquipeNom", value: "NomEquipe" },
        { label: "SecteurId", value: "SecteurId" },
        { label: "SecteurNom", value: "SecteurNom" },
        { label: "Problematique", value: "Problematique" },
        { label: "Solution", value: "Solution" },
        { label: "InscritPar", value: "InscritPar" },
        {
          label: "InscritDate",
          value: (row: any) => row.inscritDate,
        },
        { label: "CategorieId", value: "CategorieId" },
        { label: "CategorieNom", value: "CategorieNom" },
        { label: "SousCategorieId", value: "SousCategorieId" },
        { label: "SousCategorieNom", value: "SousCategorieNom" },
        { label: "CatFreq", value: "CatFreq" },
        { label: "CatGrav", value: "CatGrav" },
        { label: "CatProb", value: "CatProb" },
        { label: "CatLegal", value: "CatLegal" },
        { label: "SolGain", value: "SolGain" },
        { label: "SolCout", value: "SolCout" },
        { label: "SolEff", value: "SolEff" },
        { label: "SolRisq", value: "SolRisq" },
        { label: "FocalId", value: "FocalId" },
        { label: "FocalContactName", value: "FocalContactName" },
        { label: "SuiviDate", value: "SuiviDate" },
        { label: "EtatId", value: "EtatId" },
        { label: "Etat", value: "Etat" },
        { label: "DebutDate", value: "DebutDate" },
        { label: "FinPlaniFieDate", value: "FinPlaniFieDate" },
        { label: "CompleteDate", value: "CompleteDate" },
        { label: "AnnuleDate", value: "AnnuleDate" },
        { label: "PubNouveauPoint", value: "PubNouveauPoint" },
      ],
      content: mappedData,
    },
  ];

  let settings = {
    fileName: "KasizenJournalData",
    extraLength: 3,
  };

  xlsx(columns, settings);
}

/*

  const mappedData = kaizenDocuments.data.map((doc) => ({
    Id: doc.id,
    EquipeId: doc.equipeId,
    NomEquipe: doc.equipe.nomEquipe,
    SecteurId: doc.secteurId,
    SecteurNom: doc.secteur.name,
    Problematique: doc.problematique,
    Solution: doc.solution,
    InscritPar: doc.inscritPar,
    InscritDate: doc.inscritDate,
    CategorieId: doc.categorieId,
    CategorieNom: doc.categorie.name,
    SousCategorieId: doc.sousCategorieId,
    SousCategorieNom: doc.sousCategorie.description,
    CatFreq: doc.catFreq,
    CatGrav: doc.catGrav,
    CatProb: doc.catProb,
    CatLegal: doc.catLegal,
    SolGain: doc.solGain,
    SolCout: doc.solCout,
    SolEff: doc.solEff,
    SolRisq: doc.solRisq,
    FocalId: doc.focalId,
    FocalContactName: doc.focalContactName,
    SuiviDate: doc.suiviDate,
    EtatId: doc.etatId,
    Etat: doc.etat.name,
    DebutDate: doc.debutDate,
    FinPlaniFieDate: doc.finPlaniFieDate,
    CompleteDate: doc.completeDate,
    AnnuleDate: doc.annuleDate,
    PubNouveauPoint: doc.pubNouveauPoint,
  }));
*/
