"use client";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { classNames } from "@/infra/utils/classNames";

const navigation = [
  { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
  { name: "Team", href: "#", icon: UsersIcon, current: false },
  { name: "Projects", href: "#", icon: FolderIcon, current: false },
  { name: "Calendar", href: "#", icon: CalendarIcon, current: false },
  { name: "Documents", href: "#", icon: DocumentDuplicateIcon, current: false },
  { name: "Reports", href: "#", icon: ChartPieIcon, current: false },
];
const teams = [
  { id: 1, name: "Heroicons", href: "#", initial: "H", current: false },
  { id: 2, name: "Tailwind Labs", href: "#", initial: "T", current: false },
  { id: 3, name: "Workcation", href: "#", initial: "W", current: false },
];

export default function Example() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
                    <div className="flex h-16 shrink-0 items-center">
                      <img className="h-8 w-auto" src="/logo.svg" alt="" />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? "bg-gray-800 text-white"
                                      : "text-gray-400 hover:text-white hover:bg-gray-800",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-2 font-semibold"
                                  )}
                                >
                                  <item.icon
                                    className="h-6 w-6 shrink-0"
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li>
                          <div className="text-xs font-semibold leading-2 text-gray-400">
                            Your teams
                          </div>
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {teams.map((team) => (
                              <li key={team.name}>
                                <a
                                  href={team.href}
                                  className={classNames(
                                    team.current
                                      ? "bg-gray-800 text-white"
                                      : "text-gray-400 hover:text-white hover:bg-gray-800",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-2 font-semibold"
                                  )}
                                >
                                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                    {team.initial}
                                  </span>
                                  <span className="truncate">{team.name}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
            <div className="flex h-16 shrink-0 items-center">
              <img className="h-8 w-auto" src="/logo.svg" alt="GE Aerospace" />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-800 text-white"
                              : "text-gray-400 hover:text-white hover:bg-gray-800",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-2 font-semibold"
                          )}
                        >
                          <item.icon
                            className="h-6 w-6 shrink-0"
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <div className="text-xs font-semibold leading-2 text-gray-400">
                    Your teams
                  </div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {teams.map((team) => (
                      <li key={team.name}>
                        <a
                          href={team.href}
                          className={classNames(
                            team.current
                              ? "bg-gray-800 text-white"
                              : "text-gray-400 hover:text-white hover:bg-gray-800",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-2 font-semibold"
                          )}
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                            {team.initial}
                          </span>
                          <span className="truncate">{team.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="-mx-6 mt-auto">
                  <a
                    href="#"
                    className="bg-gray-800 text-white group flex gap-x-3 rounded-md p-2 text-sm leading-2 font-semibold"
                  >
                    <Cog6ToothIcon
                      className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-blue-600"
                      aria-hidden="true"
                    />
                    Settings
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-2 text-white">
            Dashboard
          </div>
          <a href="#">
            <span className="sr-only">Your profile</span>
            <svg
              className="h-8 w-8 rounded-full bg-gray-800"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </a>
        </div>

        <main className="py-0 lg:pl-72">
          <div>
            <div className="min-h-screen bg-gray-900 p-4">
              <header className="flex justify-between items-center py-4">
                <div className="flex items-center space-x-4">
                  <img src="/logo.svg" alt="Logo" className="h-10" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="border rounded-full py-2 px-4"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <span>Jordan Gauthier</span>
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    A
                  </div>
                </div>
              </header>
              <main className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <section className="col-span-1 md:col-span-3">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-bold mb-4">
                      Identity Providers
                    </h2>
                    <div className="flex space-x-4">
                      <button className="bg-green-200 py-2 px-4 rounded-full">
                        Ping ID
                      </button>
                      <button className="bg-green-200 py-2 px-4 rounded-full">
                        Keycloak
                      </button>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow mt-4">
                    <h2 className="text-xl font-bold mb-4">Recently Used</h2>
                    <div className="flex space-x-4">
                      <div className="bg-gray-200 py-2 px-4 rounded-full">
                        App 1
                      </div>
                      <div className="bg-gray-200 py-2 px-4 rounded-full">
                        App 2
                      </div>
                      <div className="bg-gray-200 py-2 px-4 rounded-full">
                        App 3
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow mt-4">
                    <h2 className="text-xl font-bold mb-4">Applications</h2>
                    <div className="flex space-x-4 mb-4">
                      <button className="py-2 px-4 rounded-full bg-gray-300">
                        All
                      </button>
                      <button className="py-2 px-4 rounded-full bg-gray-300">
                        Connected
                      </button>
                      <button className="py-2 px-4 rounded-full bg-gray-300">
                        Favorites
                      </button>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">
                        Connected Applications
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-100 p-4 rounded-lg shadow">
                          <h4 className="font-bold">App 1</h4>
                          <p>Lorem ipsum dolor sit amet.</p>
                          <div className="flex space-x-2 mt-2">
                            <button className="bg-blue-500 text-white py-1 px-2 rounded">
                              Launch
                            </button>
                            <button className="bg-gray-500 text-white py-1 px-2 rounded">
                              Notification
                            </button>
                            <button className="bg-gray-500 text-white py-1 px-2 rounded">
                              Expand
                            </button>
                            <button className="bg-red-500 text-white py-1 px-2 rounded">
                              Disconnect
                            </button>
                          </div>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg shadow">
                          <h4 className="font-bold">App 2</h4>
                          <p>Lorem ipsum dolor sit amet.</p>
                          <div className="flex space-x-2 mt-2">
                            <button className="bg-blue-500 text-white py-1 px-2 rounded">
                              Launch
                            </button>
                            <button className="bg-gray-500 text-white py-1 px-2 rounded">
                              Notification
                            </button>
                            <button className="bg-gray-500 text-white py-1 px-2 rounded">
                              Expand
                            </button>
                            <button className="bg-red-500 text-white py-1 px-2 rounded">
                              Disconnect
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg font-bold mb-2">
                        Not Connected Applications
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-100 p-4 rounded-lg shadow">
                          <h4 className="font-bold">App 4</h4>
                          <p>Lorem ipsum dolor sit amet.</p>
                          <div className="flex space-x-2 mt-2">
                            <button className="bg-green-500 text-white py-1 px-2 rounded">
                              Connect
                            </button>
                            <button className="bg-blue-500 text-white py-1 px-2 rounded">
                              Launch
                            </button>
                          </div>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg shadow">
                          <h4 className="font-bold">App 5</h4>
                          <p>Lorem ipsum dolor sit amet.</p>
                          <div className="flex space-x-2 mt-2">
                            <button className="bg-green-500 text-white py-1 px-2 rounded">
                              Connect
                            </button>
                            <button className="bg-blue-500 text-white py-1 px-2 rounded">
                              Launch
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <aside className="col-span-1">
                  <div className="bg-white p-4 rounded-lg shadow mb-4">
                    <h2 className="text-xl font-bold mb-4">Feed</h2>
                    <div className="space-y-2">
                      <div className="bg-gray-200 p-2 rounded-lg">
                        App 1: Notification content
                      </div>
                      <div className="bg-gray-200 p-2 rounded-lg">
                        App 2: Notification content
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-bold mb-4">Tickets</h2>
                    <div className="space-y-2">
                      <div className="bg-gray-200 p-2 rounded-lg">
                        <h4 className="font-bold">Ticket #1</h4>
                        <p>Status: Closed</p>
                      </div>
                      <div className="bg-gray-200 p-2 rounded-lg">
                        <h4 className="font-bold">Ticket #2</h4>
                        <p>Status: Waiting for an answer</p>
                      </div>
                    </div>
                  </div>
                </aside>
              </main>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
