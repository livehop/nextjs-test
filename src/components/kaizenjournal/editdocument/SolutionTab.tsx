import { KaizenDocument } from '@/infra/models';
import { useStore } from '@/infra/stores/Store';
import React from 'react'
import { UseFormRegister } from 'react-hook-form';

type SolutionTabProps = {
    register: UseFormRegister<KaizenDocument>
}

const SolutionTab = ({ register }: SolutionTabProps) => {
    const { kaizenStore } = useStore();
    const { editDocument, editDocumentId, loadEditDocument } = kaizenStore;

    return (
        <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                    <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                        Solution
                    </label>
                    <div className="mt-2">
                        <textarea
                            id="about"
                            name="about"
                            rows={3}
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            defaultValue={editDocument?.solution}
                        />
                    </div>
                </div>
                <div className="sm:col-span-1">
                    <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                        Gain
                    </label>
                    <div className="mt-2">
                        <select
                            id="country"
                            name="country"
                            autoComplete="country-name"
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            <option>$1 K</option>
                            <option>$10 K</option>
                            <option>$100 K</option>
                            <option>$1 M</option>
                        </select>
                    </div>
                </div>


                <div className="sm:col-span-1">
                    <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                        Coût
                    </label>
                    <div className="mt-2">
                        <select
                            id="country"
                            name="country"
                            autoComplete="country-name"
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            <option>$1 K</option>
                            <option>$10 K</option>
                            <option>$100 K</option>
                        </select>
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                        Effort
                    </label>
                    <div className="mt-2">
                        <select
                            id="country"
                            name="country"
                            autoComplete="country-name"
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            <option>Moins de 10 h</option>
                            <option>Moins de 100 h</option>
                            <option>Plus de 100 h</option>
                        </select>
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                        Risque
                    </label>
                    <div className="mt-2">
                        <select
                            id="country"
                            name="country"
                            autoComplete="country-name"
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            <option>Faible</option>
                            <option>Moyen</option>
                            <option>Grand</option>
                        </select>
                    </div>
                </div>

                <div className="sm:col-span-1">
                    <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                        Cote
                    </label>
                    <div className="mt-2">
                        <h2>14</h2>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SolutionTab