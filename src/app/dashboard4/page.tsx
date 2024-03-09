"use client";
import { BellIcon } from '@heroicons/react/24/outline'

export default function Example() {
    return (
        <div className="flex min-h-full flex-col">
            <header className="shrink-0 border-b border-gray-200 bg-white">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <img
                        className="h-10 w-auto bg-blue-500 rounded-md p-1.5"
                        src="/logo.svg"
                        alt="GE Aerospace"
                    />
                    <div className="flex items-center gap-x-8">
                        <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-300">
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your profile</span>
                            <svg
                                className="h-8 w-8 rounded-full bg-gray-800"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>

                        </a>
                    </div>
                </div>
            </header>

            <div className="mx-auto flex w-full max-w-7xl items-start gap-x-8 px-4 py-10 sm:px-6 lg:px-8">
                <aside className="sticky top-8 hidden w-44 shrink-0 lg:block">{/* Left column area */}</aside>

                <main className="flex-1">{/* Main area */}</main>

                <aside className="sticky top-8 hidden w-96 shrink-0 xl:block">{/* Right column area */}</aside>
            </div>
        </div>
    )
}