import { KaizenDocument } from '@/infra/models';
import { useStore } from '@/infra/stores/Store';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import { UseFormRegister } from 'react-hook-form';

type CategorizationTabProps = {
    register: UseFormRegister<KaizenDocument>
}

const CategorizationTab = ({ register }: CategorizationTabProps) => {
    const { kaizenStore, categoryStore, secteurStore, projetStore } = useStore();
    const { editDocument } = kaizenStore;

    useEffect(() => {
        secteurStore.loadIdValues();
        categoryStore.loadCategoryValues();
        categoryStore.loadSousCategoryValues();
        projetStore.loadIdValues();
    }, [])


    return (
        <div className="border-b border-gray-900/10 pb-8">

            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                <div className="sm:col-span-2">
                    <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                        Catégorie
                    </label>
                    <div className="mt-2">
                        <select
                            id="country"
                            name="country"
                            autoComplete="country-name"
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            {categoryStore.catetoryValues.map((idValue) => (
                                <option key={idValue.id} selected={idValue.value === editDocument?.categorie.name}>{idValue.value}</option>
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
                            id="country"
                            name="country"
                            autoComplete="country-name"
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            {categoryStore.sousCatetoryValues.map((idValue) => (
                                <option key={idValue.id} selected={idValue.value === editDocument?.sousCategorie.description}>{idValue.value}</option>
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
                            id="country"
                            name="country"
                            autoComplete="country-name"
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
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
                            id="country"
                            name="country"
                            autoComplete="country-name"
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            <option>Mois</option>
                            <option>Semaine</option>
                            <option>Jour</option>
                        </select>
                    </div>
                </div>


                <div className="sm:col-span-1">
                    <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                        Gravité
                    </label>
                    <div className="mt-2">
                        <select
                            id="country"
                            name="country"
                            autoComplete="country-name"
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            <option>Mineur</option>
                            <option>Grave</option>
                            <option>OSHA/QEM</option>
                        </select>
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                        Probabilité
                    </label>
                    <div className="mt-2">
                        <select
                            id="country"
                            name="country"
                            autoComplete="country-name"
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            <option>Peu Probabable</option>
                            <option>Moyen</option>
                            <option>Tres Probable</option>
                        </select>
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                        Objectif
                    </label>
                    <div className="mt-2">
                        <select
                            id="country"
                            name="country"
                            autoComplete="country-name"
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            <option>N'affecte pas la DLP</option>
                            <option>Affecte la DLP</option>
                            <option>Affecte severement la DLP</option>
                        </select>
                    </div>
                </div>

                <div className="sm:col-span-1">
                    <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                        Indice
                    </label>
                    <div className="mt-2">
                        <h2>2</h2>
                    </div>
                </div>

            </div>





        </div>
    )
}

export default observer(CategorizationTab)