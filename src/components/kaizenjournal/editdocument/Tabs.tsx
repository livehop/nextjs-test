"use client"
import { classNames } from '@/infra/utils/classNames'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import React, { useState } from 'react'
import CategorizationTab from './CategorizationTab'
import SolutionTab from './SolutionTab'
import DemandesTab from './DemandesTab'
import SuiviTab from './SuiviTab'
import UploadDocumentsTab from './UploadDocumentsTab'
import HistoryTab from './HistoryTab'


interface ITab {
    name: string;
    current: boolean;

}

// const tabs: ITab[] = [
//     { name: 'Categorisation', current: true },
//     { name: 'Solution', current: false },
//     { name: 'Demandes', current: false },
//     { name: 'Suivi', current: false },
//     { name: 'Télécharger des documents', current: false },
//     { name: 'Historique', current: false },
// ]

const Tabs = () => {

    const [tabs, setTabs] = useState<ITab[]>([
        { name: 'Categorisation', current: true },
        { name: 'Solution', current: false },
        { name: 'Demandes', current: false },
        { name: 'Suivi', current: false },
        { name: 'Télécharger des documents', current: false },
        { name: 'Historique', current: false },
    ])

    const changeTab = (tab: ITab) => {
        tab.current = true;

        setTabs(tabs.map((t) => {
            if (t.name !== tab.name) {
                t.current = false;
            }
            return t;
        }))
    }

    const getCurrentTab = () => {
        const currentTab = tabs.find(tab => tab.current);
        if (currentTab) return currentTab;
        tabs[0].current = true;
        return tabs[0];
    }

    const getTabContentForTab = () => {
        const currentTab = getCurrentTab();
        switch (currentTab.name) {
            case 'Categorisation':
                return <CategorizationTab />
            case 'Solution':
                return <SolutionTab />
            case 'Demandes':
                return <DemandesTab />
            case 'Suivi':
                return <SuiviTab />
            case 'Télécharger des documents':
                return <UploadDocumentsTab />
            case 'Historique':
                return <HistoryTab />
            default:
                return <CategorizationTab />;
        }

    }


    return (
        <div>
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Select a tab
                </label>
                {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                <select
                    id="tabs"
                    name="tabs"
                    className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                    {tabs.map((tab) => (
                        <option key={tab.name}
                            selected={tab.current}
                        >{tab.name}</option>
                    ))}
                </select>
            </div>
            <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <Link href={'#'}
                                key={tab.name}
                                onClick={(e) => { changeTab(tab) }}
                                className={classNames(
                                    tab.current
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                    'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
                                )}
                                aria-current={tab.current ? 'page' : undefined}
                            >
                                {tab.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
            <div>
                {getTabContentForTab()}
            </div>
        </div >
    )
}

export default observer(Tabs)