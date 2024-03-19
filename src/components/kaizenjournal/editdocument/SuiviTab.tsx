import { Calendar } from '@/components/ui/calendar';
import { KaizenDocument } from '@/infra/models';
import { useStore } from '@/infra/stores/Store';
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { UseFormRegister } from 'react-hook-form';

type SuiviTabTabProps = {
    register: UseFormRegister<KaizenDocument>
}
const SuiviTab = ({ register }: SuiviTabTabProps) => {
    const { kaizenStore } = useStore();
    const { addNote } = kaizenStore;
    const [note, setNote] = useState('')
    const [date, setDate] = useState<Date | undefined>(new Date())


    const saveNote = () => {
        addNote(note);
        setNote('');
    }

    return (
        <div className="pb-2">
            <div className="flex mb-2">
                <div className="w-1/2 h-24 p-4">
                    <div className='space-y-4'>
                        <div className="sm:col-span-2">
                            <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                État
                            </label>
                            <div className="mt-2">
                                <select
                                    id="country"
                                    name="country"
                                    autoComplete="country-name"
                                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                    <option>Maintainance</option>
                                    <option>Outillage</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                Notes / Commentaires
                            </label>
                            <div className="mt-1">
                                <textarea
                                    onChange={(e) => setNote(e.target.value)}
                                    id="about"
                                    name="about"
                                    rows={3}
                                    className="pl-2  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                    defaultValue={note}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2 my-2">
                            <button
                                onClick={saveNote}
                                type="button"
                                className="inline-flex justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                                Enregistrer Note
                            </button>
                        </div>

                    </div>
                </div>
                <div className="w-1/2 h-32 p-4">
                    <div className='space-y-4'>
                        <div className="mt-2 flex align-middle justify-around">
                            <div>
                                <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                    Début
                                </label>
                                <div className="mt-2 text-sm text-gray-600">
                                    <h2>{new Date().toISOString().split('T')[0]}</h2>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                    Date Procahain Suivi
                                </label>
                                <div className="mt-2">
                                    <input
                                        type='date'
                                        {...register("suiviDate")}
                                        className="p-2 block w-xs rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 flex align-middle justify-around">
                            <div>
                                <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                    Date de fin planifiee
                                </label>
                                <div className="mt-2">
                                    <input
                                        type='date'
                                        {...register("finPlaniFieDate")}
                                        className="p-2 block w-xs rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    />
                                </div>     </div>
                            <div>
                                <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                    Date Complétée
                                </label>
                                <div className="mt-2">
                                    <input
                                        type='date'
                                        {...register("completeDate")}
                                        className="p-2 block w-xs rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default observer(SuiviTab)