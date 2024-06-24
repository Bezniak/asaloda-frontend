import React, {useState} from 'react';
import useFetch from "../../api/useFetch.js";
import {Preloader} from "../Preloader/Preloader.jsx";
import classNames from "classnames";
import styles from "../ChooseProgram/ProgramSelector.module.css";
import FAQ from "./FAQ.jsx";

const FaqContainer = () => {

    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const {data, loading, error} = useFetch('/faqs');

    console.log(data)

    const handleProgramClick = (program) => {
        setSelectedQuestion(program);
    };

    if (loading) return <Preloader/>


    return (
        <div className='w-full max-w-7xl mx-auto mt-10 mb-10'>
            <h1 className='mb-5 text-4xl md:text-5xl font-bold md:text-left xs:text-center'>
                Часто задаваемые вопросы
            </h1>
            <FAQ handleProgramClick={handleProgramClick}/>
        </div>
    );
};

export default FaqContainer;