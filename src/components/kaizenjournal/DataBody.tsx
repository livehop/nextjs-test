import { useStore } from "@/infra/stores/Store";
import { observer } from "mobx-react-lite";
import React from "react";
import SkeletonData from "./SkeletonData";
import { isColumnVisible } from "@/lib/utils/arrayutils";
import { FaCircle } from "react-icons/fa6";
import { KaizenDocument } from "@/infra/models";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRouter } from "next/navigation";
import { FaEdit } from "react-icons/fa";

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

  return (
    <>
      {kaizenDocuments !== null &&
        kaizenDocuments?.data.map((kaizen) => (
          <tr key={kaizen.id} className="align-top text-start">
            {isColumnVisible(columns, "Id") && (
              <td className="pt-1 text-center whitespace-nowrap text-sm text-gray-500">
                {kaizen.id}
              </td>
            )}
            {isColumnVisible(columns, "Équipe") && (
              <td className="pt-1 text-start whitespace-nowrap text-sm font-medium text-gray-900">
                {kaizen.equipe.nomEquipe}
              </td>
            )}
            {isColumnVisible(columns, "Secteur") && (
              <td className="pt-1 text-start text-xs text-gray-900 max-w-28 text-wrap">
                {kaizen.secteur.name}
              </td>
            )}
            {isColumnVisible(columns, "Problème") && (
              <td className="pt-1 text-xs text-gray-500 max-w-[600px] line-clamp-3 min-w-48">
                {kaizen.problematique}
              </td>
            )}
            {(isColumnVisible(columns, "Inscrit Par") ||
              isColumnVisible(columns, "Inscrit Date")) && (
              <td className="pt-1 whitespace-nowrap text-xs text-gray-500 max-w-36 text-wrap">
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
              <td className="pt-1 text-sm text-gray-500">
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
              <td className="pt-1 whitespace-nowrap text-xs text-gray-500">
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
              <td className="pt-1 text-xs text-gray-500 max-w-[600px] line-clamp-3 min-w-48">
                {kaizen.solution}
              </td>
            )}
            {isColumnVisible(columns, "Point Focal") && (
              <td className="pt-1 text-center text-xs text-gray-500">
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
              <td className="pt-1 text-center text-sm text-gray-500">
                {GetColoredText(kaizen.etat.name, kaizen.etat.etatPriorite)}
              </td>
            )}

            <td className="pt-1 relative whitespace-nowrap text-right text-xs font-medium sm:pr-0">
              <button
                onClick={() => {
                  loadDocumentToEdit(kaizen.id);
                }}
                className="text-green-800 hover:text-indigo-900"
              >
                <FaEdit size={20} color="green" />
                <span className="sr-only">, {kaizen.id}</span>
              </button>
            </td>
          </tr>
        ))}
    </>
  );
};

export default observer(DataBody);
