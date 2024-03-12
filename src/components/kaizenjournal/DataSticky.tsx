"use client";
import { KaizenDocument } from '@/infra/models';
import { useStore } from '@/infra/stores/Store';
import { classNames } from '@/infra/utils/classNames'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { FaCircle } from "react-icons/fa6";
import ColumnHeader from './table-ui/column-header';
import SingleColHeader from '../ui/table/SingleColHeader';
import TwoColHeader from '../ui/table/TwoColHeader';
import FourColHeader from '../ui/table/FourColHeader';
import { isColumnVisible } from '@/lib/utils/arrayutils';
import SkeletonData from './SkeletonData';
import DataBody from './DataBody';



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
    const { kaizenStore, columnStore } = useStore();
    const { columns } = columnStore;

    const { kaizenDocuments, loading, loadKaizenDocuments, setEditDocumentId, setCurrentSortOrder, currentSortOrder } = kaizenStore;
    useEffect(() => {
        loadKaizenDocuments();
        console.log('Data useEffect')
    }, []);

    return (
        <div className="border-2 border-blue-200 px-4 sm:px-6 lg:px-8">
            <div className="mt-2 flow-root">
                <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full px-4 py-0 align-middle">
                        <table className="min-w-full border-separate border-spacing-0">
                            <thead>
                                <tr>
                                    <SingleColHeader title="Id" />
                                    <SingleColHeader title="Equipe" />
                                    <SingleColHeader title="Sectuer" />
                                    <SingleColHeader title="Problematique" />
                                    <TwoColHeader title1="Inscrit_Par" title2="Inscrit_Date" />
                                    <TwoColHeader title1="Categorie" title2="Sous Categorie" />
                                    <TwoColHeader title1="Indice" title2="Cote Indice" />
                                    <SingleColHeader title="Solution" />
                                    <SingleColHeader title="Point Focal" />

                                    <FourColHeader title1="Suivi" title2="Debut" title3="Fin Planfie" title4="Complete" />
                                    <SingleColHeader title="Etat" />
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                                    >
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <DataBody />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default observer(DataSticky)