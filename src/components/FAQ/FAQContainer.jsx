import React, {useState} from 'react';
import {Preloader} from "../Preloader/Preloader.jsx";
import FAQ from "./FAQ.jsx";
import useFetchAllData from "../../api/useFetchAllData.js";
import FaqDetails from "./FAQDetails.jsx";
import {useAuth} from "../../context/AuthContext.jsx";
import {useTranslation} from "react-i18next";

const FaqContainer = () => {
    const {t} = useTranslation();
    const {locale} = useAuth();
    const [selectedQuestion, setSelectedQuestion] = useState('');
    const {
        data,
        loading,
        error
    } = useFetchAllData(`/faqs?locale=${locale}&filters[category_name][$eq]=${selectedQuestion}`);
    const handleProgramClick = (program) => {
        setSelectedQuestion(program);
    };


    if (loading) return <Preloader/>;

    return (
        <div className='w-full max-w-7xl mx-auto md:mt-10 md:mb-20 xs:mt-10 xs:mb-10 p-3'>
            <h1 className='mb-5 md:text-4xl xs:text-base font-bold md:text-left xs:text-center'>
                {t("FAQ")}
            </h1>
            <FAQ handleProgramClick={handleProgramClick}/>
            <FaqDetails data={data} loading={loading} error={error}/>
        </div>
    );
};

export default FaqContainer;