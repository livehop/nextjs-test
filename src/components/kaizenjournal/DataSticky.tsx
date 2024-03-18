"use client";
import { KaizenDocument } from '@/infra/models';
import { useStore } from '@/infra/stores/Store';
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import SingleColHeader from '../ui/table/SingleColHeader';
import TwoColHeader from '../ui/table/TwoColHeader';
import FourColHeader from '../ui/table/FourColHeader';
import DataBody from './DataBody';


const GetIndice = (kaizenRecord: KaizenDocument) => {
    return kaizenRecord.catFreq * kaizenRecord.catGrav * kaizenRecord.catProb * kaizenRecord.catLegal;

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
        <div className="border-2 border-grey-200 px-4 sm:px-6 lg:px-8">
            <div className="mt-2 flow-root">
                <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full px-4 py-0 align-middle">
                        <table className="min-w-full border-separate border-spacing-0">
                            <thead>
                                <tr>
                                    <SingleColHeader title="Id" />
                                    <SingleColHeader title="Équipe" />
                                    <SingleColHeader title="Sectuer" />
                                    <SingleColHeader title="Problème" />
                                    <TwoColHeader title1="Inscrit_Par" title2="Inscrit_Date" />
                                    <TwoColHeader title1="Catégorie" title2="Sous-catégorie" />
                                    <TwoColHeader title1="Indice" title2="Cote Indice" />
                                    <SingleColHeader title="Solution" />
                                    <SingleColHeader title="Point Focal" />

                                    <FourColHeader title1="Suivi" title2="Debut" title3="Fin Planfie" title4="Complete" />
                                    <SingleColHeader title="État" />
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