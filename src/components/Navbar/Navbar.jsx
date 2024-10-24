import React, {useEffect, useRef, useState} from 'react';
import {NavLink} from 'react-router-dom';
import {ROUTES} from '../../config/routes.js';
import {useAuth} from "../../context/AuthContext.jsx";
import {FaSignInAlt, FaUserPlus} from "react-icons/fa";
import useFetchAllData from "../../api/useFetchAllData.js";
import useLanguage from "../../hooks/useLanguage.js";
import {useTranslation} from "react-i18next";
import {HiLanguage} from "react-icons/hi2";


const Navbar = () => {
    const {user, logout, role, locale} = useAuth();
    const {t} = useTranslation();
    const [isProgramDropdownVisible, setProgramDropdownVisible] = useState(false);
    const [isUserDropdownVisible, setUserDropdownVisible] = useState(false);
    const [isAboutUsDropdownVisible, setAboutUsDropdownVisible] = useState(false);
    const [isLanguageDropdownVisible, setLanguageDropdownVisible] = useState(false);
    const [isMobileMenuVisible, setMobileMenuVisible] = useState(false);
    const {currentLanguage, changeLanguage} = useLanguage();

    const dropdownRef = useRef(null);
    const dropdownUserRef = useRef(null);
    const dropdownAboutUsRef = useRef(null);
    const dropdownLanguage = useRef(null);

    const {data, loading, error} = useFetchAllData(`/programs?locale=${locale}&populate=*`);

    const toggleProgramDropdown = () => {
        setProgramDropdownVisible(!isProgramDropdownVisible);
    };

    const toggleUserDropdown = () => {
        setUserDropdownVisible(!isUserDropdownVisible);
    };

    const toggleAboutUsDropdown = () => {
        setAboutUsDropdownVisible(!isAboutUsDropdownVisible);
    };

    const toggleLanguageDropdown = () => {
        setLanguageDropdownVisible(!isLanguageDropdownVisible);
    };

    const toggleMobileMenu = () => {
        setMobileMenuVisible(!isMobileMenuVisible);
    };

    const handleClickOutside = (event) => {
        // Close mobile menu if clicked outside of it
        if (!event.target.closest('.mobile-menu') && isMobileMenuVisible) {
            setMobileMenuVisible(false);
        }

        if (!event.target.closest('.mega-menu-user-dropdown') && isMobileMenuVisible) {
            setMobileMenuVisible(false);
        }

        if (!event.target.closest('.mega-menu-full-dropdown-about-us') && isMobileMenuVisible) {
            setMobileMenuVisible(false);
        }

        if (!event.target.closest('.mega-menu-full-dropdown-button-language') && isMobileMenuVisible) {
            setMobileMenuVisible(false);
        }

        // Close program dropdown if clicked outside of it
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setProgramDropdownVisible(false);
        }

        if (dropdownUserRef.current && !dropdownUserRef.current.contains(event.target)) {
            setUserDropdownVisible(false);
        }

        if (dropdownAboutUsRef.current && !dropdownAboutUsRef.current.contains(event.target)) {
            setAboutUsDropdownVisible(false);
        }

        if (dropdownLanguage.current && !dropdownLanguage.current.contains(event.target)) {
            setLanguageDropdownVisible(false);
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

    const handleAboutUsLinkClick = () => {
        setAboutUsDropdownVisible(false);
        setMobileMenuVisible(false);
    };

    const handleUserInfoLinkClick = () => {
        setUserDropdownVisible(false);
        setMobileMenuVisible(false);
    };

    const handleLanguageLinkClick = () => {
        setLanguageDropdownVisible(false);
        setMobileMenuVisible(false);
    };

    const handleLogout = () => {
        logout();
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
                        className="inline-flex items-center p-2 w-10 h-10 justify-end text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
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
                                onClick={(event) => {
                                    event.preventDefault();
                                    toggleProgramDropdown();
                                }}
                                className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded md:w-auto hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[var(--green)] md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-green-500 md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                {t("programs")}
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
                                {t("discount")}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={ROUTES.PAYMENT_DELIVERY}
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700"
                                onClick={() => setMobileMenuVisible(false)} // Close mobile menu
                            >
                                {t("payment_delivery")}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={ROUTES.PARTNERSHIP}
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700"
                                onClick={() => setMobileMenuVisible(false)} // Close mobile menu
                            >
                                {t("partnership")}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to=""
                                id="mega-menu-full-dropdown-button-about-us"
                                onClick={(event) => {
                                    event.preventDefault();
                                    toggleAboutUsDropdown();
                                }}
                                className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded md:w-auto hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[var(--green)] md:p-0"
                            >
                                {t("aboutUs")}
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
                        {user
                            ? (
                                <li>
                                    <NavLink
                                        to=""
                                        id="mega-menu-full-dropdown-button-about-us"
                                        onClick={(event) => {
                                            event.preventDefault();
                                            toggleUserDropdown();
                                        }}
                                        className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded md:w-auto hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[var(--green)] md:p-0"
                                    >
                                        {t("account")}
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
                            )
                            : (
                                <>
                                    <li>
                                        <NavLink
                                            to={ROUTES.LOGIN}
                                            className="md:ml-10 flex items-center py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0"
                                            onClick={() => setMobileMenuVisible(false)}
                                        >
                                            <FaSignInAlt className='mr-3 text-[var(--green)] text-2xl'/>
                                            {t("login")}
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to={ROUTES.REGISTER}
                                            className="flex items-center py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0"
                                            onClick={() => setMobileMenuVisible(false)}
                                        >
                                            <FaUserPlus className='mr-3 text-[var(--green)] text-2xl'/>
                                            {t("register")}
                                        </NavLink>
                                    </li>
                                </>
                            )
                        }
                        <li>
                            <NavLink
                                to=""
                                id="mega-menu-full-dropdown-button-language"
                                onClick={(event) => {
                                    event.preventDefault();
                                    toggleLanguageDropdown();
                                }}
                                className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded md:w-auto hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[var(--green)] md:p-0"
                            >
                                <HiLanguage className='text-3xl md:ml-5'/>
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
                                {data.map((item) => (
                                    <NavLink to={`${ROUTES.PROGRAM.replace(":id", item.id)}`}
                                             className="text-[var(--green)] block p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                                             onClick={handleProgramLinkClick}
                                             key={item.id}
                                    >
                                        <div className="font-semibold">{item.attributes.program_name}</div>
                                        <span
                                            className="text-sm text-gray-500 dark:text-gray-400">{item.attributes.kcal}</span>
                                    </NavLink>
                                ))}
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {isAboutUsDropdownVisible && (
                <div
                    id="mega-menu-full-dropdown-about-us"
                    ref={dropdownAboutUsRef}
                    className="border-gray-200 shadow-sm bg-gray-50 md:bg-white border-y dark:bg-gray-800 dark:border-gray-600"
                >
                    <div
                        className="grid max-w-screen-xl px-4 py-1 mx-auto text-gray-900 dark:text-white sm:grid-cols-2 md:px-6">
                        <ul>
                            <li>
                                <NavLink
                                    to={ROUTES.ABOUTUS}
                                    className="text-[var(--green)] block p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={handleAboutUsLinkClick}
                                >
                                    <div className="font-semibold">{t("aboutCompany")}</div>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={ROUTES.REVIEWS}
                                    className="text-[var(--green)] block p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={handleAboutUsLinkClick}
                                >
                                    <div className="font-semibold">{t("reviews")}</div>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={ROUTES.FAQ}
                                    className="text-[var(--green)] block p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={handleAboutUsLinkClick}
                                >
                                    <div className="font-semibold">{t("FAQ")}</div>
                                </NavLink>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <NavLink
                                    to={ROUTES.CONTACTS}
                                    className="text-[var(--green)] block p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={handleAboutUsLinkClick}
                                >
                                    <div className="font-semibold">{t("contacts")}</div>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {isUserDropdownVisible && (
                <div
                    id="mega-menu-user-dropdown"
                    ref={dropdownUserRef}
                    className="border-gray-200 shadow-sm bg-gray-50 md:bg-white border-y dark:bg-gray-800 dark:border-gray-600"
                >
                    <div
                        className="grid max-w-screen-xl px-4 py-1 mx-auto text-gray-900 dark:text-white sm:grid-cols-2 md:px-6">
                        <ul>
                            {role === 'admin' ? (
                                <li>
                                    <NavLink
                                        to={ROUTES.ALL_ORDER}
                                        className="text-[var(--green)] block p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                                        onClick={handleUserInfoLinkClick}
                                    >
                                        <div className="font-semibold">{t("all_orders")}</div>
                                    </NavLink>
                                </li>
                            ) : role === 'authenticated' ? (
                                <li>
                                    <NavLink
                                        to={ROUTES.MY_ORDER}
                                        className="text-[var(--green)] block p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                                        onClick={handleUserInfoLinkClick}
                                    >
                                        <div className="font-semibold">{t("my_orders")}</div>
                                    </NavLink>
                                </li>
                            ) : null}

                            <li onClick={handleLogout}>
                                <NavLink
                                    to={ROUTES.HOME}
                                    className="text-[var(--green)] block p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={handleUserInfoLinkClick}
                                >
                                    <div className="font-semibold">{t("logout")}</div>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {isLanguageDropdownVisible && (
                <div
                    id="mega-menu-full-dropdown-language"
                    ref={dropdownLanguage}
                    className="border-gray-200 shadow-sm bg-gray-50 md:bg-white border-y"
                >
                    <div
                        className="grid max-w-screen-xl px-4 py-1 mx-auto text-gray-900 dark:text-white sm:grid-cols-2 md:px-6"
                    >
                        <ul>
                            <li onClick={() => setLanguageDropdownVisible(false)}>
                                <button
                                    onClick={() => {
                                        changeLanguage('be');
                                        handleLanguageLinkClick();
                                    }}
                                    className={`flex items-center space-x-2 ${
                                        currentLanguage === 'be' ? 'font-bold' : ''
                                    } text-[var(--green)] block w-full p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700`}
                                >
                                    {t("BE")}
                                </button>
                            </li>
                            <li onClick={() => setLanguageDropdownVisible(false)}>
                                <button
                                    onClick={() => {
                                        changeLanguage('en');
                                        handleLanguageLinkClick();
                                    }}
                                    className={`flex items-center space-x-2 ${
                                        currentLanguage === 'us' ? 'font-bold' : ''
                                    } text-[var(--green)] block w-full p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700`}
                                >
                                    {t("EN")}
                                </button>
                            </li>
                            <li onClick={() => setLanguageDropdownVisible(false)}>
                                <button
                                    onClick={() => {
                                        changeLanguage('ru');
                                        handleLanguageLinkClick();
                                    }}
                                    className={`flex items-center space-x-2 ${
                                        currentLanguage === 'ru' ? 'font-bold' : ''
                                    } text-[var(--green)] block w-full p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700`}
                                >
                                    {t("RU")}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;