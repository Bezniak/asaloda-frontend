import React, {useState} from 'react';
import {Preloader} from "../Preloader/Preloader.jsx";
import FAQ from "./FAQ.jsx";
import useFetchAllData from "../../api/useFetchAllData.js";
import FaqDetails from "./FAQDetails.jsx";

const FaqContainer = () => {

    const [selectedQuestion, setSelectedQuestion] = useState('diet_nutrition');
    const {data, loading, error} = useFetchAllData(`/faqs?filters[category_name][$eq]=${selectedQuestion}`);
    const handleProgramClick = (program) => {
        setSelectedQuestion(program);
    };


    if (loading) return <Preloader/>;

    return (
        <div className='w-full max-w-7xl mx-auto mt-10 mb-10'>
            <h1 className='mb-5 text-4xl md:text-5xl font-bold md:text-left xs:text-center'>
                Часто задаваемые вопросы
            </h1>
            <FAQ handleProgramClick={handleProgramClick}/>
            <FaqDetails data={data} loading={loading} error={error}/>
        </div>
    );
};

export default FaqContainer;