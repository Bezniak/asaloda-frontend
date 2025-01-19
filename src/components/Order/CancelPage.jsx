import React from 'react';
import {NavLink} from 'react-router-dom';
import {ROUTES} from "../../config/routes.js";
import {useTranslation} from "react-i18next";
import {handleClick} from "../../utils/utils.js";

const CancelPage = () => {
    const {t} = useTranslation();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 gap-8">
            <h1 className='text-4xl'>
                {t("confirmation_page.payment_cancelled")}
            </h1>
            <p className='text-lg'>
                {t("confirmation_page.try_again_click")}
            </p>
            <NavLink to={ROUTES.HOME} onClick={handleClick}
                     className='bg-[var(--green)] md:px-20 xs:px-12 md:py-5 xs:py-2 rounded-full w-fit text-white hover:text-white hover:!bg-[var(--oringe)] transition xs:text-base md:text-lg'
            >
                {t("confirmation_page.try_again")}
            </NavLink>
        </div>
    );
};

export default CancelPage;
