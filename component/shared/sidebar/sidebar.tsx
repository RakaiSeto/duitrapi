'use client';

import sidebarMenu from '@/data/sidebar_menu.json';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

export default function Sidebar({ isSidebarOpen, isAdmin }: { isSidebarOpen: boolean; isAdmin: boolean }) {
    // State to manage the visibility of the E-commerce dropdown.
    const [isEcommerceOpen, setIsEcommerceOpen] = useState(false);

    const toggleEcommerce = () => {
        setIsEcommerceOpen(!isEcommerceOpen);
    };

    return (
        <div>
            <aside
                id="sidebar-multi-level-sidebar"
                className={`z-40 ${isSidebarOpen ? 'w-64' : 'w-0'} h-full transition-[width] ${isSidebarOpen ? 'sm:translate-x-0' : 'sm:-translate-x-full'} bg-[#fbfbfb] dark:bg-[#091636d9] border-r border-gray-200 dark:border-gray-700`}

                aria-label="Sidebar"
            >
                <div className="h-full px-3 pt-[2rem] pb-[1.5rem] overflow-y-auto">
                    <ul className={`space-y-2 font-medium ${isSidebarOpen ? 'block' : 'hidden'}`}>
                        {sidebarMenu[isAdmin ? 'admin' : 'user'].map((item, index) => (
                            <li key={index}>
                                <a
                                    href={item.href}
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <FontAwesomeIcon icon={`fa-solid ${item.icon}`} />
                                    <span className="ms-3 pt-1">{item.display}</span>
                                </a>
                            </li>
                        ))}
                        {/* <li>
                            <button
                                type="button"
                                className="flex items-center w-full p-2 text-base text-gray-900 cursor-pointer transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                onClick={toggleEcommerce}
                                aria-expanded={isEcommerceOpen}
                                aria-controls="dropdown-example"
                            >
                                <svg
                                    className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 18 21"
                                >
                                    <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                                </svg>
                                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">E-commerce</span>
                                <svg
                                    className="w-3 h-3 transform transition-transform duration-200"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                    style={{ transform: isEcommerceOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 4 4 4-4"
                                    />
                                </svg>
                            </button>
                            <ul
                                id="dropdown-example"
                                className={isEcommerceOpen ? 'block py-2 space-y-2' : 'hidden py-2 space-y-2'}
                            >
                                <li>
                                    <a
                                        href="#"
                                        className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    >
                                        Products
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    >
                                        Billing
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    >
                                        Invoice
                                    </a>
                                </li>
                            </ul>
                        </li> */}
                        {/* Other menu items here... */}
                    </ul>
                </div>
            </aside>
        </div>
    );
}
