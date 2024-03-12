"use client";
import { KaizenDocument } from '@/infra/models';
import { useStore } from '@/infra/stores/Store';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { FaCircle } from "react-icons/fa6";
import { Bars3Icon, BellIcon, ArrowDownIcon } from '@heroicons/react/24/outline'
import { SortOrder } from '@/infra/models/Ui';
import ColumnHeader from './table-ui/column-header';

const transactions = [
    {
        id: 'AAPS0L',
        company: 'Chase & Co.',
        share: 'CAC',
        commission: '+$4.37',
        price: '$3,509.00',
        quantity: '12.00',
        netAmount: '$4,397.00',
    },
    // More transactions...
]


const GetColoredTextClass = (urgency: number) => {
    if (urgency === 1) return 'text-pink-700';
    if (urgency === 2) return 'text-orange-700';
    if (urgency === 3) return 'text-indigo-700';
    if (urgency === 4) return 'text-violet-700';
    if (urgency === 5) return 'text-teal-700';
    if (urgency === 6) return 'text-green-700';
    return 'text-rose-700';
}


const GetColoredText = (text: string, urgency: number) => {
    if (urgency === 1) return <span className='text-pink-700'>{text}</span>
    if (urgency === 2) return <span className='text-orange-700'>{text}</span>
    if (urgency === 3) return <span className='text-indigo-700'>{text}</span>
    if (urgency === 4) return <span className='text-violet-700'>{text}</span>
    if (urgency === 5) return <span className='text-teal-700'>{text}</span>
    if (urgency === 6) return <span className='text-green-700'>{text}</span>
    return <span className='text-rose-700'>{text}</span>
}

const GetDate = (date: string): string => {
    if (date.startsWith('0001')) return '-';
    try {
        if (date) return date.split('T')[0];
    } catch {

    }
    return '-';
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

const Data = () => {
    const { kaizenStore } = useStore();
    const { kaizenDocuments, loading, loadKaizenDocuments, setEditDocumentId, setCurrentSortOrder, currentSortOrder } = kaizenStore;
    useEffect(() => {
        loadKaizenDocuments();
        console.log('Data useEffect')
    }, []);

    if (loading) return <div>Loading...</div>

    return (
        <div className='border-2 border-blue-200 p-2 min-w-full overflow-x-auto'>
            <table className="min-w-full divide-y divide-gray-300">
                <thead>
                    <tr>
                        <th>
                            <ColumnHeader title="ID" className='flex gap-1 items-center' />
                            {/* <div className='flex gap-1 items-center' onClick={() => setCurrentSortOrder(SortOrder.ID)}>
                                ID {currentSortOrder === SortOrder.ID && <ArrowDownIcon className='h-4 w-4' />}
                            </div> */}
                        </th>
                        <th>
                            <ColumnHeader title="Equipe" className='flex gap-1 items-center' />
                            {/* <div className='flex gap-1 items-center cursor-pointer' onClick={() => setCurrentSortOrder(SortOrder.Equipe)}>
                                Equipe {currentSortOrder === SortOrder.Equipe && <ArrowDownIcon className='h-4 w-4' />}
                            </div> */}

                        </th>
                        <th>
                            <ColumnHeader title="Sectuer" className='flex gap-1 items-center' />

                            {/* <div className='flex gap-1 items-center cursor-pointer' onClick={() => setCurrentSortOrder(SortOrder.Sectuer)}>
                                Sectuer{currentSortOrder === SortOrder.Sectuer && <ArrowDownIcon className='h-4 w-4' />}
                            </div> */}
                        </th>
                        <th>
                            <ColumnHeader title="Problematique" className='flex gap-1 items-center' />

                            {/* <div className='flex gap-1 items-center cursor-pointer' onClick={() => setCurrentSortOrder(SortOrder.Problematique)}>
                                Problematique {currentSortOrder === SortOrder.Problematique && <ArrowDownIcon className='h-4 w-4' />}
                            </div> */}

                        </th>
                        <th>
                            <ColumnHeader title="Inscrit_Par" className='flex gap-1 items-center' />
                            <ColumnHeader title="Inscrit_Date" className='flex gap-1 items-center' />
                            {/* <div className='flex gap-1 items-center cursor-pointer' onClick={() => setCurrentSortOrder(SortOrder.Inscrit_Par)}>
                                Inscrit_Par {currentSortOrder === SortOrder.Inscrit_Par && <ArrowDownIcon className='h-4 w-4' />}
                            </div> <br />
                            <div className='flex gap-1 items-center cursor-pointer' onClick={() => setCurrentSortOrder(SortOrder.Inscrit_Date)}>
                                Date {currentSortOrder === SortOrder.Inscrit_Date && <ArrowDownIcon className='h-4 w-4' />}
                            </div> */}

                        </th>
                        <th>
                            <ColumnHeader title="Categorie" className='flex gap-1 items-center' />
                            <ColumnHeader title="Sous Categorie" className='flex gap-1 items-center' />
                            {/* <div className='flex gap-1 items-center cursor-pointer' onClick={() => setCurrentSortOrder(SortOrder.Categorie)}>
                                Categorie {currentSortOrder === SortOrder.Categorie && <ArrowDownIcon className='h-4 w-4' />}
                            </div> <br />
                            <div className='flex gap-1 items-center cursor-pointer' onClick={() => setCurrentSortOrder(SortOrder.SousCategorie)}>
                                Sous Categorie{currentSortOrder === SortOrder.SousCategorie && <ArrowDownIcon className='h-4 w-4' />}
                            </div> */}
                        </th>
                        <th>
                            <ColumnHeader title="Indice" />
                            <ColumnHeader title="Cote Indice" />

                            {/* <div className='flex gap-1 items-center cursor-pointer' onClick={() => setCurrentSortOrder(SortOrder.Indice)}>
                                Indice{currentSortOrder === SortOrder.Indice && <ArrowDownIcon className='h-4 w-4' />}
                            </div>
                            <br />
                            <div className='flex gap-1 items-center cursor-pointer' onClick={() => setCurrentSortOrder(SortOrder.CoteIndice)}>
                                Cote Indice{currentSortOrder === SortOrder.CoteIndice && <ArrowDownIcon className='h-4 w-4' />}
                            </div> */}
                        </th>
                        <th className="px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                            <ColumnHeader title="Solution" className='flex gap-1 items-center' />
                            {/* <div className='flex gap-1 items-center cursor-pointer' onClick={() => setCurrentSortOrder(SortOrder.Solution)}>
                                Solution{currentSortOrder === SortOrder.Solution && <ArrowDownIcon className='h-4 w-4' />}
                            </div> */}

                        </th>
                        <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                            <ColumnHeader title="Point Focal" className='flex gap-1 items-center' />
                            {/* <div className='flex gap-1 items-center cursor-pointer' onClick={() => setCurrentSortOrder(SortOrder.PointFocal)}>
                                Point Focal{currentSortOrder === SortOrder.PointFocal && <ArrowDownIcon className='h-4 w-4' />}
                            </div> */}
                        </th>
                        <th
                            scope="col"
                            className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                            <ColumnHeader title="Suivi " className={GetColoredTextClass(1)} />
                            <ColumnHeader title="Debut " className={GetColoredTextClass(2)} />
                            <ColumnHeader title="Fin Planfie " className={GetColoredTextClass(3)} />
                            <ColumnHeader title="Complete " className={GetColoredTextClass(4)} />

                        </th>
                        <th
                            scope="col"
                            className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                            <ColumnHeader title="Etat" />

                            {/* <div className='flex gap-1 items-center cursor-pointer' onClick={() => setCurrentSortOrder(SortOrder.Etat)}>
                                Etat {currentSortOrder === SortOrder.Etat && <ArrowDownIcon className='h-4 w-4' />}
                            </div> */}

                        </th>
                        <th scope="col" className="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-0">
                            <span className="sr-only">Edit</span>
                        </th>
                    </tr>

                    {/* ID	EQUIPE	SECTEUR	POSTE	PROBLEMATIQUE	INSCRIT_PAR	INSCRIT_DATE	CATEGORIE	SOUS_CATEGORIE	Indice	Cote	SOLUTION	Point focal	SUIVI_DATE	ETAT	DEBUT_DATE	FIN_PLANIFIE_DATE	COMPLETE_DATE */}

                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {kaizenDocuments?.data.map((kaizen) => (
                        <tr key={kaizen.id}>
                            <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">{kaizen.id}</td>
                            <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                                {kaizen.equipe.nomEquipe}
                            </td>
                            <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">{kaizen.secteur.name}</td>
                            <td className="px-2 py-2 text-sm text-gray-500 max-w-[600px]  line-clamp-3 ">{kaizen.problematique}</td>
                            <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{kaizen.inscritPar}<br />{kaizen.inscritDate?.split('T')[0]}</td>
                            <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{kaizen.categorie.name} <br /> {kaizen.sousCategorie.description}</td>
                            <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                                <div className='flex gap-1 items-center justify-start'>
                                    <FaCircle size={10} color={GetIndiceColor(kaizen)} />
                                    {GetIndice(kaizen)}
                                </div>
                                <div className='flex gap-1 items-center justify-start'>
                                    <FaCircle size={10} color={GetCoteIndiceColor(kaizen)} />
                                    {GetCoteIndice(kaizen)}
                                </div>
                            </td>
                            <td className="px-2 py-2 text-sm text-gray-500 max-w-[600px] line-clamp-3">{kaizen.solution}</td>
                            <td className="px-2 py-2 text-sm text-gray-500">{kaizen.focalContactName}</td>
                            <td className="px-2 py-2 text-xs text-gray-500">
                                {GetColoredText(GetDate(kaizen.suiviDate), 1)}<br />
                                {GetColoredText(GetDate(kaizen.debutDate), 2)}<br />
                                {GetColoredText(GetDate(kaizen.finPlaniFieDate), 3)}<br />
                                {GetColoredText(GetDate(kaizen.completeDate), 4)}
                            </td>
                            <td className="px-2 py-2 text-sm text-gray-500">{GetColoredText(kaizen.etat.name, kaizen.etat.etatPriorite)}</td>

                            <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                <a onClick={() => { setEditDocumentId(kaizen.id) }} href="#" className="text-green-800 hover:text-indigo-900">
                                    Edit<span className="sr-only">, {kaizen.id}</span>
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default observer(Data)