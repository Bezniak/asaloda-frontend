import React from 'react';
import Reviews from "./Reviews.jsx";
import useFetchAllData from "../../api/useFetchAllData.js";

const ReviewsContainer = () => {

    const {data, loading, error} = useFetchAllData(`/reviews?populate=*`);
    const {data: programData, loading: programLoading, error: programError} = useFetchAllData(`/programs?populate=*`);

    return (
        <div className='w-full max-w-7xl mx-auto md:mt-20 md:mb-10 xs:mb-10 p-3'>
            <Reviews data={data} loading={loading} error={error} programData={programData}/>
        </div>
    );
};

export default ReviewsContainer;