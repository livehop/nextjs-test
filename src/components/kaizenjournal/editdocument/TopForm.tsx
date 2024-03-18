"use client";
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useStore } from '@/infra/stores/Store';
import FocalPointCombo from '@/components/uicomponents/FocalPointCombo';
import { UseFormRegister } from 'react-hook-form';
import { KaizenDocument } from '@/infra/models';


type TopFormProps = {
    register: UseFormRegister<KaizenDocument>
}


const TopForm = ({ register }: TopFormProps) => {
    const { kaizenStore, equipeStore, secteurStore, employeeStore } = useStore();

    const { editDocument, editDocumentId, loadEditDocument } = kaizenStore;

    useEffect(() => {
        loadEditDocument();
        employeeStore.loadIdValues();
        equipeStore.loadIdValues();
        secteurStore.loadIdValues();
    }, [editDocumentId]);


    return (
        <form>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-2">

                    <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">


                        <div className="sm:col-span-2 sm:col-start-1">
                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                ID
                            </label>
                            <div className="mt-2">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">{editDocumentId}</h2>
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                Inscrit par
                            </label>
                            <div className="mt-2">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">{editDocument?.inscritPar}</h2>
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                Inscrit le
                            </label>
                            <div className="mt-2">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">{editDocument?.inscritDate.split('T')[0]}</h2>
                            </div>
                        </div>


                        <div className="sm:col-span-2">
                            <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                Équipe
                            </label>
                            <div className="mt-2">
                                <select
                                    {...register("equipe")}
                                    id="country"
                                    name="country"
                                    autoComplete="country-name"
                                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                    {equipeStore.idValues.map((idValue) => (
                                        <option key={idValue.id} selected={idValue.value === editDocument?.equipe.nomEquipe}>{idValue.value}</option>
                                    ))}
                                </select>
                            </div>
                        </div>


                        <div className="sm:col-span-2">
                            <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                Secteur
                            </label>
                            <div className="mt-2">
                                <select
                                    id="country"
                                    name="country"
                                    autoComplete="country-name"
                                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                    {secteurStore.idValues.map((idValue) => (
                                        <option key={idValue.id} selected={idValue.value === editDocument?.secteur.name}>{idValue.value}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <FocalPointCombo />

                            {/* <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                Point Focal
                            </label>
                            <div className="mt-2">
                                <select
                                    id="country"
                                    name="country"
                                    autoComplete="country-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                    <option>{editDocument?.focalContactName}</option>
                                    <option>Canada</option>
                                    <option>Mexico</option>
                                </select>
                            </div> */}
                        </div>


                        <div className="col-span-full">
                            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                Problème identifié
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="about"
                                    name="about"
                                    rows={3}
                                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                    defaultValue={editDocument?.problematique}
                                />
                            </div>

                        </div>

                    </div>
                </div>

            </div>

        </form>
    )
}

export default observer(TopForm)