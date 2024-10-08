import { useStore } from "@/infra/stores/Store";
import { observer } from "mobx-react-lite";
import React from "react";
import SkeletonData from "./SkeletonData";
import { isColumnVisible } from "@/lib/utils/arrayutils";
import { FaCircle } from "react-icons/fa6";
import { KaizenDocument } from "@/infra/models";
import { useRouter } from "next/navigation";
import { FaEdit } from "react-icons/fa";
import { LuPanelLeftOpen } from "react-icons/lu";
import { cn } from "@/lib/utils";

const GetColoredText = (text: string, urgency: number) => {
  if (urgency === 1) return <span className="text-pink-700">{text}</span>;
  if (urgency === 2) return <span className="text-orange-700">{text}</span>;
  if (urgency === 3) return <span className="text-indigo-700">{text}</span>;
  if (urgency === 4) return <span className="text-violet-700">{text}</span>;
  if (urgency === 5) return <span className="text-teal-700">{text}</span>;
  if (urgency === 6) return <span className="text-green-700">{text}</span>;
  return <span className="text-rose-700">{text}</span>;
};

const GetIndice = (kaizenRecord: KaizenDocument) => {
  return (
    kaizenRecord.catFreq *
    kaizenRecord.catGrav *
    kaizenRecord.catProb *
    kaizenRecord.catLegal
  );
};

const GetIndiceColor = (kaizenRecord: KaizenDocument) => {
  const value = GetIndice(kaizenRecord);
  if (value < 10) return "green";
  if (value < 20) return "orange";
  return "red";
};

const GetCoteIndice = (kaizenRecord: KaizenDocument) => {
  return (
    4 * kaizenRecord.solGain +
    (4 - kaizenRecord.solCout) +
    (4 - kaizenRecord.solEff) +
    (4 - kaizenRecord.solRisq) +
    GetIndice(kaizenRecord)
  );
};

const GetCoteIndiceColor = (kaizenRecord: KaizenDocument) => {
  let coteIndice = GetCoteIndice(kaizenRecord);
  if (coteIndice < 10) return "green";
  if (coteIndice < 20) return "orange";
  return "red";
};

const GetDate = (date: string): string => {
  if (date.startsWith("0001")) return "-";
  try {
    if (date) return date.split("T")[0];
  } catch {}
  return "-";
};

const DataBody = () => {
  const { kaizenStore, columnStore } = useStore();
  const { columns } = columnStore;

  const { kaizenDocuments, loading, setEditDocumentId } = kaizenStore;

  const router = useRouter();
  const loadDocumentToEdit = (id: number) => {
    router.replace("?kaizendocument=" + id);
    setEditDocumentId(id);
  };

  if (loading) return <SkeletonData />;

  const getRowColor = (index: number) => {
    if (index % 2 === 0) {
      return "bg-gray-50";
    }
    return "bg-gray-200";
  };

  return (
    <>
      {kaizenDocuments !== null &&
        kaizenDocuments?.data.map((kaizen, index) => (
          <tr
            key={kaizen.id}
            className={cn("align-top text-star", getRowColor(index))}
          >
            {isColumnVisible(columns, "Id") && (
              <td
                className={cn(
                  "text-center whitespace-nowrap text-xs",
                  getRowColor(index)
                )}
              >
                {kaizen.id}
              </td>
            )}
            {isColumnVisible(columns, "Équipe") && (
              <td className="w-24  text-start whitespace-nowrap text-xs font-semibold text-black">
                <span className="text-gray-900 text-xs">
                  {kaizen.equipe.numeroEquipe}
                </span>
                -
                <span className="text-gray-900 text-xs">
                  {kaizen.equipe.nomEquipe}
                </span>
              </td>
            )}
            {isColumnVisible(columns, "Secteur") && (
              <td className="text-start text-xs text-gray-900 max-w-28 text-wrap">
                {kaizen.secteur.name}
              </td>
            )}
            {isColumnVisible(columns, "Problème") && (
              <td className="text-xs text-gray-500 max-w-[600px] line-clamp-3 min-w-48">
                {kaizen.problematique}
              </td>
            )}
            {(isColumnVisible(columns, "Inscrit Par") ||
              isColumnVisible(columns, "Inscrit Date")) && (
              <td className="whitespace-nowrap text-xs text-gray-500 max-w-36 text-wrap">
                {isColumnVisible(columns, "Inscrit Par") && (
                  <>
                    {kaizen.inscritPar} <br />
                  </>
                )}
                {isColumnVisible(columns, "Inscrit Date") && (
                  <>{kaizen.inscritDate?.split("T")[0]}</>
                )}
              </td>
            )}
            {(isColumnVisible(columns, "Catégorie") ||
              isColumnVisible(columns, "Sous-catégorie")) && (
              <td className="text-sm text-gray-500">
                {isColumnVisible(columns, "Catégorie") && (
                  <>
                    {kaizen.categorie.name} <br />{" "}
                  </>
                )}
                {isColumnVisible(columns, "Sous-catégorie") && (
                  <>{kaizen.sousCategorie.description}</>
                )}
              </td>
            )}
            {(isColumnVisible(columns, "Indice") ||
              isColumnVisible(columns, "Cote Indice")) && (
              <td className="whitespace-nowrap text-xs text-gray-500">
                {isColumnVisible(columns, "Indice") && (
                  <div className="flex gap-1 items-center justify-start">
                    <FaCircle size={10} color={GetIndiceColor(kaizen)} />
                    {GetIndice(kaizen)}
                  </div>
                )}{" "}
                {isColumnVisible(columns, "Cote Indice") && (
                  <div className="flex gap-1 items-center justify-center">
                    <FaCircle size={10} color={GetCoteIndiceColor(kaizen)} />
                    {GetCoteIndice(kaizen)}
                  </div>
                )}
              </td>
            )}
            {isColumnVisible(columns, "Solution") && (
              <td className="text-xs text-gray-500 max-w-[600px] line-clamp-4 min-w-48">
                {kaizen.solution}
              </td>
            )}
            {isColumnVisible(columns, "Point Focal") && (
              <td className="text-center text-xs text-gray-500">
                {kaizen.focalContactName.length > 0 ? (
                  <>{kaizen.focalContactName}</>
                ) : (
                  <div className="text-red-600">non attribué</div>
                )}
              </td>
            )}
            {(isColumnVisible(columns, "Suivi") ||
              isColumnVisible(columns, "Debut") ||
              isColumnVisible(columns, "Fin Planfié") ||
              isColumnVisible(columns, "Complété")) && (
              <td className="text-center text-xs text-gray-500">
                {isColumnVisible(columns, "Suivi") && (
                  <>
                    {GetColoredText(GetDate(kaizen.suiviDate), 1)}
                    <br />
                  </>
                )}
                {isColumnVisible(columns, "Debut") && (
                  <>
                    {GetColoredText(GetDate(kaizen.debutDate), 2)}
                    <br />
                  </>
                )}
                {isColumnVisible(columns, "Fin Planfié") && (
                  <>
                    {GetColoredText(GetDate(kaizen.finPlaniFieDate), 3)}
                    <br />
                  </>
                )}
                {isColumnVisible(columns, "Complété") && (
                  <>{GetColoredText(GetDate(kaizen.completeDate), 4)}</>
                )}
              </td>
            )}
            {isColumnVisible(columns, "État") && (
              <td className="text-center text-sm text-gray-500">
                {GetColoredText(kaizen.etat.name, kaizen.etat.etatPriorite)}
              </td>
            )}

            <td className="relative whitespace-nowrap text-center text-xs font-medium">
              <button
                onClick={() => {
                  loadDocumentToEdit(kaizen.id);
                }}
                className="text-green-800 hover:text-indigo-900"
              >
                <LuPanelLeftOpen size={20} color="green" />
                <span className="sr-only">, {kaizen.id}</span>
              </button>
            </td>
          </tr>
        ))}
    </>
  );
};

export default observer(DataBody);
