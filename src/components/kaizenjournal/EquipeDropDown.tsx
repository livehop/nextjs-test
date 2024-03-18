"use client";
import { useStore } from '@/infra/stores/Store';
import { classNames } from '@/infra/utils/classNames';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/16/solid';
import { observer } from 'mobx-react-lite';
import React, { Fragment, useEffect } from 'react'

const EquipeDropDown = () => {
    const { kaizenStore } = useStore();
    const { equipes, loadEquipes, loading, activeEquipe, setActiveEquipeWithNumber } = kaizenStore;

    useEffect(() => {
        loadEquipes();
    }, []);


    /*if (loading || activeEquipe === null) return <div>Loading...</div>*/

    return (
        <Listbox value={activeEquipe} onChange={(value) => { console.log("on change gets called " + value); setActiveEquipeWithNumber(value) }}>
            {({ open }) => (
                <div className='flex gap-2 my-2 items-center'>
                    <Listbox.Label className="block text-lg font-medium leading-6 text-gray-900">Equipe : </Listbox.Label>

                    <div className="relative">
                        <div className="inline-flex divide-x divide-lime-700 rounded-md shadow-sm">
                            <div className="inline-flex items-center gap-x-1.5 rounded-l-md bg-lime-600 px-3 py-2 text-white shadow-sm">
                                <CheckIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                                <p className="text-sm font-semibold">{activeEquipe?.nomEquipe}</p>
                            </div>
                            <Listbox.Button className="inline-flex items-center rounded-l-none rounded-r-md bg-lime-600 p-2 hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-600 focus:ring-offset-2 focus:ring-offset-gray-50">
                                <span className="sr-only">Change published status</span>
                                <ChevronDownIcon className="h-5 w-5 text-white" aria-hidden="true" />
                            </Listbox.Button>
                        </div>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute right-0 z-10 mt-2 w-72 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {equipes.map((option, index) => (
                                    <Listbox.Option
                                        key={index}
                                        className={({ active }) =>
                                            classNames(
                                                active ? 'bg-lime-600 text-white' : 'text-gray-900',
                                                'cursor-default select-none p-4 text-sm'
                                            )
                                        }
                                        value={option.numeroEquipe}
                                    >
                                        {({ selected, active }) => (
                                            <div className="flex flex-col">
                                                <div className="flex justify-between">
                                                    <p className={selected ? 'font-semibold' : 'font-normal'}>{option.numeroEquipe}</p>
                                                    {selected ? (
                                                        <span className={active ? 'text-white' : 'text-lime-600'}>
                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    ) : null}
                                                </div>
                                                <p className={classNames(active ? 'text-lime-200' : 'text-gray-500', 'mt-2')}>
                                                    {option.nomEquipe}-{option.typeEquipe}
                                                </p>
                                            </div>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </div>
            )}
        </Listbox>
    )
}

export default observer(EquipeDropDown)
