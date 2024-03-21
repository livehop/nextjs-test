import { KaizenDocument } from '@/infra/models';
import { useStore } from '@/infra/stores/Store';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import { UseFormGetValues, UseFormRegister, UseFormWatch } from 'react-hook-form';

type CategorizationTabProps = {
    register: UseFormRegister<KaizenDocument>,
    getValues: UseFormGetValues<KaizenDocument>;
    watch: UseFormWatch<KaizenDocument>
}

const CategorizationTab = ({ register }: CategorizationTabProps) => {
    const { kaizenStore, categoryStore, secteurStore, projetStore } = useStore();
    const { editDocument } = kaizenStore;


    const [myFreq, setMyFreq] = useState(editDocument?.catFreq.toString());
    const [myGrav, setMyGrav] = useState(editDocument?.catGrav.toString());
    const [myProb, setMyProb] = useState(editDocument?.catProb.toString());
    const [myLegal, setMyLegal] = useState(editDocument?.catLegal.toString());

    useEffect(() => {
        secteurStore.loadIdValues();
        categoryStore.loadCategoryValues();
        categoryStore.loadSousCategoryValues();
        projetStore.loadIdValues();
    }, [])

    const toNumber = (value: string | number | undefined) => {
        if (typeof value === "string") {
            return parseInt(value);
        }
        return 0;
    }


    const getIndice = () => {
        return toNumber(myFreq) *
            toNumber(myGrav) *
            toNumber(myProb) *
            toNumber(myLegal);
    }
    return (
        <div>
            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-2">
                    <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                        Catégorie
                    </label>
                    <div className="mt-2">
                        <select
                            {...register('categorieId')}
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            {categoryStore.catetoryValues.map((idValue) => (
                                <option value={idValue.id} key={idValue.id} selected={idValue.value === editDocument?.categorie.name}>{idValue.value}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                        Sous-catégorie
                    </label>
                    <div className="mt-2">
                        <select
                            {...register('sousCategorieId')}
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            {categoryStore.sousCatetoryValues.map((idValue) => (
                                <option value={idValue.id} key={idValue.id} selected={idValue.value === editDocument?.sousCategorie.description}>{idValue.value}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                        Projet
                    </label>
                    <div className="mt-2">
                        <select
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            {projetStore.idValues.map((idValue) => (
                                <option key={idValue.id}>{idValue.value}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="sm:col-span-1">
                    <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                        Fréquence
                    </label>
                    <div className="mt-2">
                        <select
                            {...register('catFreq')}
                            onChange={(event) => { setMyFreq(event.target.value) }}
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            <option value={1}>Mois</option>
                            <option value={2}>Semaine</option>
                            <option value={3}>Jour</option>
                        </select>
                    </div>
                </div>


                <div className="sm:col-span-1">
                    <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                        Gravité {editDocument?.catGrav.toString()}
                    </label>
                    <div className="mt-2">
                        <select
                            {...register('catGrav')}
                            onChange={(event) => { setMyGrav(event.target.value) }}
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            <option value={1}>Mineur</option>
                            <option value={2}>Grave</option>
                            <option value={3}>OSHA/QEM</option>
                        </select>
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                        Probabilité
                    </label>
                    <div className="mt-2">
                        <select
                            {...register('catProb')}
                            onChange={(event) => { setMyProb(event.target.value) }}
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            <option value={1}>Peu Probabable</option>
                            <option value={2}>Moyen</option>
                            <option value={3}>Tres Probable</option>
                        </select>
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                        Objectif
                    </label>
                    <div className="mt-2">
                        <select
                            {...register('catLegal')}
                            onChange={(event) => { setMyLegal(event.target.value) }}
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            <option value={1}>N'affecte pas la DLP</option>
                            <option value={2}>Affecte la DLP</option>
                            <option value={3}>Affecte severement la DLP</option>
                        </select>
                    </div>
                </div>

                <div className="sm:col-span-1">
                    <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                        Indice
                    </label>
                    <div className="mt-2">
                        <h2>{getIndice()}</h2>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default observer(CategorizationTab)


