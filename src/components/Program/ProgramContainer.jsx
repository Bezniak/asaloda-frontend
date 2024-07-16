import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import useFetchAllData from "../../api/useFetchAllData.js";
import {Preloader} from "../Preloader/Preloader.jsx";
import WelcomeSection from "./WelcomeSection.jsx";
import DescriptionBlockContainer from "./DescriptionBlockContainer.jsx";
import DishContainer from "./DishContainer.jsx";
import dayjs from "dayjs";
import DateCalendar from "./DateCalendar.jsx";

const ProgramContainer = () => {
    const {id} = useParams();
    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(dayjs().add(2, 'day'));

    console.log('selectedDate', selectedDate)

    const {data, loading, error} = useFetchAllData(`/programs/${id}?populate=*`);
    const {
        data: dishData,
        loading: dishLoading,
        error: dishError
    } = useFetchAllData(
        `/dishes?filters[week_day][$eq]=${selectedDate.format('dd')}&&filters[program_type][$eq]=${data?.attributes?.program_name}&populate=*`
    );

    useEffect(() => {
        const today = dayjs();
        const newDates = [
            today,
            today.add(1, 'day'),
            today.add(2, 'day'),
            today.add(3, 'day'),
            today.add(4, 'day'),
            today.add(5, 'day'),
            today.add(6, 'day'),
        ];
        setDates(newDates);
    }, []);

    if (loading || dishLoading) return <Preloader/>;

    return (
        <div>
            <WelcomeSection data={data}/>
            <DescriptionBlockContainer data={data}/>
            <DateCalendar dates={dates} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
            <DishContainer dishData={dishData} dishLoading={dishLoading} dishError={dishError} selectedDate={selectedDate}/>
        </div>
    );
};

export default ProgramContainer;
