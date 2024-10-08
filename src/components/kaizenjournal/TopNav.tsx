"use client";
import { classNames } from "@/infra/utils/classNames";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/16/solid";
import React, { Fragment, useState } from "react";
import { FaUser } from "react-icons/fa";
import { User } from "next-auth";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useStore } from "@/infra/stores/Store";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";

const ICON_SIZE = 20;

type UserType = {
  name: string;
  email: string;
  imageIcon: any;
};

type NavigationType = {
  name: string;
  href: string;
  current: boolean;
};

// const user: UserType = {
//   name: "Sylvain Castonguay",
//   email: "Sylvain.Castonguay@ge.com",
//   imageIcon: <FaUser size={ICON_SIZE} color="white" />,
// };
const initNavigation: NavigationType[] = [
  { name: "Kaizen Dashboard", href: "/kaizenjournal", current: false },
  { name: "Administration", href: "/administration", current: false },
  // { name: "Employee Search", href: "/employeesearch", current: false },
];
const userNavigation = [
  { name: "Mon Profil", href: "#" },
  { name: "Paramètres", href: "#" },
  { name: "Se déconnecter", href: "#" },
];

type TopNavProps = {
  user: Partial<User> | null;
};

const TopNav = ({ user }: TopNavProps) => {
  const { userStore } = useStore();
  const { isAdministrator, setRole } = userStore;
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [navigation, setNavigation] =
    useState<NavigationType[]>(initNavigation);

  const handleNavigation = (mypath: string) => {
    router.push(mypath);
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link href="/kaizenjournal">
                    <img className="h-8 w-auto" src="/logo.svg" alt="" />
                  </Link>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <a
                      href={"#"}
                      onClick={() => handleNavigation("/kaizenjournal")}
                      className={classNames(
                        " text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                    >
                      Kaizen Dashboard
                    </a>

                    {isAdministrator && (
                      <a
                        href={"#"}
                        onClick={() => handleNavigation("/administration")}
                        className={classNames(
                          " text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                      >
                        Administration
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <FaUser size={ICON_SIZE} color="white" />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item key={"Mon Profil"}>
                          {({ active }) => (
                            <a
                              href={"/setupaccess"}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              {user ? <>{user?.name}</> : <>Mon Profil</>}
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item key={"Paramètres"}>
                          {({ active }) => (
                            <a
                              href={"/session"}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Paramètres
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item key={"Se déconnecter"}>
                          {({ active }) => (
                            <Link
                              href={"#"}
                              onClick={() => {
                                setRole(null);
                                signOut({ callbackUrl: "/kaizenjournal" });
                              }}
                              className={"px-4 py-1 text-sm text-gray-800"}
                            >
                              Se déconnecter
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              <Disclosure.Button
                onClick={() => {
                  setNavigation([...navigation]);
                }}
                as="a"
                href={"/kaizenjournal"}
                className={classNames(
                  "bg-gray-900 text-white",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
              >
                Kaizen Dashboard
              </Disclosure.Button>
              {isAdministrator && (
                <Disclosure.Button
                  onClick={() => {
                    setNavigation([...navigation]);
                  }}
                  as="a"
                  href={"/administration"}
                  className={classNames(
                    "bg-gray-900 text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                >
                  Administration
                </Disclosure.Button>
              )}
            </div>
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  {" "}
                  <FaUser size={ICON_SIZE} color="white" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">
                    user.name
                  </div>
                  <div className="text-sm font-medium leading-none text-gray-400">
                    user.email
                  </div>
                </div>
                <button
                  type="button"
                  className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 space-y-1 px-2">
                {userNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default observer(TopNav);
