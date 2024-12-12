import React from 'react';
import {useTranslation} from "react-i18next";
import MetaTags from "../../utils/MetaTags.jsx";

const Partnership = () => {
    const {t} = useTranslation();


    return (
        <>
            <MetaTags page="partnership"/>
            <div className='flex flex-col gap-8 justify-center items-center h-80vh text-2xl'>
                <p>{t("section_under_development")}</p>
                <p>{t("we_launch_soon")}</p>
            </div>
        </>

    );
};

export default Partnership;