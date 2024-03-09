"use client";
import React, { useState } from 'react'
import Paging from '@/components/kaizenjournal/Paging';
import Data from '@/components/kaizenjournal/Data';
import SidePanel from '@/components/kaizenjournal/SidePanel';
import EquipeDropDown from '@/components/kaizenjournal/EquipeDropDown';
import SearchText from '@/components/ui/SearchText';
import { useStore } from '@/infra/stores/Store';
import EditPanel from '@/components/kaizenjournal/EditPanel';


const page = () => {
    const { kaizenStore } = useStore();
    const [open, setOpen] = useState(false)


    const openSidePanel = (panelOpen: boolean) => {
        console.log('openSidePanel' + open)
        if (open) {
            kaizenStore.setEditDocumentId(null);
        }
        setOpen(!open)
    }

    return (
        <>

            <header className="bg-white shadow">
                <div className="max-w-7xl px-2 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Le Journal Kaizen Unique</h1>
                </div>
            </header>
            <main>
                <div className="mt-4 px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-base font-semibold leading-6 text-gray-900">Identification</h1>
                            <p className="mt-2 text-sm text-gray-700">
                                Pour modifier ou annoter un point, faire un CLIQUE DROIT sur la ligne désirée. La modification du fichier Excel n'affecte pas la base de données.
                            </p>

                            <SearchText />


                        </div>
                        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                            {/* <EquipeNewDropDown />
                            <br /> */}
                            <EquipeDropDown />
                            <br />
                            <button
                                onClick={() => openSidePanel(!open)}
                                type="button"
                                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Ajout
                            </button>

                        </div>
                    </div>
                    <div className='px-28 mt-4'>
                        <Paging bottom={false} />
                    </div>
                    <div className="mt-8 flow-root px-12">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <EditPanel />
                                <SidePanel open={open} setOpen={openSidePanel} />
                                <Data />
                            </div>
                        </div>
                    </div>
                    <div className='px-28'>
                        <Paging />
                    </div>
                </div>
            </main>
        </>
    )
}

export default page