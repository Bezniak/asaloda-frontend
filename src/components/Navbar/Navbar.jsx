import React, {useState, useEffect, useRef} from 'react';
import './navbar.css';
import {NavLink} from "react-router-dom";
import {ROUTES} from "../../config/routes.js";

const Navbar = () => {
    const [isProgramDropdownVisible, setProgramDropdownVisible] = useState(false);
    const [isPartnershipDropdownVisible, setPartnershipProgramDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);

    const toggleProgramDropdown = () => {
        setProgramDropdownVisible(!isProgramDropdownVisible);
    };
    const togglePartnershipDropdown = () => {
        setPartnershipProgramDropdownVisible(!isPartnershipDropdownVisible)
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setProgramDropdownVisible(false);
            setPartnershipProgramDropdownVisible(false)
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div>
            <nav className="mt-2 bg-white border-gray-200 dark:bg-gray-900">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    <NavLink to={ROUTES.HOME}>
                        <img src="/logoWhite.svg" className="logo-image" alt="Flowbite Logo"/>
                    </NavLink>
                    <a href="tel:375297714179" className="text-lg text-gray-500 dark:text-white">
                        +375(29)771-41-79
                    </a>
                </div>
            </nav>


            <nav className="bg-white border-gray-200 dark:border-gray-600 dark:bg-gray-900">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <button data-collapse-toggle="mega-menu-full" type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="mega-menu-full" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                    <div id="mega-menu-full"
                         className="items-center justify-between font-medium hidden w-full md:flex md:w-auto md:order-1">
                        <ul className="flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <button id="mega-menu-full-dropdown-button"
                                        onClick={toggleProgramDropdown}
                                        className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded md:w-auto hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-500 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-green-500 md:dark:hover:bg-transparent dark:border-gray-700"
                                >
                                    Программы
                                    <svg
                                        className="w-2.5 h-2.5 ms-2.5" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none" viewBox="0 0 10 6"
                                    >
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                              stroke-width="2" d="m1 1 4 4 4-4"/>
                                    </svg>
                                </button>
                            </li>
                            <li>
                                <NavLink to={ROUTES.DISCOUNTS}
                                         className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700"
                                >
                                    Акции
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={ROUTES.REVIEWS}
                                         className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700"
                                >
                                    Отзывы
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={ROUTES.DELIVERY}
                                         className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700"
                                >
                                    Доставка
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={ROUTES.PAYMENT}
                                         className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700"
                                >
                                    Оплата
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={ROUTES.FAQ}
                                         className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700"
                                >
                                    Вопрос-ответ
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={ROUTES.ABOUTUS}
                                         className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700"
                                >
                                    О нас
                                </NavLink>
                            </li>
                            <li>
                                <button id="mega-menu-full-dropdown-button"
                                        onClick={togglePartnershipDropdown}
                                        className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded md:w-auto hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-500 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-green-500 md:dark:hover:bg-transparent dark:border-gray-700"
                                >
                                    Сотрудничество
                                    <svg
                                        className="w-2.5 h-2.5 ms-2.5" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none" viewBox="0 0 10 6"
                                    >
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                              stroke-width="2" d="m1 1 4 4 4-4"/>
                                    </svg>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                {isProgramDropdownVisible && (
                    <div id="mega-menu-full-dropdown" ref={dropdownRef}
                         className="mt-1 border-gray-200 shadow-sm bg-gray-50 md:bg-white border-y dark:bg-gray-800 dark:border-gray-600">
                        <div
                            className="grid max-w-screen-xl px-4 py-5 mx-auto text-gray-900 dark:text-white sm:grid-cols-2 md:px-6">
                            <ul>
                                <li>
                                    <a href="#"
                                       className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <div className="font-semibold">
                                            Ультра легкость
                                        </div>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            1000 ккал
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#"
                                       className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <div className="font-semibold">
                                            Легкость
                                        </div>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            1500 ккал
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#"
                                       className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <div className="font-semibold">
                                            Баланс
                                        </div>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            2000 ккал
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#"
                                       className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <div className="font-semibold">
                                            Актив баланс
                                        </div>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            2500 ккал
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#"
                                       className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <div className="font-semibold">
                                            Динамика
                                        </div>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            3000 ккал
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#"
                                       className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <div className="font-semibold">
                                            Динамика Макси
                                        </div>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            3500 ккал
                                        </span>
                                    </a>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <a href="#"
                                       className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <div className="font-semibold">
                                            Ужины
                                        </div>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            Проведите время "для себя"
                                        </span>
                                    </a>
                                </li>
                                <hr/>
                                <li>
                                    <a href="#"
                                       className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <div className="font-semibold">
                                            Напитки
                                        </div>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            Здоровье в каждом глотке
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}


                {isPartnershipDropdownVisible && (
                    <div id="mega-menu-full-dropdown" ref={dropdownRef}
                         className="mt-1 border-gray-200 shadow-sm bg-gray-50 md:bg-white border-y dark:bg-gray-800 dark:border-gray-600">
                        <div
                            className="grid max-w-screen-xl px-4 py-5 mx-auto text-gray-900 dark:text-white sm:grid-cols-2 md:px-6">
                            <ul>
                                <li>
                                    <a href="#"
                                       className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <div className="font-semibold">Online Stores</div>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Connect with third-party tools that you're already using.</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#"
                                       className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <div className="font-semibold">Segmentation</div>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Connect with third-party tools that you're already using.</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#"
                                       className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <div className="font-semibold">Marketing CRM</div>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Connect with third-party tools that you're already using.</span>
                                    </a>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <a href="#"
                                       className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <div className="font-semibold">Online Stores</div>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Connect with third-party tools that you're already using.</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#"
                                       className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <div className="font-semibold">Segmentation</div>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Connect with third-party tools that you're already using.</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#"
                                       className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <div className="font-semibold">Marketing CRM</div>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Connect with third-party tools that you're already using.</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}


            </nav>
        </div>
    );
};

export default Navbar;