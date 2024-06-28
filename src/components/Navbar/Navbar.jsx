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
        // Close mobile menu if clicked outside of it
        if (!event.target.closest('.mobile-menu') && isMobileMenuVisible) {
            setMobileMenuVisible(false);
        }

        // Close program dropdown if clicked outside of it
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
        <nav className="bg-white border-gray-200 dark:border-gray-600 dark:bg-gray-900">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-fit">
                <div className="flex justify-between items-center h-10vh w-screen ml-5 mr-5 md:hidden ">
                    <NavLink to={ROUTES.HOME} className="flex items-center">
                        <img
                            src="/logoWhite.svg"
                            alt="Flowbite Logo"
                            className="w-24 sm:w-32 md:w-40 lg:w-48"
                        />
                    </NavLink>
                    <button
                        data-collapse-toggle="mega-menu-full"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-end text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                </div>
                <div
                    id="mega-menu-full"
                    className={`${
                        isMobileMenuVisible ? 'block' : 'hidden'
                    } items-center justify-between font-medium w-full md:flex md:w-auto md:order-1 mobile-menu`}
                >

                    <NavLink to={ROUTES.HOME}>
                        <img
                            src="/logoWhite.svg"
                            alt="Flowbite Logo"
                            className="w-24 sm:w-32 md:w-40 lg:w-48 mr-10 hidden sm:block"
                        />
                    </NavLink>

                    <ul className="flex flex-col p-4 md:p-0 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <NavLink
                                to=""
                                id="mega-menu-full-dropdown-button"
                                onClick={toggleProgramDropdown}
                                className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded md:w-auto hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[var(--green)] md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-green-500 md:dark:hover:bg-transparent dark:border-gray-700"
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
                        </li>
                        <li>
                            <NavLink
                                to={ROUTES.DISCOUNTS}
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700"
                                onClick={() => setMobileMenuVisible(false)} // Close mobile menu
                            >
                                Акции
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={ROUTES.REVIEWS}
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700"
                                onClick={() => setMobileMenuVisible(false)} // Close mobile menu
                            >
                                Отзывы
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={ROUTES.PAYMENT_DELIVERY}
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700"
                                onClick={() => setMobileMenuVisible(false)} // Close mobile menu
                            >
                                Оплата и доставка
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={ROUTES.FAQ}
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700"
                                onClick={() => setMobileMenuVisible(false)} // Close mobile menu
                            >
                                Вопрос-ответ
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={ROUTES.ABOUTUS}
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700"
                                onClick={() => setMobileMenuVisible(false)} // Close mobile menu
                            >
                                О нас
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={ROUTES.PARTNERSHIP}
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700"
                                onClick={() => setMobileMenuVisible(false)} // Close mobile menu
                            >
                                Сотрудничество
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={ROUTES.PARTNERSHIP}
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700"
                                onClick={() => setMobileMenuVisible(false)} // Close mobile menu
                            >
                                Контакты
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>

            {isProgramDropdownVisible && (
                <div
                    id="mega-menu-full-dropdown"
                    ref={dropdownRef}
                    className="border-gray-200 shadow-sm bg-gray-50 md:bg-white border-y dark:bg-gray-800 dark:border-gray-600"
                >
                    <div
                        className="grid max-w-screen-xl px-4 py-1 mx-auto text-gray-900 dark:text-white sm:grid-cols-2 md:px-6">
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
                                    <span className="text-sm text-gray-500 dark:text-gray-400">2000 ккал</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-[var(--green)] block p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={handleProgramLinkClick}
                                >
                                    <div className="font-semibold">Актив баланс</div>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">2500 ккал</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-[var(--green)] block p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={handleProgramLinkClick}
                                >
                                    <div className="font-semibold">Динамика</div>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">3000 ккал</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-[var(--green)] block p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={handleProgramLinkClick}
                                >
                                    <div className="font-semibold">Динамика Макси</div>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">3500 ккал</span>
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
                                    <div className="font-semibold">Ужины</div>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">Проведите время "для себя"</span>
                                </a>
                            </li>
                            <hr/>
                            <li>
                                <a
                                    href="#"
                                    className="text-[var(--green)] block p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={handleProgramLinkClick}
                                >
                                    <div className="font-semibold">Напитки</div>
                                    <span
                                        className="text-sm text-gray-500 dark:text-gray-400">Здоровье в каждом глотке</span>
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