"use client";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { IoIosJournal } from "react-icons/io";
import { BsJournalCheck } from "react-icons/bs";
import { FaPlaneDeparture } from "react-icons/fa6";
import { TiSpanner } from "react-icons/ti";
import { IoHammer } from "react-icons/io5";
import { MdContactMail } from "react-icons/md";
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'


function classNames(...classes: any | string) {
    return classes.filter(Boolean).join(' ')
}


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



const Applications = () => {
    return (

        <div className="relative isolate mt-32 bg-white px-6 sm:mt-56 lg:px-8">
            <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
                {clients.map((client) => (
                    <li key={client.id} className="overflow-hidden rounded-xl border border-gray-200">

                        <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                            {client.imageIcon}

                            <div className="text-lg font-medium leading-6 text-gray-900">{client.name}</div>
                            <Menu as="div" className="relative ml-auto">
                                <Menu.Button className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">Open options</span>
                                    <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
                                </Menu.Button>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(
                                                        active ? 'bg-gray-50' : '',
                                                        'block px-3 py-1 text-sm leading-6 text-gray-900'
                                                    )}
                                                >
                                                    View<span className="sr-only">, {client!.name}</span>
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(
                                                        active ? 'bg-gray-50' : '',
                                                        'block px-3 py-1 text-sm leading-6 text-gray-900'
                                                    )}
                                                >
                                                    Remove<span className="sr-only">, {client.name}</span>
                                                </a>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                        <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                            <div className="flex justify-between gap-x-4 py-3">
                                <dt className="text-gray-500">Last Modified</dt>
                                <dd className="text-gray-700">
                                    <time dateTime={client.lastModified.dateTime}>{client.lastModified.date}</time>
                                </dd>
                            </div>

                        </dl>

                    </li>
                ))}
            </ul>

        </div>
    )
}

export default Applications