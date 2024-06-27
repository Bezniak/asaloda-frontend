import React, {useEffect, useRef, useState} from 'react';
import {NavLink} from 'react-router-dom';
import {ROUTES} from '../../config/routes.js';

const Navbar = () => {
    const [isProgramDropdownVisible, setProgramDropdownVisible] = useState(false);
    const [isMobileMenuVisible, setMobileMenuVisible] = useState(false);
    const dropdownRef = useRef(null);

    const toggleProgramDropdown = () => {
        setProgramDropdownVisible(!isProgramDropdownVisible);
    };

    const toggleMobileMenu = () => {
        setMobileMenuVisible(!isMobileMenuVisible);
    };

    const handleClickOutside = (event) => {
        if (!event.target.closest('.mobile-menu') && isMobileMenuVisible) {
            setMobileMenuVisible(false);
        }

        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setProgramDropdownVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleProgramLinkClick = () => {
        setProgramDropdownVisible(false);
        setMobileMenuVisible(false);
    };

    return (
        <nav
            className="navbar-container bg-transparent absolute top-0 z-50 w-full border-gray-200 dark:border-gray-600 dark:bg-gray-900">
            <div className="flex flex-wrap justify-center items-center mx-auto max-w-screen-xl p-4">
                <div className="flex items-center">
                    <NavLink to={ROUTES.HOME}>
                        <img
                            src="/whiteLogo.svg"
                            alt="Flowbite Logo"
                            className="w-24 sm:w-32 md:w-40 lg:w-48"
                        />
                    </NavLink>
                    <NavLink
                        to=""
                        id="mega-menu-full-dropdown-button"
                        onClick={toggleProgramDropdown}
                        className="ml-16 mr-4 flex items-center justify-between py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[var(--oringe)] dark:text-white md:dark:hover:text-[var(--oringe)] dark:hover:bg-transparent dark:hover:text-[var(--oringe)] md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                        Программы
                        <svg
                            className="w-2.5 h-2.5 ms-2.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 4 4 4-4"
                            />
                        </svg>
                    </NavLink>
                </div>
                <button
                    data-collapse-toggle="mega-menu-full"
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="mega-menu-full"
                    aria-expanded={isMobileMenuVisible}
                    onClick={toggleMobileMenu}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 14"
                        stroke="white"  //цвет линий белый
                        strokeWidth="2" //толщина линий 2 пикселя
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M1 1h15M1 7h15M1 13h15"
                        />
                    </svg>

                </button>
                <div
                    id="mega-menu-full"
                    className={`${
                        isMobileMenuVisible ? 'block' : 'hidden'
                    } items-center justify-between font-medium w-full md:flex md:w-auto md:order-1 mobile-menu`}
                >
                    <ul className="flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-white md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-transparent md:dark:bg-transparent dark:border-gray-700">
                        <li>
                            <NavLink
                                to={ROUTES.DISCOUNTS}
                                className="block py-2 px-3 md:text-white xs:text-[var(--green)] md:hover:text-[var(--oringe)] rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700"
                                onClick={() => setMobileMenuVisible(false)}
                            >
                                Акции
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={ROUTES.REVIEWS}
                                className="block py-2 px-3 md:text-white xs:text-[var(--green)] md:hover:text-[var(--oringe)] rounded hover:bg-transparent md:hover:bg-transparent md:p-0 dark:text-white dark:hover:bg-transparent md:dark:hover:bg-transparent dark:border-gray-700"
                                onClick={() => setMobileMenuVisible(false)}
                            >
                                Отзывы
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={ROUTES.DELIVERY}
                                className="block py-2 px-3 md:text-white xs:text-[var(--green)] md:hover:text-[var(--oringe)] rounded hover:bg-transparent md:hover:bg-transparent md:p-0 dark:text-white dark:hover:bg-transparent md:dark:hover:bg-transparent dark:border-gray-700"
                                onClick={() => setMobileMenuVisible(false)}
                            >
                                Доставка
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={ROUTES.PAYMENT}
                                className="block py-2 px-3 md:text-white xs:text-[var(--green)] md:hover:text-[var(--oringe)] rounded hover:bg-transparent md:hover:bg-transparent md:p-0 dark:text-white dark:hover:bg-transparent md:dark:hover:bg-transparent dark:border-gray-700"
                                onClick={() => setMobileMenuVisible(false)}
                            >
                                Оплата
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={ROUTES.FAQ}
                                className="block py-2 px-3 md:text-white xs:text-[var(--green)] md:hover:text-[var(--oringe)] rounded hover:bg-transparent md:hover:bg-transparent md:p-0 dark:text-white dark:hover:bg-transparent md:dark:hover:bg-transparent dark:border-gray-700"
                                onClick={() => setMobileMenuVisible(false)}
                            >
                                Вопрос-ответ
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={ROUTES.ABOUTUS}
                                className="block py-2 px-3 md:text-white xs:text-[var(--green)] md:hover:text-[var(--oringe)] rounded hover:bg-transparent md:hover:bg-transparent md:p-0 dark:text-white dark:hover:bg-transparent md:dark:hover:bg-transparent dark:border-gray-700"
                                onClick={() => setMobileMenuVisible(false)}
                            >
                                О нас
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={ROUTES.PARTNERSHIP}
                                className="block py-2 px-3 md:text-white xs:text-[var(--green)] md:hover:text-[var(--oringe)] rounded hover:bg-transparent md:hover:bg-transparent md:p-0 dark:text-white dark:hover:bg-transparent md:dark:hover:bg-transparent dark:border-gray-700"
                                onClick={() => setMobileMenuVisible(false)}
                            >
                                Сотрудничество
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>

            {isProgramDropdownVisible && (
                <div
                    id="mega-menu-full-dropdown"
                    ref={dropdownRef}
                    className="border-gray-200 w-4/6 shadow-sm bg-gray-50 md:bg-white border-y dark:bg-gray-800 dark:border-gray-600 z-50"
                    style={{margin: '0 auto'}}
                >
                    <div
                        className="grid max-w-screen-xl px-4 py-1 mx-auto text-gray-900 dark:text-white sm:grid-cols-2 md:px-6"
                        style={{backgroundColor: 'rgba(249, 250, 251, 0.75)'}}
                    >
                        <ul>
                            <li>
                                <a
                                    href="#"
                                    className="text-[var(--green)] block p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={handleProgramLinkClick}
                                >
                                    <div className="font-semibold">Ультра легкость</div>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">1000 ккал</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-[var(--green)] block p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={handleProgramLinkClick}
                                >
                                    <div className="font-semibold">Легкость</div>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">1500 ккал</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-[var(--green)] block p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={handleProgramLinkClick}
                                >
                                    <div className="font-semibold">Баланс</div>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">1800 ккал</span>
                                </a>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <a
                                    href="#"
                                    className="text-[var(--green)] block p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={handleProgramLinkClick}
                                >
                                    <div className="font-semibold">Спорт</div>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">2000 ккал</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-[var(--green)] block p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={handleProgramLinkClick}
                                >
                                    <div className="font-semibold">Веган</div>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">1500 ккал</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-[var(--green)] block p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={handleProgramLinkClick}
                                >
                                    <div className="font-semibold">Кето</div>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">1500 ккал</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
