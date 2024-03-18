"use client";
import { Fragment, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { observer } from 'mobx-react-lite';
import { useStore } from '@/infra/stores/Store';
import TopForm from './editdocument/TopForm';
import Tabs from './editdocument/Tabs';
import { useForm } from 'react-hook-form';
import { KaizenDocument } from '@/infra/models';

const EditPanel = () => {
    const { kaizenStore } = useStore();
    const { editDocumentId, setEditDocumentId, loadEditDocument } = kaizenStore;


    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<KaizenDocument>();

    useEffect(() => {

        loadEditDocument().then(() => {
        });
        return () => {
            setEditDocumentId(null);
        }
    }, []);


    const handleFormSubmit = (data: any) => {
        console.log(data);
        closePanel();
    }


    const closePanel = () => {
        setEditDocumentId(null);
    }

    const currentDate = new Date().toLocaleDateString();
    return (
        <Transition.Root show={editDocumentId !== null} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closePanel}>
                <div className="fixed inset-0" />

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-4xl">
                                    <form onSubmit={(data) => handleFormSubmit(data)} className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="flex-1">
                                            {/* Header */}
                                            <div className="bg-gray-50 px-4 py-6 sm:px-6">
                                                <div className="flex items-start justify-between space-x-3">
                                                    <div className="space-y-1">
                                                        <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                                                            Modification point kaizen
                                                        </Dialog.Title>
                                                    </div>
                                                    <div className="flex h-7 items-center">
                                                        <button
                                                            type="button"
                                                            className="relative text-gray-400 hover:text-gray-500"
                                                            onClick={() => closePanel()}
                                                        >
                                                            <span className="absolute -inset-2.5" />
                                                            <span className="sr-only">Close panel</span>
                                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Divider container */}
                                            <div className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
                                                {/* Project name */}
                                                <div className='p-6'>
                                                    <TopForm register={register} />
                                                    <Tabs register={register} />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action buttons */}
                                        <div className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
                                            <div className="flex justify-end space-x-3">
                                                <button
                                                    disabled={isSubmitting}
                                                    type="submit"
                                                    className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm 
                                                                        font-semibold text-white shadow-sm hover:bg-indigo-500
                                                                         disabled:bg-gray-500 focus-visible:outline focus-visible:outline-2 
                                                                         focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                >
                                                    Soumettre
                                                </button>
                                                <button
                                                    type="button"
                                                    className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                    onClick={() => closePanel()}
                                                >
                                                    Annuler
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default observer(EditPanel)
