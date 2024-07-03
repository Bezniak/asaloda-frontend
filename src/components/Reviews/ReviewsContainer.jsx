import React from 'react';
import Reviews from "./Reviews.jsx";
import useFetchAllData from "../../api/useFetchAllData.js";

const ReviewsContainer = () => {

    const {data, loading, error} = useFetchAllData(`/reviews?populate=*`);
    const {data: programData, loading: programLoading, error: programError} = useFetchAllData(`/programs?populate=*`);

    return (
        <div className=''>
            <Reviews data={data} loading={loading} error={error} programData={programData}/>
        </div>
    );
};

export default ReviewsContainer;