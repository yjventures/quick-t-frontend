import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import "./settings.css";
import logo from "../../assets/images/logo.png";

import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import PersonalInfo from '../PersonalInfo/PersonalInfo'
import { LogOut } from "lucide-react";


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Settings(props) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false)
  // const navigation = [
  //   { name: 'Dashboard', href: '/personalInfo', icon: HomeIcon, current: true },
  //   { name: 'Transaction History', href: '/transactionHistory', icon: ChartPieIcon, current: false },
  //   { name: 'Update Information', href: '/editPersonalInfo', icon: DocumentDuplicateIcon, current: false },
  // ]

  const teams = [
    { id: 1, name: 'Live chat', href: '#', initial: 'L', current: false },
    // { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
    // { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
  ]
  const [navigation, setNavigation] = useState([
    { name: 'Dashboard', href: '/personalInfo', icon: HomeIcon, current: true },
    { name: 'Transaction History', href: '/transactionHistory', icon: ChartPieIcon, current: false },
    { name: 'Update Information', href: '/editPersonalInfo', icon: DocumentDuplicateIcon, current: false },
  ])

  const location = useLocation();

  // console.log(location.pathname);
  useEffect(() => {
    if (location.pathname === '/personalInfo') {
      setNavigation([
        { name: 'Dashboard', href: '/personalInfo', icon: HomeIcon, current: true },
        { name: 'Transaction History', href: '/transactionHistory', icon: ChartPieIcon, current: false },
        // { name: 'Update Information', href: '/editPersonalInfo', icon: DocumentDuplicateIcon, current: false },
      ]);
    } else if (location.pathname === '/transactionHistory') {
      setNavigation([
        { name: 'Dashboard', href: '/personalInfo', icon: HomeIcon, current: false },
        { name: 'Transaction History', href: '/transactionHistory', icon: ChartPieIcon, current: true },
        // { name: 'Update Information', href: '/editPersonalInfo', icon: DocumentDuplicateIcon, current: false },
      ]);
    } else if (location.pathname === '/editPersonalInfo') {
      setNavigation([
        { name: 'Dashboard', href: '/personalInfo', icon: HomeIcon, current: false },
        { name: 'Transaction History', href: '/transactionHistory', icon: ChartPieIcon, current: false },
        // { name: 'Update Information', href: '/editPersonalInfo', icon: DocumentDuplicateIcon, current: true },
      ]);
    }
  }, [location.pathname]);

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
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
                      <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src={logo}
                        alt="Your Company"
                      />
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
                                      ? 'bg-gray-50 text-indigo-600'
                                      : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                      'h-6 w-6 shrink-0'
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li>
                          <div className="text-xs font-semibold leading-6 text-gray-400">More options</div>
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {teams.map((team) => (
                              <li key={team.name}>
                                <a
                                  href={team.href}
                                  className={classNames(
                                    team.current
                                      ? 'bg-gray-50 text-indigo-600'
                                      : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                >
                                  <span
                                    className={classNames(
                                      team.current
                                        ? 'text-indigo-600 border-indigo-600'
                                        : 'text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600',
                                      'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'
                                    )}
                                  >
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
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
            <NavLink to={'/'} className="flex h-16 shrink-0 items-center">
              <img
                className="h-24 w-28 object-cover"
                src={logo}
                alt="Company logo"
              />
            </NavLink>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <NavLink
                          to={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-gray-50 text-indigo-600'
                              : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                              'h-6 w-6 shrink-0'
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <div className="text-xs font-semibold leading-6 text-gray-400">More options</div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {teams.map((team) => (
                      <li key={team.name}>
                        <NavLink
                          to={team.href}
                          className={classNames(
                            team.current
                              ? 'bg-gray-50 text-indigo-600'
                              : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                          <span
                            className={classNames(
                              team.current
                                ? 'text-indigo-600 border-indigo-600'
                                : 'text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600',
                              'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'
                            )}
                          >
                            {team.initial}
                          </span>
                          <span className="truncate">{team.name}</span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="-mx-6 mt-auto">
                  <div
                    onClick={() => {
                      localStorage.clear();
                      navigate('/login');
                    }}
                    className="flex items-center gap-x-4 cursor-pointer px-6 py-3 text-sm font-semibold leading-6 text-gray-900 bg-gray-50"
                  >
                    <p className="rounded-full border-2 p-2 border-slate-200">
                      <LogOut className="w-4 h-4 " />
                    </p>

                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">{
                      localStorage.getItem('first_name') ? localStorage.getItem('first_name') + " " + localStorage.getItem('last_name') : "No Name"
                    }
                    </span>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">Dashboard</div>
          <NavLink to={'/'} className="flex h-16 shrink-0 items-center">
            <img
              className="h-24 w-28 object-cover"
              src={logo}
              alt="Company logo"
            />
          </NavLink>
        </div>

        <main className="lg:pl-72">
          {props.children}
        </main>
      </div>
    </>
  )
}
