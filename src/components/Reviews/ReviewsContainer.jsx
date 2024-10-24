import React from 'react';
import Reviews from "./Reviews.jsx";
import useFetchAllData from "../../api/useFetchAllData.js";
import {useAuth} from "../../context/AuthContext.jsx";

const ReviewsContainer = () => {
    const {locale} = useAuth();
    const {data, loading, error} = useFetchAllData(`/reviews?populate=*`);
    const {data: programData, loading: programLoading, error: programError} = useFetchAllData(`/programs?locale=${locale}&populate=*`);

    return (
        <div>
            <Reviews data={data} loading={loading} error={error} programData={programData}/>
        </div>
    );
};

export default ReviewsContainer;