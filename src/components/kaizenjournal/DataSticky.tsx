"use client";
import { KaizenDocument } from '@/infra/models';
import { useStore } from '@/infra/stores/Store';
import { classNames } from '@/infra/utils/classNames'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { FaCircle } from "react-icons/fa6";
import ColumnHeader from './table-ui/column-header';



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


const DataSticky = () => {
    const { kaizenStore } = useStore();
    const { kaizenDocuments, loading, loadKaizenDocuments, setEditDocumentId, setCurrentSortOrder, currentSortOrder } = kaizenStore;
    useEffect(() => {
        loadKaizenDocuments();
        console.log('Data useEffect')
    }, []);

    if (loading) return <div>Loading...</div>
    return (
        <div className="border-2 border-blue-200 px-4 sm:px-6 lg:px-8">
            <div className="mt-2 flow-root">
                <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full px-4 py-0 align-middle">
                        <table className="min-w-full border-separate border-spacing-0">
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                                    >
                                        <ColumnHeader title="ID" className='flex gap-1 items-center' />
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                                    >
                                        <ColumnHeader title="Equipe" className='flex gap-1 items-center' />
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                                    >
                                        <ColumnHeader title="Sectuer" className='flex gap-1 items-center' />
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                                    >
                                        <ColumnHeader title="Problematique" className='flex gap-1 items-center' />
                                    </th>



                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                                    >
                                        <ColumnHeader title="Inscrit_Par" className='flex gap-1 items-center' />
                                        <ColumnHeader title="Inscrit_Date" className='flex gap-1 items-center' />
                                    </th>





                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                                    >
                                        <ColumnHeader title="Categorie" className='flex gap-1 items-center' />
                                        <ColumnHeader title="Sous Categorie" className='flex gap-1 items-center' />
                                    </th>


                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                                    >
                                        <ColumnHeader title="Indice" />
                                        <ColumnHeader title="Cote Indice" />
                                    </th>


                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                                    >
                                        <ColumnHeader title="Solution" className='flex gap-1 items-center' />
                                    </th>

                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                                    >
                                        <ColumnHeader title="Point Focal" className='flex gap-1 items-center' />
                                    </th>

                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                                    >
                                        <ColumnHeader title="Suivi " className={GetColoredTextClass(1)} />
                                        <ColumnHeader title="Debut " className={GetColoredTextClass(2)} />
                                        <ColumnHeader title="Fin Planfie " className={GetColoredTextClass(3)} />
                                        <ColumnHeader title="Complete " className={GetColoredTextClass(4)} />
                                    </th>

                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                                    >
                                        <ColumnHeader title="Etat" />
                                    </th>

                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                                    >
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {kaizenDocuments?.data.map((kaizen, index) => (
                                    <tr key={kaizen.id}>
                                        <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">{kaizen.id}</td>
                                        <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                                            {kaizen.equipe.nomEquipe}
                                        </td>
                                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">{kaizen.secteur.name}</td>
                                        <td className="text-sm text-gray-500 max-w-[600px] line-clamp-3 ">{kaizen.problematique}</td>
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
                                        <td className="text-sm text-gray-500 max-w-[600px] line-clamp-3">{kaizen.solution}</td>
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
                </div>
            </div>
        </div>
    )
}

export default observer(DataSticky)