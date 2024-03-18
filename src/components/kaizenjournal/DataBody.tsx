import { useStore } from '@/infra/stores/Store';
import { observer } from 'mobx-react-lite'
import React from 'react'
import SkeletonData from './SkeletonData';
import { isColumnVisible } from '@/lib/utils/arrayutils';
import { FaCircle } from "react-icons/fa6";
import { KaizenDocument } from '@/infra/models';
import InfiniteScroll from "react-infinite-scroll-component";


const GetColoredText = (text: string, urgency: number) => {
    if (urgency === 1) return <span className='text-pink-700'>{text}</span>
    if (urgency === 2) return <span className='text-orange-700'>{text}</span>
    if (urgency === 3) return <span className='text-indigo-700'>{text}</span>
    if (urgency === 4) return <span className='text-violet-700'>{text}</span>
    if (urgency === 5) return <span className='text-teal-700'>{text}</span>
    if (urgency === 6) return <span className='text-green-700'>{text}</span>
    return <span className='text-rose-700'>{text}</span>
}

const GetIndice = (kaizenRecord: KaizenDocument) => {
    return kaizenRecord.catFreq * kaizenRecord.catGrav * kaizenRecord.catProb * kaizenRecord.catLegal;

}


const GetIndiceColor = (kaizenRecord: KaizenDocument) => {
    const value = GetIndice(kaizenRecord);
    if (value < 10) return 'green';
    if (value < 20) return 'orange';
    return 'red';
}


const GetCoteIndice = (kaizenRecord: KaizenDocument) => {
    return (4 * kaizenRecord.solGain) + (4 - kaizenRecord.solCout) + (4 - kaizenRecord.solEff) + (4 - kaizenRecord.solRisq) + GetIndice(kaizenRecord);
}


const GetCoteIndiceColor = (kaizenRecord: KaizenDocument) => {
    let coteIndice = GetCoteIndice(kaizenRecord);
    if (coteIndice < 10) return 'green';
    if (coteIndice < 20) return 'orange';
    return 'red';
}

const GetDate = (date: string): string => {
    if (date.startsWith('0001')) return '-';
    try {
        if (date) return date.split('T')[0];
    } catch {

    }
    return '-';
}


const DataBody = () => {
    const { kaizenStore, columnStore } = useStore();
    const { columns } = columnStore;

    const { kaizenDocuments, loading, loadKaizenDocuments, setEditDocumentId, setCurrentSortOrder, currentSortOrder } = kaizenStore;

    if (loading) return <SkeletonData />

    return (
        <>

            {kaizenDocuments !== null && kaizenDocuments?.data.map((kaizen) => (
                <tr key={kaizen.id}>
                    {isColumnVisible(columns, "Id") && (
                        <td className="text-center whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">{kaizen.id}</td>
                    )}
                    {isColumnVisible(columns, "Equipe") && (
                        <td className="text-center whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                            {kaizen.equipe.nomEquipe}
                        </td>
                    )}
                    {isColumnVisible(columns, "Sectuer") && (
                        <td className="text-center whitespace-nowrap px-2 py-2 text-sm text-gray-900">{kaizen.secteur.name}</td>
                    )}
                    {isColumnVisible(columns, "Problematique") && (
                        <td className="text-sm text-gray-500 max-w-[600px] line-clamp-3">{kaizen.problematique}</td>
                    )}
                    {(isColumnVisible(columns, "Inscrit_Par") || isColumnVisible(columns, "Inscrit_Date")) && (
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                            {isColumnVisible(columns, "Inscrit_Par") && (
                                <>{kaizen.inscritPar} < br /></>
                            )}
                            {isColumnVisible(columns, "Inscrit_Date") && (
                                <>{kaizen.inscritDate?.split('T')[0]}</>
                            )}
                        </td>
                    )}
                    {(isColumnVisible(columns, "Categorie") || isColumnVisible(columns, "Sous Categorie")) && (
                        <td className="px-2 py-2 text-sm text-gray-500">
                            {isColumnVisible(columns, "Categorie") && (
                                <>{kaizen.categorie.name} <br /> </>
                            )}
                            {isColumnVisible(columns, "Sous Categorie") && (
                                <>{kaizen.sousCategorie.description}</>
                            )}
                        </td>
                    )}
                    {(isColumnVisible(columns, "Indice") || isColumnVisible(columns, "Cote Indice")) && (
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                            {isColumnVisible(columns, "Indice") && (
                                <div className='flex gap-1 items-center justify-start'>
                                    <FaCircle size={10} color={GetIndiceColor(kaizen)} />
                                    {GetIndice(kaizen)}
                                </div>
                            )}     {isColumnVisible(columns, "Cote Indice") && (
                                <div className='flex gap-1 items-center justify-center'>
                                    <FaCircle size={10} color={GetCoteIndiceColor(kaizen)} />
                                    {GetCoteIndice(kaizen)}
                                </div>
                            )}
                        </td>
                    )}
                    {isColumnVisible(columns, "Solution") && (
                        <td className="text-sm text-gray-500 max-w-[600px] line-clamp-3">{kaizen.solution}</td>
                    )}
                    {isColumnVisible(columns, "Point Focal") && (
                        <td className="w-2 px-2 py-2 text-sm text-gray-500">{kaizen.focalContactName}</td>
                    )}
                    {(isColumnVisible(columns, "Suivi") || isColumnVisible(columns, "Debut") || isColumnVisible(columns, "Fin Planfie") || isColumnVisible(columns, "Complete")) && (
                        <td className="text-center px-2 py-2 text-xs text-gray-500">
                            {isColumnVisible(columns, "Suivi") && (
                                <>
                                    {GetColoredText(GetDate(kaizen.suiviDate), 1)}<br />
                                </>
                            )}
                            {isColumnVisible(columns, "Debut") && (
                                <>
                                    {GetColoredText(GetDate(kaizen.debutDate), 2)}<br />
                                </>
                            )}
                            {isColumnVisible(columns, "Fin Planfie") && (
                                <>
                                    {GetColoredText(GetDate(kaizen.finPlaniFieDate), 3)}<br />
                                </>
                            )}
                            {isColumnVisible(columns, "Complete") && (
                                <>
                                    {GetColoredText(GetDate(kaizen.completeDate), 4)}
                                </>
                            )}
                        </td>
                    )}
                    {isColumnVisible(columns, "Etat") && (
                        <td className="text-center px-2 py-2 text-sm text-gray-500">{GetColoredText(kaizen.etat.name, kaizen.etat.etatPriorite)}</td>
                    )}

                    <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <a onClick={() => { setEditDocumentId(kaizen.id) }} href="#" className="text-green-800 hover:text-indigo-900">
                            Edit<span className="sr-only">, {kaizen.id}</span>
                        </a>
                    </td>
                </tr>
            ))
            }
        </>

    )
}

export default observer(DataBody)