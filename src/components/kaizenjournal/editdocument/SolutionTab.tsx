import { KaizenDocument, KaizenEditDocument } from '@/infra/models';
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
        <div>
            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                    <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                        Solution
                    </label>
                    <div className="mt-2">
                        <textarea
                            {...register('solution')}
                            rows={3}
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
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
                            {...register('solGain')}
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            <option value={"0"} selected={editDocument?.solGain.toString() === "0"}>$1 K</option>
                            <option value={"1"} selected={editDocument?.solGain.toString() === "1"}>$10 K</option>
                            <option value={"2"} selected={editDocument?.solGain.toString() === "2"}>$100 K</option>
                            <option value={"2"} selected={editDocument?.solGain.toString() === "3"}>$1 M</option>
                        </select>
                    </div>
                </div>


                <div className="sm:col-span-1">
                    <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                        Coût
                    </label>
                    <div className="mt-2">
                        <select
                            {...register('solCout')}
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            <option value={"0"} selected={editDocument?.solCout.toString() === "0"}>$1 K</option>
                            <option value={"1"} selected={editDocument?.solCout.toString() === "1"}>$10 K</option>
                            <option value={"2"} selected={editDocument?.solCout.toString() === "2"}>$100 K</option>
                        </select>
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                        Effort
                    </label>
                    <div className="mt-2">
                        <select
                            {...register('solEff')}
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            <option value={"0"} selected={editDocument?.solEff.toString() === "0"}>Moins de 10 h</option>
                            <option value={"1"} selected={editDocument?.solEff.toString() === "1"}>Moins de 100 h</option>
                            <option value={"2"} selected={editDocument?.solEff.toString() === "2"}>Plus de 100 h</option>
                        </select>
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                        Risque
                    </label>
                    <div className="mt-2">
                        <select
                            {...register('solRisq')}
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            <option value={"0"} selected={editDocument?.solRisq.toString() === "0"}>Faible</option>
                            <option value={"1"} selected={editDocument?.solRisq.toString() === "0"}>Moyen</option>
                            <option value={"2"} selected={editDocument?.solRisq.toString() === "0"}>Grand</option>
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

        </div >
    )
}

export default SolutionTab