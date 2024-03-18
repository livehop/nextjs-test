"use client";
import React, { useState } from 'react'
import Paging from '@/components/kaizenjournal/Paging';
import Data from '@/components/kaizenjournal/Data';
import SidePanel from '@/components/kaizenjournal/SidePanel';
import EquipeDropDown from '@/components/kaizenjournal/EquipeDropDown';
import { useStore } from '@/infra/stores/Store';
import EditPanel from '@/components/kaizenjournal/EditPanel';
import Toolbar from '@/components/kaizenjournal/table-ui/toolbar';
import DataSticky from '@/components/kaizenjournal/DataSticky';


const page = () => {
    const { kaizenStore } = useStore();
    const [open, setOpen] = useState(false)

    const openSidePanel = () => {
        console.log('openSidePanel' + open)
        if (open) {
            kaizenStore.setEditDocumentId(null);
        }
        setOpen(!open)
    }

    return (
        <>

            <header className="bg-white shadow flex justify-between">
                <div className="max-w-7xl px-2 py-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Le Journal Kaizen Unique</h1>
                </div>
                {/* <div className='mr-6'>
                    <EquipeDropDown />
                </div> */}

            </header>
            <main>
                <div className="mt-4 px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            {/* <div className='flex justify-between items-center border-b-2 border-grey-500'>
                                <h1 className="text-base font-semibold leading-6 text-gray-900">Identification</h1>
                                <p className="mt-2 text-sm text-gray-700">
                                    Pour modifier ou annoter un point, faire un CLIQUE DROIT sur la ligne désirée. La modification du fichier Excel n'affecte pas la base de données.
                                </p>
                            </div> */}
                            <Toolbar openSidePanel={openSidePanel} />
                        </div>
                        {/* <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                            <button
                                onClick={() => openSidePanel()}
                                type="button"
                                className="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                                Ajout
                            </button>

                        </div> */}
                    </div>
                    {/* <div className='my-4 '>
                        <Paging bottom={false} />
                    </div> */}
                    <DataSticky />
                    {/* <Data /> */}
                    <div className="mt-8 flow-root px-12">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <EditPanel />
                            <SidePanel open={open} setOpen={openSidePanel} />
                        </div>
                    </div>
                    <div className='px-28'>
                        <Paging />
                        <br />
                        <br />

                    </div>
                </div>
            </main>
        </>
    )
}

export default page