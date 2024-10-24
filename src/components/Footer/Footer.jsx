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
            <div className="mx-auto w-full max-w-7xl pt-20 pb-10 p-3">
                <div className="flex md:flex-row xs:flex-col justify-between">
                    <div>
                        <h2 className="mb-6 text-base tracking-wider font-semibold text-white text-left uppercase">
                            {t("programs")}
                        </h2>
                        <ul className="text-gray-400 text-lg">
                            <li className="mb-4">
                                {data?.map((item) => (
                                    <NavLink key={item.id} to={`${ROUTES.PROGRAM.replace(":id", item.id)}`}
                                             className="flex flex-col mb-4"
                                             onClick={handleClick}
                                    >
                                        {item.attributes.program_name}
                                    </NavLink>
                                ))}
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-base tracking-wider text-left font-semibold text-white uppercase">
                            {t("for_clients")}
                        </h2>
                        <ul className="text-gray-400 text-lg">
                            <li className="mb-4">
                                <NavLink to={ROUTES.DISCOUNTS} onClick={handleClick}>{t("discount")}</NavLink>
                            </li>
                            <li className="mb-4">
                                <NavLink to={ROUTES.REVIEWS} onClick={handleClick}>
                                    {t("reviews")}
                                </NavLink>
                            </li>
                            <li className="mb-4">
                                <NavLink to={ROUTES.FAQ} onClick={handleClick}>
                                    {t("FAQ")}
                                </NavLink>
                            </li>
                            <li className="mb-4">
                                <NavLink to={ROUTES.PAYMENT_DELIVERY}
                                         onClick={handleClick}>
                                    {t("payment_delivery")}
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-base tracking-wider font-semibold text-white text-left uppercase">
                            {t("aboutUs")}
                        </h2>
                        <ul className="text-gray-400 text-lg">
                            <li className="mb-4">
                                <NavLink to={ROUTES.ABOUTUS} onClick={handleClick}>
                                    {t("aboutUs")}
                                </NavLink>
                            </li>
                            <li className="mb-4">
                                <NavLink to={ROUTES.CONTACTS} onClick={handleClick}>
                                    {t("contacts")}
                                </NavLink>
                            </li>
                            <li className="mb-4">
                                <NavLink to={ROUTES.PRIVACY_POLICY} onClick={handleClick}>
                                    {t("privacy_policy")}
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="text-center">
                    <div className="text-sm text-gray-400">
                        © {currentYear}, AsalodaFood, {t("all_rights_reserved")}.
                    </div>
                    <div className="text-sm text-gray-400 mt-5">{t("developed_by")} &nbsp;
                        <a href='https://www.linkedin.com/in/ivan-bezniak-2634a11a0/'
                           target='_blank'>{t("ivan_bezniak")}</a>
                    </div>
                </div>
            </div>
        </footer>

    );
};

export default Footer;