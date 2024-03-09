"use client";
import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
// import {
//     ArrowPathIcon,
//     CheckIcon,
//     CloudArrowUpIcon,
//     Cog6ToothIcon,
//     FingerPrintIcon,
//     LockClosedIcon,
//     ServerIcon,
// } from '@heroicons/react/20/solid'
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import { IoIosJournal } from "react-icons/io";
import { BsJournalCheck } from "react-icons/bs";
import { FaPlaneDeparture } from "react-icons/fa6";
import { TiSpanner } from "react-icons/ti";
import { IoHammer } from "react-icons/io5";
import { MdContactMail } from "react-icons/md";
import Applications from '@/components/home/Applications';
import Header from '@/components/home/Header';

type statusType = {
    [key: string]: string
}

const statuses: statusType = {
    Paid: 'text-green-700 bg-green-50 ring-green-600/20',
    Withdraw: 'text-gray-600 bg-gray-50 ring-gray-500/10',
    Overdue: 'text-red-700 bg-red-50 ring-red-600/10',
}

type ApplicationType = {
    id: number,
    name: string,
    imageIcon: any,
    lastModified: {
        date: string,
        dateTime: string
    }
}

const ICON_SIZE = 24;

const clients: ApplicationType[] = [
    {
        id: 1,
        name: 'Kaizen Journal',
        imageIcon: <IoIosJournal size={ICON_SIZE} color='orangered' />,
        lastModified: { date: 'Jan 26, 2024', dateTime: '2024-01-26' },
    },
    {
        id: 2,
        name: 'Application 2',
        imageIcon: <BsJournalCheck size={ICON_SIZE} color='green' />,
        lastModified: { date: 'Dec 22, 2023', dateTime: '2023-01-22' },
    },
    {
        id: 3,
        name: 'Application 3',
        imageIcon: <FaPlaneDeparture size={ICON_SIZE} color='indigo' />,
        lastModified: { date: 'June 23, 2023', dateTime: '2023-01-23' },
    },
    {
        id: 4,
        name: 'Application 4',
        imageIcon: <TiSpanner size={ICON_SIZE} color='blue' />,
        lastModified: { date: 'Mar 23, 2023', dateTime: '2023-01-23' },
    },

    {
        id: 5,
        name: 'Application 5',
        imageIcon: <MdContactMail size={ICON_SIZE} color='red' />,
        lastModified: { date: 'May 23, 2023', dateTime: '2023-01-23' },
    },
    {
        id: 6,
        name: 'Application 6',
        imageIcon: <IoHammer size={ICON_SIZE} color='grey' />,
        lastModified: { date: 'July 23, 2023', dateTime: '2023-01-23' },
    }
]




function classNames(...classes: any | string) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <div className="bg-white">
            {/* Header */}
            <Header />
            <main>
                <div className="relative isolate overflow-hidden bg-gray-900 pb-16 pt-14 sm:pb-20">
                </div>
                <div className="p-20">
                    <Applications />
                </div>


            </main >

        </div >
    )
}
