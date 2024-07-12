import React from 'react';
import {useParams} from "react-router-dom";
import useFetchAllData from "../../api/useFetchAllData.js";
import {Preloader} from "../Preloader/Preloader.jsx";
import WelcomeSection from "./WelcomeSection.jsx";
import DescriptionBlockContainer from "./DescriptionBlockContainer.jsx";
import DateCalendar from "../DateCalendar/DateCalendar.jsx";

const ProgramContainer = () => {
    const id = useParams().id;
    const {data, loading, error} = useFetchAllData(`/programs/${id}?populate=*`);


    if (loading) return <Preloader/>

    return (
        <div>
            <WelcomeSection data={data}/>
            <DescriptionBlockContainer data={data}/>
            <DateCalendar/>
        </div>
    );
};

export default ProgramContainer;
