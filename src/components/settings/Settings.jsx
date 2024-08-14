// import React, { Fragment, useEffect, useRef, useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import "./settings.css";
// import logo from "../../assets/images/logo.png";
// const Settings = (props) => {
//   let contentRef,
//     sideNavRef = useRef();
//   const [activeSection, setActiveSection] = useState("");

//   const handleActiveSection = (section) => {
//     setActiveSection(section);
//   };

//   const dropdownRef = useRef(null);

//   const [username, setUserName] = useState(null);
//   const [imageURL, setImageURL] = useState(null);

//   useEffect(() => {
//     const userInfoString = localStorage.getItem("userInfo");
//     if (userInfoString) {
//       const userInfo = JSON.parse(userInfoString);
//       setUserName(userInfo.username);
//       setImageURL(userInfo.imageURL);
//     }
//   }, []);
//   console.log(username);
//   console.log(imageURL);

//   const MenuBarClickHandler = () => {
//     let sideNav = sideNavRef;
//     let content = contentRef;
//     if (sideNav.classList.contains("side-nav-open")) {
//       sideNav.classList.add("side-nav-close");
//       sideNav.classList.remove("side-nav-open");
//       content.classList.add("content-expand");
//       content.classList.remove("content");
//     } else {
//       sideNav.classList.remove("side-nav-close");
//       sideNav.classList.add("side-nav-open");
//       content.classList.remove("content-expand");
//       content.classList.add("content");
//     }
//   };

//   ////////////////////////////  DropDown  ////////////////////////////
//   const [isDropdownOpen, setIsDropdownOpen] = useState(true);

//   const handleDropdownToggle = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   return (
//     <div className="">
//       <div className="w-1/3">
//         <div className="fixed top-0 left-0  z-10">
//           <div className="flex items-center">
//             <a className="icon-nav h-5" onClick={MenuBarClickHandler}>
//               <svg width="120" height="30" xmlns="http://www.w3.org/2000/svg">
//                 <circle cx="15" cy="15" r="5" fill="black" />
//                 <circle cx="30" cy="15" r="5" fill="black" />
//                 <circle cx="45" cy="15" r="5" fill="black" />
//               </svg>
//             </a>
//           </div>
//         </div>
//         <div
//           ref={(div) => {
//             sideNavRef = div;
//           }}
//           className="side-nav-open z-0"
//         >
//           <img
//             className="nav-logo mx-2"
//             style={{ marginTop: "5px" }}
//             src={logo}
//             alt="logo"
//           />

//           <NavLink
//             className={(navData) =>
//               navData.isActive
//                 ? "side-bar-item-active side-bar-item mt-2"
//                 : "side-bar-item mt-2"
//             }
//             to=""
//             onClick={handleDropdownToggle}
//             end
//           >
//             {({ isActive }) => (
//               <React.Fragment>
//                 {isActive ? (
//                   <div className="active-icon">
//                     <button className={`flex items-center`}>
//                       <div className="flex gap-2">
//                         <div className="pt-1">
//                           <svg
//                             width="20"
//                             height="20"
//                             viewBox="0 0 20 20"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <g opacity="0.9" clip-path="url(#clip0_514_873)">
//                               <path
//                                 d="M6.81154 6.11106C6.81154 4.34905 8.23842 2.92217 10.0004 2.92217C11.7624 2.92217 13.1893 4.34905 13.1893 6.11106C13.1893 7.87307 11.7624 9.29995 10.0004 9.29995C8.23842 9.29995 6.81154 7.87307 6.81154 6.11106ZM2.92266 14.8611C2.92266 14.4716 3.11218 14.0787 3.54765 13.6768C3.98788 13.2705 4.63116 12.904 5.39842 12.5966C6.93407 11.9814 8.79002 11.6722 10.0004 11.6722C11.2108 11.6722 13.0668 11.9814 14.6024 12.5966C15.3697 12.904 16.013 13.2705 16.4532 13.6768C16.8887 14.0787 17.0782 14.4716 17.0782 14.8611V17.0777H2.92266V14.8611Z"
//                                 stroke="#2F80ED"
//                                 stroke-width="1.4"
//                               />
//                             </g>
//                             <defs>
//                               <clipPath id="clip0_514_873">
//                                 <rect width="20" height="20" fill="white" />
//                               </clipPath>
//                             </defs>
//                           </svg>
//                         </div>
//                         <p>Profile</p>
//                       </div>

//                       <div className="ps-28">
//                         <svg
//                           width="24"
//                           height="24"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             d="M8.59 7.41L13.17 12L8.59 16.59L10 18L16 12L10 6L8.59 7.41Z"
//                             fill="#2F80ED"
//                           />
//                         </svg>
//                       </div>
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="active-icon">
//                     <button className={` flex justify-between `}>
//                       <div className="flex gap-2">
//                         <div className="pt-1">
//                           <svg
//                             width="20"
//                             height="20"
//                             viewBox="0 0 20 20"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <g opacity="0.9" clip-path="url(#clip0_514_873)">
//                               <path
//                                 d="M6.81154 6.11106C6.81154 4.34905 8.23842 2.92217 10.0004 2.92217C11.7624 2.92217 13.1893 4.34905 13.1893 6.11106C13.1893 7.87307 11.7624 9.29995 10.0004 9.29995C8.23842 9.29995 6.81154 7.87307 6.81154 6.11106ZM2.92266 14.8611C2.92266 14.4716 3.11218 14.0787 3.54765 13.6768C3.98788 13.2705 4.63116 12.904 5.39842 12.5966C6.93407 11.9814 8.79002 11.6722 10.0004 11.6722C11.2108 11.6722 13.0668 11.9814 14.6024 12.5966C15.3697 12.904 16.013 13.2705 16.4532 13.6768C16.8887 14.0787 17.0782 14.4716 17.0782 14.8611V17.0777H2.92266V14.8611Z"
//                                 stroke="gray"
//                                 stroke-width="1.4"
//                               />
//                             </g>
//                             <defs>
//                               <clipPath id="clip0_514_873">
//                                 <rect width="20" height="20" fill="gray" />
//                               </clipPath>
//                             </defs>
//                           </svg>
//                         </div>
//                         <p>Profile</p>
//                       </div>

//                       <div className="ps-28">
//                         <svg
//                           width="24"
//                           height="24"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             d="M8.59 7.41L13.17 12L8.59 16.59L10 18L16 12L10 6L8.59 7.41Z"
//                             fill="gray"
//                           />
//                         </svg>
//                       </div>
//                     </button>
//                   </div>
//                 )}
//               </React.Fragment>
//             )}
//           </NavLink>

//           {isDropdownOpen && (
//             <div className="ms-10" style={{ position: "relative" }}>
//               <NavLink
//                 className={(navData) =>
//                   navData.isActive ? "subSettingMenuItem  mt-2" : "mt-2"
//                 }
//                 to="/transactionHistory"
//                 end
//               >
//                 {({ isActive }) => (
//                   <React.Fragment>
//                     {isActive ? (
//                       <div
//                         className=""
//                         onClick={handleActiveSection("transactionHistory")}
//                       >
//                         <button className={`flex justify-between`}>
//                           <div className="flex gap-2 mt-2">
//                             <p className="mt-1">Transaction History</p>
//                           </div>
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="">
//                         <button className={`flex justify-between `}>
//                           <div className="flex gap-2 mt-2">
//                             <p className="mt-1">Transaction History</p>
//                           </div>
//                         </button>
//                       </div>
//                     )}
//                   </React.Fragment>
//                 )}
//               </NavLink>

//               <NavLink
//                 className={(navData) =>
//                   navData.isActive
//                     ? "subSettingMenuItem  mt-2 active-line2"
//                     : "mt-2"
//                 }
//                 to="/personalInfo"
//                 end
//               >
//                 {({ isActive }) => (
//                   <React.Fragment>
//                     {isActive ? (
//                       <div
//                         className="mt-2"
//                         onClick={handleActiveSection("personalInfo")}
//                       >
//                         <button className={`flex justify-between `}>
//                           <div className="flex gap-2 mt-2">
//                             <p className="mt-1">Personal Information</p>
//                           </div>
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="active-icon">
//                         <button className={`flex justify-between mt-2`}>
//                           <div className="flex gap-2 mt-2">
//                             <p className="mt-1">Personal Information</p>
//                           </div>
//                         </button>
//                       </div>
//                     )}
//                   </React.Fragment>
//                 )}
//               </NavLink>

//               <div className="line-container">
//                 <div
//                   className={
//                     activeSection === "transactionHistory"
//                       ? "line1 active-line1"
//                       : "line1"
//                   }
//                 ></div>
//                 <div
//                   className={
//                     activeSection === "personalInfo"
//                       ? "line2 active-line2"
//                       : "line2"
//                   }
//                 ></div>
//               </div>
//             </div>
//           )}

//           <NavLink
//             className={(navData) =>
//               navData.isActive
//                 ? "side-bar-item-active side-bar-item mt-2"
//                 : "side-bar-item mt-2"
//             }
//             to="/liveChat"
//             end
//           >
//             {({ isActive }) => (
//               <React.Fragment>
//                 {isActive ? (
//                   <div className="">
//                     <button
//                       className={`settingProfileButton flex justify-between `}
//                     >
//                       <div className="flex gap-2">
//                         <div className="pt-1">
//                           <svg
//                             width="20"
//                             height="20"
//                             viewBox="0 0 20 20"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <g opacity="0.7" clip-path="url(#clip0_514_864)">
//                               <path
//                                 d="M4.99935 14.3H4.7094L4.50437 14.505L2.36602 16.6433V3.33329C2.36602 2.80323 2.80261 2.36663 3.33268 2.36663H16.666C17.1961 2.36663 17.6327 2.80323 17.6327 3.33329V13.3333C17.6327 13.8634 17.1961 14.3 16.666 14.3H4.99935Z"
//                                 stroke="#2F80ED"
//                                 stroke-width="1.4"
//                               />
//                             </g>
//                             <defs>
//                               <clipPath id="clip0_514_864">
//                                 <rect width="20" height="20" fill="white" />
//                               </clipPath>
//                             </defs>
//                           </svg>
//                         </div>
//                         <p>Live Chat</p>
//                       </div>
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="active-icon">
//                     <button
//                       className={`settingProfileButton flex justify-between`}
//                     >
//                       <div className="flex gap-2">
//                         <div className="pt-1">
//                           <svg
//                             width="20"
//                             height="20"
//                             viewBox="0 0 20 20"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <g opacity="0.7" clip-path="url(#clip0_514_864)">
//                               <path
//                                 d="M4.99935 14.3H4.7094L4.50437 14.505L2.36602 16.6433V3.33329C2.36602 2.80323 2.80261 2.36663 3.33268 2.36663H16.666C17.1961 2.36663 17.6327 2.80323 17.6327 3.33329V13.3333C17.6327 13.8634 17.1961 14.3 16.666 14.3H4.99935Z"
//                                 stroke="#333333"
//                                 stroke-width="1.4"
//                               />
//                             </g>
//                             <defs>
//                               <clipPath id="clip0_514_864">
//                                 <rect width="20" height="20" fill="white" />
//                               </clipPath>
//                             </defs>
//                           </svg>
//                         </div>
//                         <p>Live Chat</p>
//                       </div>
//                     </button>
//                   </div>
//                 )}
//               </React.Fragment>
//             )}
//           </NavLink>
//         </div>
//       </div>

//       <div
//         ref={(div) => (contentRef = div)}
//         className="  max-w-full h-screen"
//         style={{ backgroundColor: "#f5f5f5" }}
//       >
//         {props.children}
//       </div>
//     </div>
//   );
// };

// export default Settings;
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
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


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Settings(props) {
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
        { name: 'Update Information', href: '/editPersonalInfo', icon: DocumentDuplicateIcon, current: false },
      ]);
    } else if (location.pathname === '/transactionHistory') {
      setNavigation([
        { name: 'Dashboard', href: '/personalInfo', icon: HomeIcon, current: false },
        { name: 'Transaction History', href: '/transactionHistory', icon: ChartPieIcon, current: true },
        { name: 'Update Information', href: '/editPersonalInfo', icon: DocumentDuplicateIcon, current: false },
      ]);
    } else if (location.pathname === '/editPersonalInfo') {
      setNavigation([
        { name: 'Dashboard', href: '/personalInfo', icon: HomeIcon, current: false },
        { name: 'Transaction History', href: '/transactionHistory', icon: ChartPieIcon, current: false },
        { name: 'Update Information', href: '/editPersonalInfo', icon: DocumentDuplicateIcon, current: true },
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
                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 bg-gray-50"
                  >
                    <p className=" w-6 h-6 rounded-full border-2 p-[1px] border-slate-200">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                      </svg>
                    </p>

                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">{
                      localStorage.getItem('first_name') ? localStorage.getItem('first_name') + localStorage.getItem('last_name') : "No Name"
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
          <a href="#">
            <span className="sr-only">Your profile</span>
            <img
              className="h-8 w-8 rounded-full bg-gray-50"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </a>
        </div>

        <main className="lg:pl-72">
          {props.children}
        </main>
      </div>
    </>
  )
}
