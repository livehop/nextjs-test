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
import { UseFormGetValues, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { KaizenDocument, KaizenEditDocument } from '@/infra/models'

type TabProps = {
    register: UseFormRegister<KaizenDocument>;
    getValues: UseFormGetValues<KaizenDocument>;
    watch: UseFormWatch<KaizenDocument>
}

interface ITab {
    name: string;
    current: boolean;

}

const Tabs = ({ register, getValues, watch }: TabProps) => {

    const [tabs, setTabs] = useState<ITab[]>([
        { name: 'Catégorisation', current: true },
        { name: 'Solution', current: false },
        { name: 'Demandes', current: false },
        { name: 'Suivi', current: false },
        { name: 'Télécharger Documents', current: false },
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
                return <CategorizationTab register={register} getValues={getValues} watch={watch} />
            case 'Solution':
                return <SolutionTab register={register} getValues={getValues} />
            case 'Demandes':
                return <DemandesTab />
            case 'Suivi':
                return <SuiviTab register={register} />
            case 'Télécharger Documents':
                return <UploadDocumentsTab />
            case 'Historique':
                return <HistoryTab />
            default:
                return <CategorizationTab register={register} getValues={getValues} watch={watch} />;
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
                    className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
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
                                        ? 'border-blue-500 text-blue-600'
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