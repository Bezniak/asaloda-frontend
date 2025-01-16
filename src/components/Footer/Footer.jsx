import React from 'react';
import {NavLink} from "react-router-dom";
import {ROUTES} from "../../config/routes.js";
import dayjs from "dayjs";
import useFetchAllData from "../../api/useFetchAllData.js";
import {animateScroll as scroll} from "react-scroll";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../context/AuthContext.jsx";

const Footer = () => {
    const {locale} = useAuth();
    const currentYear = dayjs().year();
    const {t} = useTranslation();
    const {data, loading, error} = useFetchAllData(`/programs?locale=${locale}&populate=*`);

    const handleClick = () => {
        // Smooth scroll to top using react-scroll
        scroll.scrollToTop({
            duration: 0, // Animation duration in milliseconds
            smooth: 'easeInOutQuad', // Animation type
        });
    };

    return (
        <footer className='bg-[var(--footer-bg)]'>

            {/* Company Information Section */}
            <div
                className='mx-auto w-full max-w-7xl pt-20 md:pb-10 p-3 flex md:flex-row xs:flex-col md:justify-between items-start'>
                <div className='flex flex-col justify-start items-start text-gray-400 gap-2 text-left text-sm'>
                    <a href="tel:+375259108473"
                       className='flex items-center gap-4 md:text-2xl mb-4 text-white font-bold'>
                        +375 25 910-84-73
                    </a>
                    <p>{t("working_hours")}</p>
                    <h2>{t("company_name")}, {t("UNP")}</h2>
                    <div>{t("register_in_re``estr")}</div>
                </div>

                <div className='flex flex-col justify-start md:items-end text-gray-400 gap-2 text-right ml-auto'>
                    <a href="mailto:asalodafood@gmail.com"
                       className='flex items-center md:text-2xl md:pt-0 xs:pt-5 gap-4 mb-4 text-[var(--green)] font-bold'>
                        asalodafood@gmail.com
                    </a>
                    <p className='w-full text-justify text-sm'>{t("address")}</p>
                </div>
            </div>

            {/* Navigation Links Section */}
            <div className="mx-auto w-full max-w-7xl md:pt-20 xs:pt-10 pb-10 p-3">
                <div className="flex md:flex-row xs:flex-col justify-between gap-8">
                    {/* Programs List */}
                    <div>
                        <h2 className="mb-6 text-base tracking-wider font-semibold text-white text-left uppercase">
                            {t("programs")}
                        </h2>
                        <ul className="text-gray-400 text-lg">
                            {data?.map((item) => (
                                <li key={item.id} className="mb-4">
                                    <NavLink to={`${ROUTES.PROGRAM.replace(":id", item.id)}`}
                                             onClick={handleClick}
                                             className="hover:text-white transition-colors duration-200">
                                        {item.attributes.program_name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Client Information Links */}
                    <div>
                        <h2 className="mb-6 text-base tracking-wider text-left font-semibold text-white uppercase">
                            {t("for_clients")}
                        </h2>
                        <ul className="text-gray-400 text-lg">
                            <li className="mb-4">
                                <NavLink to={ROUTES.DISCOUNTS} onClick={handleClick}
                                         className="hover:text-white transition-colors duration-200">
                                    {t("discount")}
                                </NavLink>
                            </li>
                            <li className="mb-4">
                                <NavLink to={ROUTES.REVIEWS} onClick={handleClick}
                                         className="hover:text-white transition-colors duration-200">
                                    {t("reviews")}
                                </NavLink>
                            </li>
                            <li className="mb-4">
                                <NavLink to={ROUTES.FAQ} onClick={handleClick}
                                         className="hover:text-white transition-colors duration-200">
                                    {t("FAQ")}
                                </NavLink>
                            </li>
                            <li className="mb-4">
                                <NavLink to={ROUTES.PAYMENT_DELIVERY} onClick={handleClick}
                                         className="hover:text-white transition-colors duration-200">
                                    {t("payment_delivery")}
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* About Us Links */}
                    <div>
                        <h2 className="mb-6 text-base tracking-wider font-semibold text-white text-left uppercase">
                            {t("aboutUs")}
                        </h2>
                        <ul className="text-gray-400 text-lg">
                            <li className="mb-4">
                                <NavLink to={ROUTES.ABOUTUS} onClick={handleClick}
                                         className="hover:text-white transition-colors duration-200">
                                    {t("aboutUs")}
                                </NavLink>
                            </li>
                            <li className="mb-4">
                                <NavLink to={ROUTES.CONTACTS} onClick={handleClick}
                                         className="hover:text-white transition-colors duration-200">
                                    {t("contacts")}
                                </NavLink>
                            </li>
                            <li className="mb-4">
                                <NavLink to={ROUTES.PRIVACY_POLICY} onClick={handleClick}
                                         className="hover:text-white transition-colors duration-200">
                                    {t("privacy_policy")}
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Footer Bottom Section */}
                <div className="text-center mt-10">
                    <div className="text-sm text-gray-400">
                        © {currentYear}, AsalodaFood, {t("all_rights_reserved")}.
                    </div>
                    <div className="text-sm text-gray-400 mt-5">
                        {t("developed_by")} &nbsp;
                        <a href='https://www.linkedin.com/in/ivan-bezniak-2634a11a0/'
                           target='_blank' rel="noopener noreferrer"
                           className="hover:text-white transition-colors duration-200">
                            {t("ivan_bezniak")}
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
