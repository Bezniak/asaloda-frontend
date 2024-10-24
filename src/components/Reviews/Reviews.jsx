import React, {useState} from 'react';
import {Preloader} from "../Preloader/Preloader.jsx";
import Review from "./Review.jsx";
import ReviewForm from "./ReviewForm.jsx";
import {useTranslation} from "react-i18next";

const Reviews = ({data, loading, error, programData}) => {
    const {t} = useTranslation();
    const [isFormVisible, setIsFormVisible] = useState(false);

    if (loading) return <Preloader/>;


    return (
        <>
            <div
                className='w-full max-w-7xl mx-auto md:mt-20 md:mb-10 xs:mb-10 p-3 flex lg:flex-row xs:flex-col lg:justify-between gap-5 lg:items-start'>
                <div className='md:text-left xs:text-center'>
                    <button className='btn' onClick={() => setIsFormVisible(!isFormVisible)}>
                        {t("leave_feedback")}
                    </button>
                </div>
            </div>
            {isFormVisible && <ReviewForm data={data} programData={programData}/>}
            <h2 className='w-full max-w-7xl mx-auto p-3 md:text-4xl font-semibold mt-10'>
                {t("reviews")}
            </h2>
            <Review data={data}/>
        </>
    );
};

export default Reviews;
